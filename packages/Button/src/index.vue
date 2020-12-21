<template>
  <div class="y-button">
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: 'y-button',
  props: {
    type: String
  }
}
</script>

<style lang="scss" scoped>
.y-button {
  display: inline-block;
  padding: 3px 6px;
  background: #000;
  color: #fff;
}
</style>
