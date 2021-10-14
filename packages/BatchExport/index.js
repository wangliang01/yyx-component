import BatchExport from './src'

BatchExport.install = Vue => {
  Vue.component(BatchExport.name, BatchExport)
}

export default BatchExport
