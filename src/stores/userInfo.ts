import { defineStore, storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { type Ref, ref } from 'vue'
import userRouteStore from '@/stores/addRoutes.ts'
import { baseRoutes, noFoundRoute, generatorRoutes } from '@/router/generatorRoutes.ts'
import { cloneDeep } from 'lodash-es'

const backData: BackData[] = [
  {
    pId: '',
    id: '22',
    title: '一级菜单',
    key: 'first',
    path: '/first',
    component: 'PageView',
    hidden: false,
    hiddenHeader: false,
    keepAlive: true,
  },
  {
    id: '1',
    pId: '22',
    title: '测试',
    key: 'ceshi',
    path: '/ceshi',
    component: 'ceshi',
    hidden: false,
    hiddenHeader: false,
    keepAlive: true,
  },
  {
    id: '2',
    pId: '22',
    title: '测试2',
    key: 'ceshi2',
    path: '/ceshi2',
    component: '/ceshi2',
    hidden: false,
    hiddenHeader: false,
    keepAlive: true,
  },
]
// 假数据
const backInfo = {
  name: 'E-Dreamer',
  sex: '男',
  role: 'admin',
  perrs: backData,
}
const userInfoStore = defineStore(
  'userInfo',
  () => {
    const routeStore = userRouteStore()
    const router = useRouter()
    const token: Ref<string> = ref('')
    const info: Ref<object> = ref({})

    /**
     * 退出登录
     */
    function logout() {
      token.value = ''
      info.value = {}
      routeStore.addRoutes.forEach((item: CustomRoute) => {
        item.name && router.removeRoute(item.name)
      })
      routeStore.hasRoute = false
      routeStore.clearAddRoutes()
    }

    /**
     * 登录
     */
    function login() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          token.value = Math.random().toString(36)
          resolve(true)
        }, 1000)
      })
    }
    // 获取用户信息(内包含了路由信息)
    function getUserInfo() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const routes = generatorRoutes(backData, '')
          routeStore.addRoutes = routes
          //默认所有新增的路由都在basic组件下
          let cloneBaseRoutes: CustomRoute[] = cloneDeep(baseRoutes)
          if (cloneBaseRoutes?.[0]) {
            cloneBaseRoutes[0].children = [
              ...(cloneBaseRoutes[0].children as CustomRoute[]),
              ...routes,
            ]
          }
          // menu是菜单展示的
          routeStore.menu = [...(cloneBaseRoutes[0]?.children || []), ...cloneBaseRoutes.slice(1)]
          let result = [...cloneBaseRoutes, noFoundRoute]
          result.forEach((item) => {
            router.addRoute(item)
          })
          info.value = backInfo
          routeStore.hasRoute = true
          resolve(result)
        }, 1000)
      })
    }
    return { token, info, logout, login, getUserInfo }
  },
  { persist: true },
)

export default userInfoStore
