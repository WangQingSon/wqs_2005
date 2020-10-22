<template>  
    <div class="houtai">
        <el-container>
           <!-- 侧边菜单栏 -->
      <el-aside width="200">
        <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 :router="true"
                 :collapse="isCollapse">
                 <!-- 注入事件源 -->
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>
             <el-container>
              
                 <!-- 头部菜单 -->
               <el-header>
          <el-row type="flex"
                  class="row-bg"
                  justify="space-between">
            <el-col :span="6">
              <div class="grid-content"
              @click="change"
              >
                <i class="iconfont icon-daohangzhankai-"></i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                清风管理系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-avatar :size="40"
                           fit="fit"
                           src= "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3326845324,3528694962&fm=26&gp=0.jpg"></el-avatar>
                <span>欢迎您:</span>
                <b class="nickname">{{userInfo.nickname}}</b>
                <span class="quit"
                      @click="quit"
                      >退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
                <!-- 内容区域 -->
                <el-main>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/houtai' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item 
                  :to="{path:crumb}"
                  v-for="crumb in crumbs">
                    {{crumb.meta.name}}
                  </el-breadcrumb-item>
                </el-breadcrumb>
                 <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
 // 引入辅助函数
  import {mapState} from "vuex"
  
  export default {
    data () {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 事件代理控制展开收起图标
      change(e){
        if(e.target.nodeName!="I"){
          return
        }
        if(this.isCollapse=!this.isCollapse){
          e.target.className = "iconfont icon-zhankai"
        }else{
          e.target.className = "iconfont icon-daohangzhankai-"
        }
        
      },
      // 退出学生后台信息，返回登陆页面按钮
      quit(){
        // 清除token和userinfo
        localStorage.removeItem("login_token")
        localStorage.removeItem("login_userInfo")
        this.$router.push("/login")
        // 退出刷新页面
        window.location.reload()
      }
    },
    computed: {
      //           用户信息    左侧菜单信息  面包屑指定路由
      ...mapState(["userInfo","menuList","crumbs"])
    }
    
  }
</script>
<style>
.xueyuan{
  padding-left: 0 !important; 
}
.grid-content .el-submenu__title{
    margin-left: 0;
}
.grid-content .icon-zhankai{
  font-size: 36px;
  color:hotpink;
  cursor: pointer;
}
 .grid-content .icon-daohangzhankai-{
   color: hotpink;
   font-size: 36px;
   cursor: pointer;
  
 }
  .quit {
    cursor: pointer;
    color: hotpink;
  }
  .aa {
    vertical-align: middle;
  }

  /* 修改avatar的样式 */
  .el-avatar.el-avatar--circle {
    vertical-align: middle;
    margin-right: 10px;
  }
  /* layout顶栏样式 */
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
  }
  .row-bg {
    background-color: #41b883;
  }

  /* container样式 */
  .el-header {
    background-color: #41b883;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 68px !important;
  }

  .el-aside {
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
 
</style>
