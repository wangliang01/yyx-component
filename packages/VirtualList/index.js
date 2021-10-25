import VirtualList from './src'

VirtualList.install = Vue => {
  Vue.component(VirtualList.name, VirtualList)
}

export default VirtualList
