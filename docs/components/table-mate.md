## TableMate 前端分页表格

使用于前端展示所有数据

### 基本用法
请求api
::: demo

```html
<template>
  <div>
    <y-table-mate :load-data-api="dataApi" :columns="columns" label-suffix="：" :has-search="false" lazy-load>
      <el-button slot="table" type="primary" :pagination="false" @click="handleSelect">选择需加工净菜</el-button>
    </y-table-mate>
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
      dataApi: () => {
        return {
          code: 200,
          success: true,
          data: [],
          msg: 'OK'
        }
      },
      columns: [
        {
          prop: 'deposit',
          label: '押金品',
          // filterWidth: '200px',
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
          fieldType: 'Input'
        },
        {
          prop: 'url',
          label: '图片'
        },
        {
          prop: 'depositName',
          label: '押金品名称',
          filter: true,
          fieldType: 'Input'
        },
        {
          prop: 'depositMoney',
          label: '押金'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    handleSelect() {}
  }
}
</script>

<style lang="scss" scoped>

</style>

```

:::


### 直接展示
::: demo

```html
<template>
  <div>
    <y-table-air :columns="columns" label-suffix="：" ui-style="element" :has-search="true" style="margin-top: 24px;">
      <el-button slot="table" type="primary" :pagination="false" @click="handleSelect">选择需加工净菜</el-button>
    </y-table-air>
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
      dataApi: () => {
        return {
          code: 200,
          success: true,
          data: [],
          msg: 'OK'
        }
      },
      columns: [
        {
          prop: 'deposit',
          label: '押金品',
          // filterWidth: '200px',
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
          fieldType: 'Input'
        },
        {
          prop: 'url',
          label: '图片'
        },
        {
          prop: 'depositName',
          label: '押金品名称',
          filter: true,
          fieldType: 'Input'
        },
        {
          prop: 'depositMoney',
          label: '押金'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    handleSelect() {}
  }
}
</script>

<style lang="scss" scoped>

</style>

```

:::

| 参数          | 说明                                                                    | 类型     | 可选值 | 默认值 |
| ------------- | ----------------------------------------------------------------------- | -------- | ------ | ------ |
| params           | 请求的参数                                                      | object | ——     | ——     |
| rowKey     | 表格的唯一id                                                                | function / string  | ——     | ——  |
| hasSearch     | 是否显示查询按钮                                                               | boolean  | ——     | true  |
| hasReset     | 是否显示重置按钮                                                               | boolean  | ——     | true  |
| loadDataApi     | 服务端搜索                                                                | function  | ——     | ——  |
| columns     | 表格列表的列的设置                                                                | array  | ——     | ——  |
| checkedData     | 从父组件传递过来的数据，让组件默认勾选上                                                                | array  | ——     | []  |
| model     | 数据模型                                                                | object  | ——     | {id:'id'}  |
| pagination     | 分页                                                                | object / boolean  | ——     | false  |
| lazyLoad     | 懒加载                                                                | boolean  | ——     | false  |

### Events

| 事件名称 | 说明                   | 回调参数                               |
| -------- | ---------------------- | -------------------------------------- |
| confirm | 确认事件 | 	Function(checkedData: array, closeFn: function) |
