<template>
  <div class="batch-import">
    <el-card>
      <h2>批量导入</h2>
      <y-batch-import
        :columns="columns2"
        :upload-success="uploadSuccess"
        download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/订单导入.xlsx"
        multi-header
        @upload="upload"
      ></y-batch-import>
    </el-card>
    <el-card class="mt-20">
      <h2>批量导入2</h2>
      <y-batch-import
        :columns="stockColumns"
        :upload-success="uploadSuccess"
        download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/订单导入.xlsx"
        @upload="upload"
      ></y-batch-import>
    </el-card>

    <el-card class="mt-20">
      <!-- sku导入 -->
      <h2>sku导入</h2>
      <y-sku-import download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/商品导入.xlsx"></y-sku-import>
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
        { prop: 'warehouseId', label: '仓库ID', type: 'input', required: true },
        { prop: 'skuId', label: '商品ID', type: 'input', required: true },
        { prop: 'availableStock', label: '可用库存', type: 'input', required: true },
        { prop: 'price', label: '不含税单价', type: 'input', required: true },
        {
          prop: 'produceTime',
          label: '生产日期',
          type: 'date-picker',
          required: true,
          format: 'YYYY-MM-DD',
          pattern: /^[1-2][0-9][0-9][0-9][-\.\/][0-1]{0,1}[0-9][-\.\/][0-3]{0,1}[0-9]$/
        }
      ],
      columns: [{
        label: '商品id',
        prop: 'skuId',
        type: 'input',
        maxLength: '32',
        required: true
      },
      {
        label: '商品名称',
        prop: 'skuName',
        type: 'input',
        maxLength: '50',
        required: true
      },
      {
        label: '销售单位',
        prop: 'skuUnit',
        type: 'select',
        options: [],
        required: true
      },
      {
        label: '单价',
        prop: 'skuPrice',
        type: 'input',
        integerDigit: '15',
        precision: '4',
        number: true,
        required: true
      },
      {
        label: '是否在商城显示价格',
        prop: 'enable',
        type: 'select',
        required: true,
        options: [
          { label: '是', value: 'ENABLE' },
          { label: '否', value: 'DISABLE' }]
      }],
      columns2: [
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
