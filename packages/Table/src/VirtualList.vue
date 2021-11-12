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
export default {
  name: 'YVirtualList',
  components: {
    TableItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 980
    },
    size: {
      type: String,
      default: 'size'
    },
    trHeight: { // 表格行高
      type: Number,
      default: 57
    },
    change: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      originData: clone(this.data),
      tableScrollTop: 0,
      maxRows: Math.ceil((this.height - 40) / this.trHeight) + 5,
      tableVirtualHeight: this.data.length * this.trHeight,
      start: 0
    }
  },
  computed: {
    computedColumns() {
      return this.columns.map(im => {
        im.showOverflowTooltip = true
        return im
      })
    },
    virtualData: {
      get() {
        return this.originData.slice(this.start, this.start + this.maxRows)
      }
    },
    firstTrHeight() { // 第一行高度
      const fh = this.tableScrollTop - this.trHeight - (this.tableScrollTop % this.trHeight)
      return fh < 0 ? 0 : fh
    },
    lastTrHeight() { // 最后一行高度
      return this.tableVirtualHeight - this.firstTrHeight - (this.maxRows * this.trHeight)
    }
  },
  watch: {
    data: {
      handler(val) {
        this.originData = clone(val)
        this.tableVirtualHeight = this.data.length * this.trHeight
        this.$once('hook:updated', () => {
          if (typeof this.change === 'function') {
            this.change(this.originData)
          }
        })
      },
      deep: true
    }
  },

  mounted() {
    const ElTable = this.$refs.ElTable
    this.bodyWrapper = ElTable.bodyWrapper
    this.bodyWrapper.onscroll = this.onVirtualScroll
    // this.bodyWrapper.onscroll = requestAnimationFrame(this.onVirtualScroll)
  },
  methods: {
    callback(val) {
      this.$emit('change', val)
    },
    // 表格行样式
    rowStyle({ row, rowIndex }) {
      if (rowIndex === 0) {
        return { 'height': this.firstTrHeight + 'px' }
      }
      if (rowIndex === this.maxRows - 1) {
        return { 'height': this.lastTrHeight + 'px' }
      }
    },
    // 表格滚动时
    onVirtualScroll() {
      const scrollTop = this.bodyWrapper.scrollTop
      this.tableScrollTop = scrollTop
      let start = Math.floor(this.tableScrollTop / this.trHeight) - 2
      start = start < 0 ? 0 : start
      if (start === this.start) return
      this.start = start
    }
  }
}
</script>
