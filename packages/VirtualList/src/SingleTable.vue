<template>
  <article class="c-table-wrapper el-table el-table--fit el-table--fluid-height el-table--enable-row-hover">
    <section class="c-table-wrapper__header-wrapper el-table__header-wrapper" :class="headerClass">
      <table-header
        :columns-config="columnsConfig"
        :height="headerHeight"
      ></table-header>
    </section>
    <table-body
      v-if="showRender(&quot;COMMON&quot;)"
      :data="data"
      :record-key="recordKey"
      :columns-config="columnsConfig"
      :record-height="recordHeight"
      :body-height="bodyHeight"
    >
    </table-body>
    <request-animation-frame-table-body
      v-if="showRender(&quot;ANIMATION&quot;)"
      :data="data"
      :record-key="recordKey"
      :columns-config="columnsConfig"
      :record-height="recordHeight"
      :body-height="bodyHeight"
    >
    </request-animation-frame-table-body>
    <virtual-scroll-table-body
      v-if="showRender(&quot;VIRTUAL&quot;)"
      :data="data"
      :record-key="recordKey"
      :columns-config="columnsConfig"
      :item-height="recordHeight"
      :viewport-height="bodyHeight"
    >
    </virtual-scroll-table-body>
  </article>
</template>

<script>
import TableHeader from './SingleTableHeader'
import TableBody from './SingleTableBody'
import RequestAnimationFrameTableBody from './RequestAnimationFrameTableBody'
import VirtualScrollTableBody from './VirtualScrollTableBody'

export default {
  name: 'SingleTable',
  components: {
    TableHeader,
    TableBody,
    RequestAnimationFrameTableBody,
    VirtualScrollTableBody
  },
  props: {
    columnsConfig: Array,
    data: Array,
    recordKey: String,
    headerHeight: Number,
    bodyHeight: Number,
    recordHeight: Number,
    renderType: String,
    headerClass: String
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    showRender: function(type) {
      return this.renderType === type
    }
  }
}
</script>

<style>
  /* ul {
    padding-left: 0;
    margin: 0;
  }

  ul > li {
    padding-left: 0;
    margin: 0;
    list-style: none;
  } */

  /* .c-table-wrapper {
    width: inherit;
    overflow: hidden;
    font-size: 12px;
  } */

  /* .c-table-wrapper__header-wrapper {
    width: 100%;
    border: 1px solid #dddddd;
    border-bottom: 0;
  } */

  .c-table-wrapper__body-wrapper {
    overflow-y: auto;
    width: 100%;
    border: 1px solid #dddddd;
  }

  .c-table-wrapper__header-wrapper,
  .c-table-wrapper__body-wrapper {
    display: flex;
    flex-direction: column;
  }

  .c-table-header__record,
  .c-table-body__record {
    display: flex;
  }

  /* .c-table-header__record {
    padding-right: 17px;
  } */

  .c-table-header-column,
  .c-table-body-column {
    display: flex;
    align-items: center;
    border-right: 1px solid #dddddd;
    padding-left: 6px;
    overflow: hidden;
    white-space: nowrap;
    flex: 1 1 auto;
  }

  .c-table-header-column:last-child,
  .c-table-body-column:last-child{
    border-right: 0;
  }

  .c-table-header-column__container,
  .c-table-body-column__container {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .c-table-body__record {
    border-bottom: 1px solid #dddddd;
  }

  .c-table-body-container:last-child .c-table-body__record {
    border-bottom: 0;
  }

  .c-table-header__default {
    background-color: #f8f8f9;
    color: #297EA3;
    font-weight: bold;
    font-size: 14px;
  }

</style>
