<template>
  <div id="app">
    <div id="nav">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// 引入
  export default {
    data () {
      return {
        
      }
    },
    mounted () {
      // 调试FETCH_MENULIST方法 获取后台用户菜单数据
      // this.$store.dispatch("FETCH_MENULIST")
    }
  }
</script>


