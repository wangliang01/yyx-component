export default {
  name: 'TableExpand',
  functional: true,
  props: {
    row: Object,
    col: Object,
    render: Function,
    data: Array,
    index: Number,
    colIndex: [Number, String]
  },
  render(h, ctx) {
    const randomIndex = Math.random()
      .toString(35)
      .replace('.', '')
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
      colIndex: ctx.props.colIndex || randomIndex
    }
    if (ctx.props.col) {
      params.col = ctx.props.col
    }
    if (ctx.props.data) {
      params.data = ctx.props.data
    }
    return ctx.props.render && ctx.props.render(h, params)
  }
}
