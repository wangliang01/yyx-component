<template>
  <y-dialog :visible.sync="visible" :title="title" :before-close="handleBeforeClose">
    <y-table-pro ref="table" :load-data-api="loadDataApi" :columns="columns" ui-style="antd" :pagination="false" :params="params" v-bind="$attrs" @selection-change="handleSelectionChange" @select-all="handleSelectAll">
      <template slot="table">
        <!-- table左侧 -->
        <slot name="table"></slot>
      </template>
      <template slot="table-top-right">
        <!-- table右侧 -->
        <slot name="table-top-right"></slot>
      </template>
    </y-table-pro>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </y-dialog>
</template>

<script>
export default {
  name: 'YTableDialog',
  components: {
  },
  props: {
    params: {
      type: [Number, Boolean, Object, Array, String],
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '关联押金品'
    },
    loadDataApi: {
      type: Function,
      default: () => {
        return {
          code: '200',
          message: 'OK',
          success: true,
          data: {
            records: [
              {
                depositId: '10001',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10001',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称',
                depositMoney: 10,
                checked: false
              },
              {
                depositId: '10001',
                url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                depositName: '押金品名称',
                depositMoney: 10,
                checked: false
              }
            ]
          }
        }
      }
    },
    max: {
      type: [String, Number],
      default: Infinity
    },
    columns: {
      type: Array,
      default: () => [
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
          labelClassName: 'disable-selection'
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
    },
    /* 点击取消时，是否直接关闭 */
    isCloseDirectly: {
      type: Boolean,
      default: true
    },
    canCheckAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: null
    }
  },
  watch: {
    visible(val) {
      console.log(val)
    }
  },
  methods: {
    handleBeforeClose() {
      this.closeDialog()
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.$emit('update:visible', false)
    },
    /* 取消 */
    handleCancel() {
      if (this.isCloseDirectly) {
        this.$emit('update:visible', false)
      } else {
        this.$emit('cancel', this.closeDialog)
      }
    },
    /* 确认 */
    handleConfirm() {
      this.$emit('confirm', { data: this.data, done: this.closeDialog })
    },
    handleSelectionChange(data) {
      console.log(data)
      this.data = data
    },
    handleSelectAll(data) {
      console.log('select all', data)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0;
  .el-table .disable-selection .cell .el-checkbox__inner{
    display:none;
    position:relative;
  }
  .el-table .disable-selection .cell:before{
    content:"选择";
    position:absolute;
    right: 11px;
  }
}
</style>
