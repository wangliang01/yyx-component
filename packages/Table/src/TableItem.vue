<template>
  <!-- 没有render函数 -->
  <el-table-column
    v-if="!col.render"
    v-bind="col"
    :column-key="col.columnKey || col['column-key']"
    :min-width="col.minWidth || col['min-width'] || getMinWidth(columns)"
    :render-header="col.renderHeader || col['render-header']"
    :sort-method="col.sortMethod || col['sort-method']"
    :sort-by="col.sortBy || col['sort-by']"
    :sort-orders="col.sortOrders || col['sort-orders']"
    :show-overflow-tooltip="isEmpty(col.showOverflowTooltip) ? col['show-overflow-tooltip'] : col.showOverflowTooltip"
    :header-align="col.headerAlign || col['header-align']"
    :class-name="col.className || col['class-name']"
    :label-class-name="col.labelClassName || col['label-class-name']"
    :reserve-selection="isEmpty(col.reserveSelection) ? col['reserve-selection'] : col.reserveSelection"
    :filter-placement="col.filterPlacement || col['filter-placement']"
    :filter-multiple="col.filterMultiple || col['filter-multiple']"
    :filter-method="col.filterMethod || col['filter-method']"
    :filtered-value="col.filteredValue || col['filtered-value']"
    :formatter="col.formattedAmount || col['formatted-amount'] ? formattedAmount : col.formatter"
  >
    <template v-if="col.children && col.children.length">
      <TableItem
        v-for="(item, idx) in col.children"
        :key="idx"
        :col="item"
        :data="data"
        :column-key="item.columnKey || item['column-key']"
        :min-width="item.minWidth || item['min-width'] || getMinWidth(col.children)"
        :render-header="item.renderHeader || item['render-header']"
        :sort-method="item.sortMethod || item['sort-method']"
        :sort-by="item.sortBy || item['sort-by']"
        :sort-orders="item.sortOrders || item['sort-orders']"
        :show-overflow-tooltip="isEmpty(col.showOverflowTooltip) ? col['show-overflow-tooltip'] : col.showOverflowTooltip"
        :header-align="item.headerAlign || item['header-align']"
        :class-name="item.className || item['class-name']"
        :label-class-name="item.labelClassName || item['label-class-name']"
        :reserve-selection="isEmpty(col.reserveSelection) ? col['reserve-selection'] : col.reserveSelection"
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
    :column-key="col.columnKey || col['column-key']"
    :min-width="col.minWidth || col['min-width'] || getMinWidth(columns)"
    :render-header="col.renderHeader || col['render-header']"
    :sort-method="col.sortMethod || col['sort-method']"
    :sort-by="col.sortBy || col['sort-by']"
    :sort-orders="col.sortOrders || col['sort-orders']"
    :show-overflow-tooltip="isEmpty(col.showOverflowTooltip) ? col['show-overflow-tooltip'] : col.showOverflowTooltip"
    :header-align="col.headerAlign || col['header-align']"
    :class-name="col.className || col['class-name']"
    :label-class-name="col.labelClassName || col['label-class-name']"
    :reserve-selection="isEmpty(col.reserveSelection) ? col['reserve-selection'] : col.reserveSelection"
    :filter-placement="col.filterPlacement || col['filter-placement']"
    :filter-multiple="col.filterMultiple || col['filter-multiple']"
    :filter-method="col.filterMethod || col['filter-method']"
    :filtered-value="col.filteredValue || col['filtered-value']"
    :formatter="col.formattedAmount || col['formatted-amount'] ? formattedAmount : col.formatter"
  >
    <template slot-scope="scope">
      <expandDom
        :row="scope.row"
        :col="col"
        :render="col.render"
        :data="data"
        :col-index="index"
        :index="scope.$index"
      >
      </expandDom>
    </template>
  </el-table-column>
</template>

<script>
import { formatMoney } from '../../utils'
export default {
  name: 'TableItem',
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        col: Object,
        render: Function,
        data: Array,
        index: Number,
        colIndex: [Number, String]
      },
      render(h, ctx) {
        const randomIndex = Math.random()
          .toString(35)
          .replace('.', '')
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
          colIndex: ctx.props.colIndex || randomIndex
        }
        if (ctx.props.col) {
          params.col = ctx.props.col
        }
        if (ctx.props.data) {
          params.data = ctx.props.data
        }
        return ctx.props.render && ctx.props.render(h, params)
      }
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    col: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    isEmpty(value) {
      return value === undefined || value === null
    },
    getMinWidth(cols) {
      if (Array.isArray(cols)) {
        const len = cols.length
        const minWidth = Math.random(100 / len)
        return minWidth + '%'
      }
    },
    formattedAmount(row, column, cellValue) {
      let precision
      if (typeof this.col.formattedAmount === 'object') {
        precision = this.col.formattedAmount.precision
      }
      return formatMoney(cellValue, '', precision)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
