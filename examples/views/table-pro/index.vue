<template>
  <div class="table-pro">
    <y-table-pro
      :load-data-api="pagelist"
      :columns="showColumns"
      :origin-columns="showColumns"
      ui-style="antd"
      :params="{id: '1234'}"
      show-util-bar
    >
      <template #table>
        <el-button type="primary" @click="setColumn('columns')">展示column</el-button>
        <el-button type="primary" @click="setColumn('columns2')">展示column2</el-button>
      </template>
      <template #table-top-right>
        <el-button>abc</el-button>
      </template>
    </y-table-pro>
    <h1>高级表格</h1>
    <el-card>
      <h2>自定义列模板</h2>
      <p>自定义列的显示内容，可组合其他组件使用。</p>
      <y-table
        :data="tableData"
        :columns="customerColumns"
      >
      </y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>展开行</h2>
      <p>当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。</p>
      <y-table
        :data="expandTableData"
        :columns="expandColumns"
      >
      </y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>筛选</h2>
      <p>对表格进行筛选，可快速查找到自己想看的数据。</p>
      <y-table
        ref="filterTable"
        :data="tableData"
        :columns="filterColumns"
      >
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
      </y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>树形数据与懒加载</h2>
      <y-table
        :data="treeTableData"
        :columns="treeColumns"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        default-expand-all
      ></y-table>
    </el-card>
    <el-card class="mt-20">
      <h2>树形数据与懒加载</h2>
      <el-table
        :data="treeTableData"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>

    </el-card>
    <el-card>
      <h2>自定义表头</h2>
      <p>表头支持自定义。</p>
    </el-card>

    <!-- <el-card class="mt-20">
      <h2>带过滤条件的表格</h2>
      <y-table-pro
        :load-data-api="pagelist"
        :columns="columns"
        label-width="60px"
      ></y-table-pro>
    </el-card> -->
  </div>
</template>

<script>
export default {
  name: 'TablePro',
  components: {
  },
  props: {

  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      }],
      filterColumns: [
        {
          label: '日期',
          prop: 'date',
          sortable: true,
          width: '180',
          columnKey: 'date',
          filters: [{ text: '2016-05-01', value: '2016-05-01' }, { text: '2016-05-02', value: '2016-05-02' }, { text: '2016-05-03', value: '2016-05-03' }, { text: '2016-05-04', value: '2016-05-04' }],
          filterMethod: this.filterHandler
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: 'tag',
          prop: 'tag',
          width: '100',
          filters: [{ text: '家', value: '家' }, { text: '公司', value: '公司' }],
          filterMethod: this.filterTag,
          filterPlacement: 'bottom-end',
          render(h, { row, col }) {
            return (
              <el-tag
                type={row.tag === '家' ? 'primary' : 'success'}
                disable-transitions>{row.tag}</el-tag>
            )
          }
        }
      ],
      customerColumns: [
        {
          prop: 'date',
          label: '日期',
          render: (h, { row }) => {
            return (
              <div>
                <i class='el-icon-time'></i>
                <span style='margin-left: 10px'>{row.date}</span>
              </div>
            )
          }
        },
        {
          prop: 'name',
          label: '姓名',
          render: (h, { row }) => {
            return (<el-popover trigger='hover' placement='top'>
              <p>姓名: {row.name}</p>
              <p>住址: {row.address}</p>
              <div slot='reference' class='name-wrapper'>
                <el-tag size='medium'>{row.name}</el-tag>
              </div>
            </el-popover>)
          }
        },
        {
          label: '操作',
          render: (h, { row }) => {
            return (
              <div>
                <el-button
                  size='mini'
                  onClick={() => this.handleEdit(row)}>编辑</el-button>
                <el-button
                  size='mini'
                  type='danger'
                  onClick={() => this.handleDelete(row)}>删除</el-button>
              </div>
            )
          }
        }
      ],
      expandTableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      expandColumns: [
        {
          type: 'expand',
          render(h, props) {
            return <el-form label-position='left'>
              <el-form-item label='商品名称'>
                <span>{props.row.name}</span>
              </el-form-item>
              <el-form-item label='所属店铺'>
                <span>{props.row.shop}</span>
              </el-form-item>
              <el-form-item label='商品 ID'>
                <span>{props.row.id}</span>
              </el-form-item>
              <el-form-item label='店铺 ID'>
                <span>{props.row.shopId}</span>
              </el-form-item>
              <el-form-item label='商品分类'>
                <span>{props.row.category}</span>
              </el-form-item>
              <el-form-item label='店铺地址'>
                <span>{props.row.address}</span>
              </el-form-item>
              <el-form-item label='商品描述'>
                <span>{props.row.desc}</span>
              </el-form-item>
            </el-form>
          }
        },
        {
          prop: 'id',
          label: '商品ID'
        },
        {
          prop: 'name',
          label: '商品名称'
        },
        {
          prop: 'desc',
          label: '商品描述'
        }
      ],
      columns: [
        {
          label: 'ID',
          prop: 'id',
          filter: true,
          fieldType: 'Input'

          // marginRight: '50px',
          // hidden: true
        },
        {
          label: '姓名',
          prop: 'name',
          fieldType: 'Input',
          filter: true,
          marginRight: '50px',
          width: '280px'
        },
        {
          label: '年龄',
          prop: 'age',
          fieldType: 'Input',
          filter: true,
          marginRight: '50px',
          width: '280px'
        }
      ],
      columns2: [
        {
          label: '姓名',
          prop: 'name',
          fieldType: 'Input',
          filter: true,
          marginRight: '50px',
          width: '280px'
        },
        {
          label: '年龄',
          prop: 'age',
          fieldType: 'Input',
          filter: true,
          marginRight: '50px',
          width: '280px'
        }
      ],
      treeTableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      treeColumns: [
        {
          label: '日期',
          prop: 'date',
          sortable: true,
          width: '180',
          columnKey: 'id'
        },
        {
          label: '姓名',
          prop: 'name',
          sortable: true,
          width: '180'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      showColumns: []
    }
  },
  created() {
    this.showColumns = this.columns
  },
  methods: {
    setColumn(field) {
      console.log('field', field, this[field])
      this.showColumns = this[field]
    },
    pagelist() {},
    handleEdit(row) { },
    handleDelete(row) { },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
