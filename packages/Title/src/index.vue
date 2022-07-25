<template>
  <h3 class="y-title">
    <span class="border"></span>
    <slot></slot>
  </h3>
</template>

<script>
export default {
  name: 'YTitle'

}
</script>

<style lang="scss" scoped>
.y-title {
  display: flex;
  align-items: center;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #2F3030;
  .border {
    display: inline-block;
    width: 4px;
    height: 18px;
    margin-right: 8px;
    background: #5A9CF8;
    border-radius: 23px;
  }
}
</style>
