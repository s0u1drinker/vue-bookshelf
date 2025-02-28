import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  linkActiveClass: 'navigation__link_active',
  linkExactActiveClass: '',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: () => import('@/views/BookshelfView.vue'),
    },
    {
      path: '/bookstore',
      name: 'bookstore',
      component: () => import('@/views/BookstoreView.vue'),
    },
    {
      path: '/book/:isbn',
      nme: 'book',
      component: () => import('@/views/BookView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404View.vue'),
    },
  ],
})

export default router
