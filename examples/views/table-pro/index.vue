<template>
  <div>
    <y-table-pro :load-data-api="loadDataApi" :columns="columns" ui-style="antd" offset="300">
      <template slot="action-right" slot-scope="scope">
        <el-button type="primary" @click="handleSave(scope)">保存</el-button>
      </template>
    </y-table-pro>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: '55px'
        },
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      loadDataApi: () => {
        return {
          code: '200',
          success: true,
          message: 'OK',
          data: {
            records: [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-06',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-07',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }]
          }
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    handleSave(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
