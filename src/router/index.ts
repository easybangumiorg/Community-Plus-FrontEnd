import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview', // 概览
      component: HomeView
    },
    {
      path: '/about',
      name: 'about', // 关于
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login', // 登录
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/category',
      name: 'category', // 分类管理
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/post',
      name: 'post',  // 番剧管理
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/collection',
      name: 'collection', // 合集管理
      component: () => import('../views/CollectionView.vue')
    },
    {
      path: '/user',
      name: 'user', // 用户管理
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/profile',
      name: 'profile', // 个人中心
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/settings',
      name: 'settings', // 系统设置
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
