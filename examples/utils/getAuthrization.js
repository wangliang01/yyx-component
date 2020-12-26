import { set } from './index'
function _set(key) {
  const arr = key.split('_').map(i => i.toLowerCase())
  return set(...arr)
}

function getAuthrization(arr) {
  const obj = {}
  for (const item of arr) {
    obj[item] = _set(item)
  }
  return obj
}

export default getAuthrization
