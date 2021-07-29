<template>
  <div class="y-input">
    <el-input
      ref="input"
      v-model="currentValue"
      :clearable="$attrs.clearable || true"
      v-bind="$attrs"
      @input="handleInputEvent"
      @blur="handleBlurEvent"
      v-on="$listeners"
    ></el-input>
    <div v-if="unit" ref="unit" class="unit">{{ unit }}</div>
  </div>
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
    negative: { // 支持负数
      type: Boolean,
      default: false
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: Infinity
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prevValue: this.value
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const input = this.$refs.input.$el
      const inputInner = input.querySelector('.el-input__inner')
      if (!inputInner) return
      if (this.unit) {
        inputInner.classList.add('fix-border-radius')
        const unit = this.$refs.unit
        /* 修复el-input__inner与el-input差2px的问题 */
        unit.style.height = (Math.round(unit.getBoundingClientRect().height) - 2) + 'px'
      } else {
        inputInner.classList.remove('fix-border-radius')
      }
    },
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
          this.prevValue = this.min
        } else if (this.max && isLessThan(this.max, this.currentValue)) {
          // 如果传入max,,并且val大于min时
          this.$emit('input', this.max)
          this.prevValue = this.max
        } else {
          // 没有min,或者max
          this.$emit('input', this.currentValue)
          this.prevValue = this.currentValue
        }
      })
    },
    handleInputEvent(val) {
      let reg
      if (this.integer) {
        reg = new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1})|(0{1}))$`)
        if (this.negative) {
          reg = new RegExp(`^(\-?([1-9]{1}\\d{0,${this.integerDigit - 1})|(0{1})|(\-))$`)
        }
      }
      if (this.number) {
        reg = new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))([.](\\d{1,${this.precision}}))?$`)
        if (this.negative) {
          reg = new RegExp(`^(\-?([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1})|(\-?))([.](\\d{1,${this.precision}}))?$`)
        }
      }
      this.handleInputValue(val, reg)
    },
    handleInputValue(val, reg) {
      if (reg) {
        // 输入类型为number类型,或者integer类型
        reg = new RegExp(reg)
        const matches = val.match(reg)
        if (matches) {
          this.prevValue = matches[0]
        } else {
          this.$nextTick(() => {
            // 10位整数的正则表达式
            const intReg = this.negative ? new RegExp(`^(\-?([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))[.]?$`) : new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))[.]?$`)
            // 10位整数，及小数的正则表达式
            reg = this.negative ? new RegExp(`^(\-?([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))\\.?(\\d{1,${this.precision}})?`) : new RegExp(`^(([1-9]{1}\\d{0,${this.integerDigit - 1}})|(0{1}))\\.?(\\d{1,${this.precision}})?`)
            const matchesFloat = val.match(reg)
            const matchesInt = val.match(intReg)
            const numberReg = this.negative ? /^\-?\d*$/ : /^\d*$/
            if (matchesFloat) {
              // 整数，小数
              if (numberReg.test(matchesFloat[0])) {
                // 整数
                if (matchesInt) {
                  this.$emit('input', matchesInt[0])
                  this.prevValue = matchesInt[0]
                } else {
                  // 不满足integerDigit
                  // this.$emit('input', matchesFloat[0].slice(0, -1))
                  this.$emit('input', this.prevValue)
                }
              } else {
                if (this.number) {
                  // 含有小数点.
                  this.$emit('input', matchesFloat[0])
                  this.prevValue = matchesFloat[0]
                } else {
                  // this.$emit('input', matchesFloat[0].slice(0, -1))
                  this.$emit('input', this.prevValue)
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
.y-input{
  display: inline-flex;
}
.unit{
  min-width: 50px;
  border: 1px solid #DCDFE6;
  background-color: $--border-color-light;
  text-align: center;
  border-radius: 4px;
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-sizing: border-box;
  height: calc(100% - 2px);
  overflow: hidden;
}
</style>
