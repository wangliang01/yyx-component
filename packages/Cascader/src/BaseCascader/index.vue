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
import { isEmpty, isEqual, uniqWith } from 'lodash'
export default {
  name: 'YCascader',
  props: {
    dataApi: {
      type: Function,
      required: true
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
    },
    value: {
      handler(val) {
        if (val === null || val === undefined || val === '') {
          this.$nextTick(() => {
            this.$refs[this.ref].presentText = ''
          })
        }
      },
      deep: true
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
      let params = []
      if (Array.isArray(value)) {
        let currentValue
        if (this.lastChild) {
          currentValue = value.slice(-1).join(',')
        } else {
          currentValue = value.join(',')
        }
        this.$emit('input', currentValue)
        if (this.props.multiple) {
          // value.forEach(item => {
          //   const res = item.map(checkedValue => {
          //     const checkedObj = this.getCheckedObj(this.options, checkedValue)
          //     if (checkedObj) {
          //       flatParms.push(checkedObj)
          //     }
          //     return checkedObj
          //   })
          //   params.push(res)
          // })
          value.forEach(item => {
            item.map(checkedValue => {
              const checkedObj = this.getCheckedObj(this.options, checkedValue)
              if (checkedObj) {
                params.push(checkedObj)
              }
              return checkedObj
            })
          })
          params = uniqWith(params, isEqual)
        } else {
          params = value.map(checkedValue => {
            return this.getCheckedObj(this.options, checkedValue)
          })
        }
      } else {
        this.$emit('input', value)
        params = value.split('.').map(checkedValue => {
          return this.getCheckedObj(this.options, checkedValue)
        })
      }

      this.$emit('checked', params)
    },
    getCheckedObj(data, value) {
      let res = null
      const prop = this.props.value
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item[prop] === value) {
          res = item
          return res
        }
        if (item[this.props.children]) {
          res = this.getCheckedObj(item[this.props.children], value)
          if (res) {
            return res
          }
        }
      }
      return res
    }
  }
}
</script>

<style scoped></style>
