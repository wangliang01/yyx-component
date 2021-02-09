<template>
  <el-input
    v-model="currentValue"
    :clearable="$attrs.clearable || true"
    v-bind="$attrs"
    @input="handleInputEvent"
    @change="handleInputChange"
    v-on="$listeners"
  ></el-input>
</template>
<script>
export default {
  name: 'YInput',
  props: {
    value: {
      type: [String, Number]
    },
    number: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(val) {
        this.handleInputValue(val)
      }
    }
  },
  methods: {
    handleInputEvent(val) {
      const reg = /^(([1-9]{1}\d{0,9})|(0{1}))\.?(\d{1,2})?$/
      this.handleInputValue(val, reg)
    },
    handleInputValue(val, reg) {
      if (this.number) {
        // 输入类型为number类型
        reg = new RegExp(reg)
        if (reg.test(val)) {
          this.$nextTick(() => {
            this.$emit('input', val)
          })
        } else {
          this.$nextTick(() => {
            this.$emit('input', val.toString().slice(0, -1))
          })
        }
      } else {
        // 其他输入类型
        this.$emit('input', val)
      }
    },
    handleInputChange(val) {
      const reg = /^(([1-9]{1}\d{0,9})|(0{1}))(\.\d{1,2})?$/
      this.handleInputValue(val, reg)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
