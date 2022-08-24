/**
 * Collapse折叠组件
 */
const transitionStyle = 'all 0.5s ease-in-out'
const Transition = {
  beforeEnter(el) {
    el.style.height = 0
    el.style.opacity = 0
  },

  enter(el) {
    el.style.transition = transitionStyle
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`
      el.style.opacity = 1
    } else {
      el.style.height = 0
      el.style.opacity = 0
    }
    el.style.overflow = 'hidden'
  },

  afterEnter(el) {
    el.style.transition = transitionStyle
    el.style.height = 'max-content'
    el.style.opacity = 1
  },

  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
    el.style.opacity = 1
  },

  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = transitionStyle
      el.style.height = 0
      el.style.opacity = 0
    }
  },

  afterLeave(el) {
    el.style.transition = ''
    el.style.height = 0
    el.style.opacity = 0
  }
}

export default {
  name: 'YCollapse',
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}

