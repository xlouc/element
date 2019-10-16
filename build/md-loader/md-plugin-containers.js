const { stripScript, stripStyle, stripTemplate } = require('./util')
/**
 * Adds custom markdown containers
 *
 * ::: tip
 * My tip...
 * :::
 *
 * ::: warning
 * My warning
 * :::
 *
 * ::: danger
 * My dangerous message
 * :::
 *
 * Custom title:
 *
 * ::: warning WATCH OUT
 * My description
 * :::
 */

const container = require('markdown-it-container')

function createContainer(className, md) {
  if (className === 'demo') {
    return [
      container,
      className,
      {
        validate: function(params) {
          return params.trim().match(/^demo\s*(.*)$/)
        },
        render: function(tokens, idx) {
          const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
          if (tokens[idx].nesting === 1) {
            const description = m && m.length > 1 ? m[1] : ''
            const content =
              tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
            const html = stripTemplate(content)
            const script = stripScript(content)
            const style = stripStyle(content)
            var codepen = { html: html, script: script, style: style }
            codepen = md.utils.escapeHtml(JSON.stringify(codepen))
            return `<demo-block :codepen="${codepen}">
              ${description ? `<div>${md.render(description)}</div>` : ''}
              <!--element-demo: ${content}:element-demo-->
              `
          }
          return '</demo-block>'
        }
      }
    ]
  } else {
    return [
      container,
      className,
      {
        render(tokens, idx) {
          const token = tokens[idx]
          const info = token.info
            .trim()
            .slice(className.length)
            .trim()
          if (token.nesting === 1) {
            return `<div class="doc-note doc-note--${className}" title="${info ||
              md}">\n`
          } else {
            return `</div>\n`
          }
        }
      }
    ]
  }
}

module.exports = function(md) {
  md.use(...createContainer('tip', 'TIP'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'WARNING'))
    .use(...createContainer('demo', md))

    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) =>
        tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`
    })
}
