import Vue from 'vue'
import { findComponentForward } from '../packages/utils'
Vue.config.warnHandler = function(msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  if (vm.$el && vm.$el.classList.contains('el-table')) {
    return
  } else {
    console.warn(msg)
  }
}
// 设置表格高度
const doResize = async(el, binding, vnode) => {
  const context = vnode.componentInstance
  const componentName = 'ElTable'
  // target即是ElTable组件
  const target = findComponentForward(context, componentName)
  const { value } = binding
  // 获取距底部距离 90默认有分页
  const bottomOffset = (value && value.bottomOffset) || 90
  if (!target) return
  const $el = target.$el
  // 计算列表高度并设置
  const height =
    window.innerHeight - $el.getBoundingClientRect().top - bottomOffset
  // 父组件更新完成再设置表格高度，要不重新渲染会失效
  context.$nextTick(() => {
    Vue.set(target, 'maxHeight', height)
    target.doLayout()
  })
}

function getEl(el, vnode) {
  const context = vnode.componentInstance
  const componentName = 'ElTable'
  // target即是ElTable组件
  const target = findComponentForward(context, componentName)
  return target.$el
}

export default {
  // 初始化设置
  bind(el, binding, vnode) {
    // 设置resize监听方法
    const $el = getEl(el, vnode)
    doResize($el, binding, vnode)

    $el.resizeListener = async() => {
      await doResize($el, binding, vnode)
    }
    // 绑定监听方法到addResizeListener
    window.addEventListener('resize', $el.resizeListener)
  },
  update(el, binding, vnode) {
    const $el = getEl(el, vnode)
    doResize($el, binding, vnode)
  },
  componentUpdated(el, binding, vnode) {
    const $el = getEl(el, vnode)
    doResize($el, binding, vnode)
  },
  // 绑定默认高度
  async inserted(el, binding, vnode) {
    const $el = getEl(el, vnode)
    await doResize($el, binding, vnode)
  },
  // 销毁时设置
  unbind(el, binding, vnode) {
    const $el = getEl(el, vnode)
    // 设置resize监听方法
    doResize($el, binding, vnode)
    // 移除resize监听
    window.removeEventListener('resize', $el.resizeListener)
  }
}
