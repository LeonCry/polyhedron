<template>
  <div class="userbox">
     
      <transition name="userappearT" appear>
         <!-- 用户头像 -->  
      <div v-show="isShow" class="user" @click="optionAppear">
      <img src="../assets/user.svg" alt="用户">
      </div>
      </transition>
      <transition name="optionT" appear>
          <!-- 选项box -->
          <div v-show="isOption" class="optionbox">
              <!-- 聊天界面 -->
            <div class="chatbutton" @click="chatAppear">
                <img src="../assets/chat.svg" alt="聊天">
            </div>
          <!-- 设置按钮 -->
          <div class="setupbutton">
              <img src="../assets/option.svg" alt="设置" @click="settingAppear">
          </div>
          <!-- 关机按钮 -->
          <div class="shutdownbutton">
              <img src="../assets/shutdown.svg" alt="退出登录">
          </div>
          </div>
      </transition>
          <!-- 好友列表 组件 -->
          <friends></friends>


  </div>
</template>

<script>
import friends from './friends.vue'
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'user',
components:{friends},
data(){
    return{
        // 用户组件是否展示
        isShow : false,
        // 选项界面是否展示
        isOption: false,
        // 聊天界面是否展示
        chatShow:false,
        // 设置界面是否展示
        isSetting:false,
    }
},
methods:{
    // 选项功能出现/消失
    optionAppear(){
        this.isOption = !this.isOption;
    },
    // 聊天界面出现和消失
    chatAppear(){
        this.isOption = !this.isOption;
        this.chatShow = !this.chatShow;
        // 向friends组件发送数据,进行开关
        this.$bus.$emit('chatshow',this.chatShow);
    },
    // 设置界面的出现和消失
    settingAppear(){
        this.isOption = !this.isOption;
        this.isSetting = !this.isSetting;
        // 向setting组件发送数据,进行开关
        this.$bus.$emit('settingappear',this.isSetting);
    }
},
mounted(){
    // 接收登录成功通知
    this.$bus.$on('loginSuccess',(enterstate)=>{
        console.log(enterstate);
        setTimeout(() => {
            this.isShow = true;
        }, 1500);
    });
    // 接收最小化的状态
      this.$bus.$on('chatshow2',(data1)=>{
            this.chatShow = data1;
        });
    // 进行展示与否
      this.$bus.$on("settingappear", (data1) => {
        this.isSetting = data1;
      });
},
beforeDestroy(){
     this.$bus.$off('loginSuccess');
     this.$bus.$off('chatshow2');
     this.$bus.$off("settingappear");
}
}
</script>

<style scoped>
/* 用户 */
.user{
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 20px;
    text-align: center;
    transition: 0.55s;
    right: 0;
    bottom: 0;
    z-index: 5;
}
.user img{
    margin-top: 5px;
}
.user:hover{
    border-radius: 100%;
    background-color: black;
    cursor: pointer;
}
/* 设置box */
.optionbox{
    position: absolute;
    margin: 10px;
    width: 200px;
    height: 50px;
    justify-content: space-evenly;
    display: flex;
    flex-flow: row-reverse nowrap;
    transition: 0.55s;
    right: 60px;
    bottom: 10px;
    z-index: 5;
}
.optionbox:hover{
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 20px 0 0 20px;
}
.optionbox div{
    align-self: center;
    width: 50px;
    height: 35px;
    transition: 0.55s;
    text-align: center;
}
.optionbox div:hover{
    background-color: black;
    border-radius: 15px;
    cursor: pointer;
}
.optionbox div img{
    margin-top: 5px;
}
/* 选项界面的出现和离开 */
.optionT-enter-active{
    animation: slide-in-blurred-right 0.55s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.optionT-leave-active{
    animation: slide-in-blurred-right 0.55s cubic-bezier(0.230, 1.000, 0.320, 1.000) both reverse;
}

/* 用户出现动画 */
.userappearT-enter-active{
    animation: slide-in-blurred-bottom 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
/* 用户出现关键帧动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(100px) scaleY(2.5) scaleX(0.2);
            transform: translateY(100px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
/* 选项界面出现的动画 */
@keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(-300px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-300px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
</style>