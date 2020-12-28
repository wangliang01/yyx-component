/**
 * 封装整个项目的网络(ajax)请求工具函数
 */

import axios from 'axios'

import local from '@/utils/local'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { get, toNumber } from 'lodash'
import NProgress from 'nprogress'

/* qs 没用; 反向代理前缀 开发===>api  生产===>pron; Content-Type = "application/json" */
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/api' : '/pron'
axios.defaults.headers.common['Content-Type'] = 'application/json'

/* to do 租户ID的获取 */
// 所有请求头
// axios.defaults.headers.common.tenantId = '1'
// axios.defaults.headers.common.orgId = '0'
//

axios.defaults.timeout = 20000 // 请求超时时间

const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken
const removePending = config => {
  for (const p in pending) {
    if (
      pending[p].u ===
      config.url +
        '&' +
        config.method +
        '&' +
        JSON.stringify(config.data) +
        '&' +
        JSON.stringify(config.params)
    ) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}

// 异常拦截处理器
const errorHandler = error => {
  NProgress.done()
  const status = toNumber(get(error, 'response.status'))
  const msg = get(error, 'response.data.msg')
  switch (status) {
  /* eslint-disable no-param-reassign */
    case 400:
      error.message = msg || '请求错误'
      break
    case 401:
      // TODO 加一个备注
      error.message = msg || '未授权，请登录'
      local.clear() // 前端请求出现报错时判断是否为401，若为401则清除token。
      router.push('/login')
      break
    case 403:
      error.message = msg || '拒绝访问'
      break
    case 404:
      error.message = msg || `请求地址出错: ${error.response.config.url}`
      break
    case 408:
      error.message = msg || '请求超时'
      break
    case 500:
      error.message = msg || '服务器内部错误'
      break
    case 501:
      error.message = msg || '服务未实现'
      break
    case 502:
      error.message = msg || '网关错误'
      break
    case 503:
      error.message = msg || '服务不可用'
      break
    case 504:
      error.message = msg || '网关超时'
      break
    case 505:
      error.message = msg || 'HTTP版本不受支持'
      break
    default:
      break
    /* eslint-disabled */
  }
  if (error) {
    Message.error(error.message)
  }
  return Promise.reject(error)
}

// 请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  // 取出本地token
  const afterLogin = local.get('afterLogin')
  const curOrg = store.state.curOrg

  config.headers.Authorization =
    'Basic ' + window.btoa('system-service' + ':' + 'system-service')
  if (afterLogin !== null) {
    config.headers.Authorization = 'bearer ' + afterLogin
  }
  if (curOrg) {
    config.headers.orgId = curOrg.orgId
  } else {
    // 在开发环境时传orgId没有时，传1，为了获取数据
    config.headers.orgId = process.env.NODE_ENV === 'development' ? 1 : 0
  }
  removePending(config) // 在一个ajax发送前执行一下取消操作
  /* eslint-disable */
  config.cancelToken = new cancelToken(c => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({
      u:
        config.url +
        '&' +
        config.method +
        '&' +
        JSON.stringify(config.data) +
        '&' +
        JSON.stringify(config.params),
      f: c
    })
  })
  return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
  NProgress.done()
  removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  const {
    data: { code, msg, success }
  } = response
  // 响应数据先拦截住  对成功和失败的状态码统一处理
  if (success === false) {
    Message.error(msg)
    if (router.currentRoute.path === '/login') {
      local.clear() // 前端请求成功但后台success返回值为false时，若当前路径为登录界面则无论任何报错都会清除token。（主要为了防止登录界面请求员工信息时报错所做的拦截，从而进一步防止登录请求token数据时携带afterLogin请求。）
    } else {
      if (code === '00402') {
        local.clear() // 前端请求成功但后台返回错误码为00402的情况（大多为token失效或者同一账户异地登录的情况），该情况会清除token并跳转至登录页。
        router.push('/login')
      }
    }
  } else {
    return response
  }
}, errorHandler)

// 封装通用的get请求和post请求 DELETE PUT
export default {
  get(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: data })
        .then(response => {
          if (response && response.data) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(response => {
          if (response && response.data) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then(response => {
          if (response && response.data) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, { params: data })
        .then(response => {
          if (response && response.data) {
            resolve(response.data)
          } else {
            reject(response)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
// 网关名字666
// / procurement/
const procurement = '/procurement'
// system
const system = '/system' // -serive
// warehouse
const warehouse = '/warehouse'
// warehouse-service
const sales = '/sales'
const goodsService = '/goods' // goods-service
const finance = '/financial'
export { procurement, system, sales, warehouse, goodsService, finance }
