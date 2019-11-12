const highlight = require('./highlight')
/**
 *  覆盖默认的 fence 渲染策略
 */
module.exports = function(md) {
  const defaultRender = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1]
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)
    if (token.info === 'html' && isInDemoContainer) {
      return `<template v-slot:highlight>${highlight(token.content, 'html')}</template>`
    }
    return defaultRender(tokens, idx, options, env, self)
  }
}
