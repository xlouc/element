<template>
  <div class="el-treemap">
    <tree-node
      v-for="(item, index) in data"
      :key="item[nodeKey]"
      :data="item"
      :config="config"
      :style="{ paddingLeft: index === 0 ? false : '' }"
    />
  </div>
</template>

<script>
import TreeNode from './node'
export default {
  name: 'ElTreemap',
  components: { TreeNode },

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
      default: 24
    },
    nodeSpace: {
      type: Number,
      default: 16
    },
    clickNodeToFold: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    nodeProps() {
      const { props, nodeKey } = this
      return Object.assign(
        {
          id: nodeKey,
          label: 'label',
          children: 'children',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
        },
        props
      )
    },
    config() {
      const { nodeProps, rowSpace, nodeSpace, foldable, clickNodeToFold } = this
      return {
        props: nodeProps,
        rowSpace,
        nodeSpace,
        foldable,
        clickNodeToFold
      }
    }
  }
}
</script>
