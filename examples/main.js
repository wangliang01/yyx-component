// import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import App from './App.vue'
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
  require('./styles/common.scss')
  const ELEMENT = require('element-ui')

  // 导入组件库
  const yui = require('../packages')

  // 注册组件库
  Vue.use(ELEMENT)
  Vue.use(yui)
  Vue.config.productionTip = false
  const routes = require('./router')
  const VueRouter = require('vue-router')
  Vue.use(VueRouter)
  const router = new VueRouter({
    routes
  })
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

