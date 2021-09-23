# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 基础表格

基础的表格展示用法

::: demo

```html
<template>
  <div>
    <y-table
      :data="tableData"
      :columns="columns"
      showUtilsBar
      ui-style="antd"
    ></y-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
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
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
<style scoped lang="scss"></style>
```

:::

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。stripe 属性可以创建带斑马纹的表格。它接受一个 Boolean，默认为 false，设置为 true 即为启用。

::: demo

```html
<template>
  <div>
    <y-table
      stripe
      :data="tableData"
      :columns="columns"
      showUtilsBar
      ui-style="antd"
    ></y-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
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
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
<style scoped lang="scss"></style>
```

:::

## 带边框表格

border 属性可以使用表格显示边框

::: demo

```html
<template>
  <div>
    <y-table
      border
      :data="tableData"
      :columns="columns"
      showUtilsBar
      ui-style="antd"
    ></y-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
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
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>
<style scoped lang="scss"></style>
```

:::

## 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

::: demo

```html
<template>
  <div>
    <y-table
      border
      :data="tableData"
      :columns="columns"
      showUtilsBar
      ui-style="antd"
      :row-class-name="tableRowClassName"
    ></y-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
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
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }
    }
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
```

:::

> 更多表格案例，可参考 element-ui

### Table Attributes

| 参数                  | 说明                                                                                                                                         | 类型          | 可选值                | 默认值 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------- | ------ |
| data                  | 显示的数据                                                                                                                                   | array         | ——                    | ——     |
| height                | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值 | string/number | ——                    | ——     |
| max-height            | Table 的最大高度。合法的值为数字或者单位为 px 的高度。                                                                                       | string/number | ——                    | ——     |
| stripe                | 是否为斑马纹 table                                                                                                                           | boolean       | ——                    | false  |
| border                | 是否带有纵向边框                                                                                                                             | boolean       | ——                    | false  |
| size                  | Table 的尺寸                                                                                                                                 | string        | medium / small / mini | ——     |
| fit                   | 列的宽度是否自撑开                                                                                                                           | boolean       | ——                    | true   |
| show-header           | 是否显示表头                                                                                                                                 | boolean       | ——                    | true   |
| highlight-current-row | 是否要高亮当前行                                                                                                                             | boolean       | ——                    | false  |
| current-row-key       | 当前行的 key，只写属性                                                                                                                       | String,Number | ——                    | ——     |
