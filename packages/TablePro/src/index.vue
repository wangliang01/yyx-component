<template>
  <div class="table-pro" :style="{background: uiStyle === 'antd' ? '#EFF3F6' : ''}">
    <!-- Element风格搜索框 -->
    <div v-if="uiStyle=== 'element'" ref="tableFilter" :class="formConfig.length > 3 ? 'y-form-wrapper' : 'y-form-inline-wrapper'">
      <y-form
        :key="key"
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
      <div class="btn-wrapper">
        <el-button @click="handleReset">重 置</el-button>
        <el-button
          type="primary"
          @click="handleQuery"
        >查 询</el-button>
        <el-button v-if="canShowExpandBtn" type="text" @click="handleToggle">{{ isExpand ? '收起' : '展开' }}<i :class="[isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i> </el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table-wrapper">
      <y-table
        v-loading="loading"
        :data="tableData"
        :columns="columns && columns.filter(column => !column.hidden)"
        pagination
        :total="total"
        :reload="reloadData"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <!-- table左侧 -->
        <slot name="table"></slot>
        <template slot="table-top-right">
          <!-- table右侧 -->
          <slot name="table-top-right"></slot>
        </template>
      </y-table>
    </div>
  </div>
</template>

<script>
import { filter, cloneDeep } from 'lodash'
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
    // 传递过来的查询参数
    params: {
      type: Object,
      default: () => { }
    },
    /* UI风格 */
    uiStyle: {
      type: String,
      default: 'element'
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
      overflowHeight: 0

    }
  },
  computed: {
    formConfig() {
      const filterColumns = filter(this.columns, column => column.filter)
      return filterColumns
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.initConfig()
      },
      deep: true
    },
    params: {
      handler(val) {
        // this.queryParams = merge(this.queryParams, val)
        this.queryParams = { ...this.queryParams, ...val }
      },
      deep: true
    }
  },
  mounted() {
    this.queryDataByEnterKey()
    this.initConfig()
    this.loadData()
    this.initTableFilter()
    this.resizeTable()
  },
  activated() {
    this.initConfig()
    this.loadData()
  },
  destroyed() {
    window.removeEventListener('resize', this.initTableFilter)
  },
  methods: {
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
    },
    initTableFilter() {
      if (this.uiStyle === 'antd') {
        // 如果是antd风格
        const tableFilter = this.$refs.tableFilter
        this.$nextTick(() => {
          const elForm = tableFilter.querySelector('.el-form')
          /* 记录筛选框的高度，默认一行的高度 */
          const height = elForm.offsetHeight

          const formWrapper = document.querySelector('.antd-form-wrapper')

          const elFormItem = tableFilter.querySelector('.el-form-item')
          let { height: formItemHeight, marginBottom } = getComputedStyle(elFormItem)
          formItemHeight = parseFloat(formItemHeight.replace('px', ''))
          /* 修复Table筛选条件不对齐的问题 */
          marginBottom = parseFloat(marginBottom.replace('px', ''))
          formWrapper.style.paddingTop = marginBottom + 'px'
          this.overflowHeight = formItemHeight + marginBottom
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
        })
      }
    },
    /* 当屏幕宽度发生变化时，重新绘制表格 */
    resizeTable() {
      window.addEventListener('resize', this.initTableFilter)
    },
    // 通过点击enter键来查询数据
    queryDataByEnterKey() {
      window.addEventListener('keyup', (e) => {
        const keyCode = e.keyCode || e.which
        if (keyCode === 13) {
          this.loadData()
        }
      }, false)
    },
    async loadData() {
      const data = cloneDeep(this.queryParams)
      for (const item in data) {
        if (!data[item]) {
          delete data[item]
        }
      }
      try {
        this.loading = true
        const res = await this.loadDataApi(data)
        this.tableData = res.data.records || []
        this.total = parseInt(res.data.total)
      } catch {
        this.tableData = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },
    initConfig() {
      // 生成表格列数据
      const filterColumns = filter(this.columns, column => column.filter)
      filterColumns.forEach(column => {
        const key = column.prop
        // 生成表单的数据
        this.$set(this.config, key, { ...column, clearable: true, hidden: false })

        // 生成查询参数
        this.queryParams[key] = ''
      })

      // this.queryParams = merge(this.queryParams, this.params)
      this.queryParams = { ...this.queryParams, ...this.params }
    },
    /* 重置 */
    handleReset() {
      const { size } = this.queryParams
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
            this.queryParams[param] = ''
        }
      })
      this.loadData()
    },
    /**
    * 【查询】
    */
    handleQuery() {
      // 查询时，重置current为1
      // this.queryParams = merge(this.queryParams, { current: 1 })
      this.queryParams = { ...this.queryParams, current: 1 }
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
.y-form-inline-wrapper{
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  &.antd-form-wrapper{
    padding: 0 16px 0;
    background-color: #fff;
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
    bottom: 22px;
    right: 16px;
  }
}
.table-wrapper{
  padding: 16px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 2px;
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
  .el-pager {
    .number {
      &.active {

      }
    }
  }
  .btn-next {

  }
}

</style>
