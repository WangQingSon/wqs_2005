import Vue from "vue";
import Vuex from "vuex";
// 引入getMenuList方法
import {getMenuList} from "@/api"
// 引入allRoutes
import allRoutes from "../router/allRoutes"
// 引入递归函数
import recursionRoutes from "../utils/recursionRoutes"
// 引入动态路由
import dynamicRoutes from "../router/dynamicRoutes"
// 引入router
import router from "../router"
Vue.use(Vuex);
let userInfo = JSON.parse(localStorage.getItem("login_userInfo")) || {}
// userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    // 定义userInfo
    userInfo,
    menuList:[],//存储后台的用户菜单数据
    crumbs:[]
  },
  mutations: {
    SET_USERINFO(state,payload){
      state.userInfo = payload
    },
    SET_MENULIST(state,payload){
      // payload接收actions中从后台拿来的用户菜单数据
      state.menuList = payload
      //动态的将路由添加到routes中，router.addRoutes
        // 1.将menuList添加到dynamicRoutes的children中
        let target = dynamicRoutes.find(item => item.path === "/houtai")
        target.children = [...state.menuList]
        // console.log(dynamicRoutes);
        // 2.将动态路由配置到router/routes中
        router.addRoutes(dynamicRoutes)
    },
    // 设置面包屑
    SET_CRUMBS(state,payload){
      state.crumbs = payload
    }
  },
  actions: {
    // 1.发请求,获取用户菜单数据
    async FETCH_MENULIST({commit}){//接收commit上下文参数
    // 2.通过alRoutes和请求回来的用户菜单数据进行对比，结果提交给mutation
        // 等待结果返回用户菜单数据 
        let userMenu = await getMenuList()
        // console.log(userMenu.data.menuList);
        // 进行对比
        let sideMenu = recursionRoutes(allRoutes,userMenu.data.menuList)
        // console.log(sideMenu);
    // 3.将结果提交给mutations 
      commit("SET_MENULIST",sideMenu)//将sideMenu传给mutations
    } 
  },
  modules: {}
});
