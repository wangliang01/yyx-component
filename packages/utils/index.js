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
