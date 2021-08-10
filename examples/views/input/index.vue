<template>
  <div class="input">
    <el-card>
      <h2>普通输入框</h2>
      <y-input v-model="value" max-length="2"></y-input>
    </el-card>
    <el-card class="mt-20">
      <h2>number类型输入框</h2>
      <strong>整数类型: integer</strong>
      <y-input v-model="number" integer negative></y-input>
    </el-card>
    <el-card class="mt-20">
      <h2>number类型输入框</h2>
      <strong>浮点数精度: precision</strong>
      <y-input v-model="floatNumber" :min="5" number precision="2"></y-input>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      value: 1,
      number: '',
      floatNumber: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
