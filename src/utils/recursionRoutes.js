// 根据服务器用户返回的数据和allrouter匹配

//  引入allRoutes
import allRoutes from "../router/allRoutes"
const recursionRoutes = (allRoutes,menuList) =>{
    let userRoutes = []
    allRoutes.forEach(item => {
        menuList.forEach(v => {
            if(item.meta.name === v.name){
                if(v.children&&v.children.length>0){
                    item.children = recursionRoutes(item.children,v.children)
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}
// 调式
let menuList = [
    {
      "name":"管理首页"  
    },
    {
        "name":"学员管理",
        "children":[
            {
                "name":"学员项目管理"
            }
        ]
    },
    {
        "name":"我的中心"
    }
]
// console.log(recursionRoutes(allRoutes,menuList));
export default recursionRoutes