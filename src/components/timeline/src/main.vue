<script>
export default {
  name: 'ElTimeline',

  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    pending: {
      type: Boolean,
      default: false
    }
  },

  provide() {
    return {
      timeline: this
    }
  },

  render() {
    const reverse = this.reverse
    const classes = {
      'el-timeline': true,
      'is-reverse': reverse,
      'is-pending': this.pending
    }
    let slots = this.$slots.default || []
    if (reverse) {
      slots = slots.reverse()
    }
    return <ul class={classes}>{slots}</ul>
  }
}
</script>
