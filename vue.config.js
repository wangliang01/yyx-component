const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isLib = process.env.VUE_APP_ENV === 'lib'

console.log('库模式', isLib)

// const asyncDllPlugins = isLib ? [
//   // 引入动态链接
//   new webpack.DllReferencePlugin({
//     manifest: path.resolve('dll', 'lodash.manifest.json')
//   }),
//   new webpack.DllReferencePlugin({
//     manifest: path.resolve('dll', 'moment.manifest.json')
//   }),
//   new webpack.DllReferencePlugin({
//     manifest: path.resolve('dll', 'element.manifest.json')
//   })
// ] : []

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    // 使用自定义loader
    config.module
      .rule('md-loader')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
      .use('md-loader')
      .loader(resolve('./loaders/md-loader/index.js'))
      .end()
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "styles/element-variables.scss";`
      }
    }
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    lib: {
      entry: './packages/index.js'
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/element-ui/packages')],
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    output: {
      libraryExport: 'default'
    },
    externals: isLib ? {
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'lodash': 'lodash',
      'moment': 'moment',
      'highlight.js': 'highlight.js'
    } : {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'lodash': 'lodash',
      'moment': 'moment',
      'highlight.js': 'highlight.js'
    },
    plugins: [
      // 忽略moment.js中所有的locale文件
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 只加载locale zh-cn文件
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      // 开启gzip压缩
      new CompressionWebpackPlugin(
        {
          filename: info => {
            return `${info.path}.gz${info.query}`
          },
          algorithm: 'gzip',
          threshold: 0, // 只有大小大于该值的资源会被处理 0
          test: new RegExp('\\.(' + ['js'].join('|') + ')$'
          ),
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }
      )
      // 引入动态链接
      // ...asyncDllPlugins
    ]

  }
}
