<template>
  <el-input
    v-model="currentValue"
    :clearable="$attrs.clearable || true"
    v-bind="$attrs"
    @input="handleInputEvent"
    v-on="$listeners"
  ></el-input>
</template>
<script>
export default {
  name: 'YInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    number: {
      type: Boolean,
      default: false
    },
    integer: {
      type: Boolean,
      default: false
    },
    precision: {
      type: [Number, String],
      default: 2
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: Infinity
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
  created() {
    this.dealPrecision()
  },
  methods: {
    dealPrecision() {
      if (isNaN(this.precision)) {
        this.precision = 2
      }
      if (this.precision < 0) {
        this.precision = 2
      }
    },
    handleInputEvent(val) {
      let reg
      if (this.integer) {
        reg = new RegExp(`^(([1-9]{1}\\d{0,9})|(0{1}))$`)
      }
      if (this.number) {
        reg = new RegExp(`^(([1-9]{1}\\d{0,9})|(0{1}))\.?(\\d{1,${this.precision}})?$`)
      }
      this.handleInputValue(val, reg)
    },
    handleInputValue(val, reg) {
      if (reg) {
        // 输入类型为number类型,或者integer类型
        reg = new RegExp(reg)
        if (reg.test(val)) {
          this.$nextTick(() => {
            if (this.min && val < this.min) {
              // 如果传入min,且不为0时,并且val小于min时
              this.$emit('input', this.min)
            } else if (this.max && val > this.max) {
              // 如果传入max,,并且val大于min时
              this.$emit('input', this.max)
            } else {
              // 没有min,或者max
              this.$emit('input', val)
            }
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
    }
    // handleInputChange(val) {
    //   const reg = /^(([1-9]{1}\d{0,9})|(0{1}))(\.\d{1,2})?$/
    //   this.handleInputValue(val, reg)
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
