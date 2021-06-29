<template>
  <!-- 刷新按钮 -->
  <el-tooltip effect="dark" content="刷新" placement="top">
    <i class="el-icon-refresh-right" @click="handleRefresh"></i>
  </el-tooltip>
</template>

<script>
export default {
  name: 'Refresh',
  components: {
  },
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    /* 刷新Table */
    handleRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>

.el-icon-refresh-right{
  margin: 0 10px;
  cursor: pointer;
  font-size: 24px;
}

</style>
