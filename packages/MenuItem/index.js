import MenuItem from '../Menu/src/menu-item'

/* istanbul ignore next */
MenuItem.install = function(Vue) {
  Vue.component(MenuItem.name, MenuItem)
}

export default MenuItem
