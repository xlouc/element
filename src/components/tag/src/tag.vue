<script>
import tinycolor from 'tinycolor2'
export default {
  name: 'ElTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1
      }
    }
  },

  methods: {
    handleClose(event) {
      event.stopPropagation()
      this.$emit('close', event)
    },
    handleClick(event) {
      this.$emit('click', event)
    }
  },

  computed: {
    tagSize() {
      return this.size || (this.$ELEMENT || {}).size
    },
    tagStyle() {
      const { effect } = this
      if (!this.color) return
      let backgroundColor = tinycolor.mix(this.color, '#fff', 90)
      let color = this.color
      let borderColor = tinycolor.mix(this.color, '#fff', 80)
      if (effect === 'dark') {
        backgroundColor = this.color
        color = tinycolor.mix(this.color, '#fff', 100)
        borderColor = this.color
      } else if (effect === 'plain') {
        backgroundColor = tinycolor.mix(this.color, '#fff', 100)
        color = this.color
        borderColor = tinycolor.mix(this.color, '#fff', 40)
      }
      return { backgroundColor, color, borderColor }
    }
  },

  render(h) {
    const { type, tagSize, hit, effect } = this
    const classes = [
      'el-tag',
      type ? `el-tag--${type}` : '',
      tagSize ? `el-tag--${tagSize}` : '',
      effect ? `el-tag--${effect}` : '',
      hit && 'is-hit'
    ]
    const tagEl = (
      <span class={classes} style={this.tagStyle} on-click={this.handleClick}>
        {this.$slots.default}
        {this.closable && (
          <i
            class="el-tag__close el-icon-close"
            on-click={this.handleClose}></i>
        )}
      </span>
    )

    return this.disableTransitions ? (
      tagEl
    ) : (
      <transition name="el-zoom-in-center">{tagEl}</transition>
    )
  }
}
</script>
