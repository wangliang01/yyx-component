import ImageList from './src'

ImageList.install = Vue => {
  Vue.component(ImageList.name, ImageList)
}

export default ImageList
