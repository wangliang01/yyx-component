<template>
  <el-card class="form">
    <y-virtual-list :data="tableData" :columns="columns">
    </y-virtual-list>
  </el-card>
</template>

<script>
// import VirtualList from '../../../docs/components/virtual-list.md'
const tableData = []
for (let i = 0; i < 1000; i++) {
  const item = {
    index: i + 1,
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
    return {
      tableData: tableData,
      columns: [
        {
          prop: 'index',
          label: '编号'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
