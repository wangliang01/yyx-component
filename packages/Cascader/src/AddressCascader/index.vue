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
  mounted() {
    this.options = getAddressMap()
  }
}
</script>

<style scoped>

</style>
