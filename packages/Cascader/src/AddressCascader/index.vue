<template>
  <el-cascader :ref="ref" v-model="currentValue" v-bind="$attrs" clearable :options="options" v-on="$listeners">
  </el-cascader>
</template>

<script>
import { getAddressMap } from './address'
export default {
  name: 'YAddressCascader',
  props: {
    // 父组件传递过来的值
    value: {
      type: [String, Array]
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
  mounted() {
    this.options = getAddressMap()
  }
}
</script>

<style scoped>

</style>
