<template>
  <div
    ref="text"
    class="text-wrapper"
  >
    <el-tooltip
      :disabled="!ellipsis"
      effect="dark"
      :content="content"
      placement="top"
    >
      <div class="text-tooltip-wrapper" :class="{[`y-line-${line}`]: ellipsis}">
        <span class="text">
          {{ content }}
        </span>
      </div>
    </el-tooltip>
    <span class="text-copy">{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: 'YText',
  components: {
  },
  props: {
    content: {
      type: [String, Number, Boolean, Object, Array],
      default: '暂无数据'
    },
    line: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      ellipsis: false
    }
  },
  watch: {
    content(val) {
      // 当content内容变化时，重新设置宽度
      this.setWidth()
    }
  },
  mounted() {
    this.initDom()
  },
  destroyed() {
    window.removeEventListener('resize', this.setWidth)
  },
  methods: {
    setWidth() {
      this.$nextTick(() => {
        const textDom = this.$refs.text.querySelector('.text')
        const textCopyDom = this.$refs.text.querySelector('.text-copy')
        this.ellipsis = textDom.getBoundingClientRect().width < textCopyDom.getBoundingClientRect().width
        this.$refs.text.style.width = textDom.getBoundingClientRect().width + 'px'
      })
    },
    initDom() {
      // 获取对应的copyText
      this.setWidth()
      window.addEventListener('resize', this.setWidth)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-wrapper {
  display: inline-block;
  .text-copy{
    position: fixed;
    top: -10000px;
    visibility: hidden;
  }
}
</style>
