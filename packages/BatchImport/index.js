import YBatchImport from './src'

YBatchImport.install = Vue => {
  Vue.component(YBatchImport.name, YBatchImport)
}

export default YBatchImport
