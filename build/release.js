/* eslint-disable no-unused-vars */
const fileSave = require('file-save')
const fs = require('fs-extra')
const path = require('path')
const Git = require('./git')
const semver = require('semver')
const inquirer = require('inquirer')
const colors = require('colors-console')

var pkgFiles = ['package.json', 'bower.json', 'manifest.json', 'composer.json']
var lockFiles = ['package-lock.json', 'npm-shrinkwrap.json', 'composer.lock']

function getDistDir() {
  return path.relative(process.cwd(), path.resolve(__dirname, '../dist/'))
}

// 不要使用 stdout，参考链接https://github.com/SBoudrias/Inquirer.js/issues/519
const prompt = inquirer.createPromptModule({ output: process.stderr })

const packagePath = path.resolve(process.cwd(), 'package.json')

const remote = 'origin'
const branch = 'gh-pages'

const git = new Git(process.cwd(), 'git')
let version = undefined
let repo = undefined

git
  .getRemoteUrl(remote)
  .then(function(_repo) {
    repo = _repo
    return git.checkout(remote, 'master')
  })
  .then(function() {
    return git.config('user.name', 'yak-bot')
  })
  .then(function() {
    return git.config('user.email', 'robot@yakcode.com')
  })
  .then(function() {
    return git.pull()
  })
  .then(function() {
    console.info('git merge develop')
    return git.merge('develop')
  })
  .then(function() {
    if (!fs.existsSync(packagePath)) {
      return Promise.reject(new Error(packagePath + "doesn't exist"))
    }
    const version = require(packagePath).version
    if (!version) {
      return Promise.reject(new Error('no version in package.json'))
    }
    const releaseType = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease']
    const choices = releaseType.map(item => `${item}: ${semver.inc(version, item)}`)
    return prompt([
      {
        name: 'version',
        type: 'list',
        message: 'Select release version',
        choices: choices
      }
    ])
  })
  .then(function({ version }) {
    return version.split(':')[1].trim()
  })
  .then(function(newVersion) {
    version = newVersion
    var pack = require(packagePath)
    console.info(`Releasing ${pack.name} v${version} ...`)
    // 处理文件版本
    var promises = []
    ;[].concat(pkgFiles, lockFiles).forEach(function(filename) {
      let configPath = path.resolve(process.cwd(), filename)
      try {
        if (!fs.existsSync(configPath)) {
          promises.push(Promise.resolve())
          return
        }
        let stat = fs.lstatSync(configPath)
        if (fs.existsSync(configPath) && stat.isFile()) {
          var file = require(configPath)
          var newFile = Object.assign({}, file)
          newFile.version = version
          console.log(
            `${colors('green', '√')} bumping version in ${filename} from ${file.version} to ${newFile.version}`
          )
          fileSave(configPath)
            .write(JSON.stringify(newFile, null, 2), 'utf8')
            .end('')
        }
        promises.push(Promise.resolve())
      } catch (err) {
        console.error(err)
        promises.push(Promise.reject(err))
      }
    })
    return Promise.all(promises)
  })
  .then(function() {
    return Git.spawn(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['conventional-changelog', '-p', 'angular', '-i', 'CHANGELOG.md', '-s'],
      process.cwd(),
      true
    )
  })
  .then(function() {
    console.info('Start build project ...')
    return Git.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], process.cwd(), true)
  })
  .then(function() {
    // 上传编译后的内容至 gh-pages
    console.info('Init %s into %s', repo, getDistDir())
    return new Git(getDistDir(), 'git')
  })
  .then(function(distGit) {
    return distGit.init()
  })
  .then(function(distGit) {
    return distGit.add('-A')
  })
  .then(function(distGit) {
    return distGit.commit(`'[deploy]: [release] v${version}'`)
  })
  .then(function(distGit) {
    return distGit.config('user.name', 'yak-bot')
  })
  .then(function(distGit) {
    return distGit.config('user.email', 'robot@yakcode.com')
  })
  .then(function(distGit) {
    return distGit.push('-f', repo, `master:${branch}`)
  })
  .then(function() {
    return git.add('-A')
  })
  .then(function() {
    return git.commit(`'[release]: ${version}'`)
  })
  .then(function() {
    return git.tag(`v${version}`)
  })
  .then(function() {
    return git.push('--follow-tags', remote, `master`)
  })
  .then(function() {
    return git.push('--tags', remote)
  })
  .then(function() {
    return git.checkout(remote, 'develop')
  })
  .then(function() {
    return git.rebase('master')
  })
  .then(function() {
    return git.push(remote, 'develop')
  })
  .then(function() {
    let args = ['publish']
    if (version.indexOf('beta') >= 0) {
      args.push('--tag')
      args.push('beta')
    }
    return Git.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, process.cwd(), true)
  })
  .then(
    function() {
      return git.config('--remove-section', 'user')
    },
    function(error) {
      return git.config('--remove-section', 'user').then(function() {
        return Promise.reject(error)
      })
    }
  )
  .then(
    function() {
      process.exit()
    },
    function(error) {
      console.error(new Error('Unspecified error (run without silent option for detail)'))
      process.exit(1)
    }
  )
