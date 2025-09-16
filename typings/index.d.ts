// 全局
import type { RouteRecordRaw } from 'vue-router'

declare global {
  // 定义一个接口 用来限制后端返回的路由list信息
  interface BackData {
    pId: string
    id: string
    title: string
    key: string
    path: string
    component: string
    keepAlive?: boolean
    hidden?: boolean
    hiddenHeader?: boolean
  }
  type CustomRoute = RouteRecordRaw & { id?: string }
}
