#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 打包
npm run lib

# 修改版本号
npm run version:update

# 提交git
git add .
git commit -m "打包组件库内容"
git push

# 发布
npm publish

