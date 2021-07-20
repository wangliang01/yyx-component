<template>
  <div class="y-container" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YContainer',
  components: {
  },
  props: {
    borderType: {
      type: String,
      default: 'solid'
    },
    borderColor: {
      type: String,
      default: '#D9D9D9'
    },
    borderWidth: {
      type: [String, Number],
      default: 1
    },
    background: {
      type: String,
      default: '#FFFFFF'
    },
    borderRadius: {
      type: String,
      default: '4'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100px'
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    style() {
      return `border: ${this.borderWidth}px ${this.borderType} ${this.borderColor}; background: ${this.background}; border-radius: ${this.borderRadius}px; width: ${this.width}; height: ${this.height}; box-shadow: ${this.shadow ? '0px 5px 12px 4px rgba(0, 0, 0, 0.09), 0px 3px 6px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px -2px rgba(0, 0, 0, 0.16)' : 'none'};`
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
