import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import ModuleView from '@/views/ModulePage/ModuleView.vue'
import ProfileView from '@/views/ProfilePage/ProfileView.vue'
import AboutView from '@/views/AboutView.vue'
import AdvertisingView from '@/views/AdvertisingView.vue'

import UsersView from '@/views/Admin/UsersPage/UsersView.vue'

import ErrorView from '@/views/ErrorView.vue'

import { useUserStore } from '@/stores/UserStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/modules',
      name: 'modules',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/admin/users',
      name: 'users',
      component: UsersView,
      meta: { roles: ['ADMIN'] }
    },
    {
      path: '/modules/:id',
      component: ModuleView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/profile/:id',
      component: ProfileView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/advertising',
      name: 'advertising',
      component: AdvertisingView
    },
    {
      path: '/dev',
      name: 'dev',
      meta: { roles: ['ADMIN'] },
      component: () => import('@/views/DevView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ErrorView
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.meta.roles && !to.meta.roles.includes(userStore.user?.role)) {
    return { name: 'NotFound' }
  }
})

export default router
