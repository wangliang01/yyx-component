import Tips from './src'

Tips.install = Vue => {
  Vue.component(Tips.name, Tips)
}

export default Tips
