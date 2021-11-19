import Vue from 'vue'
import { findComponentForward } from '../packages/utils'
Vue.config.warnHandler = function(msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  if (vm.$el.classList.contains('el-table')) {
    return
  } else {
    console.error(msg)
  }
}

// 设置表格高度
const doResize = async(el, binding, vnode) => {
  const context = vnode.componentInstance
  const componentName = 'ElTable'
  const target = findComponentForward(context, componentName)
  console.log(target)
  const $table = target
  const { value } = binding
  // 获取距底部距离 90默认有分页
  const bottomOffset = (value && value.bottomOffset) || 90
  if (!$table) return

  // 计算列表高度并设置
  const height =
    window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  // 父组件更新完成再设置表格高度，要不重新渲染会失效
  const self = vnode.componentInstance
  self.$nextTick(() => {
    Vue.set($table, 'maxHeight', height)
    $table.doLayout()
  })
}

export default {
  // 初始化设置
  bind(el, binding, vnode) {
    doResize(el, binding, vnode)
    // 设置resize监听方法
    el.resizeListener = async() => {
      await doResize(el, binding, vnode)
    }
    // 绑定监听方法到addResizeListener
    window.addEventListener('resize', el.resizeListener)
  },
  update(el, binding, vnode) {
    doResize(el, binding, vnode)
  },
  // 绑定默认高度
  async inserted(el, binding, vnode) {
    await doResize(el, binding, vnode)
  },
  // 销毁时设置
  unbind(el) {
    // 移除resize监听
    window.removeEventListener('resize', el.resizeListener)
  }
}
