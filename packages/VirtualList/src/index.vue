<template>
  <vue-table-optimization
    :data="data"
    :columns-config="columns"
    render-type="VIRTUAL"
    record-key="_id"
    header-class="header-title__virtual"
  ></vue-table-optimization>

</template>

<script>
import VueTableOptimization from './VueTableOptimization'

export default {
  name: 'YVirtualList',
  components: {
    VueTableOptimization
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped></style>
