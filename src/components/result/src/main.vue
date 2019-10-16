<script>
import noFound from './noFound'
import serverError from './serverError'
import unauthorized from './unauthorized'
const IconMap = {
  success: 'el-icon-check-circle-fill',
  error: 'el-icon-close-circle-fill',
  info: 'el-icon-info-circle-fill',
  warning: 'el-icon-warning-circle-fill'
}

const ExceptionMap = {
  '404': noFound,
  '500': serverError,
  '403': unauthorized
}

const renderIcon = function(h, status, icon) {
  let isImage = false
  let iconNode
  if (status in ExceptionMap) {
    isImage = true
    iconNode = h(ExceptionMap[status])
  } else {
    const iconString = IconMap[status]
    iconNode =
      typeof icon === 'string' || !icon ? <i class={iconString}></i> : icon
  }
  return (
    <div class={['el-result__icon', { 'is-image': isImage }]}>{iconNode}</div>
  )
}

export default {
  name: 'ElResult',
  props: {
    icon: String,
    status: {
      type: String,
      default: 'info'
    },
    title: String,
    subTitle: String
  },
  functional: true,
  render(h, context) {
    const { status, icon, title, subTitle } = context.props
    const $slots = context.slots()
    return (
      <div
        class={['el-result', { [`el-result--${status}`]: status }]}
        {...context.data}>
        {renderIcon(h, status, $slots.icon || icon)}
        <div class="el-result__title">{$slots.title || title}</div>
        {($slots.subTitle || subTitle) && (
          <div class="el-result__subtitle">{$slots.subTitle || subTitle}</div>
        )}
        {$slots.default && (
          <div class="el-result__content">{$slots.default}</div>
        )}
        {$slots.extra && <div class="el-result__extra">{$slots.extra}</div>}
      </div>
    )
  }
}
</script>
