// collapse-transition.js
const transitionStyle = '0.3s height ease-in-out'
let height = 0
const Transition = {
  beforeEnter(el) {
    el.style.transition = transitionStyle
    if (!el.dataset) el.dataset = {}

    el.style.height = 0
  },

  enter(el) {
    console.log('111111111111111')
    if (el.scrollHeight !== 0) {
      if (el.scrollHeight > height) console.log(1)
      el.style.height = `${el.scrollHeight}px`
    } else {
      el.style.height = ''
    }
    el.style.overflow = 'hidden'
  },

  afterEnter(el) {
    el.style.transition = ''
    el.style.height = ''
  },

  beforeLeave(el) {
    if (!el.dataset) el.dataset = {}
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },

  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = transitionStyle
      el.style.height = 0
    }
  },

  afterLeave(el) {
    el.style.transition = ''
    el.style.height = ''
  }
}

export default {
  name: 'YCollapse',
  functional: true,
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  render(h, { props, children }) {
    height = props.height
    const data = {
      on: Transition
    }
    const btn = h('el-button', { key: 'ed', props: { type: 'text' }}, ['展开'])
    const childs = children.map((it, i) => {
      it.key = i
      return it
    })
    return h('transition-group', data, [...childs, btn])
  }
}
