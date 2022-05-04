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
/*//滚动条样式设计*/
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
    border-radius: 100px;
}

::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 100px;
    background-color: black;
    background-image: -webkit-linear-gradient(45deg,
            black,
            transparent 25%,
            transparent 50%,
            black,
            black,
            transparent 75%,
            transparent);
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道*/

    background: rgba(255, 255, 255, 0);
    border-radius: 100px;
}
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
