import YPrint from './src'

YPrint.install = Vue => {
  Vue.component(YPrint.name, YPrint)
}

export default YPrint
