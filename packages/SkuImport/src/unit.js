export const units = [
  '单位',
  '包',
  '盒',
  '箱',
  '袋',
  '米',
  '组',
  '罐',
  '杯',
  '件',
  'KG',
  '个',
  '份',
  '克（g）',
  '公斤（kg）',
  '加仑',
  '千米',
  '升（l）',
  '厘米',
  '只',
  '台',
  '吨（t）',
  '听',
  '块',
  '头',
  '夸脱',
  '套',
  '小时',
  '把',
  '提',
  '支',
  '斤',
  '枚',
  '根',
  '桶',
  '片',
  '瓶',
  '盎司',
  '磅'
]

export const priceUnitOptions = units.map(item => {
  return {
    label: item,
    value: item
  }
})
