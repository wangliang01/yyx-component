// import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import App from './App.vue'
import DemoBlock from './components/DemoBlock.vue'
import VueCodeHighlight from 'vue-code-highlight'

Vue.use(VueCodeHighlight) // registers the v-highlight directive
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/vs2015.css' // or other highlight.js theme

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)
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
  Vue.component('demo-block', DemoBlock)
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

