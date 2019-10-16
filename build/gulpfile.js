'use strict'

const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

function compileStyle() {
  return src('../src/style/*.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('../lib/theme-chalk'))
}

function copyfont() {
  return src('../src/style/fonts/**')
    .pipe(cssmin())
    .pipe(dest('../lib/theme-chalk/fonts'))
}

function pbabel() {
  return babel({
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: 'commonjs',
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
          }
        }
      ]
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['yak-ui'],
          alias: {
            'yak-ui/src': 'yak-ui/lib'
          }
        }
      ]
    ]
  })
}

function compileUtils() {
  return src('../src/utils/**/*.js')
    .pipe(pbabel())
    .pipe(dest('../lib/utils'))
}

function compileTransitions() {
  return src('../src/transitions/*.js')
    .pipe(pbabel())
    .pipe(dest('../lib/transitions'))
}

function compileMixins() {
  return src('../src/mixins/**')
    .pipe(pbabel())
    .pipe(dest('../lib/mixins'))
}

function compileLocale() {
  return src('../src/locale/**')
    .pipe(pbabel())
    .pipe(dest('../lib/locale'))
}

function compileDirectives() {
  return src('../src/directives/**')
    .pipe(pbabel())
    .pipe(dest('../lib/directives'))
}

exports.build = series(
  compileStyle,
  copyfont,
  compileUtils,
  compileTransitions,
  compileMixins,
  compileLocale,
  compileDirectives
)
