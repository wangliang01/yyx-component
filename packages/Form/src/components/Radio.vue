<template>
  <el-radio-group
    v-model.trim="currentValue"
    v-bind="$attrs"
    @input="handleInputEvent"
  >
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="(item.value !== undefined && item.value !== null) ? item.value : item.label"
      :disabled="item.disabled"
      :border="item.border"
      :size="item.size"
      :name="item.name"
      v-on="$listeners"
    >{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    options: {
      // 单选框选项数组
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val
      },
      deep: true
    }
  },
  methods: {
    handleInputEvent(value) {
      // 当选择框发生变化时，将值传递出去
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-radio-button__inner,
.el-radio-group {
  width: 100%;
}
</style>
