<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible" :columns="columns" :load-data-api="loadDataApi" :checked-data.sync="disableData" :model="{id: 'depositId'}" :params.sync="params" @cancel="handleCancel" @confirm="handleConfirm">
      <!-- <div slot="table">123123</div>
      <div slot="table-top-right">112312</div> -->
    </y-table-dialog>
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
      params: {
        id: ''
      },
      visible: false,
      loadDataApi: () => {
        return {
          code: '200',
          message: 'OK',
          success: true,
          data: {
            records: [
              {
                depositId: '10001',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称1',
                depositMoney: 8,
                checked: false
              },
              {
                depositId: '10002',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称2',
                depositMoney: 9,
                checked: false
              },
              {
                depositId: '10003',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10004',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称1',
                depositMoney: 8,
                checked: false
              },
              {
                depositId: '10005',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称2',
                depositMoney: 9,
                checked: false
              },
              {
                depositId: '10006',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10007',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称1',
                depositMoney: 8,
                checked: false
              },
              {
                depositId: '10008',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称2',
                depositMoney: 9,
                checked: false
              },
              {
                depositId: '10009',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10010',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称3',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10011',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称11',
                depositMoney: 11,
                checked: false
              }
            ]
          }
        }
      },
      disableData: [
        {
          depositId: '10001',
          url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          depositName: '押金品名称1',
          depositMoney: 8,
          checked: false
        },
        {
          depositId: '10002',
          url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          depositName: '押金品名称2',
          depositMoney: 9,
          checked: false
        },
        {
          depositId: '10011',
          url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          depositName: '押金品名称11',
          depositMoney: 11,
          checked: false
        }
      ],
      columns: [
        {
          prop: 'deposit',
          label: '押金品',
          filterWidth: '200px',
          filter: true,
          fieldType: 'Input',
          hidden: true
        },
        {
          type: 'selection',
          labelClassName: 'disable-selection',
          selectable: this.checkSelectable
        },
        {
          prop: 'depositId',
          label: '押金品ID',
          filter: true,
          fieldType: {
            render: (h) => {
              return <el-cascader v-model={this.params.id} options={this.options}></el-cascader>
            }
          }
        },
        {
          prop: 'url',
          label: '图片'
        },
        {
          prop: 'depositName',
          label: '押金品名称'
        },
        {
          prop: 'depositMoney',
          label: '押金'
        }
      ],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }]
    }
  },
  methods: {
    checkSelectable(row) {
      // return !this.disableData.map(item => item.depositId).includes(row.depositId)
      return true
    },
    handleOpen() {
      this.visible = true
    },
    handleCancel(close) {
      close()
    },
    handleConfirm({ data, done }) {
      console.log(data, done)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
