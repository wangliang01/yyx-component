// 导入表格组件
import YTable from './src'

// 为组件提供install安装方法，按需引入
YTable.install = function(Vue) {
  Vue.component(YTable.name, YTable)
}

// 导出组件
export default YTable
