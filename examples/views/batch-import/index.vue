<template>
  <div class="batch-import">
    <el-card>
      <h2>批量导入</h2>
      <y-batch-import
        :columns="columns"
        :uploadSuccess="uploadSuccess"
        @upload="upload"
        download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/订单导入.xlsx"
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
  data() {
    return {
      uploadSuccess: false,
      columns: [
        {
          label: '客户ID',
          prop: 'customerId',
          type: 'input',
          required: true
        },
        {
          label: 'SKUID',
          prop: 'skuId',
          type: 'input',
          required: true
        },
        {
          label: '数量',
          prop: 'count',
          type: 'input-number',
          required: true
        },
        {
          label: '单价',
          prop: 'price',
          type: 'input-number',
          required: true
        },
        {
          label: '下单日期',
          prop: 'createTime',
          type: 'date-picker',
          required: true,
          pattern: /^[1-2][0-9][0-9][0-9][-\.\/][0-1]{0,1}[0-9][-\.\/][0-3]{0,1}[0-9]$/
        },
        {
          label: '要求配送日期',
          prop: 'deliverTime',
          type: 'date-picker',
          required: true,
          pattern: /^[1-2][0-9][0-9][0-9][-\.\/][0-1]{0,1}[0-9][-\.\/][0-3]{0,1}[0-9]$/
        }
      ]
    }
  },
  props: {

  },
  components: {
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
