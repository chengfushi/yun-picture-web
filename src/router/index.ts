import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserManagerPage from '@/pages/admin/UserManagerPage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserProfilePage from '@/pages/user/UserProfilePage.vue'
import AddPicturePage from '@/pages/picture/AddPicturePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: 'login',
      component: UserLoginPage,
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: UserProfilePage,
    },
    {
      path: '/admin/user',
      name: 'admin-user',
      component: UserManagerPage,
    },
    {
      path: '/add_picture',
      name: 'add-picture',
      component: AddPicturePage,
    },
  ],
})

export default router
