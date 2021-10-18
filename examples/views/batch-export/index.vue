<template>
  <!-- 批量导出 -->
  <div class="batch-export">
    <y-batch-export :data="tableData" :columns="tableColumns" sheet-name="采购单详情" :format="format"></y-batch-export>
  </div>
</template>

<script>
import { round } from 'lodash'
import { minus } from '../../../packages/utils/bigNumber'
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      tableData: [
        {
          'id': '1397857129968308224',
          'skuId': 'KU042102021445543691',
          'skuName': '耳机越库',
          'taxRate': 0.23,
          'skuSpec': '单位',
          'orderSource': 1,
          'orderOrReplenishmentId': '1397856957582278656',
          'appointPrice': '0',
          'orderDate': '2021-05-27 18:07:24',
          'orderPeopleName': '李欣怡',
          'orderPhone': '18782294902',
          'orderUnitName': '测试',
          'receiver': '小黄鸭',
          'shippingAddress': '山西省长治市屯留区陕西',
          'receiverPhone': '13888888888',
          'scheduledNum': '22',
          'trueBuyNum': '22',
          'trueSkuUnitId': '1256',
          'trueSkuUnit': '单位',
          'supplierOutSkuUnitId': null,
          'supplierOutSkuUnit': null,
          'stockOutSkuUnitId': null,
          'stockOutSkuUnit': null,
          'supplierOutNum': '0',
          'stockOutNum': '0',
          'skuUnit': '单位',
          'relationOrderServiceCode': 'SO0121052718072426101',
          'totalAppointPrice': '15650.4578',
          'actualAmount': '0',
          'stockOutPrice': '0',
          'truePrice': '0'
        },
        {
          'id': '1397857130022834176',
          'skuId': 'KU042102021445543691',
          'skuName': '耳机越库',
          'taxRate': 0.03,
          'skuSpec': '单位',
          'orderSource': 1,
          'orderOrReplenishmentId': '1397856905946202112',
          'appointPrice': '0',
          'orderDate': '2021-05-27 18:07:12',
          'orderPeopleName': '李欣怡',
          'orderPhone': '18782294902',
          'orderUnitName': '我是客户名称',
          'receiver': '小黄鸭',
          'shippingAddress': '山西省长治市屯留区陕西',
          'receiverPhone': '13888888888',
          'scheduledNum': '11',
          'trueBuyNum': '11',
          'trueSkuUnitId': '1256',
          'trueSkuUnit': '单位',
          'supplierOutSkuUnitId': null,
          'supplierOutSkuUnit': null,
          'stockOutSkuUnitId': null,
          'stockOutSkuUnit': null,
          'supplierOutNum': '0',
          'stockOutNum': '0',
          'skuUnit': '单位',
          'relationOrderServiceCode': 'SO0121052718071195301',
          'totalAppointPrice': '0',
          'actualAmount': '0',
          'stockOutPrice': '0',
          'truePrice': '0'
        }
      ],
      tableColumns: [
        {
          label: '关联订单/仓库补货单ID',
          prop: 'relationOrderServiceCode'
        },
        {
          label: '商品ID',
          prop: 'skuId'
        },
        {
          label: '商品名称',
          prop: 'skuName'
        },
        {
          label: '规格',
          prop: 'skuSpec'
        },
        {
          label: '基础单位',
          prop: 'skuUnit'
        },
        {
          label: '下单单位',
          prop: 'orderUnitName'
        },
        {
          label: '下单人',
          prop: 'orderPeopleName'
        },
        {
          label: '下单人电话',
          prop: 'orderPhone'
        },
        {
          label: '下单日期',
          prop: 'orderDate',
          minWidth: 160
        },
        {
          label: '预定数量',
          prop: 'scheduledNum'
        },
        {
          label: '采购单价',
          prop: 'truePrice'
        },
        {
          label: '进项税额',
          prop: 'taxRate'
        },
        {
          label: '确认采购数量',
          prop: 'trueBuyNum'
        },
        {
          label: '采购金额',
          prop: 'totalAppointPrice'
        },
        {
          label: '预计总税额',
          prop: 'estimatedTotalTax'
        },
        {
          label: '预计不含税总额',
          prop: 'estimatedTotalExcludeTax'
        },
        {
          label: '供应商出库数量',
          prop: 'supplierOutNum'
        },
        {
          label: '出库金额',
          prop: 'stockOutPrice'
        },
        {
          label: '实际入库数量',
          prop: 'stockOutNum'
        },
        {
          label: '实际金额',
          prop: 'actualAmount'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    format() {
      return this.tableData.map(item => {
        const taxRate = item.taxRate
        item.taxRate = taxRate ? `${(taxRate * 100)}%` : '0'
        const estimatedTotalExcludeTax = (item.totalAppointPrice / (1 + taxRate))
        this.$set(item, 'estimatedTotalExcludeTax', round(estimatedTotalExcludeTax, 2))
        this.$set(item, 'estimatedTotalTax', minus(item.totalAppointPrice, round(estimatedTotalExcludeTax, 2)))
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
