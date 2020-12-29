<template>
  <div class="table-pro">
    <y-form
      v-bind="$attrs"
      v-on="$listeners"
      v-model="queryParams"
      :config="config"
      :inline="true"
      label-position="left"
      :label-width="$attrs['label-width']"
    >
      <slot name="form">
        <el-button @click="handleQuery">查询</el-button>
      </slot>
    </y-form>
    <y-table
      :data="tableData"
      :columns="columns"
      pagination
      :total="total"
      :reload="reloadData"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot name="table"></slot>
    </y-table>
  </div>
</template>

<script>
import request from '../../../examples/utils/request'
import { filter, merge, toNumber } from 'lodash'
import { defaultColumn } from './config'
export default {
  name: 'YTablePro',
  data() {
    return {
      tableData: [], // 表格数据
      columns: [], // 表格列数组
      queryParams: {
        pageNo: 1,
        pageSize: 10
      },
      config: {}, // 渲染表单的数据
      total: 0

    }
  },
  props: {
    url: String // 请求数据的url
  },
  components: {
  },
  watch: {
    url(val) {
      this.handleQuery()
    }
  },
  mounted() {
    this.initConfig()
    this.loadData()
  },
  methods: {
    initConfig() {
      // 生成表格列数据
      this.columns = filter(this.$attrs.columns, column => !column.hidden)
      const filterColumns = filter(this.$attrs.columns, column => column.filter)
      filterColumns.forEach(column => {
        const key = column.prop
        // 生成表单的数据
        this.$set(this.config, key, { ...defaultColumn, ...column })

        // 生成查询参数
        this.queryParams[key] = ''
      })

      console.log('config', this.config)
    },
    /**
    * 获取表格数据
    */
    async loadData() {
      // 请求数据
      const res = await request.get(this.url, this.queryParams)
      if (res.success && res.code === '200') {
        this.tableData = res.data.records
        this.total = toNumber(res.data.total)
      }
    },
    /**
    * 【查询】
    */
    handleQuery() {
      // 查询时，重置pageNo为1
      this.queryParams = merge(this.queryParams, { pageNo: 1 })
      this.loadData()
    },
    /**
     * 分页时，重新加载数据
     */
    reloadData({ pageSize, currentPage, type }) {
      if (type === 'size-change') {
        // 分页条数变更，需要重置pageNo为1
        this.queryParams = merge(this.queryParams, { pageSize, pageNo: 1 })
      } else {
        // 页码变更时
        this.queryParams = merge(this.queryParams, { pageNo: currentPage })
      }
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
