export function modifyPrice (num) {
  return Math.round((num + Number.EPSILON) * 10000) / 10000
}
export function modifyStock (num) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000
}
export function modifyCost (num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}
export function accDiv (arg1, arg2) {
  let t1 = 0; let t2 = 0; let r1; let r2
  try { t1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { t2 = arg2.toString().split('.')[1].length } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * pow(10, t2 - t1)
}
export function accMul (arg1, arg2) {
  let m = 0; const s1 = arg1.toString(); const s2 = arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) {}
  try { m += s2.split('.')[1].length } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
export function accAdd (arg1, arg2) {
  let r1, r2, m
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
export function accMinus (arg1, arg2) {
  let r1, r2, m, n
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  // last modify by deeka
  // 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
