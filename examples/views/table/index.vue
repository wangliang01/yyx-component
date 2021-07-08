<template>
  <div class="table">
    <h1>表格</h1>
    <el-card>
      <h2>基础表格</h2>
      <p>基础的表格展示用法。</p>
      <y-table
        :data="tableData1"
        :columns="columns1"
        show-util-bar
      ></y-table>
      <y-table
        :data="tableData"
        :columns="columns"
        show-util-bar
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>带斑马纹表格</h2>
      <p>使用带斑马纹的表格，可以更容易区分出不同行的数据。</p>
      <y-table
        :data="tableData"
        :columns="columns"
        stripe
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>带边框表格</h2>
      <y-table
        :data="tableData"
        :columns="columns"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>带状态表格</h2>
      <p>可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。</p>
      <y-table
        :data="tableData"
        :columns="columns"
        :row-class-name="tableRowClassName"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>固定表头</h2>
      <p>纵向内容过多时，可选择固定表头。</p>
      <y-table
        :data="tableData"
        :columns="columns"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>流体高度</h2>
      <p>纵向内容过多时，可选择固定表头。</p>
      <y-table
        :data="tableData"
        :columns="columns"
        max-height="300"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>固定列和表头</h2>
      <p>横纵内容过多时，可选择固定列和表头。</p>
      <y-table
        :data="tableData"
        :columns="columns"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>多级表头</h2>
      <p>数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。</p>
      <y-table
        :data="tableData"
        :columns="columns2"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>单选表格</h2>
      <p>数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。</p>
      <y-table
        ref="singleTable"
        :data="tableData"
        :columns="singleColumns"
        border
      ></y-table>
      <div class="mt-20">
        <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
        <el-button @click="setCurrent()">取消选择</el-button>
      </div>
    </el-card>
    <el-card class="mt-20">
      <h2>多选表格</h2>
      <p>数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。</p>
      <y-table
        ref="multipleTable"
        :data="tableData"
        :columns="multipleColumns"
        border
      ></y-table>
      <div class="mt-20">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、三行的选择状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-card>
    <el-card class="mt-20">
      <h2>排序</h2>
      <p>对表格进行排序，可快速查找或对比数据。</p>
      <y-table
        ref="multipleTable"
        :data="tableData"
        :columns="multipleColumns"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>流体高度</h2>
      <p>当数据量动态变化时，可以为 Table 设置一个最大高度。</p>
      <y-table
        ref="multipleTable"
        :data="tableData"
        :columns="multipleColumns"
        :default-sort="{prop: 'date', order: 'descending'}"
        max-height="150"
        border
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>筛选</h2>
      <p>对表格进行筛选，可快速查找到自己想看的数据。</p>
      <y-table
        ref="multipleTable"
        :data="tableData"
        :columns="multipleColumns"
        :default-sort="{prop: 'date', order: 'descending'}"
        max-height="150"
        border
      ></y-table>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: '',
  components: {
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
      tableData1: [{
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
          label: '日期',
          // formatter(row) {
          //   return moment(row.date).format('YYYY/MM/DD')
          // },
          render(h, { row }) {
            return <span>{moment(row.date).format('YYYY/MM/DD')}</span>
          }
        },
        {
          prop: 'name',
          label: '姓名',
          render: (h, { row }) => {
            return <el-input value={row.name} onInput={(value) => { row.name = value }}></el-input>
          }
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
      columns1: [
        {
          prop: 'date',
          label: '日期',
          // formatter(row) {
          //   return moment(row.date).format('YYYY/MM/DD')
          // },
          render(h, { row }) {
            return <span>{moment(row.date).format('YYYY/MM/DD')}</span>
          }
        },
        {
          prop: 'name',
          label: '姓名',
          render: (h, { row }) => {
            return <el-input value={row.name} onInput={(value) => { row.name = value }}></el-input>
          }
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
      multipleColumns: [
        {
          type: 'selection',
          width: '55'
        },
        {
          prop: 'date',
          label: '日期',
          sortable: true
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
      singleColumns: [
        {
          type: 'index',
          width: '55'
        },
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
      columns2: [
        {
          type: 'index'
        },
        {
          prop: 'date',
          label: '日期',
          width: '150'
        },
        {
          label: '配送信息',
          children: [
            {
              prop: 'name',
              label: '姓名',
              width: '120'
            },
            {
              label: '地址',
              children: [
                {
                  prop: 'province',
                  label: '省份',
                  width: '120'
                },
                {
                  prop: 'city',
                  label: '市区',
                  width: '120'
                },
                {
                  prop: 'address',
                  label: '详细地址',
                  width: '120'
                },
                {
                  prop: 'zip',
                  label: '邮编',
                  width: '120'
                }
              ]
            }

          ]
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    tableRowClassName(row) {
      if (row.rowIndex === 1) {
        return 'warning-row'
      } else if (row.rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .warning-row {
  background:oldlace;
}
::v-deep .success-row {
  background: #f0f9eb;
}
</style>
