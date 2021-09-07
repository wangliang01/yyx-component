// ./md-loader/config.js

// 支持链式使用
const Config = require('markdown-it-chain')
// 匹配内容块，解析以 ::: 包裹的内容
const mdContainer = require('markdown-it-container')

const config = new Config()
function containers(md) {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      // 判断代码块开启标签 nesting === 1
      if (tokens[idx].nesting === 1) {
        // 判断是否包裹在代码块（fence）中
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        // 返回以代码块包裹，并添加标记
        return `<demo-block>
        <!--demo-begin: ${content}:demo-end-->
        `
      }
      return '</demo-block>'
    }
  })
  md.use(mdContainer, 'tip')
}

config.options
  .html(true)
  .end()

  .plugin('containers')
  .use(containers)
  .end()

const md = config.toMd()

module.exports = md
