<template>
  <el-tag v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-tag>
</template>

<script>
export default {
  name: 'YTag'
}
</script>

<style lang="scss" scoped>
.el-tag {
  padding: 5px 16px;
  background-color: #fff;
  border-color: #fff;
  line-height: 1.5;
  font-size: 14px;
  // color: #8C8C8C;
  ::v-deep .el-icon-close{
      display: inline-block;
      padding: 1px;
      margin-left: 2px;
      font-size: 16px;
      // color: #8C8C8C;
      &:hover {
        color: #fff;
      }
  }
}
</style>
