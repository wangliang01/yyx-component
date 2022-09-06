<template>
  <component
    :is="$attrs.component || $attrs.render"
    :value="currentValue"
    v-bind="$attrs"
    @input="handleInputEvent"
  ></component>
</template>

<script>
export default {
  name: 'Customer',
  components: {
  },
  props: {
    value: { type: [String, Boolean, Number, Object, Array], default: '' }
  },
  data() {
    return {
      currentValue: this.value
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
    handleInputEvent(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
