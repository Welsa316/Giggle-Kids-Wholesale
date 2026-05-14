import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/collections/:handle',
    name: 'collection',
    component: () => import('../views/CollectionView.vue'),
    props: true,
  },
  {
    path: '/products/:handle',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/AccountView.vue'),
  },
  {
    path: '/account/login',
    name: 'account-login',
    component: () => import('../views/AccountLoginView.vue'),
  },
  {
    path: '/account/callback',
    name: 'account-callback',
    component: () => import('../views/AccountCallbackView.vue'),
  },
  {
    path: '/account/orders',
    name: 'account-orders',
    component: () => import('../views/AccountView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
