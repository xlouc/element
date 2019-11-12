<script>
import { cloneVNode } from 'yak-ui/src/utils/vdom'
import ResponsiveObserve, { responsiveArray } from 'yak-ui/src/utils/responsive-observe'
import Col from './col'

const defaultColumnMap = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
}

export default {
  name: 'ElDescriptions',
  components: { Col },
  props: {
    title: String,
    bordered: Boolean,
    column: {
      type: [Number, Object],
      default: 3
    },
    size: String,
    layout: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) >= 0
      }
    },
    colon: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      screens: {}
    }
  },

  mounted() {
    const { column } = this
    this.token = ResponsiveObserve.subscribe(screens => {
      if (typeof column !== 'object') {
        return
      }
      this.screens = screens
    })
  },

  beforeDestroy() {
    ResponsiveObserve.unsubscribe(this.token)
  },

  methods: {
    _renderRow(h, children, index, { column, isLast }) {
      const { layout, colon, bordered } = this
      const childrenArray = [...children]
      let lastChildren = childrenArray.pop()
      const span = column - childrenArray.length
      if (isLast) {
        lastChildren = cloneVNode(lastChildren, false, {
          span
        })
      }
      childrenArray.push(lastChildren)

      const renderCol = (childrenItem, type, idx) => (
        <Col
          child={childrenItem}
          bordered={bordered}
          colon={colon}
          type={type}
          key={`${type}-${idx}`}
          layout={layout}
        />
      )
      const cloneChildren = []
      const cloneContentChildren = []
      childrenArray.forEach((childrenItem, idx) => {
        cloneChildren.push(renderCol(childrenItem, 'label', idx))
        if (layout === 'vertical') {
          cloneContentChildren.push(renderCol(childrenItem, 'content', idx))
        } else if (bordered) {
          cloneChildren.push(renderCol(childrenItem, 'content', idx))
        }
      })
      if (layout === 'vertical') {
        return [
          <tr class="el-descriptions-row" key={`label-${index}`}>
            {cloneChildren}
          </tr>,
          <tr class="el-descriptions-row" key={`content-${index}`}>
            {cloneContentChildren}
          </tr>
        ]
      }

      return (
        <tr class="el-descriptions-row" key={index}>
          {cloneChildren}
        </tr>
      )
    },

    getColumn() {
      const { column } = this
      if (typeof column === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint = responsiveArray[i]
          if (this.screens[breakpoint] && column[breakpoint] !== undefined) {
            return column[breakpoint] || defaultColumnMap[breakpoint]
          }
        }
      }
      // If the configuration is not an object, it is a number, return number
      if (typeof column === 'number') {
        return column
      }
      // If it is an object, but no response is found, this happens only in the test.
      // Maybe there are some strange environments
      return 3
    },

    _generateChildrenRows(cloneChildren, column) {
      const childrenArray = []
      let columnArray = []
      let totalRowSpan = 0
      cloneChildren.forEach(node => {
        if (!node.tag) return
        columnArray.push(node)
        if (node.componentOptions.propsData.span) {
          totalRowSpan += node.componentOptions.propsData.span
        } else {
          totalRowSpan += 1
        }
        if (totalRowSpan >= column) {
          childrenArray.push(columnArray)
          columnArray = []
          totalRowSpan = 0
        }
      })

      if (columnArray.length > 0) {
        childrenArray.push(columnArray)
        columnArray = []
      }
      return childrenArray
    }
  },

  render(h) {
    const { title, bordered, _renderRow, _generateChildrenRows, size } = this
    const column = this.getColumn()
    let childrenArray = this.$slots.default
    if (!Array.isArray(childrenArray)) childrenArray = [childrenArray]
    childrenArray = _generateChildrenRows(childrenArray, column)
    return (
      <div
        class={[
          'el-descriptions',
          {
            [`el-descriptions--${size}`]: Boolean(size),
            'el-descriptions--bordered': bordered
          }
        ]}>
        {title && <div class="el-descriptions__title">{title}</div>}
        <div class="el-descriptions__view">
          <table>
            <tbody>
              {childrenArray.map((child, index) =>
                _renderRow(h, child, index, {
                  column,
                  isLast: index === childrenArray.length - 1
                })
              )}
            </tbody>
          </table>
          <div class="el-descriptions__hide">{this.$slots.default}</div>
        </div>
      </div>
    )
  }
}
</script>
