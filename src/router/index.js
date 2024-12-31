import { createRouter, createWebHistory } from 'vue-router'
import '../views/HomeView.vue'
import BookList from '@/views/BookList.vue'
import AuthorList from '@/views/AuthorList.vue'
const routes = [
  { path: '/books', component: BookList },
  { path: '/authors', component: AuthorList },
  { path: '/', redirect: '/books' }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
