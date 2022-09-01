<template>
  <div class="step-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YStep',
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      steps: []
    }
  },
  mounted() {
    this.steps = this.$slots.default

    this.steps.forEach((item, index) => {
      item.child.index = index + 1
    })
  }
}
</script>

<style lang="scss" scoped>
.step-wrapper {
  display: flex;
  justify-content: space-around;
  background: #F7F8FA;
  padding: 16px 0;
}

</style>
