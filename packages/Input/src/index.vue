<template>
  <el-input
    v-model="currentValue"
    :clearable="$attrs.clearable || true"
    v-bind="$attrs"
    @input="handleInputEvent"
    @blur="handleBlurEvent"
    v-on="$listeners"
  ></el-input>
</template>
<script>
import { isLessThan } from '../../utils/bigNumber'
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
    integerDigit: { // 整数位数
      type: [Number, String],
      default: 10
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
    handleBlurEvent() {
      this.$nextTick(() => {
        if (this.min && isLessThan(this.currentValue, this.min)) {
          // 如果传入min,且不为0时,并且val小于min时
          this.$emit('input', this.min)
        } else if (this.max && isLessThan(this.max, this.currentValue)) {
          // 如果传入max,,并且val大于min时
          this.$emit('input', this.max)
        } else {
          // 没有min,或者max
          this.$emit('input', this.currentValue)
        }
      })
    },
    handleInputEvent(val) {
      let reg
      if (this.integer) {
        reg = new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1})|(0{1}))$`)
      }
      if (this.number) {
        reg = new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))([.](\\d{1,${this.precision}}))?$`)
      }
      this.handleInputValue(val, reg)
    },
    handleInputValue(val, reg) {
      if (reg) {
        // 输入类型为number类型,或者integer类型
        reg = new RegExp(reg)
        const matches = val.match(reg)
        if (matches) {
          // this.$nextTick(() => {
          //   if (this.min && val < this.min) {
          //     // 如果传入min,且不为0时,并且val小于min时
          //     this.$emit('input', this.min)
          //   } else if (this.max && val > this.max) {
          //     // 如果传入max,,并且val大于min时
          //     this.$emit('input', this.max)
          //   } else {
          //     // 没有min,或者max
          //     this.$emit('input', val)
          //   }
          // })
        } else {
          this.$nextTick(() => {
            // 10位整数的正则表达式
            const intReg = new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))[.]?$`)
            // 10位整数，及小数的正则表达式
            reg = new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))\\.?(\\d{1,${this.precision}})?`)
            const matchesFloat = val.match(reg)
            const matchesInt = val.match(intReg)
            const numberReg = /^\d*$/
            if (matchesFloat) {
              // 整数，小数
              if (numberReg.test(matchesFloat[0])) {
                // 整数
                if (matchesInt) {
                  this.$emit('input', matchesInt[0])
                } else {
                  // 不满足integerDigit
                  this.$emit('input', matchesFloat[0].slice(0, -1))
                }
              } else {
                if (this.number) {
                  // 含有小数点.
                  this.$emit('input', matchesFloat[0])
                } else {
                  this.$emit('input', matchesFloat[0].slice(0, -1))
                }
              }
            } else {
              this.$emit('input', '')
            }
          })
        }
      } else {
        // 其他输入类型
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
