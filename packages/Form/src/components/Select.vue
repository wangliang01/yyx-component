<template>
  <el-select
    v-model="currentValue"
    :multiple="$attrs.multiple"
    :disabled="$attrs.disabled"
    :value-key="$attrs.valueKey"
    :size="$attrs.size"
    :clearable="$attrs.clearable || false"
    :collapse-tags="$attrs.collapseTags || false"
    :multiple-limit="$attrs.multipleLimit"
    :name="$attrs.name"
    :autocomplete="$attrs.autocomplete || 'off'"
    :auto-complete="$attrs.autoComplete || 'off'"
    :placeholder="$attrs.placeholder || '请选择'"
    :filterable="$attrs.filterable || false"
    :allow-create="$attrs.allowCreate || false"
    :filter-method="$attrs.filterMethod"
    :remote="$attrs.remote || false"
    :remote-method="$attrs.remoteMethod"
    :loading="$attrs.loading || false"
    :loading-text="$attrs.loadingText || '加载中'"
    :no-match-text="$attrs.noMatchText || '无匹配数据'"
    :no-data-text="$attrs.noDataText || '无数据'"
    :popper-class="$attrs.popperClass"
    :reserve-keyword="$attrs.reserveKeyword || false"
    :default-first-option="$attrs.defaultFirstOption || false"
    :popper-append-to-body="$attrs.popperAppendToBody || true"
    :automatic-dropdown="$attrs.automaticDropdown || false"
    @input="handleInputEvent"
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {
      // 默认值
      type: [String, Number, Boolean, Object]
    },
    options: {
      type: Array // 下拉框选项列表
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
.el-select {
  display: block;
}
</style>
