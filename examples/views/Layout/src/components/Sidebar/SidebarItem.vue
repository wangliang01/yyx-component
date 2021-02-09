<template>
  <div class="sidebar-item">
    <!-- 有children -->
    <el-submenu
      v-if="route.children && route.children.length"
      :index="route.path"
    >
      <template slot="title">
        {{ route.meta && route.meta.title }}
      </template>
      <template v-for="(item, idx) in route.children">
        <SidebarItem :key="idx" :route="item"></SidebarItem>
      </template>
    </el-submenu>
    <!-- 没有children -->
    <el-menu-item
      v-else
      :index="route.path"
    >
      {{ route.meta && route.meta.title }}
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  components: {
  },
  props: {
    route: {
      type: Object // 路由对象
    }
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
</style>
