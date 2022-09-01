// 导入步骤条组件
import Step from './src'

// 为组件提供install安装方法，按需引入
Step.install = function(Vue) {
  Vue.component(Step.name, Step)
}

// 导出组件
export default Step
