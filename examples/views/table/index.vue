<template>
  <el-card>
    <TableMd class="md"></TableMd>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {
    TableMd: () => import('../../../docs/components/table.md')
  }
}
</script>

<style lang="scss" scoped>
::v-deep .warning-row {
  background:oldlace;
}
::v-deep .success-row {
  background: #f0f9eb;
}
</style>
