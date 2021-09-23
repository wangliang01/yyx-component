<template>
  <div class="input-number">
    <el-card>
      <InputNumberMd></InputNumberMd>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
    InputNumberMd: () => import('../../../docs/components/input-number.md')
  }
}
</script>

<style lang="scss" scoped>

</style>
