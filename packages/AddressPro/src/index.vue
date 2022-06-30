<template>
  <div class="y-address-pro">
    <el-cascader
      :ref="ref"
      v-model="currentValue"
      placeholder="请选择省市区"
      v-bind="$attrs"
      clearable
      :options="options"
      :props="props"
      filterable
      v-on="$listeners"
      @change="handleValueChange"
    >
    </el-cascader>
    <el-autocomplete
      v-model="addressDetail"
      class="address-detail"
      :fetch-suggestions="handleQuerySearch"
      placeholder="请输入详细地址"
      :trigger-on-focus="false"
      highlight-first-item
      value-key="name"
      clearable
      @select="handleSelectPOI"
    ></el-autocomplete>
    <y-icon icon="iconaddrpdizhibiaozhunhua" width="24" class="icon"></y-icon>
  </div>
</template>

<script>
const appKey = '500bf914d1c3f9405754bc0a345521c0'
import axios from 'axios'
import { AddressAllCode } from './helper'
import { isEmpty } from 'lodash'
function setDefaultValue(districts) {
  for (let i = 0, len = districts.length; i < len; i++) {
    const item = districts[i]

    // 设置父级编码
    setParentCode(item)
    if (item.districts.length) {
      if (item.level === 'city' && item.districts[0].level === 'street') {
        delete item.districts
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

function setParentCode(item) {
  if (item.level === 'province') {
    item.parentCode = '86'
  }
  item.districts && item.districts.forEach(district => {
    district.parentCode = item.adcode
  })
}
export default {
  name: 'YAddressPro',
  props: {
    // 父组件传递过来的值
    value: {
      type: [String, Array],
      default: ''
    },
    api: {
      type: Function,
      default: null
    },
    standardize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      props: { value: 'value', label: 'label', children: 'children' },
      currentValue: this.value,
      ref: `category_cascader_${Date.now()}`,
      options: [],
      areaCodeMap: {},
      addressDetail: null,
      cityCode: null

    }
  },
  computed: {
    icon() {
      return this.standardize ? 'iconaddrpdizhibiaozhunhua' : 'iconaddrpdizhibiaozhunhua1'
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
  created() {
    this.getOptions()
    this.props = { value: 'adcode', label: 'name', children: 'districts' }
  },
  methods: {
    handleSelectPOI(item) {
      console.log(item)
      this.currentValue = AddressAllCode({
        adcode: '86',
        districts: this.options
      }, item.adcode)

      this.$emit('')
    },
    async handleQuerySearch(queryString, cb) {
      // if (!this.cityCode) {
      //   cb([])
      //   return this.$message.warning('请先选择省市区！')
      // }
      const result = await axios.get('https://restapi.amap.com/v3/place/text', {
        params: {
          key: appKey,
          keywords: queryString,
          extensions: 'all',
          city: this.cityCode,
          citylimit: false
        }
      })
      if (result.status === 200) {
        console.log(result.data)
        cb(result.data.pois)
      } else {
        cb([])
      }
    },
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
            key: appKey,
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
        if (isEmpty(value)) {
          // 如果清空省市区,则同时清空详细地址
          this.addressDetail = ''
        }
        const [, cityCode] = value
        this.cityCode = cityCode
      }
    }
  }
}
</script>

<style scoped>
.y-address-pro {
  display: inline-flex;
  align-items: center;
}

.address-detail {
  margin-left: 10px;
  width: 300px;
}

.icon {
  margin-left: 8px;
}
</style>
