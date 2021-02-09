<template>
  <el-input-number v-bind="$attrs" :precision="precision" :min="min" :max="max" :controls="controls" :style="{'text-align': textAlign}" v-on="$listeners" @change="handleInputChange"></el-input-number>
</template>

<script>
export default {
  name: 'YInputNumber',
  props: {
    textAlign: {
      type: String,
      default: 'left'
    },
    precision: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10000000000
    },
    controls: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      [...document.querySelectorAll('.el-input-number .el-input__inner')].forEach(item => {
        item.style['text-align'] = this.textAlign
      })
    })
  },
  methods: {
    handleInputChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
