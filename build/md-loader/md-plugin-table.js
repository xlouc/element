/**
 * Converts table to QMarkupTable
 */

module.exports = function(md) {
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    token.attrSet('class', 'doc-table')
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.th_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    token.attrSet('class', 'text-left')
    return self.renderToken(tokens, idx, options)
  }
}
