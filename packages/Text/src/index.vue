<template>
  <div class="text-wrapper" :class="[`y-line-${line}`]" :style="{width: `${width ? `${isNum ? `${width}px`: width}` : '100%'}`}">
    <el-tooltip v-if="ellipsis" effect="dark" :content="content" placement="top-start">
      <div class="text-tooltip-wrapper">
        <span class="text">
          {{ content }}
        </span>
      </div>
    </el-tooltip>
    <span v-if="!ellipsis" class="text">
      {{ content }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'YText',
  components: {
  },
  props: {
    width: {
      type: [String, Number],
      default: '100px'
    },
    content: {
      type: String,
      default: 'Top Left 提示文字'
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
  computed: {
    isNum() {
      return typeof this.width === 'number'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const box = document.querySelector('.text-wrapper')
      const textTooltipWrapper = document.querySelector('.text-tooltip-wrapper')
      const text = document.querySelector('.text')
      const { width: textWidth } = text.getBoundingClientRect()
      const toolTipWidth = textTooltipWrapper ? textTooltipWrapper.clientWidth : 0
      const boxWidth = box.scrollWidth

      if (this.width) {
        if (this.isNum) {
          console.log(1)
          console.log(this.width, textWidth)
          if (this.width < textWidth) {
            console.log('出现了省略号')
            this.ellipsis = true
          } else {
            console.log('没有出现省略号')
            this.ellipsis = false
          }
        } else {
          console.log(3)
          console.log(this.width)
          const width = parseFloat(this.width)
          console.log(width, textWidth)
          if (width < textWidth) {
            console.log('出现了省略号')
            this.ellipsis = true
          } else {
            console.log('没有出现省略号')
            this.ellipsis = false
          }
        }
      } else {
        console.log(2)
        if (boxWidth > toolTipWidth) {
          console.log('出现了省略号')
          this.ellipsis = true
        } else {
          console.log('没有出现省略号')
          this.ellipsis = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
