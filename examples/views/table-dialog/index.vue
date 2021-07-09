<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible" @cancel="handleCancel"></y-table-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleOpen() {
      this.visible = true
    },
    handleCancel(close) {
      close()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
