<template>
  <el-table
    ref="ElTable"
    v-bind="$attrs"
    :data="virtualData"
    :row-style="rowStyle"
    :height="height"
    :size="size"
    row-key="id"
    v-on="$listeners"
  >
    <TableItem
      v-for="(col, index) in computedColumns"
      :key="col.rowKey || index"
      :col="col"
      :columns="columns"
      :data="data"
    ></TableItem>
  </el-table>
</template>
<script>
import TableItem from './TableItem'
import { clone } from 'lodash'
let oldNow = 0
export default {
  name: 'YVirtualList',
  components: {
    TableItem
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 表格列
    columns: {
      type: Array,
      default: () => []
    },
    // 表格调试
    height: {
      type: [String, Number],
      default: 980
    },
    // 表格尺寸
    size: {
      type: String,
      default: 'size'
    },
    // 表头高度
    headerHeight: {
      type: [String, Number],
      default: 40
    },
    // 表格行高
    rowHeight: {
      type: [Number, String],
      default: 57
    },
    // 原数据改变后的回调
    change: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      originData: Object.isFrozen(this.data) ? clone(this.data) : this.data,
      tableScrollTop: 0,
      tableVirtualHeight: this.data.length * this.rowHeight,
      start: 0
    }
  },
  computed: {
    maxRows() {
      return Math.ceil((this.height - this.headerHeight) / this.rowHeight) + 4
    },
    computedColumns() {
      return this.columns.map(col => {
        col.showOverflowTooltip = true
        return col
      })
    },
    virtualData: {
      get() {
        return this.originData.slice(this.start, this.start + this.maxRows)
      }
    },
    firstRowHeight() { // 第一行高度
      const firstRowHeight = this.tableScrollTop - this.rowHeight - (this.tableScrollTop % this.rowHeight)
      return firstRowHeight < 0 ? 0 : firstRowHeight
    },
    lastRowHeight() { // 最后一行高度
      return this.tableVirtualHeight - this.firstRowHeight - (this.maxRows * this.rowHeight)
    }
  },
  watch: {
    data: {
      handler(val) {
        this.originData = Object.isFrozen(val) ? clone(val) : val
        this.tableVirtualHeight = val.length * this.rowHeight
        this.$once('hook:updated', () => {
          if (typeof this.change === 'function') {
            this.change(this.originData)
          }
          this.$emit('update:changedData', this.originData)
        })
      },
      deep: true
    }
  },
  mounted() {
    const ElTable = this.$refs.ElTable
    this.bodyWrapper = ElTable.bodyWrapper
    this.bodyWrapper.onscroll = this.onVirtualScroll
  },
  activated() {
    // 在 keep-alive缓存组件里，第二次进来时，滚动条默认会到顶部，此时缓存的数据 有问题
    setTimeout(() => {
      this.bodyWrapper.scrollTop = this.tableScrollTop
    })
  },
  beforeDestroy() {
    this.bodyWrapper.onscroll = null
    this.bodyWrapper = null
  },
  methods: {
    // 表格行样式
    rowStyle({ row, rowIndex }) {
      if (rowIndex === 0) {
        return { 'height': this.firstRowHeight + 'px' }
      }
      if (rowIndex === this.maxRows - 1) {
        return { 'height': this.lastRowHeight + 'px' }
      }
      return null
    },
    // 表格滚动时 节流 并且在需要执行 最后一次 滚动事件
    onVirtualScroll() {
      const now = Date.now()
      const disTime = now - oldNow
      if (disTime < 80) {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(this.setSatrt(), 80)
        return
      }
      oldNow = now
      if (this.timer) clearTimeout(this.timer)
      this.setSatrt()
    },
    // 设置开始位置
    setSatrt() {
      const scrollTop = this.bodyWrapper.scrollTop
      this.tableScrollTop = scrollTop
      let start = Math.floor(this.tableScrollTop / this.rowHeight) - 2
      start = start < 0 ? 0 : start
      this.start = start
    }
  }
}
</script>
