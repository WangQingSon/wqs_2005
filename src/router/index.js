import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pag/Home.vue";
// 引入登陆和后台两个组件
import login from "../pages/Login/index.vue"
import houtai from "../pages/houtai/index.vue"
import allRoutes from "./allRoutes";
// 解决路由导航到同一路径重复报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
}
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../pag/About.vue")
  // },
  {
    path:"/login",
    name:"login",
    component:login,
  },
  {
    path:"*",
    component:() =>import(/*webpackChunkName:"page404"*/ "../pages/page404")
  },
  {
    path:"/houtai",
    component: "houtai",
    component:() => import(/*webpackChunkName:"houtai"*/ "../pages/houtai"),
    // children: allRoutes,
   
  }
];

const router = new VueRouter({
  routes
});

export default router;
