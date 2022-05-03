<template>
  <div class="allback">
    <tops></tops>
    <mains></mains>
    <loginx></loginx>
    <login></login>
    <user></user>
    <adminlogin v-show="isAdmain"></adminlogin>

  </div>
</template>

<script>
import mains from './components/mains.vue'
import loginx from './components/loginx.vue'
import tops from './components/tops.vue'
import login from './components/login.vue'
import user from './components/user.vue'
import adminlogin from './components/adminlogin.vue'
export default {
  name: "App",
  components:{tops,mains,loginx,login,user,adminlogin},
  data(){
    return{
      // 判断是否管理员登录
      isAdmain : false,
    }
  },
  mounted(){
    // 接收来自top组件或者adminlogin的数据,使adminlogin组件显示
    this.$bus.$on('tologin',(data)=>{
      console.log(data);
      this.isAdmain = data;
    })
  },
  beforeDestroy(){
    this.$bus.$off('tologin');
  }
};

</script>

<style>
/* 所有元素的样式 */
* {
  margin: 0;
  padding: 0;
}

/* App的样式 */
.allback {
  width: 100%;
}
</style>
