<template>
  <div>

    <y-table-mate :load-data-api="dataApi" :columns="columns" label-suffix="：" :has-search="false" lazy-load>
      <el-button slot="table" type="primary" :pagination="false" @click="handleSelect">选择需加工净菜</el-button>
    </y-table-mate>
    <y-table-air :columns="columns" label-suffix="：" ui-style="element" :has-search="true" style="margin-top: 24px;">
      <el-button slot="table" type="primary" :pagination="false" @click="handleSelect">选择需加工净菜</el-button>
    </y-table-air>
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
      dataApi: () => {
        return {
          code: 200,
          success: true,
          data: [],
          msg: 'OK'
        }
      },
      columns: [
        {
          prop: 'deposit',
          label: '押金品',
          // filterWidth: '200px',
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
          label: '押金品ID',
          filter: true,
          fieldType: 'Input'
        },
        {
          prop: 'url',
          label: '图片'
        },
        {
          prop: 'depositName',
          label: '押金品名称',
          filter: true,
          fieldType: 'Input'
        },
        {
          prop: 'depositMoney',
          label: '押金'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    handleSelect() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
