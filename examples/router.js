/** @format */

import Vue from 'vue'
import Router from 'vue-router'
import navs from './nav.config'

Vue.use(Router)

// 自定义内容
let routes = []

navs.forEach(nav => {
  if (nav.href) return
  if (nav.groups) {
    nav.groups.forEach(group => {
      group.list.forEach(nav => {
        addRoute(nav)
      })
    })
  } else if (nav.children) {
    nav.children.forEach(nav => {
      addRoute(nav)
    })
  } else {
    addRoute(nav)
  }
})

function addRoute(page) {
  const component = page.path === '/changelog' ? () => import('./components/changelog.vue') : () => import(`./views${page.path}.md`)
  let child = {
    path: page.path,
    meta: {
      title: page.title || page.name,
      description: page.description
    },
    name: 'component-' + (page.title || page.name),
    component: component
  }
  routes.push(child)
}

console.log('routes', routes)

export default new Router({
  routes: [
    {
      path: '/',
      children: routes
    }
  ]
})
