<template>
  <div>
    <y-button-more :columns="columns" :row="row"></y-button-more>
  </div>
</template>

<script>
const hasPermission = (permissions) => {
  return true
}
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      row: {
        'orderNumber': 'SO0521111615030479701',
        'customerName': '肖申克的救赎',
        'customerId': '1407159414082764800',
        'orderStatus': 'WAIT_CONFIRM',
        'orderType': 'CROSS_DOCKING',
        'emergency': false,
        'orderUserName': '萝卜头',
        'orderUserPhoneNumber': '17138346258',
        'sourceType': 'APPLETS',
        'createTime': '2021-11-16 15:03:05',
        'deliverTime': null,
        'totalAmount': '3.01',
        'earlyWarning': false,
        'paymentType': null,
        'actualMoney': '0',
        'totalRealAmount': null,
        'showCancelButton': true,
        'saleName': '销售员A',
        'salePhone': '17138346258',
        'remarks': null,
        'isNeedConfirmation': 0,
        'salesmanName': null,
        'refundStatus': 'NOT_REFUND',
        'onlineRefundAmount': null,
        'carSales': 0,
        'expectReceivingTime': '2021-11-17 00:00:00',
        'warehouseId': '1406894187093164032',
        'warehouseName': '重庆涪陵仓',
        'distributionType': null,
        'planDeliverTime': '2021-11-17',
        'yunXian': false
      },
      columns: [
        {
          text: '详情',
          handler(row) {
            this.handleGoDetail(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON'])
          }
        },
        {
          text: '确认',
          handler(row) {
            this.handleConfirm(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON']) && this.canShowConfirmButton(row)
          }
        },
        {
          text: '审核',
          handler(row) {
            this.handleConfirm(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON']) && this.canShowConfirmButton(row)
          }
        },
        {
          text: '更改',
          handler(row) {
            this.handleConfirm(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON']) && this.canShowConfirmButton(row)
          }
        },
        {
          text: '流转',
          handler(row) {
            this.handleConfirm(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON']) && this.canShowConfirmButton(row)
          }
        },
        {
          text: '退货',
          handler(row) {
            this.handleConfirm(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON']) && this.canShowConfirmButton(row)
          }
        },
        {
          text: '取消',
          handler(row) {
            this.handleConfirm(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON']) && this.canShowConfirmButton(row)
          }
        },
        {
          text: '再来一单',
          handler(row) {
            this.handleConfirm(row)
          },
          show(row) {
            return hasPermission(['ORDER_MENU_DETAIL_BUTTON']) && this.canShowConfirmButton(row)
          }
        },
        {
          render: (h) => {
            return <el-link>娃哈哈</el-link>
          }
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    handleGoDetail() {
      console.log('handleGoDetail')
    },
    // 是否显示确认按钮
    canShowConfirmButton(row) {
      // 如果订单状态是待审核[WAIT_CONFIRM]，客服审核[CUSTOMER_EXAMINE]，客户审核[USER_EXAMINE], 则显示确认按钮
      const { orderStatus } = row
      if (['WAIT_CONFIRM', 'CUSTOMER_EXAMINE', 'USER_EXAMINE'].includes(orderStatus)) {
        return true
      }
      return false
    },
    handleConfirm(row) {
      console.log('handleConfirm', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
