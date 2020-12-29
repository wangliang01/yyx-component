<template>
  <component :is="$attrs.filter" :value="currentValue" @input="handleInputEvent"></component>
</template>

<script>
export default {
  name: 'Component',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: [String, Boolean, Number, Object, Array]
  },
  components: {
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
