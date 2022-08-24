<template>
  <el-card class="form">
    <!-- <y-virtual-list :data="tableData" :columns="columns">
    </y-virtual-list> -->
    <y-table
      :data="tableData"
      :columns="columns"
      virtual
      :show-summary="true"
      :summary-method="getSummaries"
      :changed-data.sync="submitData">
    </y-table>
    <el-button @click="handleSubmit">提交</el-button>
  </el-card>
</template>

<script>
// import VirtualList from '../../../docs/components/virtual-list.md'
const tableData = []
for (let i = 0; i < 20; i++) {
  const item = {
    id: i + 1,
    name: `小张${i + 1}`,
    age: i * Math.random() * 10,
    salary: i * Math.random() * 1000
  }
  tableData.push(item)
}
export default {
  name: '',
  components: {
    // VirtualList
  },
  data() {
    // this.tableData = tableData
    return {
      tableData: [],
      submitData: [],
      columns: [
        {
          prop: 'id',
          label: '编号'

        },
        {
          prop: 'name',
          label: '姓名',
          isEdit: true,
          render: (h, { row }) => {
            return <el-input v-model={row.name}></el-input>
          }
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'salary',
          label: '工资'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableData = Object.freeze(tableData)
    }, 1000)
  },
  methods: {
    handleChanged(e) {
      console.log('input', e)
      this.submitData = e
    },
    handleSubmit() {
      console.log(this.submitData)
    },
    getSummaries(param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (column.property === 'salary') {
          const values = this.tableData.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = 'N/A'
          }
        } else {
          sums[index] = '-'
        }
      })

      return sums
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
