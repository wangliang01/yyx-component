<template>
  <el-tooltip :effect="effect" :placement="placement" v-bind="$attrs" :style="{width: `${size}px`, height: `${size}px`, fontSize: `${size}px`, color: `${color}`}">
    <div slot="content">
      <slot></slot>
    </div>
    <i v-if="origin === 'element'" :class="`iconfont ${icon}`"></i>
    <SvgIcon v-else :icon="icon" v-bind="$attrs"></SvgIcon>
  </el-tooltip>
</template>

<script>
import SvgIcon from './SvgIcon.vue'
export default {
  name: 'YTips',
  components: {
    SvgIcon
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
    },
    origin: {
      type: String,
      default: 'element' // element || iconfont
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont{
  display: inline-block;
}
</style>
