<template>
  <el-table
    ref="ElTable"
    v-bind="$attrs"
    :data="virtualData"
    :row-style="rowStyle"
    :height="height"
    :size="size"
    :changed-data="null"
    row-key="id"
    v-on="$listeners"
  >
    <template v-for="(col, index) in computedColumns">
      <TableItem
        v-if="!col.hideCol"
        :key="col.rowKey || index"
        :col="col"
        :columns="columns"
        :data="data"
      ></TableItem>
    </template>
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
      // tableVirtualHeight: this.data.length * this.rowHeight,
      start: 0,
      // 是否已经更新了列表高度
      updatedHeight: false
    }
  },
  computed: {
    computedColumns() {
      return this.columns.map(col => {
        col.showOverflowTooltip = true
        return col
      })
    },
    virtualData() {
      return this.originData.slice(this.start, this.start + this.maxRows)
    },
    tableVirtualHeight() {
      return this.originData.length * this.rowHeight
    },
    maxRows() { // 最大行数
      return Math.ceil((this.height - this.headerHeight) / this.rowHeight) + 4
    },
    firstMaxHeight() { // 第一行最大高度
      return this.tableVirtualHeight - (this.maxRows * this.rowHeight)
    },
    firstRowHeight() { // 第一行高度
      const firstRowHeight = this.tableScrollTop - this.rowHeight - (this.tableScrollTop % this.rowHeight)
      if (firstRowHeight < 0) return 0
      return firstRowHeight >= this.firstMaxHeight ? this.firstMaxHeight : firstRowHeight
    },
    lastRowHeight() { // 最后一行高度
      return this.firstMaxHeight - this.firstRowHeight
    }
  },
  watch: {
    data: {
      handler(val) {
        this.originData = Object.isFrozen(val) ? clone(val) : val
        // this.tableVirtualHeight = val.length * this.rowHeight
        this.$once('hook:updated', () => {
          if (typeof this.change === 'function') {
            this.change(this.originData)
          }
          this.$emit('update:changedData', this.originData)
          if (this.$attrs['show-summary'] && !this.updatedHeight && this.originData.length) {
            this.updateTableBodyHeight()
          }
        })
        // 数据更新之后，滚动条滚到 0 从新截取数据内容
        this.bodyWrapper.scrollTop = 0
        this.setStart()
      },
      deep: true
    }
  },
  mounted() {
    const ElTable = this.$refs.ElTable
    this.bodyWrapper = ElTable.bodyWrapper
    this.bodyWrapper.onscroll = this.onVirtualScroll
    // 新增一个隐藏 input 解决input 滚动时 失去焦点的问题
    this.input = document.createElement('input')
    this.input.style.position = 'fixed'
    this.input.style.width = '10px'
    this.input.style.left = '-100px'
    document.body.appendChild(this.input)
  },
  activated() { // 在 keep-alive缓存组件里，第二次进来时，滚动条默认会到顶部，此时缓存的数据 有问题
    setTimeout(() => {
      this.bodyWrapper.scrollTop = this.tableScrollTop
    })
  },
  beforeDestroy() { // 销毁时，释放内存
    document.body.removeChild(this.input)
    this.bodyWrapper.onscroll = null
    this.bodyWrapper = null
    this.input = null
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
      if (disTime < 30) {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(this.setStart, 30)
        return
      }
      oldNow = now
      if (this.timer) clearTimeout(this.timer)
      this.setStart()
    },
    // 设置开始位置
    setStart() {
      const scrollTop = this.bodyWrapper.scrollTop
      this.tableScrollTop = scrollTop
      let start = Math.floor(this.tableScrollTop / this.rowHeight) - 2
      const maxStart = this.originData.length - this.maxRows
      if (start >= maxStart) start = maxStart
      start = start < 0 ? 0 : start
      this.start = start
      this.input.focus()
    },
    updateTableBodyHeight() {
      this.$nextTick(() => {
        this.updatedHeight = true
        const el = this.$refs.ElTable.$el
        const offsetHeight = el.offsetHeight
        // 需要减去 table header的高度
        el.style.height = `${offsetHeight - 46}px`
      })
    }
  }
}
</script>
