import Vue from 'vue';
import ElementUI from 'element-ui';
import yyx from '../../lib/yui.umd.js'
import 'element-ui/lib/theme-chalk/index.css';
// import '../../lib/yui.css'


export default ({Vue}) => {
  Vue.use(ElementUI)
  Vue.use(yyx)
}
