<template>
  <div :key="key" class="y-table">
    <div class="table-top">
      <slot name="default" class="table-top-left"></slot>
      <div class="table-top-right">
        <slot name="table-top-right"></slot>
        <div v-if="showUtilBar" class="utils-wrapper">
          <i class="iconfont el-icon-coin" @click="handleSave"> 保存</i>
          <Refresh v-if="utilConfig.includes('refresh')" @refresh="handleRefresh"></Refresh>
          <Density v-if="utilConfig.includes('density')" :size="size" @resize="handleResize"></Density>
          <!-- <Setting v-if="utilConfig.includes('setting')" v-model="currentColumns" :origin-columns="originColumns"></Setting> -->
          <SetColumns v-if="utilConfig.includes('setting')" v-model="currentColumns" :origin-columns="originColumns"></SetColumns>
        </div>
      </div>
    </div>
    <y-virtual-list v-if="virtual" :columns="currentColumns" :data="data" v-bind="$attrs" v-on="$listeners"></y-virtual-list>
    <template v-else>
      <!-- 自适应表格 -->
      <el-table
        v-if="autoAdaptiveHeight"
        :key="key"
        ref="table"
        v-adaptive="{bottomOffset}"
        :border="$attrs.border === undefined ? true : $attrs.border"
        v-bind="tableAttrs"
        :data="data"
        :tooltip-effect="tableAttrs['tooltip-effect'] || 'dark'"
        :style="`width: ${$attrs.width || '100%'}`"
        :size="size"
        :row-key="$attrs.rowKey || tableAttrs['row-key']"
        :max-height="height"
        :class="borderClass"
        v-on="$listeners"
      >
        <template v-for="(col, index) in columnAttrs">
          <TableItem
            v-if="col.showCol"
            :key="index"
            :col="col"
            :columns="columns"
            :data="data"
          ></TableItem>
        </template>

      </el-table>
      <!-- 普通表格 -->
      <el-table
        v-else
        :key="key"
        ref="table"
        v-bind="tableAttrs"
        :data="data"
        :tooltip-effect="tableAttrs['tooltip-effect'] || 'dark'"
        :style="`width: ${$attrs.width || '100%'}`"
        :size="size"
        :row-key="$attrs.rowKey || tableAttrs['row-key']"
        :max-height="height"
        :class="borderClass"
        v-on="$listeners"
      >
        <template v-for="(col, index) in columnAttrs">
          <TableItem
            v-if="col.showCol"
            :key="index"
            :col="col"
            :columns="columns"
            :data="data"
          ></TableItem>
        </template>
      </el-table>
      <el-pagination
        v-if="paginationAttrs.isPagination"
        v-bind="paginationAttrs"
        style="margin-top: 20px;text-align: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
  </div>
</template>
<script>
import { defaultTableAttrs, defaultColumn, defaultPagination } from './config'
import { cloneDeep, uniqWith, isEqual } from 'lodash'
import local from '../../utils/local.js'
import TableItem from './TableItem'
import Refresh from './Refresh.vue'
import Density from './Density.vue'
import SetColumns from './SetColumns.vue'
// import Setting from './Setting.vue'
export default {
  name: 'YTable',
  components: {
    TableItem,
    Refresh,
    Density,
    // Setting,
    SetColumns
  },
  props: {
    /* 是否用虚拟列表显示 */
    virtual: {
      type: Boolean,
      default: false
    },
    /* 表格列定义名称 解决有 在一个页面有 2个表格的情况 缓存列定义*/
    columnName: {
      type: String,
      default: ''
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
    bottomOffset: {
      type: [Number],
      default: 100
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
    utilConfig: {
      type: Array,
      default: () => ['refresh', 'density', 'setting']
    },
    offsetHeight: {
      type: [String, Number],
      default: 0
    },
    // 自适应高度
    autoAdaptiveHeight: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [String, Number],
      default: 'auto'
    }
  },
  data() {
    return {
      key: Math.random().toString(32).replace('.', ''),
      tableAttrs: defaultTableAttrs, // 表格属性，同el-table上的属性
      columnAttrs: [], // 表格项属性， 同el-table-column上的属性
      paginationAttrs: {}, // 分页属性，同el-pagination上的属性
      size: 'mini',
      originColumns: cloneDeep(this.columns)
    }
  },
  computed: {
    staffId() {
      return '122' || this.$store?.state?.userInfo?.staffId
    },
    currentColumns: {
      get() {
        return this.columns
      },
      set(columns) {
        this.$emit('update', columns)
      }
    },
    height() {
      const scrollHeight = document.body.scrollHeight
      if (scrollHeight - this.offsetHeight < this.maxHeight) {
        return scrollHeight - this.offsetHeight
      }
      return this.maxHeight < 400 ? 'auto' : this.maxHeight
    },
    borderClass() {
      return this.data.length === 0 ? 'el-table--border__bottom' : ''
    }

  },
  watch: {
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
        this.initColumns()
      },
      deep: true,
      immediate: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    reLayout() {
      // 对数据进行重新渲染
      this.$nextTick(() => {
        !this.virtual && this.$refs.table.doLayout()
      })
    },
    init() {
      // 解决y-table组件没有相关方法的问题
      this.$children.forEach(component => {
        const el = component.$el
        const classList = [...el.classList]
        if (classList.includes('el-table')) {
          Object.keys(component).forEach(key => {
            if (['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort'].includes(key)) {
              this[key] = component[key]
            }
          })
        }
      })
      // 获取element table上的属性
      const tableAttrs = {}
      Object.keys(defaultTableAttrs).forEach(key => {
        if (this.$attrs[key] !== undefined) {
          tableAttrs[key] = this.$attrs[key]
        }
      })
      this.tableAttrs = Object.assign({}, defaultTableAttrs, tableAttrs)
      this.initColumns(true)
      this.getPagination()
      // this.reLayout()
    },
    // 列定义数据变化时，需要初始化列定义
    initColumns(isInit = false) {
      this.reLayout()
      // 如果是初始化页面，并且存在 用户信息，那么优先取 缓存的列定义数据
      if (isInit && this.staffId) {
        const name = this.$route.name
        const columnKey = `${this.staffId}${name}_${this.columnName}`
        const userColumns = local.get(columnKey)
        if (userColumns) {
          this.columnAttrs = userColumns.map(col => {
            const originCol = this.originColumns.find(im => im.prop === col.prop && (!col.fieldType || !col.filter)) // 此处需要保证 列定义配置不能重复，重复不会报错，但是缓存不准确
            const newCol = Object.assign({}, originCol, col)
            return newCol
          })
          this.$emit('update:columns', this.columnAttrs)
          return
        }
      }
      // 获取element table col上的属性
      const columnAttrs = this.currentColumns.map(column => {
        column.showCol = Object.prototype.hasOwnProperty.call(column, 'showCol') ? column.showCol : true
        if (!column.formatter) {
          this.$set(column, 'formatter', function(row, col) {
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

      const firstColumn = cloneDeep(this.originColumns).find(column => ['expand'].includes(column.type))

      if (firstColumn) {
        this.columnAttrs = uniqWith([Object.assign({}, defaultColumn, firstColumn), ...columnAttrs], (arrVal, othVal) => {
          if (arrVal.type) {
            return arrVal.type === othVal.type
          } else {
            return isEqual(arrVal, othVal)
          }
        })
      } else {
        this.columnAttrs = columnAttrs
      }
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
      Object.keys(paginationAttrs).forEach(key => {
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
    },
    // 保存列定义配置
    handleSave() {
      console.log('save...')
      if (!this.staffId) return
      const data = cloneDeep(this.currentColumns).map(col => {
        const { width, fixed, showCol, prop } = col
        return { width, fixed, showCol, prop }
      })
      const name = this.$route.name
      local.set(`${this.staffId}${name}_${this.columnName}`, data)
      this.$message.success('保存成功')
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  margin: 0 0 0 10px;
  font-size: 16px;
  cursor: pointer;
  color: #8c8c8c;
}
.y-table {
  overflow: auto;
}
.table-top{
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}
.table-top-left{
  flex: 1;
  text-align: left;
}
.table-top-right{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.utils-wrapper {
  display: flex;
  align-items: center;
  margin:0 18px;
}

.el-table--border.el-table--border__bottom{
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
}

</style>
