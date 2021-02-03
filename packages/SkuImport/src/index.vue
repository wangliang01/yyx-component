<template>
  <y-batch-import v-bind="$attrs" :columns="columns" v-on="$listeners"></y-batch-import>
</template>

<script>
import { priceUnitOptions } from './unit'
export default {
  name: 'YSkuImport',
  data() {
    return {
      columns: [
        {
          label: '商品名称',
          prop: 'name',
          type: 'input'
        },
        {
          label: '品牌',
          prop: 'brand',
          type: 'input'
        },
        {
          label: '规格',
          prop: 'spec',
          type: 'input'
        },
        {
          label: '一级品类',
          prop: 'oneCategory',
          type: 'input'
        },
        {
          label: '二级品类',
          prop: 'twoCategory',
          type: 'input'
        },
        {
          label: '三级品类',
          prop: 'threeCategory',
          type: 'input'
        },
        {
          label: '生产厂商',
          prop: 'manufacturer',
          type: 'input'
        },
        {
          label: '保质期',
          prop: 'shelfLifeDays',
          type: 'input'
        },
        {
          label: '计价单位',
          prop: 'priceUnit',
          type: 'select',
          options: priceUnitOptions
        },
        {
          label: '是否标品(是,否)',
          prop: 'normal',
          type: 'select',
          options: [{ label: '是', value: '是' },
            { label: '否', value: '否' }]
        },
        {
          label: '销项税(%)',
          prop: 'salesTaxRate',
          type: 'input-number'
        },
        {
          label: '进项税(%)',
          prop: 'procurementTaxRate',
          type: 'input-number'
        },
        {
          label: '销售类型',
          prop: 'saleType',
          type: 'select',
          options: [{ label: '备货-代仓', value: '备货-代仓' },
            { label: '备货-代采', value: '备货-代采' },
            { label: '直送', value: '直送' },
            { label: '越库', value: '越库' }]
        },
        {
          label: '存储温层',
          prop: 'temperature',
          type: 'select',
          options: [{ label: '冷冻（-18°C）', value: '冷冻（-18°C）' },
            { label: '冷藏（0°C——8°C）', value: '冷藏（0°C——8°C）' },
            { label: '常温', value: '常温' }]
        }
      ]
    }
  }
}
</script>

