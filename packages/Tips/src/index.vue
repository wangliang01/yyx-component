<template>
  <el-tooltip :effect="effect" :placement="placement" v-bind="$attrs" :style="{width: `${size}px`, height: `${size}px`, fontSize: `${size}px`, color: `${color}`}">
    <div slot="content">
      <slot></slot>
    </div>
    <i :class="`iconfont ${icon}`"></i>
  </el-tooltip>
</template>

<script>
export default {
  name: 'YTips',
  components: {
  },
  props: {
    size: {
      type: [String, Number],
      default: 14
    },
    icon: {
      type: String,
      default: 'icon-tishi'
    },
    color: {
      type: String,
      default: '#979797'
    },
    effect: {
      type: String,
      default: 'light'
    },
    placement: {
      type: String,
      default: 'top'
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont{
  display: inline-block;
}
</style>
