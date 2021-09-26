## Print 打印

用于打印

### 基础用法

::: demo

```html
<template>
  <el-card>
    <y-print type="primary" :api="api">
      <template v-slot="{ res }">
        <el-table :data="res.data">
          <el-table-column
            prop="date"
            label="日期"
            width="120"
          ></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="province" label="省份"></el-table-column>
          <el-table-column prop="city" label="市区"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="zip" label="邮编"></el-table-column>
        </el-table>
      </template>
    </y-print>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        api() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  date: '2016-05-03',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                },
                {
                  date: '2016-05-02',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                },
                {
                  date: '2016-05-04',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                },
                {
                  date: '2016-05-01',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                },
                {
                  date: '2016-05-08',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                },
                {
                  date: '2016-05-06',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                },
                {
                  date: '2016-05-07',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style></style>
```

:::

### Print Attrubites

| 参数       | 说明                    | 类型     | 可选值 | 默认值 |
| ---------- | ----------------------- | -------- | ------ | ------ |
| api        | 请求数据的函数          | function | ——     | ——     |
| text       | 打印按钮的文字          | string   | ——     | 打印   |
| css        | 打印模板的 css 文件路径 | string   | ——     | ——     |
| printStyle | 打印模板的 style 样式   | string   | ——     | ——     |
