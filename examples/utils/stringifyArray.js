export default function stringifyArray (array, isStringify = true) {
  if (isStringify) {
    if (array) {
      if (array.length) return JSON.stringify([...array])
    }
    return null
  } else {
    if (array) { return JSON.parse(array) }
    return []
  }
}
