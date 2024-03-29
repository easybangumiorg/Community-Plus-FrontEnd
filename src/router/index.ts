import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview', // 概览
      component: () => import('../views/HomeView.vue')
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
      path: '/category/:cid',
      name: 'category-info', // 分类内项管理
      component: () => import('../views/CategoryInfoView.vue')
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
      path: '/profile/:id',
      name: 'profile-detail', // 用户信息
      component: () => import('../views/ProfileDetailView.vue')
    },
    {
      path: '/chpasswd',
      name: 'chpasswd', // 修改密码
      component: () => import('../views/ChangePasswordView.vue')
    },
    {
      path: '/settings',
      name: 'settings', // 系统设置
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
