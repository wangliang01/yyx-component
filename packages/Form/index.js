// 导入组件，组件必须声明name
import YForm from './src'

// 为组件提供install安装方法，按需引入
YForm.install = function(Vue) {
  Vue.component(YForm.name, YForm)
}

// 导出组件
export default YForm
