import VirtualList from './src/VirtualList'

VirtualList.install = Vue => {
  Vue.component(VirtualList.name, VirtualList)
}

export default VirtualList
