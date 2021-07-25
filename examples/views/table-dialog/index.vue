<template>
  <div>
    <y-button @click="handleOpen">打开弹窗</y-button>
    <y-table-dialog :visible.sync="visible" :columns="columns" :load-data-api="loadDataApi" :checked-data.sync="disableData" :model="{id: 'depositId'}" @cancel="handleCancel" @confirm="handleConfirm">
      <div slot="table">123123</div>
      <div slot="table-top-right">112312</div>
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
          label: '押金品ID'
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
      ]
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
