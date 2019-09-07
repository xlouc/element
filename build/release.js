/** @format */

/* eslint-disable no-unused-vars */
const standardVersion = require('standard-version')
// const replace = require('replace')
const os = require('os')
const fs = require('fs-extra')
const path = require('path')
const Git = require('./git')
const semver = require('semver')
const inquirer = require('inquirer')

function getCacheDir() {
  return path.resolve(os.tmpdir(), 'yak-ui')
}

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
    const name = require(packagePath).name
    console.info(`Releasing ${name} v${version} ...`)
    return standardVersion({
      releaseAs: version,
      preset: 'angular'
    })
  })
  .then(function() {
    // console.info(`Replace "commits" to "commit" by "CHANGELOG.md" ...`)
    // replace({
    //   regex: 'commits',
    //   replacement: 'commit',
    //   paths: [path.resolve(process.cwd(), 'CHANGELOG.md')]
    // })
    console.info('Start build project ...')
    return Git.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], process.cwd(), true)
  })
  .then(function() {
    // 上传编译后的内容至 gh-pages
    console.info('Init %s into %s', repo, getDistDir())
    return new Git(getDistDir(), 'git').init()
  })
  .then(function(git) {
    console.info('Push dist files into gh-pages')
    return git.add('.')
  })
  .then(git => {
    return git.commit(`deploy: [release] v${version}`)
  })
  .then(git => {
    return git.setRemoteUrl(remote, repo)
  })
  .then(git => {
    return git.checkout(remote, branch)
  })
  .then(git => {
    return git.push(remote, branch)
  })
  .then(function() {
    return git.add('-A')
  })
  .then(function() {
    return git.commit(`chore(release): build ${version}`)
  })
  .then(function() {
    return git.push('--follow-tags', remote, `master`)
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
    // return Git.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, process.cwd(), true)
  })
  .then(
    function() {},
    function() {
      console.error(new Error('Unspecified error (run without silent option for detail)'))
    }
  )
