<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="svgStyle"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'YIcon',
  props: {
    className: {
      type: String,
      default: ''
    },
    // icon是否从iconfont中取
    icon: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 16
    },
    height: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    iconName() {
      return `#${this.icon}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    svgStyle() {
      return {
        width: this.width,
        height: this.height ? this.height : this.width
      }
    }
  }
}
</script>

<style>
.svg-icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
