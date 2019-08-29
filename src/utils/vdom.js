/** @format */

import { hasOwn } from 'yak-ui/src/utils/util'

export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions')
}

/**
 * 克隆 VNode
 * @param {VNode} vnode VNode
 * @param {Boolean} deep 是否深度克隆
 * @param {Object} props 重新赋值组件参数
 */
export function cloneVNode(vnode, deep, props) {
  const componentOptions = Object.assign({}, vnode.componentOptions)
  const data = vnode.data

  componentOptions.propsData = Object.assign({}, componentOptions.propsData, props)

  let listeners = {}
  if (componentOptions && componentOptions.listeners) {
    listeners = Object.assign({}, componentOptions.listeners)
  }

  let on = {}
  if (data && data.on) {
    on = Object.assign({}, data.on)
  }

  const cloned = new vnode.constructor(
    vnode.tag,
    data ? Object.assign({}, data, { on: on }) : data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions ? Object.assign({}, componentOptions, { listeners: listeners }) : componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.isCloned = true
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true)
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true)
    }
  }
  return cloned
}
/**
 * 克隆 VNode集合
 * @param {Array<VNode>} vnodes VNode集合
 * @param {Boolean} deep 是否深度克隆
 */
export function cloneVNodes(vnodes, deep) {
  const len = vnodes.length
  const res = new Array(len)
  for (let i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep)
  }
  return res
}
