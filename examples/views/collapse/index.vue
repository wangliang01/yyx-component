<template>
  <el-card>
    <Collapse></Collapse>
  </el-card>
</template>

<script>
import Collapse from '../../../docs/components/collapse.md'
export default {
  name: '',
  components: {
    Collapse
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
