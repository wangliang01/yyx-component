// 导入组件，组件必须声明name
import YInputNumber from './src'

// 为组件提供install安装方法，按需引入
YInputNumber.install = function(Vue) {
  Vue.component(YInputNumber.name, YInputNumber)
}

// 导出组件
export default YInputNumber
