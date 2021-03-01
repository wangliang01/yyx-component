<template>
  <div class="print">
    <y-print css="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="市区"></el-table-column>
        <el-table-column prop="adress" label="地址"></el-table-column>
        <el-table-column prop="zip" label="邮编"></el-table-column>
        <el-table-column prop="hobby" label="爱好"></el-table-column>
      </el-table>
    </y-print>
    <y-print :print-style="printStyle" type="primary">
      <print></print>
    </y-print>
  </div>
</template>

<script>
import Print from './Print'
export default {
  name: '',
  components: {
    Print
  },
  props: {

  },
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      columns: [
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'province',
          label: '省份'
        },
        {
          prop: 'city',
          label: '市区'
        },
        {
          prop: 'address',
          label: '地址',
          'show-overflow-tooltip': true
        },
        {
          prop: 'zip',
          label: '邮编'
        },
        {
          prop: 'hobby',
          label: '爱好'
        },
        {
          prop: 'zip',
          label: '邮编'
        },
        {
          prop: 'hobby',
          label: '爱好'
        },
        {
          label: '操作',
          fixed: 'right',
          render() {
            return (
              <div>
                <el-button type='text'>查看</el-button>
                <el-button type='text'>编辑</el-button>
              </div>
            )
          }
        }
      ],
      printStyle: `
        .order-ticket{
          position: relative;
          max-width: 802px;
          border: 1px solid #eee;
          padding: 12px;
          line-height: 1.5em;
          font-size: 14px;
        }
        .order-title{
          position: absolute;
          right: 15px;
          font-size: 24px;
          font-weight: bold;
        }
        .order-detail{
          margin-top: 50px;
          display: flex;
          flex-wrap: wrap;
          
        }
        .order-detail .order-item {
          flex: 0 0 33.33%;
        }

        .list{
          margin: 10px 0;
          border: 1px solid #eee;
          text-align: right;
          
        }

        .list .order-item{
          margin: 10px 20px;
        }


        .staff-info{
          display: flex;
          justify-content: space-between;
        }
      `
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
