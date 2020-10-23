import axios from "./config"

// 登入接口
export const login = (username,password) =>  axios({
    url:"/users/login",
    method:"post",
    data:{
        username,
        password,
    }
})

// // 获取登陆日志(测试)
// export const getLoginLog = () => axios.get("/getloginlog")

// 获取用户菜单                                 用户菜单的接口
export const getMenuList = () => axios.get("/permission/getMenuList")

// 获取验证码
export const getYzm = () => axios.get("/users/getCaptcha")
// 刷新验证码
export const refreshYzm = () => axios.get("/users/refreshCaptcha")
// 校验验证码
export const verifyYzm =(yzm) => axios.get(`/users/verifyCaptcha?captcha=${yzm}`)
