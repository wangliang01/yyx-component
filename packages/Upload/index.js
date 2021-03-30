// 导入组件，组件必须声明name
import YUpload from './src'
import YAvatar from './src/Avatar'

// 为组件提供install安装方法，按需引入
YUpload.install = function(Vue) {
  Vue.component(YUpload.name, YUpload)
}
YAvatar.install = function(Vue) {
  Vue.component(YAvatar.name, YAvatar)
}

// 导出组件
export default {
  YUpload,
  YAvatar
}
