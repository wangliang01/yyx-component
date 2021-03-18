<template>
  <el-container class="container" direction="horizontal">
    <Sidebar class="aside"></Sidebar>
    <el-main class="main">
      <!-- <el-header class="header">
        <Navbar></Navbar>
      </el-header> -->
      <AppMain class="app"></AppMain>
    </el-main>
  </el-container>
</template>

<script>
import { Sidebar, AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
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

  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;
  .aside {
    width: 300px;
  }
  .main {
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    .app {
      flex: 1;
    }
  }
}
</style>
