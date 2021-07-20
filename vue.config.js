const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
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
    externals: process.env.NODE_ENV === 'development' ? {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    } : {},
    plugins: [
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
    ]
  }
}
