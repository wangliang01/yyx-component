<template>
  <el-card class="form">
    <CardMd class="md"></CardMd>
  </el-card>
</template>

<script>
import CardMd from '../../../docs/components/card.md'
export default {
  name: '',
  components: {
    CardMd
  },
  data() {
    return {
      data: {},
      columns: [
        {
          label: 'SPU 名称',
          prop: 'spuName'
        },
        {
          label: '保质期',
          prop: 'shelfLife'
        },
        {
          label: '类型',
          prop: 'type',
          formatter(val) {
            if (val === 'standard') {
              return '标品'
            }
          }
        },
        {
          label: '品牌',
          prop: 'brand'
        },
        {
          label: '后类类目',
          prop: 'backType'
        },
        {
          label: '销售税率',
          prop: 'saleRate',
          formatter(val) {
            return `${val}%`
          }
        },
        {
          label: '最小销售单位',
          prop: 'salePrice'
        },
        {
          label: '产地',
          prop: 'address'
        },
        {
          label: '储藏温区',
          prop: 'storageTemperatureZone'
        },
        {
          label: '采购税率',
          prop: 'purchaseTaxRate',
          formatter(val) {
            return `${val}%`
          }
        },
        {
          label: '最小规格',
          prop: 'minSpec'
        },
        {
          label: '均重',
          prop: 'averageWeight'
        },
        {
          label: '形状',
          prop: 'shape'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
