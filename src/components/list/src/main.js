/** @format */
import Row from 'yak-ui/components/row'

const getGrid = function(grid, t) {
  return grid[t] && Math.floor(24 / grid[t])
}

export default {
  name: 'ElList',

  props: {
    bordered: Boolean,
    split: {
      type: Boolean,
      default: true
    },
    size: String,
    header: String,
    footer: String,
    grid: Object,
    layout: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) >= 0
      }
    }
  },

  provide() {
    return {
      _elList: this
    }
  },

  computed: {
    itemAttr() {
      if (!this.grid) return false
      let itemAttr = {}
      itemAttr.span = getGrid(this.grid, 'column')
      itemAttr.xs = getGrid(this.grid, 'xs')
      itemAttr.sm = getGrid(this.grid, 'sm')
      itemAttr.md = getGrid(this.grid, 'md')
      itemAttr.lg = getGrid(this.grid, 'lg')
      itemAttr.xl = getGrid(this.grid, 'xl')
      return itemAttr
    }
  },

  render(h) {
    const { bordered, split, size, layout, grid } = this
    let header = this.header || this.$slots.header
    let footer = this.footer || this.$slots.footer
    const className = {
      'el-list': true,
      'el-list--vertical': layout === 'vertical',
      'el-list--bordered': bordered,
      'el-list--split': split,
      [`el-list--${size}`]: Boolean(size)
    }

    let childrenContent

    if (grid) {
      childrenContent = h(Row, { props: { gutter: grid.gutter || 0 } }, [<div class="el-list__items">{this.$slots.default}</div>])
    } else {
      childrenContent = <ul class="el-list__items">{this.$slots.default}</ul>
    }

    return (
      <div class={className}>
        {header && <div class="el-list__header">{header}</div>}
        {childrenContent}
        {footer && <div class="el-list__footer">{footer}</div>}
      </div>
    )
  }
}
