<template>
    <div class="login">
        <el-form :model="loginForm" status-icon :logins="logins" ref="loginForm" label-width="100px" class="demo-loginForm">
                <h2>清风管理系统</h2>
                <br>
                <br>
                <el-form-item label="用户名：" prop="username">
                    <el-input type="" v-model="loginForm.username" autocomplete="off"  @keydown.enter="add"></el-input>
                </el-form-item>
               
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off" ></el-input>
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



//  引入login方法
 import {login} from "@/api"

//  引入辅助函数
import {mapMutations} from "vuex"

  export default {
    data() {
        // 用户名使用正则规范 4-16(字母数字下划线减号)
        // var uPattern = /^[a-zA-Z0-9 -]{4,16}$/;
        // if(!uPattern.test(value)){
        //     callback("4-16位(字母数字下划线减号)")
        // }else{
        //     callback()
        // }
      var validateUsername = (login, value, callback) => {
        if(value===""){
            callback(new Error("请输入用户名"))
        }else{
            callback()
        }
      };
      var validatePassword = (login, value, callback) => {
       if(value===""){
           callback(new Error("请输入密码"))
       }else{
           callback()
       }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        logins: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
    
        }
      };
    },
    methods: {
      add(){
        console.log();
      },
      // 映射SET_USERINFOR
      ...mapMutations(["SET_USERINFO"]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // 代表本地校验通过
          if (valid) {
            // 解构赋值
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