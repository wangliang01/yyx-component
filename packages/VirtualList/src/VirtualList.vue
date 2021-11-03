<template>
  <div :key="key" class="y-table">
    <div class="table-top">
      <slot name="default" class="table-top-left"></slot>
      <div class="table-top-right">
        <slot name="table-top-right"></slot>
      </div>
    </div>
    <el-table
      :key="key"
      ref="table"
      border
      v-bind="tableAttrs"
      :data="renderData"
      :tooltip-effect="tableAttrs['tooltip-effect'] || 'dark'"
      :style="`width: ${
        $attrs.width || '100%'
      };height: ${getBodyHeight}px; overflow-y: auto;`"
      :height="getBodyHeight"
      :size="size"
      v-on="$listeners"
    >
      <TableItem
        v-for="(col, index) in columnAttrs"
        :key="col.rowKey || index"
        :col="col"
        :columns="columns"
        :data="data"
      ></TableItem>
    </el-table>
    <el-pagination
      v-if="paginationAttrs.isPagination"
      v-bind="paginationAttrs"
      style="margin-top: 20px; text-align: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
/* eslint-disable */
import { defaultTableAttrs, defaultColumn, defaultPagination } from './config'
import { cloneDeep, uniqWith, isEqual } from 'lodash'
import TableItem from './TableItem'
import { calDomItemsHeight } from './tableHelper/tableUtil'
import {
  VIRTUAL_REMAIN_COUNT,
  DEFAULT_TABLE_RECORD_HEIGHT,
  DEFAULT_TABLE_HEIGHT,
  DEFAULT_TABLE_HEADER_HEIGHT
} from './tableHelper/constant'
export default {
  name: 'YVirtualList',
  components: {
    TableItem
  },
  props: {
    viewportHeight: {
      type: Number,
      default: DEFAULT_TABLE_HEIGHT - DEFAULT_TABLE_HEADER_HEIGHT
    },
    /* data:  显示的数据， 等同于el-table中的data属性 */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    /* columns: 显示和表格项，数组里的每一项都是一个对象，对象中的属性与el-table-column中的属性一一对应 */
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    /* pagination: 分页属性：如果为Boolean为true,则取默认值，如果是对象，则merge默认值， 如果total有值，会覆盖pagination中的total属性 */
    pagination: {
      type: [Object, Boolean],
      default: false
    },
    /*  分页总数 */
    total: {
      type: Number,
      default: 0
    },
    /* 重新加载函数 */
    reload: {
      type: Function,
      default() {
        return () => {}
      }
    },
    /* 是否显示工具栏 */
    showUtilBar: {
      type: Boolean,
      default: false
    },
    /* 工具栏配置项 */
    utilConifg: {
      type: Array,
      default: () => ['refresh', 'density', 'setting']
    },
    itemHeight: {
      type: Number,
      default() {
        return DEFAULT_TABLE_RECORD_HEIGHT
      }
    }
  },
  data() {
    const renderItems =
      Math.ceil(this.viewportHeight / this.itemHeight) +
      2 * VIRTUAL_REMAIN_COUNT

    return {
      key: Math.random().toString(32).replace('.', ''),
      tableAttrs: defaultTableAttrs, // 表格属性，同el-table上的属性
      columnAttrs: [], // 表格项属性， 同el-table-column上的属性
      paginationAttrs: {}, // 分页属性，同el-pagination上的属性
      size: 'mini',
      originColumns: cloneDeep(this.columns),
      virtualData: {},
      renderData: [],
      minItemKeyHeight: -1,
      maxItemKeyHeight: -1,
      remainHeight: VIRTUAL_REMAIN_COUNT * this.itemHeight,
      renderItems: renderItems,
      renderItemsHeight: renderItems * this.itemHeight
    }
  },
  computed: {
    currentColumns: {
      get() {
        return this.columns
      },
      set(columns) {
        this.$emit('update', columns)
      }
    },
    getRecordHeight() {
      return `${this.itemHeight}px`
    },
    getBodyHeight() {
      return `${this.viewportHeight}px`
    },
    getBodyWrapperStyle: function () {
      return {
        height: `${this.data.length * this.itemHeight}px`,
        position: 'relative'
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        this.virtualData = cloneDeep(val)
        this.refreshRenderData()
      },
      immediate: true,
      deep: true
    },
    pagination: {
      handler() {
        this.getPagination()
      },
      deep: true,
      immediate: false
    },
    total() {
      this.getPagination()
    },
    columns: {
      handler(val) {
        this.init()
      },
      deep: true,
      immediate: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getColumnStyle: function (column) {
      return {
        width: column.cWidth,
        height: `${this.itemHeight}px`
      }
    },
    buildRenderData: function (minHeight, maxHeight) {
      const minItemKey = minHeight / this.itemHeight
      const maxItemKey = maxHeight / this.itemHeight
      const startIndex = minItemKey > 0 ? minItemKey : -1
      const endIndex =
        maxItemKey > this.virtualData.length ? this.data.length : maxItemKey

      const renderData = []
      for (let index = startIndex + 1; index < endIndex; index++) {
        const item = this.virtualData[index]
        const recordIndexHeight = `${index * this.itemHeight}`
        item.__vkey = index
        item.translateY = `${recordIndexHeight}px`
        renderData.push(item)

      }

      return renderData
    },
    refreshVirtualItems(newItems, replaceItemsIndex) {
      if (newItems.length === this.renderData.length) {
        this.renderData = newItems
        return
      }
      for (let index = 0; index < newItems.length; index++) {
        if (index < replaceItemsIndex.length) {
          this.$set(this.renderData, replaceItemsIndex[index], newItems[index])
          continue
        }
        this.renderData.push(newItems[index])
      }
    },
    setBodyContainerStyle(record) {
      const tbody = this.$refs.table.bodyWrapper?.querySelector('tbody')
      if (!tbody) return

      tbody.style.transform = `translateY(${record.translateY})`
      tbody.style.height = `${this.itemHeight}px`
    },
    getBodyContainerStyle: function (record) {
      return {
        transform: `translateY(${record.translateY})`,
        height: `${this.itemHeight}px`
      }
    },
    buildNewItems: function (newData) {
      const newItems = []
      for (const newRecord of newData) {
        if (_.findIndex(this.renderData, { __vkey: newRecord.__vkey }) < 0) {
          newItems.push(newRecord)
        }
      }
      return newItems
    },
    buildOutDateItems: function (newData) {
      const replaceItemsIndex = []
      for (let index = 0; index < this.renderData.length; index++) {
        const record = this.renderData[index]
        if (_.findIndex(newData, { __vkey: record.__vkey }) < 0) {
          replaceItemsIndex.push(index)
        }
      }
      return replaceItemsIndex
    },
    updateRenderData(newData) {
      if (this.renderData.length === 0) {
        this.renderData = newData
        return
      }
      const newItems = this.buildNewItems(newData)
      const replaceItemsIndex = this.buildOutDateItems(newData)
      this.refreshVirtualItems(newItems, replaceItemsIndex)
    },
    refreshRenderData() {
      this.$nextTick(() => {
        const bodyWrapper = this.$refs.table.bodyWrapper

        const scrollTop = bodyWrapper ? bodyWrapper.scrollTop : 0
        const [minItemHeight, maxItemHeight] = calDomItemsHeight(
          this.itemHeight,
          this.remainHeight,
          this.viewportHeight,
          this.renderItemsHeight,
          scrollTop
        )

        this.updateRenderData(
          this.buildRenderData(minItemHeight, maxItemHeight)
        )

        this.$nextTick( () => {
          const tableRows = [...bodyWrapper.querySelectorAll('table tbody .el-table__row')]
          for (let i = 0; i< tableRows.length; i++) {
            const tableRow = tableRows[i]
            const {transform, height} = this.getBodyContainerStyle(this.renderData[i])
            console.log("transform", transform, height);
            tableRow.style.transform = transform
            tableRow.style.height = height
          }
        })

      })
    },
    onVirtualScroll(e) {
      window.requestAnimationFrame(this.refreshRenderData)
    },
    reLayout() {
      // 对数据进行重新渲染
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    init() {
      // 解决y-table组件没有相关方法的问题
      this.$children.forEach((component) => {
        const el = component.$el
        const classList = [...el.classList]
        if (classList.includes('el-table')) {
          Object.keys(component).forEach((key) => {
            if (
              [
                'clearSelection',
                'toggleRowSelection',
                'toggleAllSelection',
                'toggleRowExpansion',
                'setCurrentRow',
                'clearSort',
                'clearFilter',
                'doLayout',
                'sort'
              ].includes(key)
            ) {
              this[key] = component[key]
            }
          })
        }
      })
      // 获取element table上的属性
      const tableAttrs = {}
      Object.keys(defaultTableAttrs).forEach((key) => {
        if (this.$attrs[key] !== undefined) {
          tableAttrs[key] = this.$attrs[key]
        }
      })
      this.tableAttrs = Object.assign({}, defaultTableAttrs, tableAttrs)

      // 获取element table col上的属性
      const columnAttrs = this.currentColumns.map((column) => {
        if (!column.formatter) {
          this.$set(column, 'formatter', function (row, col) {
            const val = row[col.property]
            if (val === undefined || val === null || val === '') {
              return '-'
            }
            return val
          })
        }
        const obj = Object.assign({}, defaultColumn, column)
        return obj
      })

      const firstColumn = cloneDeep(this.originColumns).find((column) =>
        ['expand'].includes(column.type)
      )

      if (firstColumn) {
        this.columnAttrs = uniqWith(
          [Object.assign({}, defaultColumn, firstColumn), ...columnAttrs],
          (arrVal, othVal) => {
            if (arrVal.type) {
              return arrVal.type === othVal.type
            } else {
              return isEqual(arrVal, othVal)
            }
          }
        )
      } else {
        this.columnAttrs = columnAttrs
      }

      this.getPagination()

      this.reLayout()

      this.getScrollData()
    },
    getScrollData() {
      this.$nextTick(() => {
        this.$refs.table.bodyWrapper.onscroll = this.onVirtualScroll
      })
    },
    getPagination() {
      // 获取element 分页属性
      const pagination = this.pagination
      let paginationAttrs = {}
      if (pagination) {
        if (typeof pagination === 'object') {
          paginationAttrs = {
            ...defaultPagination,
            ...pagination,
            isPagination: true
          }
        } else {
          paginationAttrs = {
            ...defaultPagination,
            isPagination: true
          }
        }
      }
      Object.keys(paginationAttrs).forEach((key) => {
        if (this.$attrs[key] !== undefined && key !== 'pagination') {
          paginationAttrs[key] = this.$attrs[key]
        }
      })

      if (this.total) {
        paginationAttrs.total = this.total
      }
      this.paginationAttrs = paginationAttrs
    },
    handleSizeChange(pageSize) {
      this.$emit('size-change', pageSize)
      this.paginationAttrs = Object.assign({}, this.paginationAttrs, {
        type: 'size-change',
        pageSize: pageSize, // 兼容老系统
        currentPage: 1 // 兼容老系统
      })
      if (typeof this.reload === 'function') {
        this.reload(this.paginationAttrs)
      }
    },
    handleCurrentChange(currentPage) {
      this.$emit('page-current-change', currentPage)
      this.paginationAttrs = Object.assign({}, this.paginationAttrs, {
        currentPage: currentPage,
        type: 'current-change'
      })

      if (typeof this.reload === 'function') {
        this.reload(this.paginationAttrs)
      }
    },
    handleResize({ size, close }) {
      this.size = size
      close && close()
      this.reLayout()
    },
    handleRefresh() {
      this.paginationAttrs = Object.assign({}, this.paginationAttrs, {
        currentPage: 1
      })
      if (typeof this.reload === 'function') {
        this.reload(this.paginationAttrs)
      }
    },
    columnsReload() {
      this.originColumns = cloneDeep(this.columns)
    }
  }
}
</script>
<style lang="scss" scoped>
.y-table {
  overflow: auto;
}
.table-top {
  display: flex;
  justify-content: space-around;
}
.table-top-left {
  flex: 1;
  text-align: left;
}
.table-top-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.utils-wrapper {
  margin-left: 18px;
}

::v-deep .el-table__body-wrapper {
  display: inherit;
  overflow-y: auto;
}

::v-deep .el-table__body-wrapper table tbody {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}

::v-deep .el-table__row {
  position: absolute;
  top: 0;
}
</style>
