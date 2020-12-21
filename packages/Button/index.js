// 导入组件，组件必须声明name
import YButton from './src'

// 为组件提供install安装方法，按需引入
YButton.install = function(Vue) {
  Vue.component(YButton.name, YButton)
}

// 导出组件
export default YButton
