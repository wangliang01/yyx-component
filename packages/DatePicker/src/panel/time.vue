<template>
  <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div
      v-show="visible"
      class="el-time-panel el-popper"
      :class="popperClass"
    >
      <div class="el-time-panel__content">
        <el-scrollbar noresize wrap-class="el-picker-panel__content">
          <div
            v-for="item in items"
            :key="item.value"
            class="time-select-item"
            :class="{ selected: value === item.value, disabled: item.disabled, default: item.value === defaultValue }"
            :disabled="item.disabled"
            @click="handleClick(item)"
          >{{ item.value }}</div>
        </el-scrollbar>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import { limitTimeRange, isDate, clearMilliseconds, timeWithinRange } from 'element-ui/src/utils/date-util'
import Locale from 'element-ui/src/mixins/locale'
// import TimeSpinner from '../basic/time-spinner'
// import TimeSelect from './time-select.vue'

const parseTime = function(time) {
  const values = (time || '').split(':')
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10)
    const minutes = parseInt(values[1], 10)

    return {
      hours,
      minutes
    }
  }
  /* istanbul ignore next */
  return null
}

const compareTime = function(time1, time2) {
  const value1 = parseTime(time1)
  const value2 = parseTime(time2)

  const minutes1 = value1.minutes + value1.hours * 60
  const minutes2 = value2.minutes + value2.hours * 60

  if (minutes1 === minutes2) {
    return 0
  }

  return minutes1 > minutes2 ? 1 : -1
}

const formatTime = function(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes)
}

const nextTime = function(time, step) {
  const timeValue = parseTime(time)
  const stepValue = parseTime(step)

  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  }

  next.minutes += stepValue.minutes
  next.hours += stepValue.hours

  next.hours += Math.floor(next.minutes / 60)
  next.minutes = next.minutes % 60

  return formatTime(next)
}

export default {

  components: {
    // TimeSpinner,
    // TimeSelect
  },
  mixins: [Locale],

  props: {
    visible: Boolean,
    timeArrowControl: Boolean,
    pickerOptions: Object
  },

  data() {
    return {
      popperClass: '',
      format: 'HH:mm:ss',
      value: '',
      defaultValue: null,
      date: new Date(),
      oldValue: new Date(),
      selectableRange: [],
      selectionRange: [0, 2],
      disabled: false,
      arrowControl: false,
      needInitAdjust: true
    }
  },

  computed: {
    showSeconds() {
      return (this.format || '').indexOf('ss') !== -1
    },
    useArrow() {
      return this.arrowControl || this.timeArrowControl || false
    },
    amPmMode() {
      if ((this.format || '').indexOf('A') !== -1) return 'A'
      if ((this.format || '').indexOf('a') !== -1) return 'a'
      return ''
    },
    items() {
      const { start, end, step } = this.pickerOptions || {}

      const result = []

      if (start && end && step) {
        let current = start
        while (compareTime(current, end) <= 0) {
          result.push({
            value: current,
            disabled: compareTime(current, this.minTime || '-1:-1') <= 0 ||
                compareTime(current, this.maxTime || '100:100') >= 0
          })
          current = nextTime(current, step)
        }
      }

      return result
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.oldValue = this.value
        // this.$nextTick(() => this.$refs.spinner.emitSelectRange('hours'))
      } else {
        this.needInitAdjust = true
      }
    },

    value(newVal) {
      let date
      if (newVal instanceof Date) {
        date = limitTimeRange(newVal, this.selectableRange, this.format)
      } else if (!newVal) {
        date = this.defaultValue ? new Date(this.defaultValue) : new Date()
      }

      this.date = date
      // if (this.visible && this.needInitAdjust) {
      //   this.$nextTick(_ => this.adjustSpinners())
      //   this.needInitAdjust = false
      // }
    },

    selectableRange(val) {
      this.$refs.spinner.selectableRange = val
    },

    defaultValue(val) {
      if (!isDate(this.value)) {
        this.date = val ? new Date(val) : new Date()
      }
    }
  },

  mounted() {
    this.$nextTick(() => this.handleConfirm(true, true))
    this.$emit('mounted')
  },

  methods: {
    handleCancel() {
      this.$emit('pick', this.oldValue, false)
    },

    handleChange(date) {
      // this.visible avoids edge cases, when use scrolls during panel closing animation
      if (this.visible) {
        this.date = clearMilliseconds(date)
        // if date is out of range, do not emit
        if (this.isValidValue(this.date)) {
          this.$emit('pick', this.date, true)
        }
      }
    },

    setSelectionRange(start, end) {
      this.$emit('select-range', start, end)
      this.selectionRange = [start, end]
    },

    handleClick(item) {
      console.log('click', item)
      if (!item.disabled) {
        this.$emit('pick', item.value)
      }
    },

    handleConfirm(visible = false, first) {
      if (first) return
      const date = clearMilliseconds(limitTimeRange(this.date, this.selectableRange, this.format))
      this.$emit('pick', date, visible, first)
    },

    handleKeydown(event) {
      const keyCode = event.keyCode
      const mapping = { 38: -1, 40: 1, 37: -1, 39: 1 }

      // Left or Right
      if (keyCode === 37 || keyCode === 39) {
        // const step = mapping[keyCode]
        // this.changeSelectionRange(step)
        event.preventDefault()
        return
      }

      // Up or Down
      if (keyCode === 38 || keyCode === 40) {
        const step = mapping[keyCode]
        this.$refs.spinner.scrollDown(step)
        event.preventDefault()
        return
      }
    },

    isValidValue(date) {
      return timeWithinRange(date, this.selectableRange, this.format)
    },

    adjustSpinners() {
      // return this.$refs.spinner.adjustSpinners()
    },

    changeSelectionRange(step) {
      const list = [0, 3].concat(this.showSeconds ? [6] : [])
      const mapping = ['hours', 'minutes'].concat(this.showSeconds ? ['seconds'] : [])
      const index = list.indexOf(this.selectionRange[0])
      const next = (index + step + list.length) % list.length
      this.$refs.spinner.emitSelectRange(mapping[next])
    }
  }
}
</script>

<style lang="scss" scoped>
/*控制整个滚动条*/
::-webkit-scrollbar {
    background-color: #fefefe;
    width: 6px;
    height: 6px;
    background-clip: padding-box;
}

/*滚动条两端方向按钮*/
::-webkit-scrollbar-button {
    // background-color: pink;
}

/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 5px;
}

/*滚动条右下角区域*/
::-webkit-scrollbar-corner {
    // background-color: red;
}

.el-time-panel__content{
  max-height: 350px;
  overflow-y: auto;
  &:before, &:after {
    border: none;
  }
}
</style>
