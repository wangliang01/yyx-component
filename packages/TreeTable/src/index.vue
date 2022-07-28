<template>
  <div class="y-tree-table">
    <!-- 左侧部分 -->
    <div class="y-tree-table__left">
      <y-tree></y-tree>
    </div>
    <!-- 右侧部分 -->
    <div class="y-tree-table__right">
      <y-table-pro :load-data-api="loadDataApi" :columns="columns"></y-table-pro>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YTreeTable',
  components: {
  },
  props: {
    // 请求接口的api
    loadDataApi: {
      type: Function,
      required: true
    },
    // 表格列
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否显示查询按钮
    hasSearch: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    hasReset: {
      type: Boolean,
      default: true
    },
    // 传递过来的查询参数
    params: {
      type: Object,
      default: () => { }
    },
    /* UI风格 */
    uiStyle: {
      type: String,
      default: 'antd'
    },
    offset: {
      type: [String, Number],
      default: 200
    },
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => ({ data: 'data.records', total: 'data.total' })
    },
    format: {
      type: Function,
      default: null
    },
    // 是否显示loading
    hasLoading: {
      type: Boolean,
      default: false
    },
    // 默认值
    defaultParams: {
      type: Object,
      default: () => {}
    },
    bgColor: {
      type: String,
      default: '#EFF3F6'
    },
    hasBatchButton: {
      type: Boolean,
      default: true
    },
    showSelectAll: { // 是否显示 选择更多按钮
      type: Boolean,
      default: false
    },
    beforeCheckAll: {
      type: Function,
      default: null
    },
    expand: {
      type: Boolean,
      default: false
    },
    customQuery: {
      type: Function,
      default: null
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
.y-tree-table{
  display: flex;
  &__left {
    margin-right: 16px;
    padding: 16px;
    width: 324px;
    background-color: #fff;
  }
  &__right {
    flex: 1;
    padding: 16px;
    background-color: #fff;
  }
}
</style>
