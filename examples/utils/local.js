/**
 * 封装对本地存储的操作
 */
export default {

  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return undefined
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}
