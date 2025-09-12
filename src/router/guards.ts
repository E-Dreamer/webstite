/**
 * 路由拦截器
 * @param router
 */
import userRouteStore from '@/stores/addRoutes.ts'
import type { RouteLocationNormalized, Router } from 'vue-router'
let whiteRoute:string[] = ['/login']
let hasToken = '';

/**
 * 这是浏览器窗口的title
 * @param title string
 */
function setTitle(title:string){
  document.title = title;
}
function guards(router:Router){
  router.beforeEach((to, from, next) => {
    //document.title = to.meta.title as string;
    setTitle(String(to.meta.title));
    // 白名单不鉴权直接跳转
    if(whiteRoute.includes(to.path)) return next();
    // 判断是否有token token不存在重新获取
    let routeStore = userRouteStore()
    const {getUserRoutes} = routeStore
    if(!hasToken){
      getUserRoutes().then((res:CustomRoute[])=>{
        res.forEach(route=>{
          router.addRoute(route);
          console.log(router,'router')
        })
        hasToken = Math.random() * 100000 + 1 +''
        next({...to,replace:true})
      })
    }else {
      next()
    }
  })
  router.afterEach(() => {})
}
export default guards;
