<template>
  <el-checkbox-group
    v-model.trim="currentValue"
    @input="handleInputEvent"
  >
    <el-col
      v-for="(item, index) in options"
      :key="index"
      :span="item.cols"
    >
      <el-checkbox
        v-model="item[model.value]"
        :label="item[model.label]"
        :true-label="item.trueLabel"
        :false-label="item.falseLable"
        :disabled="item.disabled || false"
        :border="item.border || false"
        :size="item.size"
        :name="item.name"
        :checked="item.checked"
        :indeterminate="item.indeterminate"
        v-on="$listeners"
      ></el-checkbox>
    </el-col>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: [Array, String, Boolean],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    model() {
      if (this.$attrs.model) {
        return {
          label: this.$attrs.model.label,
          value: this.$attrs.model.value
        }
      }
      return { label: 'label', value: 'value' }
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
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
