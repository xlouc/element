/** @format */

export default {
  name: 'SkeletonAvatar',
  props: {
    size: {
      type: String,
      default: 'large',
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) >= 0
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator(value) {
        return ['circle', 'square'].indexOf(value) >= 0
      }
    }
  },
  functional: true,
  render(h, context) {
    const { size, shape } = context.props
    const sizeCls = {
      [`el-skeleton__avatar-lg`]: size === 'large',
      [`el-skeleton__avatar-sm`]: size === 'small'
    }
    const shapeCls = {
      [`el-skeleton__avatar-circle`]: shape === 'circle',
      [`el-skeleton__avatar-square`]: shape === 'square'
    }
    const cls = {
      ...sizeCls,
      ...shapeCls
    }
    return <span class={cls} {...context.data} />
  }
}
