const getWidth = function(index, context) {
  const { width, rows = 2 } = context.props
  if (Array.isArray(width)) {
    return width[index]
  }
  // last paragraph
  if (rows - 1 === index) {
    return width
  }
  return undefined
}

export default {
  name: 'SkeletonParagraph',
  props: {
    rows: Number,
    width: [String, Number, Array]
  },
  functional: true,
  render(h, context) {
    const { rows } = context.props
    const rowList = [...Array(rows)].map((_, index) => <li key={index} style={{ width: getWidth(index, context) }} />)
    return <ul {...context.data}>{rowList}</ul>
  }
}
