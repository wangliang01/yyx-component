<template>
  <div
    ref="tablePro"
    :key="key"
    v-loading="hasLoading && loading"
    class="y-table-pro"
  >
    <!-- Element风格搜索框 -->
    <div
      v-if="uiStyle === 'element'"
      ref="tableFilter"
      :class="
        formConfig.length > 3 ? 'y-form-wrapper' : 'y-form-inline-wrapper'
      "
    >
      <y-form
        :key="key"
        ref="form"
        v-model="queryParams"
        v-bind="$attrs"
        :config="config"
        :inline="true"
        :label-position="$attrs['label-position'] || 'left'"
        :label-width="$attrs['label-width']"
        v-on="$listeners"
        @keyup.enter.native="handleQuery"
      >
        <el-form-item v-if="hasSearch && formConfig.length <= 3">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <slot name="botton"></slot>
        </el-form-item>
      </y-form>
      <div v-if="hasSearch && formConfig.length > 3">
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <slot name="botton"></slot>
      </div>
    </div>
    <!-- antd风格搜索框 -->
    <div
      v-else-if="uiStyle === 'antd'"
      ref="tableFilter"
      class="y-form-inline-wrapper antd-form-wrapper"
    >
      <y-form
        :key="key"
        ref="form"
        v-model="queryParams"
        v-bind="$attrs"
        :config="config"
        :inline="true"
        :label-position="$attrs['label-position'] || 'left'"
        :label-suffix="$attrs['label-suffix'] || $attrs['labelSuffix'] || '：'"
        :label-width="$attrs['label-width']"
        v-on="$listeners"
        @keyup.enter.native="handleQuery"
      >
      </y-form>
      <div v-if="hasReset || hasSearch" class="btn-wrapper">
        <el-button v-if="hasReset" @click="handleReset">重 置</el-button>
        <el-button
          v-if="hasSearch"
          type="primary"
          @click="handleQuery"
        >查 询</el-button>
        <el-button
          v-if="canShowExpandBtn"
          type="text"
          @click="handleToggle"
        >{{ isExpand ? '收起' : '展开'
        }}<i
          :class="[isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
        ></i>
        </el-button>
      </div>
    </div>
    <!-- 分割线 -->
    <div
      v-if="uiStyle === 'antd'"
      class="divider"
      :style="{
        background: uiStyle === 'antd' ? bgColor : '',
        overflow: 'auto',
        height: '16px',
        margin: '0 16px'
      }"
    ></div>
    <!-- 表格 -->
    <div class="table-wrapper">
      <y-table
        :key="key"
        ref="table"
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
        <template>
          <!-- table左侧 -->
          <slot name="table"></slot>
        </template>
        <template slot="table-top-right">
          <!-- table右侧 -->
          <slot name="table-top-right"></slot>
        </template>
      </y-table>
    </div>
    <!-- 批量操作区域 -->
    <div
      v-if="hasBatchAction"
      class="y-table-batch-action-area"
      :style="`left: ${offset}px`"
    >
      <div class="action-left">
        <div v-if="isCheckedAll">已选择全部<span v-if="!filterFn"><span :style="{color: primaryColor}"> {{ total }}</span> 项</span></div>
        <div v-else>已选择当前页<span :style="{color: primaryColor}"> {{ selection.length }}</span> 项</div>
        <el-button v-if="showSelectAll && !isCheckedAll" type="text" @click="handleSelectAll">选择全部 {{ total }} 项</el-button>
      </div>
      <div class="action-right">
        <el-button @click="handleCancelSelection">取消选择</el-button>
        <slot name="action-right" :selection="selection"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import color from '../../../styles/element-variables.scss'
import { filter, cloneDeep, isEmpty, get, trim } from 'lodash'
import { findComponentForward } from '../../utils'
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
      type: [String, Function],
      default: 'id'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => ({ data: 'data.records', total: 'data.total' })
    },
    format: {
      type: Function,
      default: null
    },
    // 是否显示loading
    hasLoading: {
      type: Boolean,
      default: false
    },
    // 默认值
    defaultParams: {
      type: Object,
      default: () => {}
    },
    bgColor: {
      type: String,
      default: '#EFF3F6'
    },
    hasBatchButton: {
      type: Boolean,
      default: true
    },
    showSelectAll: { // 是否显示 选择更多按钮
      type: Boolean,
      default: false
    },
    beforeCheckAll: {
      type: Function,
      default: null
    },
    expand: {
      type: Boolean,
      default: false
    },
    customQuery: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isCheckedAll: false,
      key: Math.random().toString(32).replace('.', ''),
      tableData: [],
      total: 0,
      loading: false,
      queryParams: {
        current: 1,
        size: 10
      },
      primaryColor: color.primaryColor,
      config: {}, // 渲染表单的数据
      canShowExpandBtn: false, // 是否显示展开筛选条件按钮
      isExpand: false,
      overflowHeight: 0,
      selection: [],
      currentColumns: [],
      height: 'auto',
      offsetHeight: 0,
      noResetList: [],
      filterFn: null
    }
  },
  computed: {
    formConfig() {
      const filterColumns = filter(this.columns, column => column.filter)
      return filterColumns
    },
    hasBatchAction() {
      const hasSelection = this.columns.find(column => column.type === 'selection') && this.uiStyle === 'antd'
      if (this.hasBatchButton && hasSelection && !isEmpty(this.selection)) {
        return true
      }
      return false
    },
    // 找出接口中多余的参数
    excessiveParamKeys() {
      const filterColumns = filter(this.columns, column => (column.filter && column.excessive))
      return filterColumns.map(column => column.prop)
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
        const newParams = {
          ...val,
          size: this.queryParams.size
        }
        this.queryParams = { ...this.queryParams, ...newParams }
      },
      deep: true
    },
    loadDataApi: {
      handler(val) {
        this.loadData()
      },
      deep: true
    },
    uiStyle: {
      handler(val) {
        if (!['element', 'antd'].includes(val)) {
          // 如果不是这两套风格，
          // 去掉tableWrapper的marginTop
          this.$nextTick(() => {
            const tablePro = this.$refs.tablePro
            if (tablePro) {
              const tableWrapper = tablePro.querySelector('.table-wrapper')
              tableWrapper.style.marginTop = 0
            }
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // 生成form, table， pagination相关配置
    this.initConfig()

    // 将table上的一些方法挂载到TablePro上
    this.mergeTableMethods()

    // 是否立即请求数据
    if (!this.lazyLoad) {
      this.loadData()
    }

    // 当窗口尺寸，发生变化，改变Table高度，使其实现自适应高度
    this.resizeTable()

    if (this.uiStyle === 'antd') {
      this.$nextTick(() => {
        this.initTableFilter()
      })
    }
  },
  destroyed() {
    this.removeResizeTable()
  },
  methods: {
    mergeTableMethods() {
      const ElTable = findComponentForward(this, 'ElTable')
      // 解决y-table-pro组件没有相关方法的问题
      Object.keys(ElTable).forEach(key => {
        if (['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort'].includes(key)) {
          this[key] = ElTable[key]
        }
      })
      console.log('context', this)
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
        this.isCheckedAll = false
        this.$emit('select-all-page', false)
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
      const elForm = tableFilter.querySelector('.el-form')

      const btnWrapper = tableFilter.querySelector('.btn-wrapper')
      if (this.isExpand) {
        // 展开
        tableFilter.style.overflow = 'auto'
        tableFilter.style.height = 'auto'
        elForm.style.marginRight = 0
        btnWrapper.style.position = 'static'
        btnWrapper.style.float = 'right'
        btnWrapper.style.paddingBottom = 16 + 'px'
      } else {
        // 收起
        tableFilter.style.overflow = 'hidden'
        tableFilter.style.height = `${this.overflowHeight}px`
        elForm.style.marginRight = `274px`
        btnWrapper.style.position = 'absolute'
        btnWrapper.style.float = 'none'
        btnWrapper.style.paddingBottom = 0 + 'px'
      }
    },
    initTableFilter() {
      if (this.uiStyle === 'antd') {
        this.$nextTick(() => {
          // 如果是antd风格
          const tableFilter = this.$refs.tableFilter

          const tablePro = this.$refs.tablePro
          const elForm = tableFilter.querySelector('.el-form')
          /* 记录筛选框的高度，默认一行的高度 */
          const height = elForm.offsetHeight

          const formWrapper = tablePro.querySelector('.antd-form-wrapper')

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
              if (!this.expand) {
                this.isExpand = false
                tableFilter.style.overflow = 'hidden'
                tableFilter.style.height = `${this.overflowHeight}px`
              } else {
                this.isExpand = true
              }
            } else {
              this.canShowExpandBtn = false
              this.isExpand = this.expand || false
            }
          }
        })
      }
    },
    /* 当屏幕宽度发生变化时，重新绘制表格 */
    resizeTable() {
      window.addEventListener('resize', this.initTableFilter)
    },
    removeResizeTable() {
      window.removeEventListener('resize', this.initTableFilter)
    },
    // 通过点击enter键来查询数据
    queryDataByEnterKey() {
      this.$nextTick(() => {
        const form = this.$refs?.form?.$el
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
        if (data[key] === undefined || data[key] === null || data[key] === '' || this.excessiveParamKeys.includes(key)) {
          delete data[key]
        }
      }
      try {
        this.loading = true
        const res = await this.loadDataApi(data)
        let tableData = get(res, this.model.data, [])
        if (typeof this.format === 'function') {
          tableData = this.format(tableData)
          if (!Array.isArray(tableData)) {
            throw Error('format函数必须返回一个数组')
          }
        }
        this.tableData = tableData
        this.total = parseInt(get(res, this.model.total, 0))
        this.$emit('loaded', res)
        this.$nextTick(() => {
          if (this.isCheckedAll) this.handleSelectAll()
        })
      } catch (error) {
        this.loading = false
        this.tableData = []
        this.total = 0
        this.$emit('error', error)
      } finally {
        this.loading = false
        this.$emit('completed')
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
        this.$set(this.config, key, { ...column, clearable: true, hidden: false, width: column.filterWidth || '292px' })

        // 生成查询参数
        if (!column.hidden) {
          // 如果这个字段，不需要显示，则默认不作为查询参数
          this.queryParams[key] = ''
        }
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

        this.$emit('reset')
      })
      // 处理默认参数
      this.queryParams = { ...this.queryParams, ...this.defaultParams }
      // 处理params
      if (!isEmpty(this.params)) {
        cloneParams = cloneDeep(this.params)
        Object.keys(cloneParams).forEach(key => {
          if (!this.noResetList.some(i => key === i)) {
            cloneParams[key] = ''
          }
        })
        // 处理默认参数
        cloneParams = { ...cloneParams, ...this.defaultParams }
        this.$emit('update:params', cloneParams)
      }
      this.total = 0
      this.loadData()
    },
    /**
    * 【查询】
    */
    handleQuery() {
      this.$refs.form.validate().then(() => {
        // 查询时，重置current为1
      // this.queryParams = merge(this.queryParams, { current: 1 })
        this.queryParams = { ...this.queryParams, current: 1 }
        console.log('查询参数', this.queryParams)
        // 对查询参数进行trim处理
        Object.keys(this.queryParams).forEach(key => {
          if (typeof this.queryParams[key] === 'string') {
            this.queryParams[key] = trim(this.queryParams[key])
          }
        })
        this.total = 0
        if (typeof this.customQuery === 'function') {
          // 自定义查询
          return this.customQuery()
        }
        this.loadData()
      }).catch((e) => {
        console.log(e)
      })
    },
    /**
     * 分页时，重新加载数据
     */
    reloadData({ pageSize: size, currentPage: currentPage, type }) {
      if (type === 'size-change') {
        // 分页条数变更，需要重置current为1
        // this.queryParams = merge(this.queryParams, { size, current: 1 })
        this.queryParams = { ...this.queryParams, size, current: 1 }
        if (this.$attrs['page-size']) {
          this.$attrs['page-size'] = size
        }
      } else {
        // 页码变更时
        // this.queryParams = merge(this.queryParams, { current: currentPage })
        this.queryParams = { ...this.queryParams, current: currentPage }
      }
      this.$emit('before-reload', this.queryParams)
      this.loadData()
    },
    // 选择全部
    handleSelectAll() {
      const selectAll = (filterFn) => {
        const YTable = this.$refs.table
        const tableData = filterFn ? filterFn(this.tableData) : this.tableData
        tableData.forEach(row => YTable.toggleRowSelection(row, true))
        this.isCheckedAll = true
        this.$emit('select-all-page', true)
      }
      if (this.beforeCheckAll && typeof this.beforeCheckAll === 'function') {
        this.beforeCheckAll((valid, filterFn) => {
          // filterFn是用来过滤tableData的， 用来对某些disabled的项，不作勾选操作
          this.filterFn = filterFn
          if (valid) {
            selectAll(filterFn)
          }
        })
      } else {
        // 如果beforeCheckAll不是一个Function,走以前的逻辑
        selectAll()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.y-table-pro {
  background: #fff;
}
.y-form-inline-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  &.antd-form-wrapper {
    padding: 0 16px 0;
    background-color: $--color-white;
    ::v-deep .el-form {
      margin-right: 274px;
      .el-form-item {
        margin-right: 74px;
      }
      .el-form-item .el-input {
        // width: 100%;
        width: 292px;
      }
      .el-form-item .el-select {
        // width: 100%;
        width: 292px;
      }
    }
  }
  .btn-wrapper {
    position: absolute;
    right: 16px;
  }
}
.table-wrapper {
  padding: 16px;
  // margin-top: 16px;
  background-color: $--color-white;
  border-radius: 2px;
}
/* ::v-deep .table-top{
  margin-bottom: 15px;
} */
// 分页
::v-deep .el-pagination {
  .btn-prev,
  .btn-next,
  .el-pager .number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 0;
    margin-right: 8px;
  }
  span:not([class*='suffix']) {
    height: 32px;
    line-height: 32px;
  }
  .el-input--mini .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .el-pagination__editor,
  .el-pagination__editor.el-input .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
}

.y-table-batch-action-area {
  z-index: 5;
  display: flex;
  position: fixed !important;
  height: 64px;
  align-items: center;
  bottom: 0;
  right: 0;
  background-color: $--color-white;
  box-sizing: border-box;
  padding: 0 24px;
  box-shadow: 0px -3px 6px -4px rgba(0, 0, 0, 0.12),
    0px -6px 16px 0px rgba(0, 0, 0, 0.08), 0px -9px 28px 8px rgba(0, 0, 0, 0.05);
  .action-left {
    flex: 1;
    height: 100%;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    button {
      margin-left: 16px;
    }
  }
  .action-right {
    flex: 1;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
