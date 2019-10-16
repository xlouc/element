import NProgress from 'nprogress'
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
  const component =
    page.path === '/changelog'
      ? () => import('./pages/changelog.vue')
      : () => import(`./docs${page.path}.md`)
  let child = {
    path: page.path.slice(1),
    meta: {
      title: page.title || page.name,
      description: page.description
    },
    name: 'component-' + (page.title || page.name),
    component: component
  }
  routes.push(child)
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/guide'
    },
    {
      path: '/guide',
      component: () => import('./pages/guide.vue'),
      redirect: '/guide/about',
      children: [
        {
          path: 'design',
          meta: {
            title: '',
            description: ''
          },
          component: () => import('./pages/guide.design.vue')
        },
        {
          path: 'nav',
          meta: {
            title: '',
            description: ''
          },
          component: () => import('./pages/guide.nav.vue')
        },
        {
          path: 'about',
          meta: {
            title: '',
            description: ''
          },
          component: () => import('./pages/guide.about.vue')
        }
      ]
    },
    {
      path: '/resource',
      component: () => import('./pages/resource.vue')
    },
    {
      path: '/components',
      component: () => import('./pages/component.vue'),
      redirect: '/components/installation',
      children: routes
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  NProgress.inc()
  setTimeout(() => {
    next()
  }, 100)
})

router.afterEach(route => {
  if (route.meta && route.meta.title) {
    document.title = `${route.meta.title} - Yak UI - Vue 2.0 的桌面端组件库`
  }
  Vue.nextTick(() => {
    setTimeout(() => {
      NProgress.done()
    }, 100)
  })
})

export default router
