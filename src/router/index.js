import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('@/views/home')
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

export default router

// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

//   const routes = [
//   {
//     path: '/',
//     name: 'Login',
//     component: () => import('@/views/login')
//   },
//   {
//     path: '/home',
//     name: 'Home',
//     component: () => import('@/views/home')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router
