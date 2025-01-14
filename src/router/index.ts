import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import path from 'path'
import { sysVals } from '@/stores/sysVals'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        requiresAuth:false
      }
    },
    {
      path: '/comments',
      name: 'comments',
      component: () => import('../views/CommentsView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/LoginView.vue'),
      meta:{
        requiresAuth:false
      }
    },
    {
      path:'/register',
      name:'register',
      component: () => import('../views/RegisterView.vue'),
      meta:{
        requiresAuth:false
      }
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/contact',
      name:'contact',
      component: () => import('../views/ContactView.vue'),
      meta:{
        requiresAuth:false
      }
    },
    {
      path: '/policy',
      name: 'policy',
      component: () => import('../views/PolicyView.vue'),
      meta:{
        requiresAuth:false
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue'),
      meta:{
        requiresAuth:false
      }
    },
    {
      path:'/test',
      name:'test',
      component: () => import('../views/TestView.vue'),
      meta:{
        requiresAuth:false
      }
    }

  ],
})

export default router

router.beforeEach((to, from, next) => {
  const isAuth = sysVals().getIsUserAuth;
  if(to.meta.requiresAuth && !isAuth){
    next({name:'login'})
  }else{
    next()
  }
})
