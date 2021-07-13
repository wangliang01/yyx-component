import Tree from './src'

Tree.install = Vue => {
  Vue.component(Tree.name, Tree)
}

export default Tree
