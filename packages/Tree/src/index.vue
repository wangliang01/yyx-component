<template>
  <el-tree v-bind="$attrs" class="tree" v-on="$listeners">
    <slot></slot>
  </el-tree>
</template>

<script>
export default {
  name: 'YTree',
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

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node{
  .el-tree-node__content {
    padding-left: 36px;
    margin-bottom: 2px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    background: #FAFAFA;
    border-radius: 4px;
    height: 28px;
    &:hover {
      background-color: #F1F8EF;
    }
  }
  .el-tree-node__expand-icon{
    font-size: 16px;
  }
}
</style>
