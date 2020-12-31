<template>
  <el-date-picker
    v-model.trim="currentValue"
    :readonly="$attrs.readonly || false"
    :disabled="$attrs.disabled || false"
    :editable="$attrs.editable || true"
    :clearable="$attrs.clearable || true"
    :size="$attrs.size"
    :placeholder="$attrs.placeholder || '请选择'"
    :start-placeholder="$attrs.startPlaceholder"
    :end-placeholder="$attrs.endPlaceholder"
    :format="$attrs.format || 'yyyy-MM-dd'"
    :align="$attrs.align || 'left'"
    :popper-class="$attrs.popperClass"
    :picker-options="$attrs.pickerOptions"
    :range-separator="$attrs.rangeSeparator"
    :default-value="$attrs.defaultValue"
    :default-time="$attrs.defaultTime"
    :value-format="$attrs.valueFormat"
    :name="$attrs.name"
    :unlink-panels="$attrs.unlinkPanels"
    :prefix-icon="$attrs.prefixIcon"
    :clear-icon="$attrs.clearIcon"
    :validate-event="$attrs.validateEvent"
    :type="$attrs.type || 'date'"
    @input="handleInputEvent"
    v-on="$listeners"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: 'DatePicker',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [Date, String]
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
