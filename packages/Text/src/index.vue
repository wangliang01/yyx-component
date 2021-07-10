<template>
  <div
    class="text-wrapper"
    :class="{[`y-line-${line}`]: ellipsis}"
    :style="{width: `${width ? `${width}px` : '100%'}`}"
  >
    <el-tooltip
      :disabled="!ellipsis"
      effect="dark"
      :content="content"
      placement="top"
    >
      <div class="text-tooltip-wrapper">
        <span class="text">
          {{ content }}
        </span>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'YText',
  components: {
  },
  props: {
    maxLength: {
      type: [String, Number],
      default: 20
    },
    content: {
      type: String,
      default: 'Top Left 提示文字88888889090909'
    },
    line: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      ellipsis: false,
      width: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const textDOM = document.querySelector('.text')
      if (textDOM) {
        const textLength = textDOM.innerText.length
        if (this.maxLength < textLength) {
          console.log('显示省略号')
          const { width } = textDOM.getBoundingClientRect()
          // 计算出每个字的宽度
          const size = Math.round(width / textLength)

          // 设置宽度
          this.width = Math.round(size * this.maxLength / this.line)
          this.ellipsis = true
        } else {
          console.log('不显示省略号')
          this.ellipsis = false
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
