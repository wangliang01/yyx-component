<template>
  <y-batch-import
    v-bind="$attrs"
    :columns="columns"
    v-on="$listeners"
  >
    <slot></slot>
  </y-batch-import>
</template>

<script>
import { priceUnitOptions } from './unit'
export default {
  name: 'YSkuImport',
  data() {
    return {
      columns: [
        {
          label: '商品ID',
          prop: 'skuId',
          type: 'input',
          required: false,
          maxLength: '32'
        },
        {
          label: '上游关联id',
          prop: 'externalSkuId',
          type: 'input',
          required: false,
          maxLength: '64'
        },
        {
          label: '下游关联id',
          prop: 'ylzSkuId',
          type: 'input',
          required: false,
          maxLength: '64'
        },
        {
          label: '商品名称',
          prop: 'name',
          type: 'input',
          required: true,
          maxLength: '64'
        },
        {
          label: '品牌',
          prop: 'brand',
          type: 'input',
          maxLength: '32'
        },
        {
          label: '规格',
          prop: 'spec',
          type: 'input',
          required: true,
          maxLength: '32'
        },
        {
          label: '一级品类',
          prop: 'oneCategory',
          type: 'input',
          required: true,
          maxLength: '20'
        },
        {
          label: '二级品类',
          prop: 'twoCategory',
          type: 'input',
          required: true,
          maxLength: '20'
        },
        {
          label: '三级品类',
          prop: 'threeCategory',
          type: 'input',
          required: true,
          maxLength: '20'
        },
        {
          label: '生产厂商',
          prop: 'manufacturer',
          type: 'input',
          maxLength: '32'
        },
        {
          label: '保质期',
          prop: 'shelfLifeDays',
          type: 'input',
          integer: true,
          required: true
        },
        {
          label: '基础单位',
          prop: 'priceUnit',
          type: 'select',
          options: priceUnitOptions,
          required: true
        },
        {
          label: '是否标品(是,否)',
          prop: 'normal',
          type: 'select',
          options: [{ label: '是', value: '是' },
            { label: '否', value: '否' }],
          required: true
        },
        {
          label: '销项税(%)',
          prop: 'salesTaxRate',
          type: 'input',
          required: true,
          number: true,
          precision: 1,
          max: 99.9
        },
        {
          label: '进项税(%)',
          prop: 'procurementTaxRate',
          type: 'input',
          required: true,
          number: true,
          precision: 1,
          max: 99.9
        },
        {
          label: '销售类型',
          prop: 'saleType',
          type: 'select',
          options: [
            // { label: '备货-代仓', value: '备货-代仓' },
            { label: '备货-代采', value: '备货-代采' },
            { label: '直送', value: '直送' },
            { label: '越库', value: '越库' }
          ],
          required: true
        },
        {
          label: '存储温层',
          prop: 'temperature',
          type: 'select',
          options: [{ label: '冷冻（-18℃）', value: '冷冻（-18℃）' },
            { label: '冷藏（0℃——8℃）', value: '冷藏（0℃——8℃）' },
            { label: '常温', value: '常温' }],
          required: true
        }
      ]
    }
  }
}
</script>

