## Transfer 穿梭框

使用于列表的多选择

### 基本用法
::: demo

```html
<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-transfer ref="transfer" :visible.sync="visible" :columns="columns" :load-data-api="loadDataApi" :checked-data.sync="disableData" :model="{id: 'depositId'}" :params.sync="params" :checked-columns="checkedColumns" @cancel="handleCancel" @confirm="handleConfirm">
    </y-transfer>
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
      params: {
        size: 100
      },
      visible: false,
      loadDataApi: () => {
        return {
          code: '200',
          message: 'OK',
          success: true,
          data: {
            records: [
              {
                depositId: '10001',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称1',
                depositMoney: 8,
                checked: false
              },
              {
                depositId: '10002',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称2',
                depositMoney: 9,
                checked: false
              },
              {
                depositId: '10003',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10004',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称1',
                depositMoney: 8,
                checked: false
              },
              {
                depositId: '10005',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称2',
                depositMoney: 9,
                checked: false
              },
              {
                depositId: '10006',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10007',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称1',
                depositMoney: 8,
                checked: false
              },
              {
                depositId: '10008',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称2',
                depositMoney: 9,
                checked: false
              },
              {
                depositId: '10009',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10010',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10011',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称11',
                depositMoney: 11,
                checked: false
              }
            ]
          }
        }
      },
      disableData: [
        {
          depositId: '10001',
          url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          depositName: '押金品名称1',
          depositMoney: 8,
          checked: false
        },
        {
          depositId: '10002',
          url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          depositName: '押金品名称2',
          depositMoney: 9,
          checked: false
        },
        {
          depositId: '10011',
          url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          depositName: '押金品名称11',
          depositMoney: 11,
          checked: false
        }
      ],
      checkedColumns: [
        {
          prop: 'depositId',
          label: '押金品ID'
        },
        {
          label: '操作',
          render: (h, { row, index }) => {
            return <el-link type='text' onClick={() => this.handleRm(row)}>取消</el-link>
          }
        }
      ],
      columns: [
        {
          prop: 'deposit',
          label: '押金品',
          filterWidth: '200px',
          filter: true,
          fieldType: 'Input',
          hidden: true
        },
        {
          type: 'selection',
          labelClassName: 'disable-selection',
          selectable: this.checkSelectable
        },
        {
          prop: 'depositId',
          label: '押金品ID',
          filter: true,
          fieldType: {
            render: (h) => {
              return <el-cascader v-model={this.params.id} options={this.options}></el-cascader>
            }
          }
        },
        {
          prop: 'url',
          label: '图片'
        },
        {
          prop: 'depositName',
          label: '押金品名称'
        },
        {
          prop: 'depositMoney',
          label: '押金'
        }
      ],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }]
    }
  },
  methods: {
    checkSelectable(row) {
      // return !this.disableData.map(item => item.depositId).includes(row.depositId)
      return true
    },
    handleOpen() {
      this.visible = true
    },
    handleCancel(close) {
      close()
    },
    handleConfirm({ data, done }) {
      console.log('confirm', data, done)
    },
    handleRm(row) {
      this.$refs['transfer'].handleRmCheck(row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
```

:::

### Attributes

| 参数          | 说明                                                                    | 类型     | 可选值 | 默认值 |
| ------------- | ----------------------------------------------------------------------- | -------- | ------ | ------ |
| params           | 请求的参数                                                      | object | ——     | ——     |
| rowKey     | 表格的唯一id                                                                | function / string  | ——     | ——  |
| visible     | 是否显示 Dialog，支持 .sync 修饰符                                                               | boolean  | ——     | false  |
| title     | 标题                                                               | string  | ——     | 关联押金品  |
| loadDataApi     | 服务端搜索                                                                | function  | ——     | ——  |
| columns     | 待选择列表的列的设置                                                                | array  | ——     | ——  |
| checkedColumns     | 选中列表的列的设置                                                                | array  | ——     | ——  |
| isCloseDirectly     | 点击取消时，是否直接关闭                                                                | boolean  | ——     | true  |
| checkedData     | 从父组件传递过来的数据，让组件默认勾选上                                                                | array  | ——     | []  |
| model     | 数据模型                                                                | object  | ——     | {id:'id'}  |

### Events

| 事件名称 | 说明                   | 回调参数                               |
| -------- | ---------------------- | -------------------------------------- |
| cancel | 关闭事件 | —— |
| confirm | 确认事件 | 	Function(checkedData: array, closeFn: function) |

### Methods

| 方法名 | 说明                   | 参数                               |
| -------- | ---------------------- | -------------------------------------- |
| handleRmCheck | 用于取消选中 | row |
