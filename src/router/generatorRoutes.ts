// 基础路由
import type {Component} from "vue";
import BlankLayout from '@/layouts/BlankLayout.vue'
import BasicLayout from "@/layouts/BasicLayout.vue";
export const baseRoutes: CustomRoute[] = [
  {
    path: '/',
    name:'basic',
    component: BasicLayout,
    redirect: '/home',
    meta: {
      title: '基本框架',
      keepAlive: true,
      hidden: true,
      hiddenHeader: false,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
          // 菜单是否显示
          hidden: false,
          // 菜单是否隐藏头部
          hiddenHeader: false,
        },
      },
    ],
  },
  {
    path: '/otherFull',
    name: 'otherFull',
    component: () => import('@/views/otherFull.vue'),
    meta: {
      title: '全屏页面',
      keepAlive: true,
      // 菜单是否显示
      hidden: false,
      // 菜单是否隐藏头部
      hiddenHeader: false,
    },
  }
]

export const noFoundRoute:CustomRoute = {
  path:'/:pathMatch(.*)*',
  name:"404",
  component:()=>import('@/views/404.vue'),
  meta: {
    title: '页面未找到',
    keepAlive:true,
    hidden:true,
    hiddenHeader: false,
  }
}

/**
 * 根据文件名找到Component
 * @param name
 * @returns {Component}
 */
export function resolveComponent(name:string):Component {
  const pages = import.meta.glob('../views/**/*.vue')
  const importPage = pages[`../views/${name}.vue`]
  if (!importPage) {
    throw new Error(`Unknown page ${name}. Is it located under Pages with a .vue extension?`)
  }
  return importPage
}

/**
 * 将后端返回的转成真实Route
 * @param backItem{BackData} 后端返回的数据
 * @param children{CustomRoute[]} 根据list寻找到的children
 */
export function changeRoute(backItem:BackData,children:CustomRoute[]):CustomRoute{
  let component;
  if(backItem.component === 'PageView'){
    component = BlankLayout;
  }else {
    let componentName = backItem.component.startsWith('/') ? backItem.component.substring(1) : backItem.component
    component = resolveComponent(componentName)
  }
  return {
    path:backItem.path,
    name:backItem.key,
    component,
    id:backItem.id,
    // redirect:'',
    meta:{
      title:backItem.title,
      keepAlive:true,
      hidden:backItem?.hidden ?? false,
      hiddenHeader:backItem?.hiddenHeader ?? false,
    },
    children
  };
}
/**
 * 将后端返回的list 转换成Routes
 * @param list 后端返回的数据
 * @param pId 父节点
 * @returns {[]}
 */
export function generatorRoutes(list:BackData[],pId:string):CustomRoute[]{
  let tree:CustomRoute[] = []
  list.forEach(item=>{
    if(item.pId === pId){
      let children = generatorRoutes(list.filter(i=>i.pId === item.id),item.id);
      tree.push(changeRoute(item,children))
    }
  })
  return tree;
}
