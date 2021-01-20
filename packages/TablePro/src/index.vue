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
      :columns="$attrs && $attrs.columns && $attrs.columns.filter(column => !column.hidden)"
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
import { filter, merge } from 'lodash'
import { defaultColumn } from './config'
export default {
  name: 'YTablePro',
  data() {
    return {
      columns: [], // 表格列数组
      queryParams: {
        pageNo: 1,
        pageSize: 10
      },
      config: {} // 渲染表单的数据

    }
  },
  props: {
    tableData: Array, // 表格数据
    total: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.initConfig()
    this.$emit('loadData')
  },
  methods: {
    initConfig() {
      // 生成表格列数据
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
    * 【查询】
    */
    handleQuery() {
      // 查询时，重置pageNo为1
      this.queryParams = merge(this.queryParams, { pageNo: 1 })
      this.$emit('loadData', this.queryParams)
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
      this.$emit('loadData', this.queryParams)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
