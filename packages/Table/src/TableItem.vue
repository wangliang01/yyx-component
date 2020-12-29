<template>
  <!-- 没有render函数 -->
  <el-table-column
    v-if="!col.render"
    v-bind="col"
  >
    <template v-if="col.children && col.children.length">

      <TableItem v-for="(item, index) in col.children" :key="index" :col="item"></TableItem>
    </template>
  </el-table-column>
  <!-- 有render函数 -->
  <el-table-column
    v-else-if="col.render"
    v-bind="col"
  >
    <template slot-scope="scope">
      <expandDom
        :row="scope.row"
        :col="col"
        :render="col.render"
        :col-index="index"
      >
      </expandDom>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'TableItem',
  props: {
    col: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        col: Object,
        render: Function,
        colIndex: [Number, String]
      },
      render(h, ctx) {
        const randomIndex = Math.random()
          .toString(35)
          .replace('.', '')
        const params = {
          row: { ...ctx.props.row },
          colIndex: ctx.props.colIndex || randomIndex
        }
        if (ctx.props.col) {
          params.col = ctx.props.col
        }
        return ctx.props.render && ctx.props.render(h, params)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
