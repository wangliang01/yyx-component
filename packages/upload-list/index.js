// 导入组件，组件必须声明name
import YUploadList from './src'

// 为组件提供install安装方法，按需引入
YUploadList.install = function(Vue) {
  Vue.component(YUploadList.name, YUploadList)
}

// 导出组件
export default YUploadList
