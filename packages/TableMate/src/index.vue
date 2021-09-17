<template>
  <div class="y-table-mate">
    <div v-if="canShowTableFilter" class="form-wrapper">
      <y-form ref="tableFilter" v-model="queryParams" :config="config" inline>
        <div class="btn-wrapper">
          <el-button v-if="hasReset" @click="handleReset">重 置</el-button>
          <el-button v-if="hasSearch" type="primary" @click="handleQuery">查 询</el-button>
          <el-button v-if="canShowExpandBtn" type="text" @click="handleToggle">{{ isExpand ? '收起' : '展开' }}<i :class="[isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i> </el-button>
        </div>
      </y-form>
    </div>
    <div class="table-wrapper">
      <div class="table-top y-flex">
        <!-- table左侧 -->
        <slot name="table"></slot>
        <!-- table右侧 -->
        <slot name="table-top-right"></slot>
      </div>
      <y-table ref="table" v-loading="loading" :data="tableData" :columns="tableColumns" :pagination="pagination ? pagination : {'hide-on-single-page': true}" :total="originData.length" :reload="reloadData" :row-key="rowKey" @selection-change="handleSelectionChange"></y-table>
    </div>
  </div>
</template>

<script>
import { filter, cloneDeep, intersectionWith, isEqual, xorWith, findIndex, uniqWith, get } from 'lodash'
export default {
  name: 'YTableMate',
  props: {
    /* 传递过来的查询参数 */
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rowKey: {
      type: [Function, String],
      default: 'id'
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
    loadDataApi: {
      type: Function,
      default: () => {
        return {
          code: '200',
          message: 'OK',
          success: true,
          data: {
            records: [
              {
                depositId: '10001',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称1',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10002',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称2',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10003',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              }
            ]
          }
        }
      }
    },
    columns: {
      type: Array,
      default: () => [
        {
          prop: 'deposit',
          label: '押金品',
          // filterWidth: '200px',
          filter: true,
          fieldType: 'Input',
          hidden: true
        },
        {
          type: 'selection',
          labelClassName: 'disable-selection'
        },
        {
          prop: 'depositId',
          label: '押金品ID',
          filter: true,
          fieldType: 'Input'
        },
        {
          prop: 'url',
          label: '图片'
        },
        {
          prop: 'depositName',
          label: '押金品名称',
          filter: true,
          fieldType: 'Input'
        },
        {
          prop: 'depositMoney',
          label: '押金'
        }
      ]
    },
    /* 从父组件传递过来的数据，让组件默认勾选上 */
    checkedData: {
      type: Array,
      default: () => []
    },
    /* 数据模型，默认是通过id操作数据 */
    model: {
      type: Object,
      default() {
        return { id: 'id', data: 'data', total: 'total' }
      }
    },
    pagination: {
      type: [Boolean, Object],
      default: false
    },
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [...this.checkedData],
      originCheckedData: [...this.checkedData],
      config: {},
      loading: false,
      queryParams: {
        size: 10,
        current: 1
      },
      tableData: [],
      originData: [],
      canShowExpandBtn: true, // 是否显示展开筛选条件按钮
      isExpand: true,
      overflowHeight: 0,
      canShowTableFilter: false,
      isFirstInit: false,
      tableColumns: [],
      paginationParams: {
        size: 10,
        current: 1
      }
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.initConfig()
      },
      deep: true,
      immediate: true
    },
    params: {
      handler(val) {
        this.queryParams = { ...this.queryParams, ...this.params }
        console.log('size', val)
      },
      deep: true,
      immediate: true
    },
    pagination: {
      handler(val) {
        this.getPagination(val)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (!this.lazyLoad) {
      this.loadOriginData()
    }
    this.$nextTick(() => {
      this.initTableFilter()
      this.resizeTable()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initTableFilter)
  },
  methods: {
    getPagination(val) {
      if (typeof val === 'object') {
        this.paginationParams = { ...this.paginationParams, size: val['page-size'] }
      }
    },
    /* 当屏幕宽度发生变化时，重新绘制表格 */
    resizeTable() {
      window.addEventListener('resize', this.initTableFilter)
    },
    /* 展开，收起 */
    handleToggle() {
      this.isExpand = !this.isExpand
      const tableFilter = this.$refs.tableFilter.$el
      if (this.isExpand) {
        // 展开
        tableFilter.style.overflow = 'initial'
        tableFilter.style.height = 'auto'
      } else {
        // 收起
        tableFilter.style.overflow = 'hidden'
        tableFilter.style.height = `${this.overflowHeight}px`
      }
    },
    handleReset() {
      this.resetQueryParams()
      this.loadOriginData()
    },
    handleQuery() {
      this.queryParams = { ...this.queryParams, current: 1 }
      this.loadOriginData()
    },
    loadData() {
      const { size, current } = this.paginationParams
      this.tableData = this.originData.slice((current - 1) * size, current * size).map((item, index) => {
        item.index = index
        return item
      })
      this.cloneCheckedData = cloneDeep(this.checkedData)
      if (this.checkedData.length) {
        // 如果有勾选数据，则默认勾选上
        const prop = this.model.id
        const intersectionData = this.checkedData.map(item => {
          if (item[prop]) {
            return item[prop]
          }
          return ''
        })
        // 获取当前页面，应该勾选的数据
        this.currentPageCheckedData = filter(this.tableData, item => intersectionData.includes(item[prop]))
        this.$nextTick(() => {
          this.tableData.forEach(item => {
            if (intersectionData.includes(item[prop])) {
              // 如果包含，则勾选
              console.log(11)
              this.$refs.table.$children[0].toggleRowSelection(item, true)
            } else {
              this.$refs.table.$children[0].toggleRowSelection(item, false)
            }
          })
        })
      }
      this.$emit('loaded', this.tableData)
    },
    async loadOriginData() {
      this.isFirstInit = true
      const data = cloneDeep(this.queryParams)
      for (const key in data) {
        if (data[key] === undefined || data[key] === null || data[key] === '') {
          delete data[key]
        }
      }
      try {
        this.loading = true
        const res = await this.loadDataApi(data)
        // this.originData = res.data.records || res.data
        this.originData = get(res, this.model.data, [])
        // 重新组装Table数据
        this.loadData()
        // this.total = parseInt(res.data.total || res.data.length)
        this.total = parseInt(get(res, this.model.total, this.originData.length))
        this.$nextTick(() => {
          this.isFirstInit = false
        })
      } catch {
        this.originData = []
        this.tableData = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },
    /**
     * 分页时，重新加载数据
     */
    reloadData({ pageSize: size, currentPage, type }) {
      this.isFirstInit = true
      if (type === 'size-change') {
        // 分页条数变更，需要重置current为1
        this.paginationParams = { ...this.paginationParams, size, current: 1 }
      } else {
        // 页码变更时
        this.paginationParams = { ...this.paginationParams, current: currentPage }
      }
      this.loadData()
      this.$nextTick(() => {
        this.isFirstInit = false
      })
    },
    initTableFilter() {
      const tableFilter = this.$refs.tableFilter
      if (!tableFilter) return
      this.$nextTick(() => {
        const elForm = tableFilter.$el

        /* 记录筛选框的高度，默认一行的高度 */
        const height = elForm.offsetHeight

        const elFormItem = elForm.querySelector('.el-form-item')

        const btnWrapper = elForm.querySelector('.btn-wrapper')

        if (elFormItem) {
          let { height: formItemHeight, marginBottom } = getComputedStyle(elFormItem)
          formItemHeight = parseFloat(formItemHeight.replace('px', ''))
          /* 修复Table筛选条件不对齐的问题 */
          marginBottom = parseFloat(marginBottom.replace('px', ''))
          btnWrapper.style.bottom = marginBottom + 'px'
          this.overflowHeight = Math.round(formItemHeight + marginBottom)
          if (height > this.overflowHeight) {
            // 换行了
            this.canShowExpandBtn = true
            this.isExpand = false
            elForm.style.overflow = 'hidden'
            elForm.style.height = `${this.overflowHeight}px`
          } else {
            this.canShowExpandBtn = false
            this.isExpand = false
          }
        }
      })
    },
    initConfig() {
      // 先清空config
      this.config = {}
      // 生成表格列数据
      const filterColumns = filter(this.columns, column => column.filter)
      this.tableColumns = this.columns.filter(column => !column.hidden)
      this.canShowTableFilter = filterColumns.length > 0
      filterColumns.forEach(column => {
        const key = column.prop
        // 生成表单的数据
        this.$set(this.config, key, { ...column, clearable: true, hidden: false, width: column.filterWidth || '280px' })

        // 生成查询参数
        this.queryParams[key] = ''
      })

      this.queryParams = { ...this.queryParams, ...this.params }
    },
    resetQueryParams() {
      let cloneParams
      Object.keys(this.queryParams).forEach(param => {
        switch (param) {
          case 'current':
            // 将当前页重置为1
            this.queryParams[param] = 1
            this.paginationParams[param] = 1
            break
          case 'size':
            // 查询条数
            this.paginationParams[param] = 10
            this.queryParams[param] = this.paginationParams.size
            break
          default:
            // 其他字段，全部清空
            this.queryParams[param] = ''
            // 处理params
            cloneParams = cloneDeep(this.params || {})
            Object.keys(cloneParams).forEach(key => {
              cloneParams[key] = ''
            })
            this.$emit('update:params', cloneParams)
        }
      })
    },
    handleSelectionChange(data) {
      const prop = this.model.id
      const intersectionData = this.checkedData.map(item => {
        if (item[prop]) {
          return item[prop]
        }
        return ''
      })
      this.currentPageCheckedData = filter(this.tableData, item => intersectionData.includes(item[prop]))
      this.cloneCheckedData = cloneDeep(this.checkedData)
      // 先取交集，拿到当前页，没有改变的值
      const intersection = intersectionWith(data, this.currentPageCheckedData, isEqual)
      // 拿到，当前页面，删除的值
      const delItems = cloneDeep(xorWith(this.currentPageCheckedData, intersection, isEqual))
      // 拿到当前页面新增的值
      const addItems = cloneDeep(xorWith(data, intersection, isEqual))
      // 删除未勾选的值
      const len = delItems.length
      for (let i = 0; i < len; i++) {
        const item = delItems[i]
        const index = findIndex(this.cloneCheckedData, checkedItem => checkedItem[prop] === item[prop])
        if (index > -1) {
          this.cloneCheckedData.splice(index, 1)
        }
      }
      // 添加新增的值
      this.cloneCheckedData.push(...addItems)
      this.cloneCheckedData = uniqWith(this.cloneCheckedData, isEqual)

      console.log('勾选的值', this.cloneCheckedData)

      this.data = this.cloneCheckedData
      // 同步更新checkedData
      this.$emit('update:checkedData', this.cloneCheckedData)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0;
  .el-table .disable-selection .cell .el-checkbox__inner{
    display:none;
    position:relative;
  }
  .el-table .disable-selection .cell:before{
    content:"选择";
    position:absolute;
    right: 11px;
  }
}
.table-top{
  justify-content: space-between;
}

.form-wrapper {
  padding: 18px 20px 0;
  position: relative;
  padding-right: 300px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 2px;
}

.table-wrapper{
  padding: 16px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 2px;
}

.btn-wrapper {
  padding: 0 16px;
  position: absolute;
  right: 0;
}
</style>
