<template>
  <el-cascader v-bind="$attrs" v-on="$listeners" clearable v-model="currentValue" :ref="ref" :options="options">
  </el-cascader>
</template>

<script>
import { getAddressMap } from './address'
export default {
  name: 'YAddressCascader',
  data() {
    return {
      currentValue: this.value,
      ref: `category_cascader_${Date.now()}`,
      options: []
    }
  },
  props: {
    // 父组件传递过来的值
    value: {
      type: [String, Array]
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
