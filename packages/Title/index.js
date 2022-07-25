import Title from './src'

Title.install = Vue => {
  Vue.component(Title.name, Title)
}

export default Title
