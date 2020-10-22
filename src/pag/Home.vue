<template>
  <div class="home">
    <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in imgs">
      <h3 class="medium">
        <img :src="item" alt="">
      </h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        imgs:[
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1395255645,617947469&fm=26&gp=0.jpg,",
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2643130670,3461287729&fm=26&gp=0.jpg",
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043547942,3664249282&fm=26&gp=0.jpg",
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3876004846,3536756259&fm=26&gp=0.jpg",
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043547942,3664249282&fm=26&gp=0.jpg",
          "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3756884684,60151208&fm=15&gp=0.jpg",
        ]
      }
    }
  }
</script>

<style scoped>
/* 
  样式不生效的解决方式：
      1、查看类名是否错误
      2、检查权重(在样式后面加imporant)
      3、局部样式(设置了scoped)导致不生效
*/
</style>