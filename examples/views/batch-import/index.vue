<template>
  <div class="batch-import">
    <el-card>
      <h2>批量导入</h2>
      <y-batch-import
        :columns="columns"
        :upload-success="uploadSuccess"
        download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/订单导入.xlsx"
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
      }]
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
