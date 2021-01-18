import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common.scss'

// 导入组件库
import yui from '../packages'

// 注册组件库
Vue.use(ElementUI)
Vue.use(yui)
Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
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
} else {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
}

