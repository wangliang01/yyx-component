<template>
  <el-dialog ref="dialog" v-bind="$attrs" :append-to-body="$attrs['append-to-body'] === undefined ? true : $attrs['append-to-body']" :close-on-click-modal="$attrs['close-on-click-modal'] === undefined ? false : $attrs['close-on-click-modal']" :destroy-on-close="$attrs['destroy-on-close'] === undefined ? true : $attrs['destroy-on-close']" v-on="$listeners">
    <!-- Dialog标题区的内容 -->
    <slot name="title"></slot>
    <!-- Dialog的内容 -->
    <slot></slot>
    <!-- Dialog按钮操作区的内容 -->
    <div slot="footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'YDialog',
  mounted() {
    this.$refs.dialog.$el.removeAttribute('title')
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__headerbtn .el-dialog__close{
  font-size: 24px;
}
</style>
