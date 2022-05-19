<template>
  <div class="allback">
    <tops></tops>
    <mains></mains>
    <loginx></loginx>
    <login></login>
    <user></user>
    <adminlogin v-show="isAdmain"></adminlogin>
    <chats></chats>
    <setting></setting>
    <starspace></starspace>
    <system-page></system-page>
  </div>
</template>

<script>
import mains from './components/mains.vue'
import loginx from './components/loginx.vue'
import tops from './components/tops.vue'
import login from './components/login.vue'
import user from './components/user.vue'
import adminlogin from './components/adminlogin.vue'
import chats from './components/chats.vue'
import setting from './components/setting.vue'
import starspace from './components/starspace.vue'
import SystemPage from './components/systemPage.vue'

export default {
  name: "App",
  components:{tops,mains,loginx,login,user,adminlogin,chats,setting,starspace, SystemPage},
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
    background-color: rgba(99, 110, 114, 0.1);
    border: 0.12px solid rgba(0,0,0,0.5);
    background-image: -webkit-linear-gradient(90deg,
            transparent 0%, rgba(99, 110, 114, 0.1),
            transparent 50%,rgba(99, 110, 114, 0.1),
            transparent 51%,rgba(26, 25, 27, 1),
            transparent 60%,rgba(26, 25, 27, 1),
            transparent 61%,rgba(99, 110, 114, 0.1),
            transparent 100%,);
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: rgba(99, 110, 114, 0);
    border-radius: 100px;
}
/* 所有元素的样式 */
* {
  margin: 0;
  padding: 0;
}

/* App的样式 */
.allback {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
