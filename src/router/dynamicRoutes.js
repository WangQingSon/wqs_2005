import houtai from "../pages/houtai"
const dynamicRoutes = [
    {
        path:"/houtai",
        component:houtai,
        children:[]
    },
    {
        path:"*",
        component:() => import(/*"webpackChunkName:"page404""*/ '../pages/page404')
    }
]

// 导出
export default dynamicRoutes