<template>
  <el-tree v-bind="$attrs" class="tree" v-on="$listeners"></el-tree>
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
  margin-bottom: 2px;
  padding-left: 36px;
  height: 28px;
  display: table;
  width: 100%;
  box-sizing: border-box;
  vertical-align: middle;
  background: #FAFAFA;
  border-radius: 4px;
  &:hover {
    background-color: #F1F8EF;
  }
  .el-tree-node__expand-icon{
    font-size: 16px;
  }
}
</style>
