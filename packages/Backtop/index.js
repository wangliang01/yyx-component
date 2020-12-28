// 导入组件，组件必须声明name
import YBackTop from './src'

// 为组件提供install安装方法，按需引入
YBackTop.install = function(Vue) {
  Vue.component(YBackTop.name, YBackTop)
}

// 导出组件
export default YBackTop
