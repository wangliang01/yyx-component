<template>
  <div class="batch-import">
    <y-batch-import
      :columns="columns"
      :uploadSuccess="uploadSuccess"
      @upload="upload"
      download-url="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/template/订单导入.xlsx"
    ></y-batch-import>
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
          type: 'input'
        },
        {
          label: 'SKU ID',
          prop: 'skuId',
          type: 'input'
        },
        {
          label: '数量',
          prop: 'count',
          type: 'input-number'
        },
        {
          label: '单价',
          prop: 'price',
          type: 'input-number'
        },
        {
          label: '下单日期',
          prop: 'createTime',
          type: 'date-picker'
        },
        {
          label: '要求配送日期',
          prop: 'deliverTime',
          type: 'date-picker'
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
    upload() {
      this.uploadSuccess = true
    }
  }
}
</script>

<style scoped>
</style>
