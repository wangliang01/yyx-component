<template>
  <div
    ref="table"
    class="
      el-table
      el-table--fit
      el-table--fluid-height
      el-table--enable-row-hover
      el-table--enable-row-transition
      el-table--mini
    "
    style="width: 100%"
  >
    <div class="el-table__header-wrapper">
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        class="el-table__header"
      >
        <thead class="has-gutter">
          <tr class="">
            <th
              v-for="(col, idx) in columns"
              :key="col.prop"
              colspan="1"
              rowspan="1"
              :class="`el-table_1_column_${idx} is-left is-leaf el-table__cell`"
            >
              <div class="cell" :style="{width: colWidth + 'px'}">{{ col.label }}</div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="el-table__body-wrapper is-scrolling-none">
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        class="el-table__body"
      >
        <colgroup>
          <col v-for="(item, index) in columns" :key="index + 1" :name="`el-table_1_column_${index+1}`">
        </colgroup>
        <tbody>
          <DynamicScroller :items="data" :min-item-size="50" class="scroller">
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="[item.id]"
                :data-index="index"
                :emit-resize="false"
              >
                <tr class="el-table__row">
                  <td
                    v-for="(col, idx) in columns"
                    :key="col.prop"
                    rowspan="1"
                    colspan="1"
                    :class="`el-table_1_column_${idx+1} is-left el-table__cell`"
                  >
                    <div class="cell el-tooltip" :style="{width: colWidth + 'px'}">
                      {{ item[col.prop] }}
                    </div>
                  </td>
                </tr>
                <template slot-scope="scope">
                  <expandDom
                    :row="scope.row"
                    :col="col"
                    :render="col.render"
                    :data="data"
                    :col-index="index"
                    :index="scope.$index"
                  >
                  </expandDom>
                </template>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
          <!---->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  DynamicScroller,
  DynamicScrollerItem
} from 'vue-virtual-scroller'

export default {
  name: 'YVirtualList',
  components: {
    DynamicScroller,
    DynamicScrollerItem
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
  },
  data() {
    return {
      colWidth: 0
    }
  },
  mounted() {
    let colWidth = 0
    const table = this.$refs.table
    if (this.columns.length) {
      colWidth = Math.floor(table.offsetWidth / this.columns.length)
    }
    this.colWidth = colWidth
  }
}
</script>

<style lang="scss" scoped></style>
