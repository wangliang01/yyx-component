<template>
  <div>
    <el-radio-group v-model="direction">
      <el-radio label="ltr">从左往右开</el-radio>
      <el-radio label="rtl">从右往左开</el-radio>
      <el-radio label="ttb">从上往下开</el-radio>
      <el-radio label="btt">从下往上开</el-radio>
    </el-radio-group>

    <el-button type="primary" style="margin-left: 16px;" @click="drawer = true">
      点我打开
    </el-button>

    <y-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      @cancel="handleCancel"
    >
      <span>我来啦!</span>
    </y-drawer>

  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    }
  },
  methods: {
    handleCancel(done) {
      done()
    },
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

</style>
