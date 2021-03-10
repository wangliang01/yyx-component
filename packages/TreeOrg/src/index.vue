<template>
  <el-tree class="tree-org-container" v-bind="$attrs" v-on="$listeners">

  </el-tree>
</template>

<script>
/* eslint-disable */
export default {
  name: 'YTreeOrg',
  props: {
    data: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        expand: 'expand',
        children: 'children'
      })
    },
    horizontal: Boolean,
    selectedKey: String,
    collapsable: Boolean,
    renderContent: Function,
    labelStyle: Object,
    labelClassName: [Function, String],
    selectedClassName: [Function, String]
  }
}
</script>

<style lang="scss" scoped>
.tree-org-container {
  padding: 15px;
  background-color: #fff;
}
</style>
