<template>
  <div>
    <y-button @click="visible=!visible">弹出框按钮</y-button>
    <YDialog :visible.sync="visible" title="标题"></YDialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
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

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper .el-dialog__title{
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #262626;
  line-height: 24px;
}
</style>
