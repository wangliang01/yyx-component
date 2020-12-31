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
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
  // 扩展webpack配置，使packages加入编译
  // chainWebpack: config => {
  //   config.module
  //     .rule('js')
  //     .include.add('node_modules')
  //     .end()
  //     .use('babel')
  //     .loader('babel-loader')
  // }
}
