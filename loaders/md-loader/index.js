const fs = require('fs')
const path = require('path')
const md = require('./config')
const cacheDir = '../../node_modules/.cacheDir'

function resolve(dir) {
  return path.join(__dirname, dir)
}

if (!fs.existsSync(resolve(cacheDir))) {
  fs.mkdirSync(resolve(cacheDir))
}

module.exports = function(source) {
  // 获取 md 文件转化后的内容
  let content = md.render(source)

  // 对js片段高亮
  content = content.replace(/\<pre\>\<code class=\"(language-js)\"\>/g, (match, $1) => {
    return match.replace(/(\<pre)/, '$1 v-highlightjs')
  })

  // 对table添加el-table样式
  content = content.replace(/(\<table)/g, (match) => {
    return `${match} class="el-table" `
  })

  const startTag = '<!--demo-begin:' // 匹配开启标签
  const startTagLen = startTag.length
  const endTag = ':demo-end-->' // 匹配关闭标签
  const endTagLen = endTag.length

  let components = '' // 存储组件示例
  let importVueString = '' // 存储引入组件声明
  let uid = 0 // demo 的 uid
  const outputSource = [] // 输出的内容
  let start = 0 // 字符串开始位置

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)

  while (commentStart !== -1 && commentEnd !== -1) {
    outputSource.push(content.slice(start, commentStart))
    // 获取代码块内容
    const commentContent = content.slice(
      commentStart + startTagLen,
      commentEnd
    )

    const componentNameId = `demoContainer${uid}`
    // 将文件写入本地
    fs.writeFileSync(resolve(`${cacheDir}/${componentNameId}.vue`), commentContent, 'utf-8')
    // 声明内容插槽传入
    outputSource.push(`<template slot="source"><${componentNameId} /></template>`)
    // 添加引入声明
    importVueString += `\nimport ${componentNameId} from '${cacheDir}/${componentNameId}';`
    // 添加组件声明
    components += `${componentNameId},`

    // 重新计算下一次的位置
    uid++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }

  // 后续内容添加
  outputSource.push(content.slice(start))

  return `
    <template>
      <section class="demo-container">
        ${outputSource.join('')}
      </section>
    </template>
    <script>
      ${importVueString}
      export default {
        name: 'demo-container',
        components: {
          ${components}
        },
      }
    </script>
  `
}
