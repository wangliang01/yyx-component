// 根据adcode 反查省市区编码
export function AddressAllCode(addressTree, adcode, res = []) {
  if (!adcode) return []
  // 根据adcode找到相应的城市
  const target = findTarget(addressTree, adcode)

  if (target) {
    res.unshift(target.adcode)
    let parent = findTarget(addressTree, target.parentCode)
    while (parent && parent.adcode !== '86') {
      res.unshift(parent.adcode)
      parent = findTarget(addressTree, parent.parentCode)
    }

    // 如果长度为2,则将区级编码设置为与市级编码一样
    // if (res.length === 2) {
    //   // 区级编码
    //   const districtCode = String(+res[1] + 1)
    //   res.push(districtCode)
    // }

    console.log('反查省市区编码', res)
  }

  return res
}

export function findTarget(tree, target, mode = { code: 'adcode' }) {
  console.log(tree, target)
  // 定义一个栈
  const stack = [tree]
  while (stack.length) {
    // 栈顶元素出栈
    const node = stack.pop()

    // 查找到目标,退出
    if (node[mode.code] === target) {
      return node
    }

    if (node.districts && node.districts.length) {
      stack.push(...node.districts.reverse())
    }
  }
}
