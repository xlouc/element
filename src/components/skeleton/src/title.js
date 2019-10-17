export default {
  name: 'SkeletonTitle',
  props: {
    width: [String, Number]
  },
  functional: true,
  render(h, context) {
    const { width } = context.props
    return <h3 {...context.data} style={{ width }} />
  }
}
