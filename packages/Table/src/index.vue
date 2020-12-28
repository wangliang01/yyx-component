<template>
  <div v-bind="$attrs" class="base-table">
    <slot name="default"></slot>
    <el-table
      :data="data"
      :ref="$attrs.ref"
      v-bind="tableAttrs"
      style="width: 100%"
      v-on="$listeners"
    >
      <template v-for="(col, index) in columnAttrs">
        <!-- 没有render函数 -->
        <el-table-column v-if="!col.render" v-bind="col" :key="index" />
        <!-- 有render函数 -->
        <el-table-column v-else-if="col.render" v-bind="col" :key="index">
          <template slot-scope="scope">
            <expandDom
              :row="scope.row"
              :col="col"
              :render="col.render"
              :col-index="index"
            />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="paginationAttrs.isPagination"
      v-bind="paginationAttrs"
      class="pagination-container"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { defaultTableAttrs, defaultColumn, defaultPagination } from './config'
export default {
  name: 'YTable',
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        col: Object,
        render: Function,
        colIndex: [Number, String]
      },
      render(h, ctx) {
        const randomIndex = Math.random()
          .toString(35)
          .replace('.', '')
        const params = {
          row: { ...ctx.props.row },
          colIndex: ctx.props.colIndex || randomIndex
        }
        if (ctx.props.col) {
          params.col = ctx.props.col
        }
        return ctx.props.render && ctx.props.render(h, params)
      }
    }
  },
  props: {
    /**
     * data:  显示的数据， 等同于el-table中的data属性
     */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * columns: 显示和表格项，数组里的每一项都是一个对象，对象中的属性与el-table-column中的属性一一对应
     */
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * pagination: 分页属性：如果为Boolean为true,则取默认值，如果是对象，则merge默认值， 如果total有值，会覆盖pagination中的total属性
     */
    pagination: {
      type: [Object, Boolean]
    },
    /**
     * 分页总数，
     */
    total: {
      type: Number,
      default: 0
    },
    // 重新加载函数
    reload: Function
  },
  data() {
    return {
      tableAttrs: {}, // 表格属性，同el-table上的属性
      columnAttrs: [], // 表格项属性， 同el-table-column上的属性
      paginationAttrs: {} // 分页属性，同el-pagination上的属性
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
    data: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      // 获取element table上的属性
      const tableAttrs = {}
      Object.keys(defaultTableAttrs).forEach(key => {
        if (this.$attrs[key] !== undefined) {
          tableAttrs[key] = this.$attrs[key]
        }
      })
      this.tableAttrs = Object.assign({}, defaultTableAttrs, tableAttrs)

      // 获取element table col上的属性
      this.columnAttrs = this.columns.map(column => {
        const obj = Object.assign({}, defaultColumn, column)
        return obj
      })

      this.getPagination()
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
        pageSize,
        type: 'size-change',
        currentPage: 1
      })
      if (typeof this.reload === 'function') {
        this.reload(this.paginationAttrs)
      }
    },
    handleCurrentChange(currentPage) {
      this.$emit('page-current-change', currentPage)
      this.paginationAttrs = Object.assign({}, this.paginationAttrs, {
        currentPage,
        type: 'current-change'
      })

      if (typeof this.reload === 'function') {
        this.reload(this.paginationAttrs)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination-container {
  margin-top: 10px;
  text-align: right;
}
</style>
