<!-- @format -->
<script>
import { t } from 'yak-ui/src/locale'
import Divider from 'yak-ui/components/divider'
export default {
  name: 'ElPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title')
      }
    },

    subTitle: {
      type: String
    },

    backIcon: {
      type: [String, Boolean],
      default: 'el-icon-arrowleft'
    }
  },

  methods: {
    renderBack(h) {
      const { backIcon } = this
      if (!backIcon) return h(false)
      return (
        <div class="el-page-header__back">
          <div class="el-back-button" on-click={event => this.$emit('back', event)}>
            <i class={['el-back-button__icon', backIcon]}></i>
          </div>
          {h(Divider, { props: { direction: 'vertical' } })}
        </div>
      )
    },
    renderTitle(h) {
      const { renderBack } = this
      const { tags, extra } = this.$slots
      const title = this.title || this.$slots.title
      const subTitle = this.subTitle || this.$slots.subTitle
      if (title || subTitle || tags || extra) {
        return (
          <div class="el-page-header__heading">
            {renderBack(h)}
            {title && <span class="el-page-header__heading--title">{title}</span>}
            {subTitle && <span class="el-page-header__heading--sub-title">{subTitle}</span>}
            {tags && <span class="el-page-header__heading--tags">{tags}</span>}
            {extra && <span class="el-page-header__heading--extra">{extra}</span>}
          </div>
        )
      }
      return h(false)
    },
    renderFooter(h) {
      const footer = this.$slots.footer
      if (footer) {
        return <div class="el-page-header__footer">{footer}</div>
      }
      return h(false)
    }
  },
  render(h) {
    const { renderTitle, renderFooter, $slots } = this
    return (
      <div class={['el-page-header', { 'is-footer': Boolean(this.$slots.footer), 'is-breadcrumb': Boolean(this.$slots.breadcrumb) }]}>
        {this.$slots.breadcrumb}
        {renderTitle(h)}
        {$slots.default && <div class="el-page-header__content">{$slots.default}</div>}
        {renderFooter(h)}
      </div>
    )
  }
}
</script>
