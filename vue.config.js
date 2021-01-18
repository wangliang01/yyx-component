const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  pages: {
    index: {
      entry: isDev ? 'examples/main.js' : 'packages/index.js',
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
    },
    output: {
      libraryExport: 'default'
    },
    externals: {
      'vue-router': 'VueRouter'
    }
  }
}
