<template>
  <div ref="text" class="text-wrapper">
    <el-tooltip
      :disabled="!ellipsis"
      effect="dark"
      :content="`${content}`"
      placement="top"
    >
      <div class="text-tooltip-wrapper" :class="{ [`y-line-${line}`]: true }">
        <i v-if="dot" class="dot" :class="`dot-${type}`"></i>
        <span v-if="content" class="text" :style="{color: color}">{{ content }}</span>
        <span v-else class="text" :style="{color: color}">
          <slot></slot>
        </span>
      </div>
    </el-tooltip>
    <span class="text-copy">{{ content }}</span>

  </div>
</template>

<script>
export default {
  name: 'YText',
  components: {},
  props: {
    content: {
      type: [String, Number, Boolean, Object, Array],
      default: ''
    },
    line: {
      type: [Number, String],
      default: 1
    },
    dot: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    },
    color: {
      type: String,
      default: ''
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
  display: inline;
  .text-copy {
    position: fixed;
    top: -10000px;
    visibility: hidden;
  }
}
.dot {
  display: inline-block;
  position: relative;
  margin-right: 6px;
  top: -2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  &-success {
    background: #52c41a;
  }
  &-warning {
    background: #FAAD14;
  }
  &-primary {
    background: #1890FF;
  }
  &-error {
    background: #FF4D4F;
  }
  &-info {
    background: rgba(0, 0, 0, .25);
  }
}
</style>
