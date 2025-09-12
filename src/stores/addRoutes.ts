import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import { baseRoutes,noFoundRoute, generatorRoutes } from '@/router/generatorRoutes.ts'

// 假数据
const backData:BackData[] = [
  {
    pId:'',
    id:'22',
    title:'一级菜单',
    key:'first',
    path:'/first',
    component: 'PageView',
    hidden:false,
    hiddenHeader:false,
    keepAlive:true
  },
  {
    id:'1',
    pId:'22',
    title:'测试',
    key:'ceshi',
    path:'/ceshi',
    component:'ceshi',
    hidden:false,
    hiddenHeader:false,
    keepAlive:true
  },
  {
    id:'2',
    pId:'22',
    title:'测试2',
    key:'ceshi2',
    path:'/ceshi2',
    component:'/ceshi2',
    hidden:false,
    hiddenHeader:false,
    keepAlive:true
  }
]
const userRouteStore = defineStore('userRoute', () => {
  const addRoutes:Ref<CustomRoute[]> = ref([]);
  const menu:Ref<CustomRoute[]> = ref([]);
  //模拟接口返回路由信息
  function getUserRoutes():Promise<CustomRoute[]>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        const routes = generatorRoutes(backData,'')
        addRoutes.value = routes;
        //默认所有新增的路由都在basic组件下
        if(baseRoutes?.[0]){
          baseRoutes[0].children = [...baseRoutes[0].children as CustomRoute[],...routes];
        }
        // menu是菜单展示的
        menu.value = [...baseRoutes[0]?.children || [],...baseRoutes.slice(1)]
        resolve([...baseRoutes,noFoundRoute]);
      })
    })
  }
  return {addRoutes,menu,getUserRoutes};
})
export default userRouteStore;
