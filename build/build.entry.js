/** @format */

var path = require('path')
var fs = require('fs')
var render = require('json-templater/string')
var pack = require('../package.json')
var fileSave = require('file-save')
var componentsList = fs.readdirSync(path.resolve(__dirname, '../src/components'))

var MAIN_TEMPLATE = `/** @format */

/* Automatically generated by './build/build-entry.js' */

{{include}}
import locale from 'yak-ui/src/locale'
import CollapseTransition from 'yak-ui/src/transitions/collapse-transition'

const components = [
{{install}},
  CollapseTransition
]

const install = function(Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(InfiniteScroll)
  Vue.use(Loading.directive)

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '{{version}}',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  Loading,
{{list}}
}
`
var IMPORT_TEMPLATE = "import {{name}} from './components/{{package}}/index.js'"
var INSTALL_COMPONENT_TEMPLATE = '  {{name}}'

function buildViewName(str) {
  var viewName = str.split('-')
  return viewName
    .map(function(item, index) {
      return item.charAt(0).toUpperCase() + item.substr(1)
    })
    .join('')
}

var dirs = []

componentsList.forEach(function(key) {
  var data = fs.statSync(path.resolve(__dirname, `../src/components/${key}`))
  if (data.isDirectory()) {
    dirs.push(key)
  }
})

var components = {}
dirs.forEach(function(componentname) {
  components[componentname] = `../src/components/${componentname}/index.js`
})

fileSave(path.resolve(__dirname, '../components.json'))
  .write(JSON.stringify(components, null, '  '), 'utf8')
  .end('\n')

var includeComponentTemplate = []
var installTemplate = []
var listTemplate = []

dirs.forEach(function(name) {
  var componentName = buildViewName(name)
  includeComponentTemplate.push(
    render(IMPORT_TEMPLATE, {
      name: componentName,
      package: name
    })
  )

  if (['Loading', 'MessageBox', 'Notification', 'Message'].indexOf(componentName) === -1) {
    installTemplate.push(
      render(INSTALL_COMPONENT_TEMPLATE, {
        name: componentName,
        component: name
      })
    )
  }

  if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`)
})

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join('\n'),
  install: installTemplate.join(',\n'),
  version: process.env.VERSION || pack.version,
  list: listTemplate.join(',\n')
})

fileSave(path.resolve(__dirname, '../src/index.js'))
  .write(template, 'utf8')
  .end('')