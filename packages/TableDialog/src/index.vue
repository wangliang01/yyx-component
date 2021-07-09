<template>
  <y-dialog :visible.sync="visible" v-bind="$attrs" :title="title">
    <y-table-pro :load-data-api="loadDataApi" :columns="columns" ui-style="antd"></y-table-pro>
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
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    loadDataApi: {
      type: Function,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  watch: {
    visible(val) {
      console.log(val)
    }
  },
  mounted() {
    console.log('table dialog mounte')
  },
  methods: {
    /* 关闭弹窗 */
    closeDialog() {
      this.$emit('update:visible', false)
    },
    /* 取消 */
    handleCancel() {
      this.$emit('cancel', this.closeDialog)
    },
    /* 确认 */
    handleConfirm() {
      this.$emit('confirm', { data: [], done: this.closeDialog })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
