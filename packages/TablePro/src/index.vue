<template>
  <div class="table-pro">
    <div class="y-form-wrapper">
      <y-form
        v-model="queryParams"
        v-bind="$attrs"
        :config="config"
        :inline="true"
        label-position="left"
        :label-width="$attrs['label-width']"
        v-on="$listeners"
      >
      </y-form>
      <div v-if="hasSearch">
        <el-divider class="y-divider"></el-divider>
        <el-button @click="handleQuery" type="primary">查询</el-button>
      </div>
    </div>
    <slot name="botton"></slot>
    <el-card style="width: 100%; margin-top: 20px;">
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
        <slot name="table"></slot>
      </y-table>
    </el-card>
  </div>
</template>

<script>
import { filter, merge, cloneDeep } from 'lodash'
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
      default: () => {}
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: false,
      queryParams: {
        current: 1,
        size: 10
      },
      config: {} // 渲染表单的数据

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
        this.queryParams = merge(this.queryParams, val)
      },
      deep: true
    }
  },
  mounted() {
    this.queryDataByEnterKey()
    this.initConfig()
    this.loadData()
  },
  activated() {
    this.initConfig()
    this.loadData()
  },
  methods: {
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

      this.queryParams = merge(this.queryParams, this.params)
    },
    /**
    * 【查询】
    */
    handleQuery() {
      // 查询时，重置current为1
      this.queryParams = merge(this.queryParams, { current: 1 })
      this.loadData()
    },
    /**
     * 分页时，重新加载数据
     */
    reloadData({ pageSize: size, currentPage, type }) {
      if (type === 'size-change') {
        // 分页条数变更，需要重置current为1
        this.queryParams = merge(this.queryParams, { size, current: 1 })
      } else {
        // 页码变更时
        this.queryParams = merge(this.queryParams, { current: currentPage })
      }
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
