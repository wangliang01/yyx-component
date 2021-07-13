<template>
  <el-tooltip :effect="effect" :placement="placement" v-bind="$attrs" :style="{width: `${size}px`, height: `${size}px`, fontSize: `${size}px`, color: `${color}`}">
    <div slot="content">
      <slot name="content">{{ content }}</slot>
    </div>
    <i class="iconfont icon-tishi"></i>
  </el-tooltip>
</template>

<script>
export default {
  name: 'YQuestion',
  components: {
  },
  props: {
    content: {
      type: String,
      default: '提示文字'
    },
    size: {
      type: [String, Number],
      default: 14
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
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.iconfont{
  display: inline-block;
}
</style>
