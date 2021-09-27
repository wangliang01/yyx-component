<template>
  <div>
    <el-card>
      <DialogMd class="md"></DialogMd>
    </el-card>
  </div>
</template>

<script>
import DialogMd from '../../../docs/components/dialog.md'
export default {
  name: 'Dialog',
  components: {
    DialogMd
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
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
