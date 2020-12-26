<template>
  <el-radio-group
    v-model="currentValue"
    @input="handleInputEvent"
  >
    <el-col
      v-for="item in options"
      :key="item.value"
      :span="item.cols"
    >
      <el-radio
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
        :border="item.border"
        :size="item.size"
        :name="item.name"
        v-on="$listeners"
      ></el-radio>
    </el-col>
  </el-radio-group>
</template>

<script>
export default {
  name: 'Radio',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Number, Boolean]
    },
    options: {
      // 单选框选项数组
      type: Array
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val
      },
      deep: true
    }
  },
  methods: {
    handleInputEvent(value) {
      // 当选择框发生变化时，将值传递出去
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-radio-button__inner,
.el-radio-group {
  width: 100%;
}
</style>
