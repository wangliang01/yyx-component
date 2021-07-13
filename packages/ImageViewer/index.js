import ImageViewer from './src'

ImageViewer.install = Vue => {
  Vue.component(ImageViewer.name, ImageViewer)
}

export default ImageViewer
