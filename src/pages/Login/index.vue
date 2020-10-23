<template>
    <div class="login">
        <el-form :model="loginForm" status-icon :logins="logins" ref="loginForm" label-width="100px" class="demo-loginForm">
                <h2>清风管理系统</h2>
                <br>
                <br>
                <el-form-item label="用户名：" prop="username">
                    <el-input type="" v-model="loginForm.username" autocomplete="off"  ></el-input>
                </el-form-item>
               
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off" @keyup.enter.native="submitForm('loginForm')"></el-input>
                </el-form-item>

                <el-form-item label="验证码：" prop="yzm">
                    <el-input type="" v-model="loginForm.yzm" autocomplete="off" class="yzm_input" 
                      ></el-input>
                    <span class="yzm"
                    v-html="yzmSvg" 
                    @click="refYzm"   >验证码</span>
                    
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="submitForm('loginForm')">提交</el-button>
                </el-form-item>
        </el-form>
    <video src="../../video/1.mp4" autoplay loop></video>
    </div>
    
</template>
<style scoped>
    h2{
        text-align: center;
        color: #fff;
        margin: 100px 0 50px;
    }
   
</style>
<script>
  /*
      登入逻辑实习
        1、收集用户输入的username&password传递给后端
        2、登入通过后，将后端返回的token村存到本地
        3、每次请求的时候，携带token到请求头
        4、展示token校验正确的数据
  */



//  引入login，获取验证码，刷新验证码，校验验证码
 import {login,getYzm,refreshYzm,verifyYzm} from "@/api"

//  引入辅助函数
import {mapMutations} from "vuex"

  export default {
    data() {
                 
        // 用户名使用正则规范 4-16(字母数字下划线减号)
        //  var uPattern = /^[a-zA-Z0-9 -]{4,16}$/;
        // if(!uPattern.test(value)){
        //     callback(new Error("请输入用户名4-16位"))
        // }else{
        //     callback()
        // }
        // 校验用户名
      var validateUsername = (login, value, callback) => {
        if(value===""){
           callback(new Error("请输入用户名"))
        }else{
            callback()
        }
      };
      // 校验密码
      var validatePassword = (login, value, callback) => {
       if(value==="" || value.length!=5){
           callback(new Error("请输入密码"))
       }else{
           callback()
       }
      };
      // 校验验证码
       var validateYzm = (login, value, callback) => {
        if(value===""){
            callback(new Error("请输入用户名验证码"))
        }else{
            callback()
        }
      };
      return {
        yzmSvg:"",
        loginForm: {
          username: '',
          password: '',
          // 存放后台获取的验证码svg结构
          yzm:'',
        },
        logins: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          yzm: [
            { validator: validateYzm, trigger: 'blur' }
          ],
    
        }
      };
    },
    mounted () {
      this.set_yzm()
    },
    methods: {
      // 封装设置验证码方法
      set_yzm() {
        getYzm()
        .then(res=>{
          this.yzmSvg = res.data.img
        })
      },
      // 刷新验证码
      refYzm(){
        this.set_yzm()
      },
      // 映射SET_USERINFOR
      ...mapMutations(["SET_USERINFO"]),
      submitForm(formName) {
        this.$refs[formName].validate( async (valid) => {
          // 代表本地校验通过
          if (valid) {
            // 校验验证码
            let yzmres = await verifyYzm(this.loginForm.yzm)
            if(!yzmres.data.state){
              this.$message.error("验证码输入错误，请重新输入")
              return
            }
            // if(!yzmres.data.state){
            //   this.$message.error("验证码输入错误，重新输入")
            //     return
            // }
            // 加载动画
            const loading = this.$loading({
             lock: true,
             text: '玩命儿加载中(╥╯^╰╥)',
             spinner: 'el-icon-loading',
             background: 'rgba(0, 0, 0, 0.7)'
            });
            // setTimeout(() => {
            //    loading.close();
            // }, 2000);
            let {username,password} = this.loginForm
            // 发送登入请求,调用login方法
            login(username,password)
            .then(res=>{
              loading.close()
              // console.log(res.data.state);
              if(res.data.state){
                // 将token存在本地
                localStorage.setItem("login_token",res.data.token)
                localStorage.setItem("login_userInfo",JSON.stringify(res.data.userInfo))
                // 将userInfo传递到vuex中的state中
                console.log(res.data.userInfo);
                this.SET_USERINFO(res.data.userInfo)
                this.$message.success("欢迎来到德莱联盟~~~")
                // 跳转指定路由
                this.$router.push("/houtai/welcome")
              }else{
                this.$message.error("亲爱的，您可以滚了哦")
              }
            })
            .catch(err =>{
              console.log(err);
            })

            // 传数据

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>