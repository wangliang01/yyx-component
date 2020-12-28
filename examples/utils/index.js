import { divide, floor, get, isArray } from 'lodash'
import moment from 'moment'
import store from '@/store'

/**
 * 获取地址
 * @param provinceName 省名称
 * @param cityName 市名称
 * @param areaName 区名称
 * @param detailAddress 详细地址
 */
export const getAddress = ({
  provinceName = '',
  cityName = '',
  areaName = '',
  detailAddress = ''
}) => {
  if (provinceName && cityName && areaName && detailAddress) {
    return `${provinceName} ${cityName} ${areaName} ${detailAddress}`
  }
}

/**
 * 格式化金额
 * @param {Number | String} money
 * @description 将数字形式的金额转化为带亿、万、元的中文形式
 * e.g 1000024234.12 => 10亿2万4234.12元
 */
export const formatMoney = money => {
  if (isNaN(money)) {
    throw new Error('请传入一个数字类型的格式')
  }
  const billion = floor(divide(money, 100000000))
  money = money % 100000000
  const tenThousand = floor(divide(money, 10000))
  money = (money % 10000).toFixed(2)
  return `${billion >= 1 ? billion + '亿' : ''}${
    tenThousand >= 1 ? tenThousand + '万' : ''
  }${money > 0 ? money + '元' : '元'}`
}

/**
 * 付款类型
 * RETURN_GOODS(1, "退货"),
 * RETURN_DEPOSIT(2, "退押金"),
 * PAY(3, "主动支付");
 */

export const formatPayType = payType => {
  switch (payType) {
    case 'RETURN_GOODS':
      return '退货'
    case 'RETURN_DEPOSIT':
      return '退押金'
    case 'PAY':
      return '主动支付'
    default:
      return '--'
  }
}

// 格式化时期
export const formatDate = (date, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  return date && moment(date).format(formatter)
}

// 构造常量
export const set = (...args) => {
  const str = args.join('::')
  return str
}

// 检查是否有权限
export const hasPermission = (permissionList) => {
  const roles = get(store, 'getters.userInfo.resourceInfoList', [])
  const isAdmin = get(store, 'getters.userInfo.isAdmin')
  if (isAdmin === 'ENABLE') {
    return true
  }
  if (!isArray(permissionList)) {
    throw new Error('所传参数不是一个数组')
  }

  const permission = roles.some(role => {
    return permissionList.includes(role.resourceCode)
  })

  return permission
}
