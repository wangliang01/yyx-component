import Vue from 'vue'
import router from './router'
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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
