import { YakUIComponent, YakUIComponentSize } from './component'
import { TreeNode } from './tree'

type valueType = string | number
type showCheckedStrategy = 'all' | 'parent' | 'child'

/** TreeSelect Component */
export declare class ElTreeSelect<K, D> extends YakUIComponent {
  /** Selected value */
  value: valueType | Array<valueType>

  /** Tree data */
  data: TreeNode<K, D>[]

  /** Whether Select is disabled */
  disabled: boolean

  /** Whether multiple-tree-select is activated */
  multiple: boolean

  /** Whether single TreeSelect can be cleared */
  clearable: boolean

  /** Whether TreeSelect is filterable */
  filterable: boolean

  /** Custom filter method */
  filterMethod:	(value: string, data: D, node: TreeNode<K, D>) => boolean;

  /** Placeholder */
  placeholder: string

  /** Size of Input */
  size: YakUIComponentSize

  /** Whether Checkbox shows */
  showCheckbox: boolean

  /** Strategy to display selected nodes */
  showCheckedStrategy: showCheckedStrategy

  /** Configuration options for Tree */
  props: object

  /** Whether to lazy load leaf node*/
  lazy: boolean

  /** Method for loading subtree data */
  load: (node: TreeNode<K, D>, resolve: Function) => void

  /** Whether checked state of a node not affects its father and child nodes when show-checkbox is true */
  checkStrictly: boolean
}
