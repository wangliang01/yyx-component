<template>
  <el-time-select
    v-model.trim="currentValue"
    :picker-options="$attrs.pickerOptions"
    :placeholder="$attrs.placeholder || '选择时间'"
    :readonly="$attrs.readonly || false"
    :disabled="$attrs.disabled || false"
    :editable="$attrs.editable || true"
    :clearable="$attrs.clearable || true"
    :size="$attrs.size"
    :start-placeholder="$attrs.startPlaceholder"
    :end-placeholder="$attrs.endPlaceholder"
    :arrow-control="$attrs.arrowControl || false"
    :align="$attrs.align || 'left'"
    :popper-class="$attrs.popperClass"
    :range-separator="$attrs.rangeSeparator || '-'"
    :value-format="$attrs.valueFormat"
    :default-value="$attrs.defaultValue"
    :name="$attrs.name"
    :prefix-icon="$attrs.prefixIcon"
    :clear-icon="$attrs.clearIcon"
    @input="handleInputEvent"
    v-on="$listeners"
  >
  </el-time-select>
</template>

<script>
export default {
  name: 'TimePicker',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Date]
    }
  },
  methods: {
    handleInputEvent(value) {
      // 当选择框发生变化时，将值传递出去
      this.$emit('input', value)
    }
  },
  watch: {
    // 监听外部的value
    value(val) {
      this.currentValue = val
    }
  }
}
</script>

<style lang="scss" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
