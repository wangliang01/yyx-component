<template>
  <el-cascader :ref="ref" v-model="currentValue" v-bind="$attrs" clearable :options="options" v-on="$listeners" @change="handleValueChange">
  </el-cascader>
</template>

<script>
export default {
  name: 'YCascader',
  props: {
    dataApi: {
      type: Function,
      required: true
    },
    format: {
      type: Function,
      default: data => data
    },
    value: {
      type: [String, Array],
      default: ''
    },
    lastChild: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
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
    }
  },
  async created() {
    try {
      // 从接口获取数据
      const res = await this.dataApi()
      let data = res.data
      if (typeof this.format === 'function') {
        // 对数据进行格式化处理
        data = this.format(data)
      }
      this.options = data
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    handleValueChange(value) {
      if (Array.isArray(value)) {
        let currentValue
        if (this.lastChild) {
          currentValue = value.slice(-1).join(',')
        } else {
          currentValue = value.join(',')
        }
        this.$emit('input', currentValue)
      } else {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
