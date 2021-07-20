import Container from './src'

Container.install = Vue => {
  Vue.component(Container.name, Container)
}

export default Container
