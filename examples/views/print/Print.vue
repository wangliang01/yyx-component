<template>
  <!-- 销售清单票据 -->
  <div class="order-ticket">
    <h2 class="order-title">销售清单</h2>
    <div class="order-company">新希望云优选供应链管理有限公司青白江分公司青白江门店</div>
    <div class="order-item">
      <label class="label">地址：</label>
      <span class="value">成都市青白江区桂通北路1号</span>
    </div>
    <div class="order-item">
      <label class="label">电话：</label>
      <span class="value">18989898989</span>
    </div>

    <div class="order-detail">
      <div class="order-item">
        <label class="label">订单编号：</label>
        <span class="value">SO343434343343434344</span>
      </div>
      <div class="order-item">
        <label class="label">订单类型：</label>
        <span class="value">备货-代采</span>
      </div>
      <div class="order-item">
        <label class="label">下单日期：</label>
        <span class="value">2021-02-23  23：23：33</span>
      </div>
      <div class="order-item">
        <label class="label">收货人姓名：</label>
        <span class="value">李福彩</span>
      </div>
      <div class="order-item">
        <label class="label">收货人电话：</label>
        <span class="value">13511232131</span>
      </div>
      <div class="order-item">
        <label class="label">收货地址：</label>
        <span class="value">成都市青白江区8888号</span>
      </div>
      <div class="order-item">
        <label class="label">备注：</label>
        <span class="value">这里是备注信息</span>
      </div>
    </div>

    <!-- 列表信息 -->
    <div class="list">
      <!-- <y-table :data="data" :columns="columns" /> -->
      <el-table :data="data">
        <el-table-column prop="" label="商品ID"></el-table-column>
        <el-table-column prop="" label="商品名称"></el-table-column>
        <el-table-column prop="" label="规格"></el-table-column>
        <el-table-column prop="" label="单位"></el-table-column>
        <el-table-column prop="" label="预订数量"></el-table-column>
        <el-table-column prop="" label="确认数量"></el-table-column>
        <el-table-column prop="" label="实际配送数量"></el-table-column>
        <el-table-column prop="" label="实际收货数量"></el-table-column>
        <el-table-column prop="" label="单价"></el-table-column>
        <el-table-column prop="" label="小计"></el-table-column>
      </el-table>
      <div class="order-item">
        <label class="label">订单金额：</label>
        <span class="value">¥38.00    叁拾捌元整</span>
      </div>
      <div class="order-item">
        <label class="label">实收金额：</label>
        <span class="value">¥38.00    叁拾捌元整</span>
      </div>
    </div>
    <!-- 业务员信息 -->
    <div class="staff-info">
      <div class="order-item">
        <label class="label">业务员：</label>
        <span class="value">李小二</span>
      </div>
      <div class="order-item">
        <label class="label">下单人：</label>
        <span class="value">李小二</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderTicket',
  components: {
  },
  props: {

  },
  data() {
    return {
      data: [],
      columns: []
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.order-ticket{
  position: relative;
  width: 800px;
  border: 1px solid #eee;
  padding: 10px;
  line-height: 1.5em;
  font-size: 14px;
}
.order-title{
  position: absolute;
  right: 15px;
  font-size: 24px;
  font-weight: bold;
}
.order-detail{
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;

}
.order-detail .order-item {
  flex: 0 0 33.33%;
}

.list{
  margin: 10px 0;
  border: 1px solid #eee;
  text-align: right;

}

.list .order-item{
  margin: 10px 20px;
}

.staff-info{
  display: flex;
  justify-content: space-between;
}
</style>
