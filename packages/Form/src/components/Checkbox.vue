<template>
  <el-checkbox-group
    v-model.trim="currentValue"
    @input="handleInputEvent"
  >
    <el-col
      v-for="(item, index) in options"
      :span="item.cols"
      :key="index"
    >
      <el-checkbox
        :label="item.label"
        v-model="item.value"
        :true-label="item.trueLabel"
        :false-label="item.falseLable"
        :disabled="item.disabled || false"
        :border="item.border || false"
        :size="item.size"
        :name="item.name"
        :checked="item.checked"
        :indeterminate="item.indeterminate"
        v-on="$listeners"
      ></el-checkbox>
    </el-col>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'Checkbox',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [Array, String, Boolean]
    },
    options: {
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
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
