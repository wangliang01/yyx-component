import DataBoard from './src'

DataBoard.install = Vue => {
  Vue.component(DataBoard.name, DataBoard)
}

export default DataBoard
