// 右侧的聊天者
<template>
<transition name="chaterboxT">
  <!-- 右侧聊天 -->
  <div  v-if="chat.sendUserQQ!=friend.friendQQ" class="rightchaterbox">
    <!-- 发送时间 -->
    <span> {{new Date(parseInt(chat.chatTime))
                .toLocaleString()
                .slice(5)}}</span>
    <!-- 消息box -->
    <div>
    <div ref="chatcontent" class="chatcontent">
        
    </div></div>
    <!-- 头像 -->
    <img :src="require(`../assets/Heads/${this.user.userHead}`)" alt="头像">
  </div>
  
  <!-- 左侧聊天 -->
    <div v-if="chat.sendUserQQ==friend.friendQQ" class="leftchaterbox">
      <!-- 头像 -->
      <img :src="require(`../assets/Heads/${friend.user.userHead}`)" alt="头像">
      <!-- 消息box -->
    <div>
    <div ref="chatcontent" class="chatcontent">
        
    </div></div>
      <!-- 发送时间 -->
      <span>
          {{new Date(parseInt(chat.chatTime))
                .toLocaleString()
                .slice(5)}}
      </span>
  </div>
</transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "rightchater",
       props:['friendProp','chatProp'],
     computed:{
         ...mapState('userInfo',['user']),
     },
     data(){
         return{
             friend:this.friendProp,
             chat:this.chatProp,
         }
     },
     mounted(){
       this.$refs.chatcontent.innerHTML = this.chat.chatContent;
     }
};
</script>

<style scoped>
.rightchaterbox {
  position: relative;
  max-width: 70%;
  display: flex;
  flex-flow: row nowrap;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  align-self: flex-end;
}
/* 头像 */
.rightchaterbox img {
  position: relative;
  height: 50px;
  border-radius: 50px;
  border: 2px solid #1a191b;
}
/* 消息box */
.rightchaterbox > div {
  position: relative;
  max-width: 75%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: #d2edf6;
  border-radius: 15px;
  margin-right: 15px;
}
/* 消息 */
.chatcontent{
  color: black;
  font-size: 1.8vh;
  font-weight: bold;
  padding: 15px;
}
/* 发送时间 */
.rightchaterbox > span {
  position: relative;
  align-self: flex-end;
  width: 100px;
  height: 20px;
  font-size: 1vh;
  color: darkgrey;
  text-align: center;
}

    /* 进入的动画 */
    .chaterboxT-enter-active{
         animation: slide-in-blurred-right 0.55s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }
  @keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(300px) scaleX(2.5) scaleY(0.2);
            transform: translateX(300px) scaleX(2.5) scaleY(0.2);
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



    .leftchaterbox{
        position: relative;
        max-width: 70%;
        display: flex;
        flex-flow: row nowrap;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    /* 头像 */
    .leftchaterbox img{
        position: relative;
        height: 50px;
        border-radius: 50px;
        border: 2px solid #1A191B;
    }
    /* 消息box */
    .leftchaterbox > div{
        position: relative;
        max-width: 75%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: #EDDFF1;
        border-radius: 15px;
        margin-left: 15px;
    }
    /* 消息 */
    .leftchaterbox > div > span{
        width: 100%;
        color: black;
        font-size: 1.6vh;
        font-weight: bold;
        padding: 15px;
    }
    /* 发送时间 */
    .leftchaterbox > span{
        position: relative;
        align-self:flex-end;
        width: 100px;
        height: 20px;
        font-size: 1vh;
        color: darkgrey;
        text-align: center;
    }

</style>