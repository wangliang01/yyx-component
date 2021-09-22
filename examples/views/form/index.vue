<template>
  <el-card class="form">
    <FormMd class="md"></FormMd>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {
    FormMd: () => import('../../../docs/components/form.md')
  }
}
</script>

<style lang="scss" scoped></style>
