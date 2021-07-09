import Image from './src'

Image.install = Vue => {
  Vue.component(Image.name, Image)
}

export default Image
