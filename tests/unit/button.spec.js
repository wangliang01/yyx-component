import { shallowMount } from '@vue/test-utils'
import Button from '../../packages/Button/src/index.vue'

// 测试组件渲染出来的html
describe('Button.vue', () => {
  it('测试组件渲染出来的html', () => {
    const msg = 'HelloWorld'
    const wrapper = shallowMount(Button, {
      render(h) {
        return h('span', {
          class: {
            test: true
          }
        }, [msg])
      }
    })
    console.log(wrapper.html())
    expect(wrapper.html()).toMatch(`<span class="test">HelloWorld</span>`)
  })
})
