<template>
  <div class="batch-import">
    <y-batch-import
      :columns="columns"
      :uploadSuccess="uploadSuccess"
      @upload="upload"
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
          type: 'input'
        },
        {
          label: '下单日期',
          prop: 'createTime',
          type: 'date-picker',
          width: '300px'
        },
        {
          label: '要求配送日期',
          prop: 'deliverTime',
          type: 'date-picker',
          width: '300px'
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
