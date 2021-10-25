<template>
  <div class="table-scroller">
    <y-table ref="table" :data="visibleData" :min-height="listHeight ? listHeight : '100%'" v-bind="$attrs" :height="listHeight" v-on="$listeners"></y-table>
  </div>
</template>

<script>
export default {
  name: 'YVirtualList',
  components: {
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: this.data,
      // 偏移量
      startOffset: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: null,
      itemHeight: 200
    }
  },
  computed: {
    // 列表总高度
    listHeight() {
      return this.tableData.length * this.itemHeight
    },
    // 偏移量对应的style
    getTransform() {
      return `translate3d(0, ${this.startOffset}px, 0)`
    },
    // 获取真实显示列表数据
    visibleData() {
      const table = this.$refs.table?.$el
      const tableBody = table?.querySelector('.el-table__body-wrapper')
      console.log('tableBody', tableBody)
      if (tableBody) {
        tableBody.style.transform = this.getTransform
      }
      console.log(Math.min(this.end, this.tableData.length))
      return this.tableData.slice(this.start, Math.min(this.end, this.tableData.length))
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
    const table = this.$refs.table.$el
    const tableRow = table.querySelector('.el-table__row')
    this.itemHeight = tableRow.getBoundingClientRect().top
    console.log('itemHeight', tableRow, tableRow.getBoundingClientRect())
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true) //  清除滚条滚动事件
  },
  methods: {
    handleScroll() {
      console.log('visibleData', this.visibleData)
      // 这个是滚动的盒子,如果滚动的位置是table,这里也对应的改下就好了，还有偏移量赋值的地方
      const table = this.$refs.table.$el
      const tableBody = table.querySelector('.el-table__body-wrapper')
      console.log(tableBody)
      // const scrollTop = tableBody.scrollTop
      const scrollTop = Math.abs(tableBody.getBoundingClientRect().top)
      console.log('scrollTop', scrollTop, tableBody.getBoundingClientRect())
      // 此时的开始索引
      this.start = Math.floor(scrollTop / this.itemHeight)
      if (this.start < 0) this.start = 0
      // 此时的结束索引
      this.end = this.start + 50
      // 此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemHeight)
      this.startOffset = this.startOffset > this.itemHeight ? this.startOffset - this.itemHeight : 0
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
