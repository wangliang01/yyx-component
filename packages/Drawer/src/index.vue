<template>
  <el-drawer v-bind="$attrs" :direction="$attrs.direction === undefined ? 'rtl' : $attrs.direction" :wrapper-closable="($attrs.wrapperClosable || $attrs['wrapper-closable']) === undefined ? false : ($attrs.wrapperClosable || $attrs['wrapper-closable'])" :append-to-body="$attrs['append-to-body'] === undefined ? true : $attrs['append-to-body']" :destroy-on-close="$attrs['destroy-on-close'] === undefined ? true : $attrs['destroy-on-close']" v-on="$listeners">
    <!-- Drawer标题区的内容 -->
    <slot name="title"></slot>
    <!-- Drawer的内容 -->
    <slot></slot>
    <div v-if="withFooter" class="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'YDrawer',
  components: {
  },
  props: {
    withFooter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    handleCancel() {
      this.$emit('cancel', () => {
        this.$emit('update:visible', false)
      })
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
