<template>
  <el-cascader :ref="ref" v-model="currentValue" v-bind="$attrs" clearable :options="options" v-on="$listeners" @change="handleValueChange">
  </el-cascader>
</template>

<script>
import addressOptions from './address'
export default {
  name: 'YAddressCascader',
  props: {
    // 父组件传递过来的值
    value: {
      type: [String, Array],
      required: true
    }
  },
  data() {
    return {
      currentValue: this.value,
      ref: `category_cascader_${Date.now()}`,
      options: addressOptions
    }
  },
  watch: {
    value: {
      handler(value) {
        if (typeof this.value === 'string') {
          this.currentValue = this.value.split(',')
        } else {
          this.currentValue = value
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleValueChange(value) {
      if (Array.isArray(value)) {
        this.$emit('input', value.join(','))
      } else {
        this.$emit('input', value)
      }
      this.$nextTick(() => {
        const inputValue = this.$refs[this.ref].presentText
        const separator = this.$refs[this.ref].separator
        const reg = new RegExp(separator, 'g')
        if (inputValue) {
          this.$emit('input-value', inputValue.replace(reg, ','))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
