import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import ModuleView from '@/views/ModulePage/ModuleView.vue'
import ProfileView from '@/views/ProfileView.vue'

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
    }
  ]
})

export default router
