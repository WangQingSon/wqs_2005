import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入公共样式
import "./assets/styles/base.css"
// 引入el重设样式
import "./assets/el_reset.css"
// 引入icont
import "./assets/iconfont/iconfont.css"
// 引入rescue...
import "./utils/recursionRoutes"
//  引入ElmentUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import axios from "./api/config";
// 引入subMenu组件(菜单)
import qfsubMenu from "qf-sub-menu"
// 引入进度条
import NProgress from "nprogress"
import "nprogress/nprogress.css"
Vue.use(ElementUI);
// 注册到全局
Vue.use(qfsubMenu)



// 一、路由前置钩子(导航守卫)
router.beforeEach((to,from,next) =>{
  // 进入页面之前打开进度条
  NProgress.set(0.99999999)
  // next()放行，没有它页面则无法显示
  // 用户登入之后localStorage有token
  let token = localStorage.getItem("login_token")
  if(token){
    // 是注册或登入页面则直接执行
    if(store.state.menuList.length == 0){
      // 没有用户路由,触发action获取用户路由
      store.dispatch('FETCH_MENULIST')
      .then(() => {
        // 确保addRoutes生效，不写页面是空白
        next({path:to.path})
      })
    }else(
      next()
    )
   
  }else {
    // 无token是登录页直接放行
    if(to.path ==="/login"){
      next()
    }else{
      // 访问的不是登入页，则跳转到登入页
      next({path:"/login"})
    }
  }
})

// 二、使用路由后置钩子处理面包屑
router.afterEach((to,from) => {
  let crumblist = to.matched.slice(1)
  console.log(crumblist);
  store.commit("SET_CRUMBS",crumblist)
  // 进入页面之后关闭进度条
  NProgress.done()
})


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
