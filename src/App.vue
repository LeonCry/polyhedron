<template>
  <div class="allback">
    <video v-if="videoN!=-1" class="videos" ref="videos" :src="require(`./assets/videos/${videoArray[videoN]}`)" autoplay muted loop></video>
    <tops></tops>
     <all-back-ground></all-back-ground>
     <router-view name="pres"></router-view>
     <main-menu></main-menu>
    <mains></mains>
    <loginx></loginx>
    <login></login>
    <user></user>
    <adminlogin v-show="isAdmain"></adminlogin>
    <chats></chats>
    <setting></setting>
    <starspace></starspace>
    <system-page></system-page>
    <message-show-cube></message-show-cube>
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
import MessageShowCube from './components/MessageShowCube.vue'
import { mapState } from 'vuex'
import AllBackGround from './components/BackEnd/allBackGround.vue'
import MainMenu from './components/mainMenu.vue'
export default {
  name: "App",
  components:{tops,mains,loginx,login,user,adminlogin,chats,setting,starspace, SystemPage,MessageShowCube, AllBackGround, MainMenu},
  data(){
    return{
      // 判断是否管理员登录
      isAdmain : false,
      videoArray:['trees.mp4','trees2.mp4','floors.mp4','floors2.mp4'],
      videoN:-1,

    }
  },
  computed:{
    ...mapState('userInfo',['user']),
  },
  mounted(){
    // 接收来自top组件或者adminlogin的数据,使adminlogin组件显示
    this.$bus.$on('tologin',(data)=>{
      this.isAdmain = data;
    })
    // 接收socket消息
    this.$bus.$on('getSocketMessage',(data)=>{
      //  如果是给我的消息
      if(data.to==this.user.userQQ){
        var receive = {sendUserQQ:data.from,receiveUserQQ:this.user.userQQ,chatContent:data.text,chatTime:Date.now()};
          // 收到了消息,要通知给friendlist和recent组件,显示未读条数
          this.$bus.$emit('MessageNums',receive);
          // 收到了消息,要通知给recentfriend组件,显示最近聊天
          this.$bus.$emit('RecentChats',receive);
          // 收到了消息,要通知给messageNotice组件,显示总未聊天数
          this.$bus.$emit('messageNotice');
          // 接收chats组件消息,以展示未读消息
         }
         })
  
    // 接收进行路由跳
    this.$bus.$on('Approuter',(data)=>{
      if(data==-1){
        this.$router.go(-1);
      }
      else{
            this.$router.push({
            name:data,
        })
      }
    })
  
  
  },
    
  created(){
    this.videoN = Math.round(Math.random()*3);
    // 总消息初始化
    setTimeout(() => {
       this.$bus.$emit('messageNoticeDefalut');
    }, 2000);
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
    border: 0.12px solid rgba(255, 255, 255, 0.2);
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

.videos{
  width: 100%;
  height: 100%;
  position: fixed;
  object-fit: fill;
  z-index: -1;
  animation: 4s blurs linear both;
}
@keyframes blurs {
  0%{
      filter: blur(0);
  }
  100%{
      filter: blur(4px);
  }
}


</style>
