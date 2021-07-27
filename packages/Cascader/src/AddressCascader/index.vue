<template>
  <el-cascader :ref="ref" v-model="currentValue" v-bind="$attrs" clearable :options="options" :props="props" v-on="$listeners" @change="handleValueChange">
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
    },
    // 国内： internal; 国外: overseas
    mode: String,
    api: Function,
    type: String // 类型， province, city (可选)
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
          if (this.type) {
            // 省、市
            this.options = this.transferData(res.data)
          } else {
            this.options = res.data
          }
        }
      }
    },
    transferData(data) {
      const prop = this.props.children
      switch (this.type) {
        case 'province':
          data = this.deleteChildren(data, prop)
          break
        case 'city':
          data = Array.isArray(data) && data.map(item => {
            item[prop] = this.deleteChildren(item[prop], prop)
            return item
          })
          break
      }
      return data
    },
    deleteChildren(data, prop) {
      if (!Array.isArray(data)) return null
      return data.map(item => {
        if (item[prop]) {
          item[prop] = null
        }
        return item
      })
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
