<script>
export default {
  name: 'ElDescriptionsCol',
  props: {
    child: {},
    bordered: Boolean,
    colon: Boolean,
    type: {
      type: String,
      validator(val) {
        return ['label', 'content'].indexOf(val) >= 0
      }
    },
    layout: String
  },

  functional: true,

  render: function(h, context) {
    const { child, bordered, colon, type, layout } = context.props
    const { label, span = 1 } = child.componentOptions.propsData
    const children = child.componentOptions.children

    const labelProps = {
      class: [
        'el-descriptions__item-label',
        { 'is-colon': colon, 'is-no-label': !label }
      ],
      attrs: {}
    }

    if (layout === 'vertical') {
      labelProps.attrs.colSpan = span * 2 - 1
    }

    if (bordered) {
      if (type === 'label') {
        return <th {...labelProps}>{label}</th>
      }
      return (
        <td class="el-descriptions__item-content" colSpan={span * 2 - 1}>
          {children}
        </td>
      )
    }

    if (layout === 'vertical') {
      if (type === 'content') {
        return (
          <td colSpan={span} class="el-descriptions__item">
            <span class="el-descriptions__item-content">{children}</span>
          </td>
        )
      }

      return (
        <td colSpan={span} class="el-descriptions__item">
          <span
            class={['el-descriptions__item-label', { 'is-colon': colon }]}
            key="label">
            {label}
          </span>
        </td>
      )
    }

    return (
      <td colSpan={span} class="el-descriptions__item">
        <span {...labelProps}>{label}</span>
        <span class={`el-descriptions__item-content`}>{children}</span>
      </td>
    )
  }
}
</script>
