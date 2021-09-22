<template>
  <div class="input">
    <el-card>
      <InputMd class="md"></InputMd>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Input',
  components: {
    InputMd: () => import('../../../docs/components/input.md')
  }
}
</script>

<style lang="scss" scoped>
</style>
