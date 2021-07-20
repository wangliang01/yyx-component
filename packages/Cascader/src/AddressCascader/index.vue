<template>
  <el-cascader :ref="ref" v-model="currentValue" v-bind="$attrs" clearable :options="options" :props="props" v-on="$listeners" @change="handleValueChange">
  </el-cascader>
</template>

<script>
/* eslint-disable */
import addressOptions from './address'
export default {
  name: 'YAddressCascader',
  props: {
    // 父组件传递过来的值
    value: {
      type: [String, Array],
      required: true
    },
    // 国内： internal; 国外: overseas
    mode: String,
    api: Function
  },
  data() {
    return {
      props: { value: 'value', label: 'label', children: 'children' },
      currentValue: this.value,
      ref: `category_cascader_${Date.now()}`,
      options: []
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
    },
    mode: {
      handler(val) {
        // 重新获取数据
        switch (val) {
          case 'internal':
            // 国内数据
            this.getOptions()
            this.props = { value: 'adcode', label: 'name', children: 'districts' }
            break
          case 'overseas':
            // 国外数据
            this.getOptions()
            this.props = { value: 'code', label: 'nameCn' }
            break
          default:
            // 兼容老系统
            this.options = addressOptions
            this.props = { value: 'value', label: 'label', children: 'children' }
        }
      },
      immediate: true
    }
  },
  methods: {
    async getOptions() {
      if (typeof this.api === 'function') {
          const res = await this.api()
          if (res.success) {
            this.options = res.data
          }
        }
    },
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
