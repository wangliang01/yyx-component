<template>
  <el-card class="form">
    <!-- <y-virtual-list :data="tableData" :columns="columns">
    </y-virtual-list> -->
    <y-table :data="tableData" :columns="columns" virtual :change="handleChanged"></y-table>
    <el-button @click="handleSubmit">提交</el-button>
  </el-card>
</template>

<script>
// import VirtualList from '../../../docs/components/virtual-list.md'
const tableData = []
for (let i = 0; i < 100000; i++) {
  const item = {
    id: i + 1,
    name: `小张${i + 1}`,
    age: i * Math.random() * 10
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
