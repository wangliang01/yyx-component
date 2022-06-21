<template>
  <el-drawer ref="drawer" v-bind="$attrs" :direction="$attrs.direction === undefined ? 'rtl' : $attrs.direction" :wrapper-closable="($attrs.wrapperClosable || $attrs['wrapper-closable']) === undefined ? false : ($attrs.wrapperClosable || $attrs['wrapper-closable'])" :append-to-body="$attrs['append-to-body'] === undefined ? true : $attrs['append-to-body']" :destroy-on-close="$attrs['destroy-on-close'] === undefined ? true : $attrs['destroy-on-close']" v-on="$listeners">
    <!-- Drawer标题区的内容 -->
    <slot name="title"></slot>
    <!-- Drawer的内容 -->
    <slot></slot>
    <div v-if="withFooter" class="footer">
      <el-button @click="handleCancel">{{ cancelBtnText }}</el-button>
      <el-button type="primary" :loading="loading" @click="handleConfirm">{{ confirmBtnText }}</el-button>
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
    },
    isCloseDirectly: {
      type: Boolean,
      default: true
    },
    confirmBtnText: {
      type: String,
      default: '确 认'
    },
    cancelBtnText: {
      type: String,
      default: '取 消'
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.$refs.drawer.$el.removeAttribute('title')
  },
  methods: {
    handleCancel() {
      if (this.isCloseDirectly) {
        this.$emit('update:visible', false)
      } else {
        this.$emit('cancel', () => {
          this.$emit('update:visible', false)
        })
      }
    },
    handleConfirm() {
      if (!this.showLoading) {
        this.$emit('confirm')
        return
      }
      this.loading = true
      const hideLoading = () => {
        this.loading = false
      }
      this.$emit('confirm', hideLoading)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
