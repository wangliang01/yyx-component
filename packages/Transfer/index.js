import Transfer from './src'

Transfer.install = Vue => {
  Vue.component(Transfer.name, Transfer)
}

export default Transfer
