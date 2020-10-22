import axios from "axios"
import router from  "../router"
import ElementUI from "element-ui"
// 引入进度条
import NProgress from "nprogress"

// 判断当前环境
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip"

// 允许请求携带认证
axios.defaults.withCredentials = true

// // 创建请求拦截器，
axios.interceptors.request.use(config =>{
    //登入不需要携带token
    if(config.url == "/user/login"){
        return config
    } else{
        let token = localStorage.getItem("login_token")
        // config是每一个请求对象
        config.headers["authorization"] = token;
        // 放行,如果不放行则无法通过
        return config
    }
    
})


// 响应拦截
axios.interceptors.response.use(config =>{
    let{data} = config;
        //1004是当前后台设置的，代表token校验失败，提示错误，让页面跳转到登入页
        // console.log(data);
        if(data.code === "1004" || data.code === "10022"){
            ElementUI.Message.error("身份过期")
            // 清除token，不然main.js页面的导航守卫会死循环
            localStorage.removeItem("login_token")
            router.push("/login")
            // 刷新页面
            window.location.reload()
        }
    return config
    
})




axios.create({
    timeout:4000
})

export default axios