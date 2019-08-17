/** @format */
const path = require('path')

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

  runtimeCompiler: true,

  // 修改默认的入口
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'examples/index.html',
      filename: 'index.html'
    }
  },

  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },

  productionSourceMap: false,

  chainWebpack(config) {
    config.resolve.alias
      .set('main', path.resolve(__dirname, './src'))
      .set('packages', path.resolve(__dirname, './src/components'))
      .set('examples', path.resolve(__dirname, './examples'))
      .set('yak-ui/components', path.resolve(__dirname, './src/components'))
      .set('yak-ui', path.resolve(__dirname, './'))

    // lib目录是组件库最终打包好存放的地方，不需要eslint检查
    // examples/views是存放md文档的地方，也不需要eslint检查
    config.module
      .rule('eslint')
      .exclude.add(path.resolve(__dirname, 'examples/docs'))
      .end()
      .exclude.add(path.resolve(__dirname, 'build'))
      .end()

    // markdown loader 配置
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .end()

    config.module
      .rule('markdown')
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()

    config.module
      .rule('markdown')
      .use('markdown-loader')
      .loader(path.resolve(__dirname, './build/md-loader/index.js'))
      .end()
  }
}
