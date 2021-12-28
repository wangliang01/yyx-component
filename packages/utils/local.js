const publicChar = 'yyx_component_'
export default {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(publicChar + key))
    } catch {
      return undefined
    }
  },
  set(key, value) {
    localStorage.setItem(publicChar + key, JSON.stringify(value))
  },
  remove(key) {
    localStorage.removeItem(publicChar + key)
  },
  clear() {
    Object.keys(localStorage).forEach(key => {
      if (key.includes(publicChar)) {
        localStorage.removeItem(key)
      }
    })
  }
}
