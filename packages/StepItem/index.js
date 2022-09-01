// 导入步骤条组件
import YStepItem from '../Step/src/StepItem'

// 为组件提供install安装方法，按需引入
YStepItem.install = function(Vue) {
  Vue.component(YStepItem.name, YStepItem)
}

// 导出组件
export default YStepItem
