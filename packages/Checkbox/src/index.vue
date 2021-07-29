<template>
  <el-checkbox v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-checkbox>
</template>

<script>
export default {
  name: 'YCheckbox'
}
</script>

<style lang="scss" scoped>

</style>
