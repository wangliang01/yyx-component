// 判断是否是一个原生的对象
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// 变量转字符串
export function toString(val) {
  if (val === null || val === undefined) return ''
  if (isArray(val)) return JSON.stringify(val)
  if (isPlainObject(val) && val.toString === Object.prototype.toString) return JSON.stringify(val)
  return String(val)
}

// 由一个组件，向上找到最近的指定组件
export function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

// 由一个组件，向下找到最近的指定组件
export function findComponentForward(context, componentName) {
  let target = null // 目标组件
  const name = context.$options.name
  if (name === componentName) {
    target = context
  }
  if (target) {
    return target
  } else {
    // 获取当前上下文所有子组件
    const children = context.$children
    // 编历子组件
    for (const child of children) {
      target = findComponentForward(child, componentName)
    }
  }
  return target
}
