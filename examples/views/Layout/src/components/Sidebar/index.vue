<template>
  <div class="sidebar">
    <el-menu
      default-active="$route.path"
      router
      :collapse="isCollapse"
      class="menu"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
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
  data() {
    return {
      isCollapse: false,
      routes: routes[0].children
    }
  },
  props: {

  },
  components: {
    SidebarItem
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
  .menu {
    position: fixed;
    width: 300px;
    top: 0;
    background-color: #2a3042;
    height: 100%;
    color: #fff;
  }
}
</style>
