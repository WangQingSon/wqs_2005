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