<template>
  <div>
    <virtual-list :data="tableData" :columns="columns" :height="980" size="small" :change="tableChange"></virtual-list>
  </div>
</template>

<script>
import VirtualList from '../../../packages/Table/src/VirtualList.vue'
const tableData = []
for (let i = 0; i < 40; i++) {
  const item = {
    id: i + 1,
    name: `小张${i + 1}`,
    age: i * Math.random() * 10
  }
  tableData.push(item)
}
// tableData = tableData.map(im => Object.freeze(im))
export default {
  name: '',
  components: {
    VirtualList
  },
  data() {
    // this.tableData = tableData
    return {
      tableData: [],
      tData: [],
      columns: [
        {
          prop: 'id',
          label: '编号'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'name',
          label: '姓名'
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
          label: '操作',
          prop: 'action',
          fixed: 'right',
          minWidth: '180px',
          render: (h, { row, index }) => {
            return <div>
              <el-button type='text' onClick={(e) => this.handleClick(row, index)}>删除商品</el-button>
              <el-button type='text'>删除</el-button>
              <el-button type='text'>启用</el-button>
            </div>
          }
        }
      ]
    }
  },
  mounted() {
    this.tableData = Object.freeze(tableData)
  },
  methods: {
    tableChange(data) {
      console.log('111111111111111111111')
      this.tData = data
    },
    handleChanged(e) {
      console.log('input', e)
    },
    handleClick(row, index) {
      // console.log('input', this.tData, index)
      // console.log(row.id, row)
      this.tData.splice(index, 1)
      console.log(JSON.stringify(this.tData, null, '\t'))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
