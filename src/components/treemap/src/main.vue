<script>
import TreeNode from './node'
export default {
  name: 'ElTreemap',
  components: { TreeNode },

  provide() {
    return {
      _elTreemap: this
    }
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    foldable: {
      type: Boolean,
      default: true
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    props: Object,
    rowSpace: {
      type: Number,
      default: 32
    },
    nodeSpace: {
      type: Number,
      default: 24
    }
  },

  computed: {
    nodeProps() {
      const { props, nodeKey } = this
      let labelProps = {}
      if (this.$scopedSlots.default) {
        labelProps['label'] = this.$scopedSlots.default
      }
      return Object.assign(
        {
          id: nodeKey,
          label: 'label',
          children: 'children'
        },
        props,
        labelProps
      )
    },
    config() {
      const { nodeProps, rowSpace, nodeSpace, foldable } = this
      return {
        props: nodeProps,
        rowSpace,
        nodeSpace,
        foldable
      }
    }
  },
  render(h) {
    const { data, nodeKey, config, nodeSpace } = this
    return (
      <div class="el-treemap">
        {data.map(function(item, index) {
          let key = item[nodeKey] || String(index)
          return (
            <TreeNode
              key={key}
              data={item}
              config={config}
              index={String(index + 1)}
              root
              style={{ paddingLeft: index === 0 ? false : `${nodeSpace}px` }}
            />
          )
        })}
      </div>
    )
  }
}
</script>
