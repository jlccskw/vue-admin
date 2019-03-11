import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: false,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '控制面板', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/jandan',
    component: Layout,
    redirect: '/jandan',
    name: 'jandan',
    hidden: false,
    children: [
      {
        path: 'list',
        name: 'jandanList',
        component: () => import('@/views/jandan/list'),
        props: route => ({ page: route.query.page }),
        meta: { title: '文章列表', icon: 'tree' }
      },
      {
        path: 'article/:id(\\d+)',
        name: 'jandanArticle',
        component: () => import('@/views/jandan/article'),
        meta: { title: '文章内容', icon: 'tree' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'jandanEdit',
        component: () => import('@/views/jandan/edit'),
        meta: { title: '修改文章', icon: 'tree' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  // base: process.env.BASE_URL,
  routes: constantRouterMap
})
