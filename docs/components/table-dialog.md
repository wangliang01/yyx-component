# TableDialog 表格弹窗
用于展示弹出框表格的展示，可传入表格筛选条件，查询API，表格展示列数，不可选数组

## 基础使用

基础的表格弹窗展示用法

::: demo

```html
<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible" :columns="columns" :load-data-api="loadDataApi" :model="{id: 'depositId'}" :params.sync="params" @cancel="handleCancel" @confirm="handleConfirm">
    </y-table-dialog>
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
          labelClassName: 'disable-selection'
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
    handleOpen() {
      this.visible = true
    },
    handleCancel(close) {
      close()
    },
    handleConfirm({ data, done }) {
      console.log('confirm', data, done)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

```
:::

## 设置默认选中 checked-data

表格弹窗设置默认选中展示用法

::: demo

```html
<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible" :columns="columns" :load-data-api="loadDataApi" :checked-data.sync="checkedData" :model="{id: 'depositId'}" :params.sync="params" @cancel="handleCancel" @confirm="handleConfirm">
    </y-table-dialog>
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
      checkedData: [
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
          labelClassName: 'disable-selection'
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
    handleOpen() {
      this.visible = true
    },
    handleCancel(close) {
      close()
    },
    handleConfirm({ data, done }) {
      console.log('confirm', data, done)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

```
:::

## 设置不可选择项 selectable

表格弹窗设置不可选择项展示用法

::: demo

```html
<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible" :columns="columns" :load-data-api="loadDataApi" :model="{id: 'depositId'}" :params.sync="params" @cancel="handleCancel" @confirm="handleConfirm">
    </y-table-dialog>
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
      return row.index %2===0
    },
    handleOpen() {
      this.visible = true
    },
    handleCancel(close) {
      close()
    },
    handleConfirm({ data, done }) {
      console.log('confirm', data, done)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

```
:::

## TableDialog Attributes

| 名称            | 说明         | 类型          | 可选值 | 默认值 |
| -------------- | ------------------ | ------------- | ------ | ------ |
| visible        | 是否展示表格弹窗    | boolean        | -      | -      |
| title          | 标题               | string         | -      | 关联押金品     |
| columns        | 数据列              | array         | -      | -      |
| load-data-api  | 请求接口方法        | function        | -      | -   |
| model          | 数据模型，默认是通过id操作数据 | object | -      | { id: 'id' }    |
| params         | 查询参数            | object | -      | -      |
| checked-data   | 默认选中的数据       | array | -      | -      |
| rowKey         | 表格主键据           | function/string | -      | id      |
## TableDialog Events

| 名称      | 说明                    | 类型          |
| --------- | ----------------------- | ------------- |
| cancel     | 取消按钮的回调函数 | function        |
| confirm      | 确定按钮的回调函数       | function        |
