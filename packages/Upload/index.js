// 导入组件，组件必须声明name
import YUpload from './src'

// 为组件提供install安装方法，按需引入
YUpload.install = function(Vue) {
  Vue.component(YUpload.name, YUpload)
}

// 导出组件
export default YUpload
