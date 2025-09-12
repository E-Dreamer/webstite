import type {Component} from "vue";

// 全局
declare global {
  interface BackData {
    pId:string;
    id:string;
    title:string;
    key:string;
    path:string;
    component: string;
    keepAlive?:boolean;
    hidden?:boolean;
    hiddenHeader?:boolean;
  }
  // 定义的路由
  interface CustomRoute {
    path:string;
    name: string;
    component:Component;
    redirect?:string;
    id?:string;
    meta:{
      title: string;
      keepAlive:boolean;
      hidden:boolean;
      hiddenHeader:boolean;
    },
    children?:CustomRoute[];
  }
}
