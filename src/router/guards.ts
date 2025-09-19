/**
 * 路由拦截器
 * @param router
 */
import userRouteStore from '@/stores/addRoutes.ts'
import { type Router } from 'vue-router'
import userInfoStore from '@/stores/userInfo.ts'
let whiteRoute: string[] = ['/login']
/**
 * 这是浏览器窗口的title
 * @param title string
 */
function setTitle(title: string) {
  document.title = title
}
function guards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    //document.title = to.meta.title as string;
    to?.meta?.title && setTitle(String(to.meta.title))
    // 判断是否有token token不存在重新获取
    let routeStore = userRouteStore()
    let userInfo = userInfoStore()
    const { getUserInfo } = userInfo
    if (userInfo.token) {
      if (to.path === '/login') {
        next({ path: '/' })
        return
      }
      if (!routeStore.hasRoute) {
        console.log('进来重新刷新路由')
        try {
          await getUserInfo()
          next({ ...to, replace: true })
        } catch (err) {
          console.log('加载动态路由失败', err)
          userInfo.logout()
          next({ path: '/login' })
        }
        return
      }
      next()
    } else {
      // 白名单不鉴权直接跳转
      if (whiteRoute.includes(to.path)) return next()
      next({ name: 'login' })
    }
  })
  router.afterEach(() => {})
}
export default guards
