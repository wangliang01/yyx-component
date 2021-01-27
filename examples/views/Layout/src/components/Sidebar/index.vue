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
export default {
  name: '',
  data() {
    return {
      isCollapse: false,
      routes: [
        {
          path: '/form',
          name: 'Form',
          // component: () => import('../views/form'),
          meta: { title: '表单' }
        },
        {
          path: '/input-number',
          name: 'InputNumber',
          // component: () => import('../views/input-number')
          meta: { title: '数字输入框' }
        },
        {
          path: '/upload',
          name: 'Upload',
          meta: { title: '文件上传' }
          // component: () => import('../views/upload')
        },
        {
          path: '/table',
          name: 'Table',
          meta: { title: '表格' }
          // component: () => import('../views/table')
        },
        {
          path: '/table-pro',
          name: 'TablePro',
          meta: { title: '表格Pro' }
          // component: () => import('../views/table-pro')
        },
        {
          path: '/cascader',
          name: 'Cascader',
          meta: { title: '级联选择器' }
          // component: () => import('../views/table-pro')
        }
      ]
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
