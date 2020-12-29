<template>
  <div class="table-pro">
    <h1>高级表格</h1>
    <el-card>
      <h2>带过滤条件的表格</h2>
      <y-table-pro url="" :columns="columns" label-width="60px"></y-table-pro>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TablePro',
  data() {
    return {
      columns: [
        {
          label: 'ID',
          prop: 'id',
          fieldType: 'Input',
          filter: true,
          cols: 3,
          sm: 6
        },
        {
          label: '姓名',
          prop: 'name',
          fieldType: 'Input',
          filter: true,
          cols: 3,
          sm: 6
        },
        {
          label: '年龄',
          prop: 'age',
          fieldType: 'Input',
          filter: true,
          cols: 3,
          sm: 6
        }
      ]
    }
  },
  props: {

  },
  components: {
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
