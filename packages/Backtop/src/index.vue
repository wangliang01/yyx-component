<template>
  <div class="page-content-scroll">
    <el-backtop target=".page-content-scroll" v-bind="$attrs" v-on="$listeners"></el-backtop>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YBackTop'
}
</script>

<style lang="scss" scoped>
.page-content-scroll {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
