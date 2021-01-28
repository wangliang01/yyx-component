# yyx-component

云优选组件库，一个基于[Element](https://element.eleme.cn/#/zh-CN)进行二次开发的组件库

## 安装
### npm 安装
推荐使用npm的方式安装，它能更好地和webpack打包工具配合使用

```node
npm i yyx-component -S 
```

## 快速上手
### 引入yui
在main.js中写入以下内容
```js
import Vue from 'vue
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import yui from 'yyx-component'
import 'yyx-component/lib/yui.css'
import App from './App.vue';

Vue.use(yui)

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

该组件库目前包含的组件有：
```
  |--表单(YForm)
  |--表格(YTable)
  |--高级表格(YTablePro)
  |--文件上传(YUpload)
  |--数字输入框(YInputNumber)
  |--级联选择器(Cascader)
    |--品类级联选择器(YCategoryCascader)
    |--地址级联选择器(YAddressCascader)

```

### 使用

#### 表单的使用
```vue
<template>
  <y-form
    v-model="form"
    :config="config"
    label-position="left"
    width="500px"
    label-width="100px"
  >
    <el-form-item>
      <el-button
        type="primary"
        @click="handleCreate"
      >立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </y-form>
</template>
<script>
export default {
  data() {
    form: {
      name: '',
      region: '',
      date: '',
      time: '',
      delivery: false,
      startTime: '',
      endTime: '',
      type: [],
      resource: '',
      desc: ''
    },
    config: {
      name: {
        prop: 'name',
        label: '活动名称',
        fieldType: 'Input',
        labelSuffix: '：'
      },
      region: {
        prop: 'region',
        label: '活动区域',
        fieldType: 'Select',
        labelSuffix: '：',
        options: [
          {
            label: '上海',
            value: 'shanghai'
          },
          {
            label: '北京',
            value: 'beijing'
          }
        ]
      },
      dateRange: {
        label: '日期范围',
        fieldType: 'DatePicker',
        type: 'daterange',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期',
        onPick: (value) => {
          const [startTime, endTime] = value
          this.form.startTime = startTime
          this.form.endTime = endTime
        }
      },
      date: {
        prop: 'date',
        label: '活动时间',
        fieldType: 'DatePicker',
        labelSuffix: '：',
        cols: 13
      },
      time: {
        prop: 'time',
        label: '-',
        hideLable: false,
        labelPosition: 'center',
        labelSuffix: '',
        push: 1,
        labelWidth: '25px',
        fieldType: 'TimePicker',
        cols: 10,
        pickerOptions: {
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }
      },
      delivery: {
        prop: 'delivery',
        label: '即时配送',
        fieldType: 'YSwitch',
        labelSuffix: '：'

      },
      type: {
        prop: 'type',
        fieldType: 'Checkbox',
        label: '活动性质',
        labelSuffix: '：',
        options: [
          {
            label: '美食/餐厅线上活动',
            name: 'type',
            cols: 12
          },
          {
            label: '地推活动',
            name: 'type',
            cols: 12
          },
          {
            label: '线下主题活动',
            name: 'type',
            cols: 12
          },
          {
            label: '单纯品牌曝光',
            name: 'type',
            cols: 12
          }
        ]
      },
      resource: {
        prop: 'resource',
        label: '特殊资源',
        fieldType: 'Radio',
        labelSuffix: '：',

        options: [
          {
            label: '线上品牌商赞助',
            value: '0',
            cols: 12
          },
          {
            label: '线下场地免费',
            value: '1',
            cols: 12
          }
        ]
      },
      desc: {
        prop: 'desc',
        label: '活动形式',
        fieldType: 'Input',
        type: 'textarea',
        labelSuffix: '：',
        rows: 2
      }
    }
  }
}
</script>
```


#### 表格的使用
```vue
<template>
  <y-table
    :data="tableData"
    :columns="columns"
  ></y-table>
</template>
<script>
export default {
  data() {
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
      ]
  }
}
</script>
```
# 目前该组件库存在的问题
1. 不支持树型表格