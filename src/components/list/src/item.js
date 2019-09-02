/** @format */
import { isVNode } from 'yak-ui/src/utils/vdom'
import Avatar from 'yak-ui/components/avatar'
import Col from 'yak-ui/components/col'

const ListItemMeta = {
  name: 'ElListItemMeta',
  props: {
    avatar: {},
    title: {},
    description: {}
  },
  functional: true,
  render: function(h, context) {
    const { avatar, title, description } = context.props
    let avatarVm = h(false)

    if (isVNode(avatar)) {
      avatarVm = avatar
    } else if (avatar) {
      avatarVm = h(Avatar, { props: { src: avatar, shape: 'circle' } })
    }
    let titleVm = h('h4', { class: 'el-list-item__meta-title' }, [title])
    let descrVm = h('div', { class: 'el-list-item__meta-description' }, [description])
    return (
      <div class="el-list-item__meta">
        <div class="el-list-item__meta--avatar">{avatarVm}</div>
        <div class="el-list-item__meta--content">
          {titleVm}
          {descrVm}
        </div>
      </div>
    )
  }
}

export default {
  name: 'ElListItem',

  inject: ['_elList'],

  props: {
    avatar: String,
    title: String,
    description: String,
    extra: String
  },

  computed: {
    isFlexMode() {
      if (this._elList.layout === 'vertical') {
        return !!this.$slots.extra
      } else {
        let result
        let defs = this.$slots.default
        if (!Array.isArray(defs)) {
          defs = [defs]
        }
        defs.forEach(function(element) {
          if (isVNode(element) && !element.tag) {
            result = true
          }
        })
        return !result
      }
    }
  },

  render(h) {
    const { isFlexMode, _elList } = this
    let avatar = this.avatar || this.$slots.avatar
    let title = this.title || this.$slots.title
    let description = this.description || this.$slots.description
    let extra = this.extra || this.$slots.extra
    const isMeta = avatar && title && description
    const actions = this.$slots.actions
    let layout = []
    if (_elList.layout === 'vertical' && extra) {
      layout.push(
        <div class="el-list-item__main" key="content">
          {isMeta &&
            h(ListItemMeta, {
              props: { avatar, title, description }
            })}
          {this.$slots.default}
          {actions && <div class="el-list-item__action">{actions}</div>}
        </div>
      )
      layout.push(
        <div class="el-list-item__extra" key="extra">
          {extra}
        </div>
      )
    } else {
      layout.push(isMeta && h(ListItemMeta, { props: { avatar, title, description } }))
      layout.push(this.$slots.default)
      if (actions) {
        layout.push(<div class="el-list-item__action">{actions}</div>)
      }
    }

    if (_elList.itemAttr) {
      return h(Col, { props: _elList.itemAttr }, [<div class={{ 'el-list-item': true, 'is-no-flex': !isFlexMode }}>{layout}</div>])
    } else {
      return <li class={{ 'el-list-item': true, 'is-no-flex': !isFlexMode }}>{layout}</li>
    }
  }
}
