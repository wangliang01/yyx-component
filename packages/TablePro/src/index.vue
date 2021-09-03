<template>
  <div ref="tablePro" class="table-pro">
    <!-- Element风格搜索框 -->
    <div v-if="uiStyle=== 'element'" ref="tableFilter" :class="formConfig.length > 3 ? 'y-form-wrapper' : 'y-form-inline-wrapper'">
      <y-form
        :key="key"
        ref="form"
        v-model="queryParams"
        v-bind="$attrs"
        :config="config"
        :inline="true"
        label-position="left"
        :label-width="$attrs['label-width']"
        v-on="$listeners"
      >
        <el-form-item v-if="hasSearch && formConfig.length <= 3">
          <el-button
            type="primary"
            @click="handleQuery"
          >查询</el-button>
          <slot name="botton"></slot>
        </el-form-item>
      </y-form>
      <div v-if="hasSearch && formConfig.length > 3">
        <el-button
          type="primary"
          @click="handleQuery"
        >查询</el-button>
        <slot name="botton"></slot>
      </div>
    </div>
    <!-- antd风格搜索框 -->
    <div v-else-if="uiStyle=== 'antd'" ref="tableFilter" class="y-form-inline-wrapper antd-form-wrapper">
      <y-form
        :key="key"
        v-model="queryParams"
        v-bind="$attrs"
        :config="config"
        :inline="true"
        label-position="left"
        :label-suffix="$attrs.labelSuffix || ':'"
        :label-width="$attrs['label-width']"
        v-on="$listeners"
      >
      </y-form>
      <div v-if="hasReset || hasSearch" class="btn-wrapper">
        <el-button v-if="hasReset" @click="handleReset">重 置</el-button>
        <el-button
          v-if="hasSearch"
          type="primary"
          @click="handleQuery"
        >查 询</el-button>
        <el-button v-if="canShowExpandBtn" type="text" @click="handleToggle">{{ isExpand ? '收起' : '展开' }}<i :class="[isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i> </el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div :style="{background: uiStyle === 'antd' ? '#EFF3F6' : '', overflow: 'auto'}">
      <div class="table-wrapper">
        <y-table
          :key="key"
          ref="table"
          v-loading="loading"
          :data="tableData"
          :columns.sync="currentColumns"
          :pagination="$attrs.pagination === undefined ? true : $attrs.pagination"
          :total="total"
          :reload="reloadData"
          v-bind="$attrs"
          :max-height="height"
          :offset-height="offsetHeight"
          :row-key="rowKey"
          @update="handleUpdateColumns"
          @selection-change="handleSelectChange"
          v-on="$listeners"
        >
          <div ref="tableTop">
            <!-- table左侧 -->
            <slot name="table"></slot>
          </div>
          <template slot="table-top-right">
            <!-- table右侧 -->
            <slot name="table-top-right"></slot>
          </template>
        </y-table>
      </div>
    </div>
    <!-- 批量操作区域 -->
    <div v-if="hasBatchAction" class="y-table-batch-action-area" :style="`left: ${offset}px`">
      <div class="action-left">
        <y-text :content="`共选择${selection.length}条数据`"></y-text>
      </div>
      <div class="action-right">
        <el-button @click="handleCancelSelection">取消选择</el-button>
        <slot name="action-right" :selection="selection"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { filter, cloneDeep, isEmpty } from 'lodash'
export default {
  name: 'YTablePro',
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
      default: 'element'
    },
    offset: {
      type: [String, Number],
      default: 200
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      key: Math.random().toString(32).replace('.', ''),
      tableData: [],
      total: 0,
      loading: false,
      queryParams: {
        current: 1,
        size: 10
      },
      config: {}, // 渲染表单的数据
      canShowExpandBtn: false, // 是否显示展开筛选条件按钮
      isExpand: false,
      overflowHeight: 0,
      selection: [],
      currentColumns: [],
      height: 'auto',
      offsetHeight: 0,
      noResetList: []

    }
  },
  computed: {
    formConfig() {
      const filterColumns = filter(this.columns, column => column.filter)
      return filterColumns
    },
    hasBatchAction() {
      const hasSelection = this.columns.find(column => column.type === 'selection') && this.uiStyle === 'antd'
      if (hasSelection && !isEmpty(this.selection)) {
        return true
      }
      return false
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.currentColumns = this.columns && this.columns.filter(column => !column.hidden)
        this.initConfig()
        if (this.$refs.table) {
          this.$nextTick(() => {
            this.key = Math.random().toString(32).replace('.', '')
            this.$refs.table.columnsReload()
          })
        }
      },
      deep: true,
      immediate: true
    },
    params: {
      handler(val) {
        // this.queryParams = merge(this.queryParams, val)
        this.queryParams = { ...this.queryParams, ...val }
      },
      deep: true
    },
    loadDataApi: {
      handler(val) {
        this.loadData()
      },
      deep: true
    }
  },
  mounted() {
    this.initConfig()
    if (!this.lazyLoad) {
      this.loadData()
    }
    this.initTableFilter()
    this.resizeTable()
    this.queryDataByEnterKey()
    if (this.uiStyle === 'antd') {
      // antd风格时，才限制表格高度
      this.getTableProHeight()
    }
  },
  activated() {
    this.initConfig()
    if (!this.lazyLoad) {
      this.loadData()
    }
    this.initTableFilter()
    this.resizeTable()
    this.queryDataByEnterKey()
    if (this.uiStyle === 'antd') {
      // antd风格时，才限制表格高度
      this.getTableProHeight()
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.initTableFilter)
  },
  methods: {
    getTableProHeight() {
      setTimeout(() => {
        const tablePro = this.$refs.tablePro
        const height = tablePro.getBoundingClientRect().height
        const tableFilter = this.$refs.tableFilter

        // 筛选器调试
        const filterHeight = tableFilter.getBoundingClientRect().height

        const tableWrapper = document.querySelector('.table-wrapper')

        // TableWrapper的marginTop
        const marginTop = parseInt(getComputedStyle(tableWrapper).marginTop)

        // TableWrapper的padding
        const padding = parseInt(getComputedStyle(tableWrapper).paddingBottom) * 2

        const tableTop = document.querySelector('.table-top')
        // TableTopHeight
        const tableTopHeight = parseInt(getComputedStyle(tableTop).height) + parseInt(getComputedStyle(tableTop).marginBottom)

        // TableHeader
        const tableHeader = document.querySelector('.el-table__header-wrapper')
        const tableHeaderHeight = parseInt(getComputedStyle(tableHeader).height)

        // pagination高度
        const tablePagination = document.querySelector('.el-pagination')

        const paginationHeight = parseInt(getComputedStyle(tablePagination).height) + parseInt(getComputedStyle(tablePagination).marginTop)

        this.offsetHeight = filterHeight + marginTop + padding + tableTopHeight + tableHeaderHeight + paginationHeight

        this.height = height - this.offsetHeight
      })
    },
    handleUpdateColumns(columns) {
      this.currentColumns = columns
      this.initConfig()
    },
    /* 取消选择 */
    handleCancelSelection() {
      if (this.$refs.table) {
        this.$refs.table.clearSelection()
        this.$emit('clear-selection')
      }
    },
    /* 选择框 */
    handleSelectChange(selection) {
      this.selection = selection
    },
    /* 展开，收起 */
    handleToggle() {
      this.isExpand = !this.isExpand
      const tableFilter = this.$refs.tableFilter
      if (this.isExpand) {
        // 展开
        tableFilter.style.overflow = 'initial'
        tableFilter.style.height = 'auto'
      } else {
        // 收起
        tableFilter.style.overflow = 'hidden'
        tableFilter.style.height = `${this.overflowHeight}px`
      }
      this.getTableProHeight()
    },
    initTableFilter() {
      if (this.uiStyle === 'antd') {
        const tableTop = this.$refs.tableTop
        const nodeName = tableTop.children[0]?.nodeName
        if (nodeName === 'TEMPLATE') {
          // 插槽里没有内容，清除下边距
          tableTop.style.marginBottom = '0'
        } else {
          tableTop.style.marginBottom = '15px'
        }

        // 如果是antd风格
        const tableFilter = this.$refs.tableFilter
        this.$nextTick(() => {
          const elForm = tableFilter.querySelector('.el-form')
          /* 记录筛选框的高度，默认一行的高度 */
          const height = elForm.offsetHeight

          const formWrapper = document.querySelector('.antd-form-wrapper')

          const elFormItem = tableFilter.querySelector('.el-form-item')

          const btnWrapper = formWrapper.querySelector('.btn-wrapper')

          if (elFormItem) {
            let { height: formItemHeight, marginBottom } = getComputedStyle(elFormItem)
            formItemHeight = parseFloat(formItemHeight.replace('px', ''))
            /* 修复Table筛选条件不对齐的问题 */
            marginBottom = parseFloat(marginBottom.replace('px', ''))
            formWrapper.style.paddingTop = marginBottom + 'px'
            btnWrapper.style.bottom = marginBottom + 'px'
            this.overflowHeight = Math.round(formItemHeight + marginBottom)
            if (height > this.overflowHeight) {
              // 换行了
              this.canShowExpandBtn = true
              this.isExpand = false
              tableFilter.style.overflow = 'hidden'
              tableFilter.style.height = `${this.overflowHeight}px`
            } else {
              this.canShowExpandBtn = false
              this.isExpand = false
            }
          }
        })
      }
    },
    /* 当屏幕宽度发生变化时，重新绘制表格 */
    resizeTable() {
      window.addEventListener('resize', this.initTableFilter)
    },
    // 通过点击enter键来查询数据
    queryDataByEnterKey() {
      this.$nextTick(() => {
        const form = this.$refs?.form?.$el
        console.log('form', form)
        form && form.addEventListener('keyup', (e) => {
          const keyCode = e.keyCode || e.which
          if (keyCode === 13) {
            this.handleQuery()
          }
        }, false)
      })
    },
    async loadData() {
      const data = cloneDeep(this.queryParams)
      for (const key in data) {
        if (data[key] === undefined || data[key] === null || data[key] === '') {
          delete data[key]
        }
      }
      try {
        this.loading = true
        const res = await this.loadDataApi(data)
        this.tableData = res.data.records || []
        this.total = parseInt(res.data.total)
        this.$emit('loaded', res)
      } catch {
        this.tableData = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },
    initConfig() {
      // 先清空config
      this.config = {}
      // 生成表格列数据
      const filterColumns = filter(this.columns, column => column.filter)
      this.noResetList = this.columns.filter(i => i.noReset).map(i => i.prop)
      filterColumns.forEach(column => {
        const key = column.prop
        // 生成表单的数据
        this.$set(this.config, key, { ...column, clearable: true, hidden: false, width: column.filterWidth || '280px' })

        // 生成查询参数
        this.queryParams[key] = ''
      })

      // this.queryParams = merge(this.queryParams, this.params)
      this.queryParams = { ...this.queryParams, ...this.params }
    },
    /* 重置 */
    handleReset() {
      const { size } = this.queryParams
      let cloneParams
      Object.keys(this.queryParams).forEach(param => {
        switch (param) {
          case 'current':
            // 将当前页重置为1
            this.queryParams[param] = 1
            break
          case 'size':
            // 查询条数
            this.queryParams[param] = size
            break
          default:
            // 其他字段，全部清空
            if (!this.noResetList.some(key => param === key)) {
              this.queryParams[param] = ''
            }
        }
      })
      // 处理params
      if (!isEmpty(this.params)) {
        cloneParams = cloneDeep(this.params)
        Object.keys(cloneParams).forEach(key => {
          if (!this.noResetList.some(i => key === i)) {
            cloneParams[key] = ''
          }
        })
        this.$emit('update:params', cloneParams)
      }
      this.total = 0
      this.loadData()
    },
    /**
    * 【查询】
    */
    handleQuery() {
      // 查询时，重置current为1
      // this.queryParams = merge(this.queryParams, { current: 1 })
      this.queryParams = { ...this.queryParams, current: 1 }
      this.total = 0
      this.loadData()
    },
    /**
     * 分页时，重新加载数据
     */
    reloadData({ pageSize: size, currentPage, type }) {
      if (type === 'size-change') {
        // 分页条数变更，需要重置current为1
        // this.queryParams = merge(this.queryParams, { size, current: 1 })
        this.queryParams = { ...this.queryParams, size, current: 1 }
      } else {
        // 页码变更时
        // this.queryParams = merge(this.queryParams, { current: currentPage })
        this.queryParams = { ...this.queryParams, current: currentPage }
      }
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-pro{
  height: 100%;
}
.y-form-inline-wrapper{
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  &.antd-form-wrapper{
    padding: 0 16px 0;
    background-color: $--color-white;
  }
  ::v-deep .el-form {
    margin-right: 300px;
    .el-form-item {
      margin-right: 74px;
    }
    .el-form-item .el-input {
      width: 280px;
    }
    .el-form-item .el-select {
      width: 280px;
    }
  }
  .btn-wrapper{
    position: absolute;
    right: 16px;
  }
}
.table-wrapper{
  padding: 16px;
  margin-top: 16px;
  background-color: $--color-white;
  border-radius: 2px;
}
::v-deep .table-top{
  margin-bottom: 15px;
}
// 分页
::v-deep .el-pagination {
  .btn-prev, .btn-next, .el-pager .number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 0;
    margin-right: 8px;
  }
  span:not([class*=suffix]) {
    height: 32px;
    line-height: 32px;
  }
  .el-input--mini .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
  .el-pagination__editor, .el-pagination__editor.el-input .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
}

.y-table-batch-action-area{
  display: flex;
  position: fixed;
  height: 64px;
  align-items: center;
  bottom: 0;
  right: 0;
  background-color: $--color-white;
  box-sizing: border-box;
  padding: 0 24px;
  box-shadow: 0px -3px 6px -4px rgba(0, 0, 0, 0.12), 0px -6px 16px 0px rgba(0, 0, 0, 0.08), 0px -9px 28px 8px rgba(0, 0, 0, 0.05);
  .action-left{
    flex: 1;
    height: 100%;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
  }
  .action-right{
    flex: 1;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
