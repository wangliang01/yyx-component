<template>
  <el-cascader
    :ref="ref"
    v-model="currentValue"
    v-bind="$attrs"
    clearable
    :options="options"
    :props="props"
    v-on="$listeners"
    @change="handleValueChange"
  >
  </el-cascader>
</template>

<script>
/* eslint-disable */
import { isEmpty } from 'lodash'
export default {
  name: 'YCascader',
  props: {
    dataApi: {
      type: Function
    },
    // element 级联组件的props属性
    props: {
      type: Object,
      default: () => {
        return {
          expandTrigger: 'click',
          multiple: false,
          checkStrictly: false,
          emitPath: true,
          lazy: false,
          lazyLoad: (node, resolve) => {},
          value: 'value',
          label: 'label',
          children: 'children',
          disabled: 'disabled',
          leaf: 'leaf'
        }
      }
    },
    format: {
      type: Function,
      default: (data) => data
    },
    value: {
      type: [String, Array],
      default: ''
    },
    inputValue: {
      type: String,
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
    inputValue: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs[this.ref].presentText = val
        })
      },
      deep: true,
      immediate: true
    }
  },
  async created() {
    if (typeof this.value === 'string') {
      this.currentValue = this.value.split(',')
    } else {
      this.currentValue = this.value
    }
    try {
      if (typeof this.dataApi !== 'function') return
      // 从接口获取数据
      const res = await this.dataApi()
      let data = res.data || res
      if (typeof this.format === 'function') {
        // 对数据进行格式化处理
        data = this.format(data)
      }
      /* 处理children为空的情况 */
      this.options = this.transferData(data)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    transferData(origin) {
      origin.forEach((item) => {
        if (item[this.props.children]) {
          if (isEmpty(item[this.props.children])) {
            delete item[this.props.children]
          } else {
            this.transferData(item[this.props.children])
          }
        }
      })
      return origin
    },
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

<style scoped></style>
