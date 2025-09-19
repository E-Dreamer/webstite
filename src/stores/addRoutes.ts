import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
// computed ->getter  function->action
const userRouteStore = defineStore(
  'userRoute',
  () => {
    const addRoutes: Ref<CustomRoute[]> = ref([])
    const menu: Ref<CustomRoute[]> = ref([])
    // 用户判断是否加载了动态路由
    const hasRoute: Ref<boolean> = ref(false)
    function clearAddRoutes() {
      addRoutes.value = []
      menu.value = []
    }
    return { addRoutes, menu, hasRoute, clearAddRoutes }
  },
  {
    persist: {
      // hasRoute 不缓存
      pick: ['addRoutes', 'menu'],
    },
  },
)
export default userRouteStore
