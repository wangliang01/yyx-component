<template>
  <div class="sidebar">
    <el-menu
      default-active="$route.path"
      router
      :collapse="isCollapse"
      class="menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @close="handleClose"
    >
      <template v-for="(route, index) in routes">
        <SidebarItem
          :key="index"
          :route="route"
        ></SidebarItem>
      </template>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
const routes = require('../../../../../router')
export default {
  name: '',
  components: {
    SidebarItem
  },
  props: {

  },
  data() {
    return {
      isCollapse: false,
      routes: routes[0].children
    }
  },
  mounted() {

  },
  methods: {
    handleClose() {

    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  .menu {
    position: absolute;
    width: 300px;
    top: 0;
    bottom: 0;
    background-color: #2a3042;
    height: 100%;
    color: #fff;
  }
}
</style>
