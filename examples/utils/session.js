/**
 * 封装对本地存储的操作
 */
export default {
  get(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove(key) {
    sessionStorage.removeItem(key)
  },
  clear() {
    sessionStorage.clear()
  }
}
