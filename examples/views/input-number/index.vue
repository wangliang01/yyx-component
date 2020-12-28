<template>
  <div class="input-number">
      <h1>YInputNumber计数器</h1>
      <p>仅允许输入标准的数字值，可定义范围</p>
    <el-card>
      <h2>基础用法</h2>
      <y-input-number v-model="num"></y-input-number>
    </el-card>
    <el-card class="mt-20">
      <h2>禁用状态</h2>
      <y-input-number v-model="num" disabled></y-input-number>
    </el-card>
    <el-card class="mt-20">
      <h2>显示控制按钮</h2>
      <y-input-number v-model="num" controls></y-input-number>
    </el-card>
    <el-card class="mt-20">
      <h2>按钮位置</h2>
      <y-input-number v-model="num" controls controls-position="right"></y-input-number>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      num: 1
    }
  },
  props: {

  },
  components: {
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
