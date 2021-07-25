<template>
  <y-dialog ref="dialog" :visible.sync="visible" :title="title" :before-close="handleBeforeClose" v-bind="$attrs" @open="handleOpen" v-on="$listeners">
    <!-- 前端分页 -->
    <div class="wrapper">
      <div class="form-wrapper">
        <y-form ref="tableFilter" v-model="queryParams" :config="config" inline>
          <div class="btn-wrapper">
            <el-button @click="handleReset">重 置</el-button>
            <el-button type="primary" @click="handleQuery">查 询</el-button>
            <el-button v-if="canShowExpandBtn" type="text" @click="handleToggle">{{ isExpand ? '收起' : '展开' }}<i :class="[isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i> </el-button>
          </div>
        </y-form>
      </div>
      <div class="table-top y-flex">
        <!-- table左侧 -->
        <slot name="table"></slot>
        <!-- table右侧 -->
        <slot name="table-top-right"></slot>
      </div>
      <y-table ref="table" v-loading="loading" :data="tableData" :columns="columns" :pagination="{'hide-on-single-page': true}" :total="originData.length" :reload="reloadData" @selection-change="handleSelectionChange"></y-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </y-dialog>
</template>

<script>
import { filter, cloneDeep } from 'lodash'
export default {
  name: 'YTableDialog',
  components: {
  },
  props: {
    /* 传递过来的查询参数 */
    params: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '关联押金品'
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
          filterWidth: '200px',
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
    /* 点击取消时，是否直接关闭 */
    isCloseDirectly: {
      type: Boolean,
      default: true
    },
    canCheckAll: {
      type: Boolean,
      default: false
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
        return { id: 'id' }
      }
    }
  },
  data() {
    return {
      data: null,
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
      overflowHeight: 0
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.initConfig()
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initTableFilter)
  },
  methods: {
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
    handleOpen() {
      this.loadOriginData()
      this.$nextTick(() => {
        this.initDialogTitle()
        this.initTableFilter()
        this.resizeTable()
      })
    },
    initDialogTitle() {
      this.$refs.dialog.$el.removeAttribute('title')
    },
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
            this.queryParams[param] = ''
            // 处理params
            cloneParams = cloneDeep(this.params)
            Object.keys(cloneParams).forEach(key => {
              cloneParams[key] = ''
            })
            this.$emit('update:params', cloneParams)
        }
      })
      this.loadOriginData()
    },
    handleQuery() {
      this.queryParams = { ...this.queryParams, current: 1 }
      this.loadOriginData()
    },
    loadData() {
      const { size, current } = this.queryParams
      this.tableData = this.originData.slice((current - 1) * size, current * size).map((item, index) => {
        item.index = index
        return item
      })
      if (this.checkedData.length) {
        // 如果有勾选数据，则默认勾选上
        const prop = this.model.id
        const intersectionData = this.checkedData.map(item => {
          if (item[prop]) {
            return item[prop]
          }
          return ''
        })
        this.$nextTick(() => {
          this.tableData.forEach(item => {
            if (intersectionData.includes(item[prop])) {
            // 如果包含，则勾选
              this.$refs.table.$children[0].toggleRowSelection(item)
            }
          })
        })
      }
    },
    async loadOriginData() {
      const data = cloneDeep(this.queryParams)
      for (const key in data) {
        if (data[key] === undefined || data[key] === null || data[key] === '') {
          delete data[key]
        }
      }
      try {
        this.loading = true
        const res = await this.loadDataApi(data)
        this.originData = res.data.records || res.data
        // 重新组装Table数据
        this.loadData()
        this.total = parseInt(res.data.total || res.data.length)
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
    },
    initTableFilter() {
      // 如果是antd风格
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
    handleBeforeClose() {
      this.closeDialog()
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.$emit('update:visible', false)
    },
    /* 取消 */
    handleCancel() {
      if (this.isCloseDirectly) {
        this.$emit('update:visible', false)
      } else {
        this.$emit('cancel', this.closeDialog)
      }
    },
    /* 确认 */
    handleConfirm() {
      this.$emit('confirm', { data: this.data, done: this.closeDialog })
    },
    handleSelectionChange(data) {
      this.data = data
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
.wrapper{
  padding: 24px;
}
.table-top{
  justify-content: space-between;
}

.form-wrapper {
  position: relative;
  padding-right: 300px;
  overflow: hidden;
}

.btn-wrapper {
  position: absolute;
  right: 0;
}
</style>
