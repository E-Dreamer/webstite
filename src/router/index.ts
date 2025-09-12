import { createRouter, createWebHistory, type Router } from 'vue-router'
import { baseRoutes } from './generatorRoutes.js'
import guards from '@/router/guards.ts'
const router:Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes,
})
guards(router)
export default router
