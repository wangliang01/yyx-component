<template>
  <div>
    <el-card>
      <DrawerMd class="md"></DrawerMd>
    </el-card>
  </div>
</template>
<script>
import DrawerMd from '../../../docs/components/drawer.md'
export default {
  components: {
    DrawerMd
  },
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
