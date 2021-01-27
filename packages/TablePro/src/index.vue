<template>
  <keep-alive>
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
        <slot v-if="hasSearch" name="form">
          <el-button @click="handleQuery">查询</el-button>
        </slot>
      </y-form>
      <el-card style="width: 100%; margin-top: 20px;">
        <y-table
          :data="tableData"
          :columns="columns && columns.filter(column => !column.hidden)"
          v-loading="loading"
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
  </keep-alive>
</template>

<script>
import { filter, merge, cloneDeep } from 'lodash'
export default {
  name: 'YTablePro',
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
    }
  },
  props: {
    loadDataApi: {
      type: Function
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    hasSearch: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.initConfig()
    this.loadData()
  },
  activated() {
    this.initConfig()
    this.loadData()
  },
  methods: {
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
        this.$set(this.config, key, column)

        // 生成查询参数
        this.queryParams[key] = ''
      })

      console.log('this.config', this.config)
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
    reloadData({ size, currentPage, type }) {
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
