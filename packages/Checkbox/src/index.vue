<template>
  <el-checkbox v-model="currentValue" v-bind="$attrs" v-on="$listeners"></el-checkbox>
</template>

<script>
export default {
  name: 'YCheckbox',
  components: {
  },
  props: {
    value: {
      type: [String, Boolean, Number, Object],
      default: ''
    }
  },
  data() {
    return {
      currentValue: ''
    }
  },
  watch: {
    value: {
      handler(val) {
        if (typeof val === 'object') {
          // 如果传进来的是对象
          this.currentValue = JSON.stringify(val)
        } else {
          this.currentValue = val
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
