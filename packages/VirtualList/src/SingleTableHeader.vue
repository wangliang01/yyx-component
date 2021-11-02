<template>
  <!-- <ul class="c-table-header__record el-table__header-wrapper" :style="{height: getHeaderHeight}">
    <li
      v-for="(column, index) in columnsConfig"
      :key="column[cIdKey]"
      class="c-table-header-column"
      :columnKey="column[cIdKey]"
      :title="column.title || column.label"
      :style="getColumnStyle(column)"
    >
      <div class="c-table-header-column__container">
        <span v-if="!column.renderHeader">{{ column.title || column.label }}</span>
        <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
      </div>
    </li>
  </ul> -->
  <table
    cellspacing="0"
    cellpadding="0"
    border="0"
    class="el-table__header"
  >
    <thead class="has-gutter">
      <tr>
        <th
          v-for=" (column, index) in columnsConfig"
          :key="column[cIdKey]"
          colspan="1"
          rowspan="1"
          :class="`el-table_1_column_${index} is-left is-leaf el-table__cell`"
        >
          <span v-if="!column.renderHeader" class="cell">{{ column.title || column.label }}</span>
          <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
        </th>
        <th
          class="el-table__cell gutter"
          style="width: 0px; display: none"
        ></th>
      </tr>
    </thead>
  </table>
</template>

<script>
import RenderHeader from './tableHelper/expand'
import { ID_NAME } from './tableHelper/constant'

export default {
  name: 'SingleTableHeader',
  components: { RenderHeader },
  props: {
    columnsConfig: Array,
    height: Number
  },
  data() {
    return {
      cIdKey: ID_NAME
    }
  },
  computed: {
    getHeaderHeight: function() {
      return {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    getColumnStyle: function(column) {
      return {
        width: column.cWidth,
        height: `${this.height}px`
      }
    }
  }
}
</script>

<style scoped>

</style>
