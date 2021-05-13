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
        { prop: 'price', label: '商品价格', type: 'input', required: true },
        {
          prop: 'produceTime',
          label: '生产日期',
          type: 'date-picker',
          required: true,
          format: 'yyyy-MM-dd HH:mm:ss',
          pattern: /^[1-2][0-9][0-9][0-9][-\.\/][0-1]{0,1}[0-9][-\.\/][0-3]{0,1}[0-9]$/
        }
      ],
      columns: [
        {
          label: '仓库ID',
          prop: 'warehouseId',
          type: 'input',
          required: true
        },
        {
          label: '商品ID',
          prop: 'skuId',
          type: 'input',
          relationProp: 'customerId',
          required: true
        },
        {
          label: '可用库存',
          prop: 'stock',
          type: 'input-number',
          required: true
        },
        {
          label: '商品价格',
          prop: 'price',
          type: 'input-number',
          required: true
        },
        {
          label: '生产日期',
          prop: 'createTime',
          type: 'date-picker',
          required: true,
          pattern: /^[1-2][0-9][0-9][0-9][-\.\/][0-1]{0,1}[0-9][-\.\/][0-3]{0,1}[0-9]$/
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
