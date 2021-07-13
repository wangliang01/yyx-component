import Text from './src'

Text.install = Vue => {
  Vue.component(Text.name, Text)
}

export default Text
