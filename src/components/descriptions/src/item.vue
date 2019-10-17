<script>
export default {
  name: 'ElDescriptionsItem',
  props: {
    label: String,
    span: {
      type: Number,
      default: 1
    }
  },
  render(h) {
    return (
      <div data-label={this.label} data-span={this.span}>
        {this.$slots.default}
      </div>
    )
  }
}
</script>
