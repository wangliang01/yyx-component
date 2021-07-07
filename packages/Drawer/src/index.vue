<template>
  <el-drawer v-bind="$attrs" :direction="$attrs.direction === undefined ? 'rtl' : $attrs.direction" v-on="$listeners">
    <!-- Drawer标题区的内容 -->
    <slot name="title"></slot>
    <!-- Drawer的内容 -->
    <slot></slot>
  </el-drawer>
</template>

<script>
export default {
  name: 'YDrawer',
  components: {
  },
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__wrapper {
  .el-drawer__title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #262626;
    line-height: 24px;
  }
}
</style>
