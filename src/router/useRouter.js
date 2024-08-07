/*
 * @FilePath: \vue2.7_admin_template-master\src\router\useRouter.js
 * @Author: zhangxin
 * @Date: 2022-11-30 10:18:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-11-16 17:19:15
 * @Description:
 */
import { defineRouter } from './defineRouter'
import { defineMeta } from '@/router/meta'

export const routes = [
  {
    name: 'login',
    path: '/login',
    meta: defineMeta(),
    component: () => import('@/layout/login/login.vue'),
  },
  {
    name: 'singleLogin',
    path: '/singleLogin',
    meta: defineMeta(),
    component: () => import('@/layout/loginsso/loginsso.vue'),
  },
  {
    name: 'debug',
    path: '/debug',
    meta: defineMeta(),
    component: () => import('@/pages/Debug/debug.vue'),
  },
  {
    name: 'layout',
    path: '/',
    redirect: '/home',
    meta: defineMeta({ level: 0 }),
    component: () => import('@/layout/Home.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          hidden: 'true',
        },
        component: () => import('@/pages/home/home.vue'),
      },
      {
        path: '/debug',
        name: 'debug',
        meta: {
          title: 'debug',
          hidden: 'true',
        },
        component: () => import('@/pages/Debug/debug.vue'),
      },
      {
        path: '/NotPage',
        name: 'NotPage',
        meta: {
          title: 'NotPage',
          hidden: 'true',
        },
        component: () => import('@/pages/NotPage/not-page.vue'),
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    meta: defineMeta({ title: '404' }),
    component: () => import('@/pages/NotPage/not-page.vue'),
  },
  {
    path: '/:catchAll(.*)', // 不识别的path自动匹配404
    redirect: '/404',
  },
]
const router = defineRouter(routes)

export function useRouter() {
  return router.core
}

export function useRoute() {
  return router.core.currentRoute
}

export const resetRoute = router.reset

export default router
