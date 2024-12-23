import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
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
      component: () => import('../views/BookshelfView.vue'),
    },
    {
      path: '/bookstore',
      name: 'bookstore',
      component: () => import('../views/BookstoreView.vue'),
    },
  ],
})

export default router
