<script>
export default {
  name: 'ElAvatar',

  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].indexOf(val) >= 0
        }
        return typeof val === 'number'
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
        return ['circle', 'square'].indexOf(val) >= 0
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    }
  },

  data() {
    return {
      isImageExist: true
    }
  },

  computed: {
    avatarClass() {
      const { size, icon, shape, src } = this
      let classList = ['el-avatar']

      if (size && typeof size === 'string') {
        classList.push(`el-avatar--${size}`)
      }

      if (icon) {
        classList.push('el-avatar--icon')
      }

      if (shape) {
        classList.push(`el-avatar--${shape}`)
      }

      if (src) {
        classList.push(`is-image`)
      }

      return classList.join(' ')
    }
  },

  methods: {
    handleError() {
      const { error } = this
      const errorFlag = error ? error() : undefined
      if (errorFlag !== false) {
        this.isImageExist = false
      }
    },
    renderAvatar() {
      const { icon, src, alt, isImageExist, srcSet, fit } = this

      if (isImageExist && src) {
        return <img src={src} onError={this.handleError} alt={alt} srcSet={srcSet} style={{ 'object-fit': fit }} />
      }

      if (icon) {
        return <i class={icon} />
      }

      return this.$slots.default
    }
  },

  render() {
    const { avatarClass, size } = this

    const sizeStyle =
      typeof size === 'number'
        ? {
            height: `${size}px`,
            width: `${size}px`,
            lineHeight: `${size}px`
          }
        : {}

    return (
      <span class={avatarClass} style={sizeStyle}>
        {this.renderAvatar()}
      </span>
    )
  }
}
</script>
