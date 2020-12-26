export function findAddress(arr, region, count, nameArr) {
  const newArr = nameArr
  for (const item of region) {
    if (arr[count] === parseFloat(item.value)) {
      newArr.push(item.label)
      if (item.children) {
        if (item.children.length > 0) {
          findAddress(arr, item.children, count + 1, newArr)
        }
      }
    }
  }
}
