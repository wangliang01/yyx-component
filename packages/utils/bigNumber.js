// bigNumber.js
import { BigNumber } from 'bignumber.js'
const BN = BigNumber.clone()
/**
 * 是否退出计算
 * @param {*} x
 * @param {*} y
 * @returns
 */
function calculated(x, y) {
  if (!x && x !== 0 || !y && y !== 0) {
    return true
  } else {
    return false
  }
}
/**
 * 乘法
 * @param {*} x
 * @param {*} y
 * @param {Boolean} isToFixed  true 代表返回
 * @returns
 */
function multipliedBy(x, y, isToFixed = false) {
  if (calculated(x, y)) {
    return
  }
  // 判断是否需要保留两位小数
  if (isToFixed) {
    return BN(x).multipliedBy(BN(y)).toFixed(2)
  } else {
    return BN(x).multipliedBy(BN(y)).toString()
  }
}
/**
 * 除法
 * @param {*} x 分母
 * @param {*} y 分子 不能为零
 * @param {*} isToFixed  true 代表返回
 * @returns
 */
function dividedBy(x, y, isToFixed = false) {
  if (calculated(x, y) && y !== 0 && y !== '0') {
    return
  }
  // 判断是否需要保留两位小数
  if (isToFixed) {
    return BN(x).dividedBy(BN(y)).toFixed(2)
  } else {
    return BN(x).dividedBy(BN(y)).toString()
  }
}
/**
 * 减法
 * @param {*} x
 * @param {*} y
 * @param {*} isToFixed  true 代表返回
 */
function minus(x, y, isToFixed = false) {
  if (calculated(x, y)) {
    return
  }
  // 判断是否需要保留两位小数
  if (isToFixed) {
    return BN(x).minus(BN(y)).toFixed(2)
  } else {
    return BN(x).minus(BN(y)).toString()
  }
}
/**
 * 加法
 * @param {*} x
 * @param {*} y
 * @param {*} isToFixed  true 代表返回
 */
function plus(x, y, isToFixed = false) {
  if (calculated(x, y)) {
    return
  }
  // 判断是否需要保留两位小数
  if (isToFixed) {
    return BN(x).plus(BN(y)).toFixed(2)
  } else {
    return BN(x).plus(BN(y)).toString()
  }
}
/**
 * 比较大小
 */
function isLessThan(x, y) {
  if (calculated(x, y)) {
    return
  }
  return BN(x).isLessThan(BN(y))
}
export {
  multipliedBy,
  dividedBy,
  minus,
  plus,
  BN,
  isLessThan
}
