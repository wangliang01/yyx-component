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
import addressOptions from './address'
import axios from 'axios'
function setDefaultValue(districts) {
  for (let i = 0, len = districts.length; i < len; i++) {
    const item = districts[i]

    if (item.districts.length) {
      if (item.level === 'city' && item.districts[0].level === 'street') {
        item.districts = [
          {
            citycode: '',
            adcode: String(+item.districts[0].adcode + 1),
            name: '县辖区',
            level: 'district'
          }
        ]
      } else {
        setDefaultValue(item.districts)
      }
    } else {
      if (item.level === 'district' && item.districts.length === 0) {
        delete item.districts
      }
    }
  }
}
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
    api: {
      type: Function,
      default: null
    },
    type: String // 类型， province, city (可选)
  },
  data() {
    return {
      props: { value: 'value', label: 'label', children: 'children' },
      currentValue: this.value,
      ref: `category_cascader_${Date.now()}`,
      options: [],
      areaCodeMap: {}
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
            this.props = {
              value: 'value',
              label: 'label',
              children: 'children'
            }
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
      } else {
        this.options = await this.defaultApi()
      }

      this.$emit('loaded', this.options)
    },
    async defaultApi() {
      const result = await axios.get(
        'https://restapi.amap.com/v3/config/district',
        {
          params: {
            key: '500bf914d1c3f9405754bc0a345521c0',
            keywords: '中国',
            subdistrict: 3
          }
        }
      )
      if (result.status === 200) {
        const addressList = result.data.districts[0].districts

        setDefaultValue(addressList)

        return addressList
      }
    },
    transferData(data) {
      const prop = this.props.children
      switch (this.type) {
        case 'province':
          data = this.deleteChildren(data, prop)
          break
        case 'city':
          data =
            Array.isArray(data) &&
            data.map((item) => {
              item[prop] = this.deleteChildren(item[prop], prop)
              return item
            })
          break
      }
      return data
    },
    deleteChildren(data, prop) {
      if (!Array.isArray(data)) return null
      return data.map((item) => {
        if (item[prop]) {
          this.$set(this.areaCodeMap, item.adcode, item[prop])
          item[prop] = null
        }
        return item
      })
    },
    handleValueChange(value) {
      if (Array.isArray(value)) {
        this.$emit('selectedArea', this.areaCodeMap[value[value.length - 1]])
        this.$emit('input', value.join(','))
      } else {
        this.$emit('selectedArea', this.areaCodeMap[value])
        this.$emit('input', value)
      }
      this.$nextTick(() => {
        const inputValue = this.$refs[this.ref].presentText
        const separator = this.$refs[this.ref].separator
        const reg = new RegExp(separator, 'g')
        if (inputValue) {
          this.$emit('checked', inputValue.replace(reg, ','))
        }
      })
    }
  }
}
</script>

<style scoped></style>
