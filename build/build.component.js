/** @format */
const fs = require('fs')
var ProgressBar = require('progress')
var Git = require('./git')
var chalk = require('chalk')
var Components = require('../components.json')

// 编译统一组件内容
Git.spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  [
    'cross-env',
    'BUILD_ENV=component',
    `vue-cli-service`,
    'build',
    '--target',
    'lib',
    '--dest',
    `lib`,
    '--formats',
    'commonjs',
    '--filename',
    `yak`,
    './src/index.js'
  ],
  process.cwd(),
  true
)

Git.spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  [`vue-cli-service`, 'build', '--target', 'lib', '--dest', `lib`, '--no-clean', '--formats', 'umd,umd-min', '--filename', `yak`, './src/index.js'],
  process.cwd(),
  true
)

// 编译样式
Git.spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['gulp', 'build', '--gulpfile', './build/gulpfile.js'], process.cwd(), true)

var barLeft = chalk.bold('[')
var barRight = chalk.bold(']')
var preamble = chalk.cyan.bold('  build ') + barLeft
var barFormat = preamble + ':bar' + barRight + chalk.green.bold(' :percent')
var componentKeys = Object.keys(Components)

var bar = new ProgressBar(barFormat, {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: componentKeys.length
})

// 单独编译某个组件
var percent = 0

function buildComponent() {
  bar.tick()
  var key = componentKeys[percent]
  if (!key) return
  Git.spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', [
    'cross-env',
    'BUILD_ENV=component',
    `vue-cli-service`,
    'build',
    '--target',
    'lib',
    '--dest',
    `lib`,
    '--formats',
    'commonjs',
    '--no-clean',
    '--filename',
    `${key}`,
    `${Components[key]}`
  ])
  // 移动内容
  fs.rename(`./lib/${key}.common.js`, `./lib/${key}.js`, function() {})
  percent += 1
  buildComponent()
}

percent = 0
buildComponent()
