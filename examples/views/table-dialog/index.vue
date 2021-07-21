<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible" @cancel="handleCancel" @confirm="handleConfirm">
      <div slot="table">123123</div>
      <div slot="table-top-right">112312</div>
    </y-table-dialog>
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
    },
    handleConfirm({ data, done }) {
      console.log(data, done)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
