import Vue from 'vue'
import ElementUI from 'element-ui'
import yui from '../../lib/yui.common'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import '../../lib/yui.css'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(ElementUI)
  Vue.use(yui)
}
