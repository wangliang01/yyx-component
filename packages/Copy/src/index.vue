<template>
  <el-button :id="id" type="text" size="small" :data-clipboard-text="copyValue">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      复制
    </template>
  </el-button>
</template>

<script>
import Clipboard from 'clipboard'
import { guid } from '../../utils'
export default {
  name: 'YCopy',
  components: {
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      id: guid(),
      clipboard: null
    }
  },
  computed: {
    copyValue() {
      return this.value
    }
  },
  mounted() {
    const btn = document.getElementById(this.id)
    this.clipboard = new Clipboard(btn)
    // 复制成功后执行的回调函数
    this.clipboard.on('success', (e) => {
      console.info('Action:', e.action) // 动作名称，比如：Action: copy
      console.info('Text:', e.text) // 内容，比如：Text：hello word
      console.info('Trigger:', e.trigger) // 触发元素：比如：<button class="btn" :data-clipboard-text="copyValue">点我复制</button>
      e.clearSelection() // 清除选中内容
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    })

    // 复制失败后执行的回调函数
    this.clipboard.on('error', (e) => {
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
