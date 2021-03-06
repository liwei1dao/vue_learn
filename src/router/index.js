import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login/index')
    },
    {
      path: '/auth-redirect',
      component: () => import('@/views/login/auth-redirect'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/error-page/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/views/error-page/401'),
      hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
          {
            path: 'home',
            component: () => import('@/views/home/index'),
            name: 'Home',
            meta: { title: 'Home', icon: 'dashboard', affix: true }
          }
        ]
    }
]


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

// 需要通过后台数据来生成的组件

const createRouter = () => new Router({
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


