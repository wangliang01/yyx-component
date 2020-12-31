<template>
  <component :is="$attrs.filter || $attrs.render" :value="currentValue" @input="handleInputEvent"></component>
</template>

<script>
export default {
  name: 'Customer',
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
  },
  mounted() {
    console.log('this.$attrs', this.$attrs)
  }
}
</script>

<style lang="scss" scoped>

</style>
