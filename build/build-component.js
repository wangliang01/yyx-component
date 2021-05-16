/* 编译组件 */
const fs = require('fs-extra')
const babel = require('@babel/core')
const path = require('path')

const esDir = path.join(__dirname, '../es')
const srcDir = path.join(__dirname, '../packages')
const babelConfig = {
  configFile: path.join(__dirname, '../babel.config.js')
}

/* 判断是否是脚本 */
const scriptRegExp = /\.(jsx?|tsx?)$/
const isScript = path => scriptRegExp.test(path)

/* 判断是否文件目录 */
const isDir = dir => fs.lstatSync(dir).isDirectory()

/* 编译到指定目录 */
function compile(dir) {
  // 从dir 中拿到所有的文件
  const files = fs.readdirSync(dir)
  console.log('files', files)
  // 遍历
  files.forEach(file => {
    const filePath = path.join(dir, file)
    // file还是dir
    if (isDir(filePath)) {
      return compile(filePath)
    } else {
      // 文件，是否是script
      if (isScript(file)) {
        const { code } = babel.transformFileSync(filePath, babelConfig)
        fs.removeSync(filePath)
        fs.outputFileSync(filePath.replace(scriptRegExp, '.js'), code)
      }
    }
  })
}

/* 清除目录 */
fs.emptyDirSync(esDir)
/* 编译目录 */
fs.copySync(srcDir, esDir)
compile(esDir)
