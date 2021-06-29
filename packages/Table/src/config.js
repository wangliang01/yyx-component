export const defaultTableAttrs = {
  data: null,
  height: null,
  'max-height': null,
  stripe: false,
  border: false,
  size: null,
  fit: true,
  'show-header': true,
  'highlight-current-row': false,
  'current-row-key': null,
  'row-class-name': null,
  'row-style': null,
  'cell-class-name': null,
  'cell-style': null,
  'header-row-class-name': null,
  'header-row-style': null,
  'header-cell-class-name': null,
  'header-cell-style': null,
  'row-key': null,
  'empty-text': '暂无数据',
  'default-expand-all': false,
  'expand-row-keys': null,
  'default-sort': {},
  'tooltip-effect': null,
  'show-summary': false,
  'sum-text': '合计',
  'summary-method': null,
  'span-method': null,
  'select-on-indeterminate': true,
  indent: 16,
  lazy: null,
  load: null,
  'tree-props': { hasChildren: 'hasChildren', children: 'children' }
}

export const defaultColumn = {
  type: null,
  index: null,
  'column-key': null,
  label: null,
  prop: null,
  width: null,
  'min-width': null,
  fixed: null,
  'render-header': null,
  sortable: false,
  'sort-method': null,
  'sort-by': null,
  'sort-orders': ['ascending', 'descending', null],
  resizable: true,
  formatter: null,
  'show-overflow-tooltip': true,
  align: 'left',
  'header-align': null,
  'class-name': null,
  'label-class-name': null,
  selectable: null,
  'reserve-selection': false,
  filters: null,
  'filter-placement': null,
  'filter-multiple': true,
  'filter-method': null,
  'filtered-value': null
}

export const defaultPagination = {
  small: false,
  background: false,
  'page-size': 10,
  total: 0,
  'page-count': 0,
  'pager-count': 7,
  'current-page': 1,
  layout: 'total, sizes, prev, pager, next, jumper',
  'page-sizes': [10, 20, 30, 40, 50, 100],
  'popper-class': '',
  'prev-text': '',
  'next-text': '',
  disabled: false,
  'hide-on-single-page': false
}

export const densityConfig = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '中等',
    value: 'medium'
  },
  {
    label: '紧凑',
    value: 'small'
  },
  {
    label: '迷你',
    value: 'mini'
  }
]
