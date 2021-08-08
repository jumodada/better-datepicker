import { createRouter, createWebHashHistory } from 'vue-router'
import Enter from '../components/Enter'
import Document from '../components/Document'
import NProgress from 'nprogress'
import { routeConfig } from './config'

const history = createWebHashHistory()

function createRoute(lang: string, lists: any[]) {
  const createChild = (list: any) => {
    return {
      path: list.path,
      name: list.name,
      metaName: list.metaName,
      isSecondLevel: list.isSecond,
      component: () => import(`../views/${lang}/${list.path}.md`),
    }
  }

  return {
    path: `/${lang}/doc`,
    component: Document,
    redirect: `/${lang}/doc/start`,
    children: lists.map((list) => createChild(list)),
  }
}

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      component: Enter,
      children: [
        {
          path: 'zh',
          name: 'zh',
          component: () => import('../views/zh/home.md'),
        },
        {
          path: 'en',
          name: 'en',
          component: () => import('../views/en/home.md'),
        },
      ],
    },
    createRoute('en', routeConfig('en')),
    createRoute('zh', routeConfig('zh')),
  ],
})

router.beforeEach((to, from, next) => {
  const name = localStorage.getItem('lang') || 'en'
  NProgress.start()
  if (to.path === '/') {
    next({
      name,
    })
  } else if (to.path === '/zh/' || to.path === '/en/') {
    next('/')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
