import attendance from '../pages//houtai/attendance'
import mine from '../pages/houtai/mine'
import statistics from '../pages/houtai/statistics'
import users from '../pages/houtai/users'
import welcome from '../pages/houtai/welcome'
import studentManager from '../pages/houtai/studentManager'
import studentProduct from '../pages/houtai/studentManager/studentProduct.vue'
import studentDormitory from '../pages/houtai/studentManager/studentDormitory.vue'
import studentProfile from '../pages/houtai/studentManager/studentProfile.vue'
const allRoutes = [
{
    path: 'welcome',
    name: 'welcome',
    component: welcome,
    meta: {
      name: '管理首页',
      icon: 'iconfont icon-icon4',
        fullPath:"/welcome"
    }
  },
  {
    path: 'studentManager',
    name: 'studentManager',
    redirect:"/studentManager/studentProduct",
    component: studentManager,
    meta: {
      name: '学员管理',
      icon: 'iconfont icon-guanlizhongxin'
    },
    children: [
      {
        path: 'studentProduct',
        name: 'studentProduct',
        component: studentProduct,
        meta: {
          name: '学员项目管理',
          icon: 'iconfont icon-xiangmuguanli',
        },
      },
      {
        path: 'studentProfile',
        name: 'studentProfile',
        component: studentProfile,
        meta: {
          name: '学员资料',
          icon: 'iconfont icon-ziliao'
        }
      },
      {
        path: 'studentDormitory',
        name: 'studentDormitory',
        component: studentDormitory,
        meta: {
          name: '学员宿舍',
          icon: 'iconfont icon-sushe'
        }
      }
    ]
  },
  {
    path: 'attendance',
    name: 'attendance',
    component: attendance,
    meta: {
      name: '考勤管理',
      icon: 'iconfont icon-test'
    }
  },
  {
    path: 'users',
    name: 'users',
    component: users,
    meta: {
      name: '用户管理',
      icon: 'iconfont icon-safe-bluefuben'
    }
  },
  {
    path: 'statistics',
    name: 'statistics',
    component: statistics,
    meta: {
      name: '数据统计',
      icon: 'iconfont icon-shujutongji'
    }
  },
  {
    path: 'mine',
    name: 'mine',
    component: mine,
    meta: {
      name: '我的中心',
      icon: 'iconfont icon-xueyuanguanli'
    }
  }
]
// 导出路由配置(不是真正配置)
export default allRoutes