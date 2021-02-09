<template>
  <component :is="$attrs.filter || $attrs.render" :value="currentValue" @input="handleInputEvent"></component>
</template>

<script>
export default {
  name: 'Customer',
  components: {
  },
  props: {
    value: [String, Boolean, Number, Object, Array]
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
