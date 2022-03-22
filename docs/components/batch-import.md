# BatchImport 批量导入
## 基本用法
用来导入EXCEl模板文件，转化为Json

::: demo

```html
<template>
  <div class="batch-import">
    <el-card>
      <y-batch-import
        :columns="stockColumns"
        :upload-success="uploadSuccess"
        download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/订单导入.xlsx"
        @upload="upload"
      ></y-batch-import>
    </el-card>
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
      uploadSuccess: false,
      stockColumns: [
        {
          prop: 'firstCategory',
          label: '一级品类',
          type: 'input',
          required: false
        },
        {
          prop: 'secondaryCategory',
          label: '二级品类',
          type: 'input',
          required: false
        },
        {
          prop: 'productName',
          label: '商品名称',
          type: 'input',
          required: false
        },
        {
          prop: 'location',
          label: '产地（所在地）',
          type: 'input',
          required: false
        },
        {
          prop: 'shelfLife',
          label: '保质期',
          type: 'input',
          required: false
        },
        {
          prop: 'manufactureDate',
          label: '生产日期',
          type: 'input',
          required: false,
          format: 'YYYY-MM-DD'
        },
        {
          prop: 'specification',
          label: '规格',
          type: 'input',
          required: false
        },
        {
          prop: 'unit',
          label: '单位',
          type: 'input',
          required: false
        },
        {
          prop: 'quote',
          label: '报价',
          type: 'input',
          required: false,
          number: true

        },
        {
          prop: 'brand',
          label: '品牌',
          type: 'input',
          required: false
        },
        {
          prop: 'supplierName',
          label: '供应商名称',
          type: 'input',
          required: false
        },
        {
          prop: 'storeCondition',
          label: '储存条件',
          type: 'input',
          required: false
        },
        {
          prop: 'quoteDate',
          label: '报价时间',
          type: 'date-picker',
          required: false,
          pattern:
            /^[1-2][0-9][0-9][0-9][-\.\/][0-1]{0,1}[0-9][-\.\/][0-3]{0,1}[0-9]$/
        },
        {
          prop: 'remark',
          label: '备注',
          type: 'input',
          required: false
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    upload(data) {
      this.uploadSuccess = true
      this.$nextTick(() => {
        this.uploadSuccess = false
      })
    }
  }
}
</script>

<style scoped>
</style>
```

:::
## 多级表头导入
::: demo

```html
<template>
  <div class="batch-import">
    <el-card>
      <y-batch-import
        :columns="columns"
        :upload-success="uploadSuccess"
        download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/订单导入.xlsx"
        multi-header
        @upload="upload"
      ></y-batch-import>
    </el-card>
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
      uploadSuccess: false,
      columns: [
        {
          label: '食物名称',
          prop: 'foodName'
        },
        {
          label: '糖（克）',
          prop: 'sugar'
        },
        {
          label: '蛋白质（克）',
          prop: 'protein'
        },
        {
          label: '脂肪（克）',
          prop: 'fat'
        },
        {
          label: '碳水化合物(克）',
          prop: 'carbohydrate'
        },
        {
          label: '维生素',
          prop: 'vitamins',
          align: 'center',
          children: [
            {
              label: 'A（微克）',
              prop: 'vitaminsA'
            },
            {
              label: 'E（毫克）',
              prop: 'vitaminsE'
            },
            {
              label: 'C（毫克）',
              prop: 'vitaminsC'
            },
            {
              label: '叶酸（微克）',
              prop: 'folicAcid'
            },
            {
              label: '烟酸(毫克）',
              prop: 'niacin'
            },
            {
              label: 'B1（毫克）',
              prop: 'vitaminsB1'
            },
            {
              label: 'B2（毫克）',
              prop: 'vitaminsB2'
            },
            {
              label: 'B6（毫克）',
              prop: 'vitaminsB6'
            },
            {
              label: 'B12（毫克）',
              prop: 'vitaminsB12'
            }
          ]
        },
        {
          label: '矿物质',
          prop: 'mineral',
          children: [
            {
              label: '钠（毫克）',
              prop: 'natrium'
            },
            {
              label: '钙（微克）',
              prop: 'calcium'
            },
            {
              label: '铁（毫克）',
              prop: 'iron'
            },
            {
              label: '钾（毫克）',
              prop: 'potassium'
            },
            {
              label: '锌（毫克）',
              prop: 'zinc'
            }
          ]
        },
        {
          label: '膳食纤维（克）',
          prop: 'dietaryFiber'
        },
        {
          label: '胆固醇（毫克）',
          prop: 'cholesterol'
        },
        {
          label: '能量（千卡）',
          prop: 'energy'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    upload(data) {
      this.uploadSuccess = true
      this.$nextTick(() => {
        this.uploadSuccess = false
      })
    }
  }
}
</script>

<style scoped>
</style>
```

:::

### Attributes

| 参数          | 说明                                                                    | 类型     | 可选值 | 默认值 |
| ------------- | ----------------------------------------------------------------------- | -------- | ------ | ------ |
| isStreamline           | 是否简易风格                                                     | boolean | true/false     | false    |
| hasEditButton     | 是否可以编辑                                                                | boolean  | true/false     | false    |
| btnText     | 导入按钮文案                                                                | string  | -    | 批量导入    |
| downloadText     | 下载模板按钮文案                                                                | string  | -    | 下载模板    |
| isExport     | 是否可以导出模板                                                                | boolean | true/false     | false    |
| size     | 上传文件大小限制                                                                | String, Number | -     | -    |
| downloadUrl     | 下载模板超链接                                                                | String | -     | -    |
| uploadSuccess     | 是否上传成功                                                                | boolean | true/false     | false    |
| columns     | 数据列                                                                | array |  -     | -    |
| multiHeader     | 是否是多级表头                                                                | boolean | true/false     | false    |

### Events

| 事件名称 | 说明                   | 回调参数                               |
| -------- | ---------------------- | -------------------------------------- |
| upload | 确定按钮回调事件 | 表格数据。 |
| download | 下载事件 | 设置isExport为true时，可以调用这个函数请求接口下载其他文件 |