<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible"></y-table-dialog>
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
  mounted() {
    console.log('mounted')
  },
  methods: {
    handleOpen() {
      this.visible = true
      console.log('visible', this.visible)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
