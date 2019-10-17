<script>
import Avatar from './avatar'
import Title from './title'
import Paragraph from './paragraph'

function getComponentProps(prop) {
  if (prop && typeof prop === 'object') {
    return prop
  }
  return {}
}

function getAvatarBasicProps(hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    return { shape: 'square' }
  }

  return { shape: 'circle' }
}

function getTitleBasicProps(hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return { width: '38%' }
  }

  if (hasAvatar && hasParagraph) {
    return { width: '50%' }
  }

  return {}
}

function getParagraphBasicProps(hasAvatar, hasTitle) {
  const basicProps = {}

  // Width
  if (!hasAvatar || !hasTitle) {
    basicProps.width = '61%'
  }

  // Rows
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3
  } else {
    basicProps.rows = 2
  }

  return basicProps
}

export default {
  name: 'ElSkeleton',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    active: Boolean,
    avatar: {
      type: [Boolean, Object],
      default: false
    },
    loading: Boolean,
    paragraph: {
      type: [Boolean, Object],
      default: true
    },
    title: {
      type: [Boolean, Object],
      default: true
    }
  },
  components: {
    Avatar,
    Paragraph,
    Title
  },
  render(h) {
    const { tag, loading, active, avatar, paragraph, title } = this
    if (loading || !('loading' in this)) {
      const hasAvatar = !!avatar
      const hasTitle = !!title
      const hasParagraph = !!paragraph

      let avatarNode
      if (hasAvatar) {
        const avatarProps = {
          class: `el-skeleton__avatar`,
          props: {
            ...getAvatarBasicProps(hasTitle, hasParagraph),
            ...getComponentProps(avatar)
          }
        }
        avatarNode = (
          <div class="el-skeleton__header">
            <Avatar {...avatarProps} />
          </div>
        )
      }
      let contentNode
      if (hasTitle || hasParagraph) {
        let titleNode
        if (hasTitle) {
          const titleProps = {
            class: `el-skeleton__title`,
            props: {
              ...getTitleBasicProps(hasAvatar, hasParagraph),
              ...getComponentProps(title)
            }
          }
          titleNode = <Title {...titleProps} />
        }

        let paragraphNode
        if (hasParagraph) {
          const paragraphProps = {
            class: `el-skeleton__paragraph`,
            props: {
              ...getParagraphBasicProps(hasAvatar, hasTitle),
              ...getComponentProps(paragraph)
            }
          }
          paragraphNode = <Paragraph {...paragraphProps} />
        }

        contentNode = (
          <div class="el-skeleton__content">
            {titleNode}
            {paragraphNode}
          </div>
        )
      }
      const cls = [
        'el-skeleton',
        {
          'el-skeleton--with-avatar': hasAvatar,
          'is-active': active
        }
      ]
      return h(tag, { class: cls }, [avatarNode, contentNode])
    }
    return this.$slots.default
  }
}
</script>
