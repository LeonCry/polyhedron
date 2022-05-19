<template>
<transition name="chaterboxT">
  <div class="chaterbox">
    <!-- 发送时间 -->
    <span> {{new Date(parseInt(chat.chatTime))
                .toLocaleString()
                .slice(5)}}</span>
    <!-- 消息box -->
    <div>
      <!-- 消息 -->
      <span>
        {{chat.chatContent}}
      </span>
    </div>
    <!-- 头像 -->
    <img :src="require(`../assets/Heads/${this.user.userHead}`)" alt="头像">
  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'chaters',
     props:['friendProp','chatProp'],
     computed:{
         ...mapState('userInfo',['user']),
     },
     data(){
         return{
             friend:this.friendProp,
             chat:this.chatProp,
         }
     }

}
</script>

<style scoped>
.chaterbox {
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
.chaterbox img {
  position: relative;
  height: 50px;
  border-radius: 50px;
  border: 2px solid #1a191b;
}
/* 消息box */
.chaterbox > div {
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
.chaterbox > div > span {
  width: 100%;
  color: black;
  font-size: 1.6vh;
  font-weight: bold;
  padding: 15px;
}
/* 发送时间 */
.chaterbox > span {
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
</style>