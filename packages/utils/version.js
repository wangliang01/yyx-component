const pkg = require('../../package.json')
const fs = require('fs')

const version = pkg.version

let [first, second, third] = version.split('.').map(item => {
  if (typeof item === 'object') {
    return item
  } else {
    return +item
  }
})

third += 1

if (third > 30) {
  third = 0
  second += 1
}

if (second > 30) {
  second = 0
  third = 0
  first += 1
}

const newVersion = `${first}.${second}.${third}`

pkg.version = newVersion

console.log(JSON.stringify(pkg))

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 4), {
  cwd: '../../',
  encoding: 'utf8',
  stdio: [process.stdin, process.stdout, process.stderr]
})

console.log('已修改版本号为：', newVersion)
