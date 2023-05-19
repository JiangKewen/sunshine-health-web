import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginIndex.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/layout/LayoutIndx.vue'),
      redirect: '/report',
      children: [
        {
          name: '/report',
          path: '/report',
          component: () => import('@/views/report/ReportIndex.vue')
        },
        {
          name: '/customer',
          path: '/customer',
          component: () => import('@/views/customer/CustomerIndex.vue')
        },
        {
          name: '/user',
          path: '/user',
          component: () => import('@/views/user/UserIndex.vue')
        },
        {
          name: '/role',
          path: '/role',
          component: () => import('@/views/role/RoleIndex.vue')
        }
      ]
    }
  ]
})

export default router
