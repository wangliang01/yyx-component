<template>
  <!-- <section class="c-table-wrapper__body-wrapper el-table__body-wrapper" :style="{height: getBodyHeight}">
    <div
      v-for="record in data"
      :key="record[recordKey]"
      class="c-table-body-container"
    >
      <ul
        class="c-table-body__record"
        :style="{height: getRecordHeight}"
      >
        <li
          v-for="(column, index) in columnsConfig"
          :key="index"
          class="c-table-body-column"
          :columnKey="column.key || column.prop"
          :title="record[column.key || column.prop]"
          :style="getColumnStyle(column)"
        >
          <div class="c-table-body-column__container">
            <span v-if="!column.render">{{ record[column.key || column.prop] }}</span>
            <render-body v-else :key="column.key || column.prop" :row="record" :render="column.render" :index="index"></render-body>
          </div>
        </li>
      </ul>
    </div>
  </section> -->
  <table
    cellspacing="0"
    cellpadding="0"
    border="0"
    class="el-table__body"
  >
    <tbody>
      <tr
        v-for="record in data"
        :key="record[recordKey]"
        class="el-table__row"
      >
        <td
          v-for="(column, index) in columnsConfig"
          :key="index"
          rowspan="1"
          colspan="1"
          class="`el-table_1_column_${index} is-left el-table__cell c-table-body-column`"
          :columnKey="column.key || column.prop"
          :title="record[column.key || column.prop]"
          :style="getColumnStyle(column)"
        >
          <div class="c-table-body-column__container cell el-tooltip">
            <span v-if="!column.render">{{ record[column.key || column.prop] }}</span>
            <render-body v-else :key="column.key || column.prop" :row="record" :render="column.render" :index="index"></render-body>
          </div>
        </td>
      </tr>
      <!---->
    </tbody>
  </table>
</template>

<script>
import RenderBody from './tableHelper/expand'

export default {
  name: 'SingleTableBody',
  components: { RenderBody },
  props: {
    columnsConfig: Array,
    data: Array,
    recordKey: String,
    recordHeight: Number,
    bodyHeight: Number
  },
  data() {
    return {}
  },
  computed: {
    getRecordHeight: function() {
      return `${this.recordHeight}px`
    },
    getBodyHeight: function() {
      return `${this.bodyHeight}px`
    }
  },
  methods: {
    getColumnStyle: function(column) {
      return {
        width: column.cWidth,
        height: `${this.recordHeight}px`
      }
    }
  }
}
</script>

<style scoped>

</style>
