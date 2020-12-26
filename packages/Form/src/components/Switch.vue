<template>
  <el-switch
    v-model="currentValue"
    :disabled="$attrs.disabled || false"
    :width="$attrs.width || 40"
    :active-icon-class="$attrs.activeIconClass"
    :inactive-icon-class="$attrs.inactiveIconClass"
    :active-text="$attrs.activeText"
    :inactive-text="$attrs.inactiveText"
    :active-value="$attrs.activeValue"
    :inactive-value="$attrs.inactiveValue"
    :active-color="$attrs.activeColor || '#409EFF'"
    :inactive-color="$attrs.inactiveColor || '#C0CCDA'"
    :name="$attrs.name"
    :validate-event="$attrs.validateEvent || true"
    @input="handleInputEvent"
  >
  </el-switch>
</template>

<script>
export default {
  name: 'YSwitch',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Boolean]
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
      console.log(value)
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
