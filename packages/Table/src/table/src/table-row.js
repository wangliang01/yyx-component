import ElCheckbox from 'element-ui/packages/checkbox'
export default {
  name: 'ElTableRow',
  props: [
    'columns',
    'row',
    'index',
    'isSelected',
    'isExpanded',
    'store',
    'context',
    'firstDefaultColumnIndex',
    'treeRowData',
    'treeIndent',
    'columnsHidden',
    'getSpan',
    'getColspanRealWidth',
    'getCellStyle',
    'getCellClass',
    'handleCellMouseLeave',
    'handleCellMouseEnter',
    'fixed'
  ],
  components: {
    ElCheckbox
  },
  render() {
    const {
      columns,
      row,
      index: $index,
      store,
      context,
      firstDefaultColumnIndex,
      treeRowData,
      treeIndent,
      columnsHidden = [],
      isSelected,
      isExpanded
    } = this

    const YTable = this.$parent.$parent.$parent

    const originColumns = YTable.originColumns

    /* 查找操作列 */
    const operateColumnIndex = originColumns.find(col => col.label === '操作')

    console.log('store', store)

    return (
      <tr>
        {
          columns.map((column, cellIndex) => {
            const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex)
            if (!rowspan || !colspan) {
              return null
            }
            const columnData = { ...column }
            columnData.realWidth = this.getColspanRealWidth(columns, colspan, cellIndex)
            const data = {
              store,
              isSelected,
              isExpanded,
              _self: context,
              column: columnData,
              row,
              $index
            }
            if (cellIndex === firstDefaultColumnIndex && treeRowData) {
              data.treeNode = {
                indent: treeRowData.level * treeIndent,
                level: treeRowData.level
              }
              if (typeof treeRowData.expanded === 'boolean') {
                data.treeNode.expanded = treeRowData.expanded
                // 表明是懒加载
                if ('loading' in treeRowData) {
                  data.treeNode.loading = treeRowData.loading
                }
                if ('noLazyChildren' in treeRowData) {
                  data.treeNode.noLazyChildren = treeRowData.noLazyChildren
                }
              }
            }

            console.log(store.states.operateColumnIndex && store.states.operateColumnIndex, $index)

            const renderColumn = () => {
              /* 如果有操作列，且操作列索引与$index相等，则表示在同一排，且column为当前排的最后一个column */
              if (store.states.operateColumnIndex != null && store.states.operateColumnIndex === $index && columns.length - 1 === cellIndex) {
                return <div class='cell'>
                  {
                    operateColumnIndex.render.call(this._renderProxy, this.$createElement, data)
                  }
                </div>
              }
              return column.renderCell.call(
                this._renderProxy,
                this.$createElement,
                data,
                columnsHidden[cellIndex]
              )
            }

            return (
              <td
                style={this.getCellStyle($index, cellIndex, row, column)}
                class={this.getCellClass($index, cellIndex, row, column)}
                rowspan={rowspan}
                colspan={colspan}
                on-mouseenter={($event) => this.handleCellMouseEnter($event, row)}
                on-mouseleave={this.handleCellMouseLeave}
              >
                {
                  renderColumn()
                }
              </td>
            )
          })
        }
      </tr>
    )
  }
}
