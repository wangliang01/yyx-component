// 导入Button组件
import YButton from './Button'

// 组件列表
const components = [YButton]

// 定义install方法，接收Vue作为参数，通过Vue.use()的方式注册组件
const install = Vue => {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有install，才能被Vue.use()方法安装
  install,
  // 以下是具休的组件列表
  YButton
}
