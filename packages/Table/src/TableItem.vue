<template>
  <!-- 没有render函数 -->
  <el-table-column
    v-if="!col.render"
    v-bind="col"
    :column-key="col.columnKey || col['column-key']"
    :min-width="col.minWidth || col['min-width']"
    :render-header="col.renderHeader || col['render-header']"
    :sort-method="col.sortMethod || col['sort-method']"
    :sort-by="col.sortBy || col['sort-by']"
    :sort-orders="col.sortOrders || col['sort-orders']"
    :show-overflow-tooltip="col.showOverflowTooltip || col['show-overflow-tooltip'] || false"
    :header-align="col.headerAlign || col['header-align']"
    :class-name="col.className || col['class-name']"
    :label-class-name="col.labelClassName || col['label-class-name']"
    :reserve-selection="col.reserveSelection || col['reserve-selection'] || false"
    :filter-placement="col.filterPlacement || col['filter-placement']"
    :filter-multiple="col.filterMultiple || col['filter-multiple']"
    :filter-method="col.filterMethod || col['filter-method']"
    :filtered-value="col.filteredValue || col['filtered-value']"
  >
    <template v-if="col.children && col.children.length">

      <TableItem
        v-for="(item, index) in col.children"
        :key="index"
        :col="item"
        :column-key="item.columnKey || item['column-key']"
        :min-width="item.minWidth || item['min-width']"
        :render-header="item.renderHeader || item['render-header']"
        :sort-method="item.sortMethod || item['sort-method']"
        :sort-by="item.sortBy || item['sort-by']"
        :sort-orders="item.sortOrders || item['sort-orders']"
        :show-overflow-tooltip="item.showOverflowTooltip || item['show-overflow-tooltip'] || false"
        :header-align="item.headerAlign || item['header-align']"
        :class-name="item.className || item['class-name']"
        :label-class-name="item.labelClassName || item['label-class-name']"
        :reserve-selection="item.reserveSelection || item['reserve-selection'] || false"
        :filter-placement="item.filterPlacement || item['filter-placement']"
        :filter-multiple="item.filterMultiple || item['filter-multiple']"
        :filter-method="item.filterMethod || item['filter-method']"
        :filtered-value="item.filteredValue || item['filtered-value']"
      ></TableItem>
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
    },
    index: {
      type: [String, Number]
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
