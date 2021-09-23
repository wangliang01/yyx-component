<template>
  <el-card>
    <TableMd class="md"></TableMd>
  </el-card>
</template>

<script>
import TableMd from '../../../docs/components/table.md'
export default {
  name: '',
  components: {
    TableMd
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
