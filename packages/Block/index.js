import Block from './src'

Block.install = Vue => {
  Vue.component(Block.name, Block)
}

export default Block
