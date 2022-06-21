<template>
<transition name="spaceShareInChatT" >
  <div class="spaceShareInChat" v-if="isShow">
    <!-- 头部 -->
    <div class="toper">
      <!-- 设置 -->
      <span>分享:来自动态</span>
    </div>
          <!-- 退出按钮 -->
                <div class="exit">
              <img src="../assets/exit.svg" alt="退出" @click="exitBox">
          </div>

    <spaceitem v-if="space" :spaceProp="space" class="spaceitem"></spaceitem>

    <space-loading></space-loading>
    <space-notice></space-notice>

  </div>
  </transition>
</template>

<script>
import spaceitem from './spaceitem.vue'
import SpaceLoading from './spaceLoading.vue';
import SpaceNotice from './spaceNotice.vue';
export default {
  components: { spaceitem, SpaceLoading, SpaceNotice },
name:'spaceShareInChat',
data(){
    return{
        space:'',
        isShow:false,
    }
},
methods:{
    exitBox(){
        this.isShow = false;
    }
},
mounted(){
this.$bus.$on("sendShare",(showIs,spaceData)=>{
    this.isShow = showIs;
    this.space = spaceData;
});
}

}
</script>

<style scoped>
.spaceShareInChat{
    background-color: black;
    position: absolute;
    width: 400px;
    max-height: 600px;
    left: 35%;
    display: flex;
    overflow: auto;
    overflow-x: hidden;
    flex-flow: column nowrap;
}

/* 抬头 */
.toper {
  position: fixed;
  width: 400px;
  height: 55px;
  z-index: 1;
  border-radius: 25px 25px 0 0;
  display: flex;
  flex-flow: row nowrap;
  transition: 0.55s;
  background-color: seagreen;
}
/* 空间 */
.toper > span {
  line-height: 55px;
  flex: 1;
  text-align: center;
}
/* 退出按钮 */
.exit{
    z-index: 2;
    position: fixed;
    margin-left: 25px;
    padding-right: 20px;
    line-height: 65px;
    cursor: pointer;
}
.exit img{
    transition: 0.8s;
}
.spaceitem{
    margin-top: 80px;
}
.exit img:hover{
    transform: rotateZ(720deg) scale(1.33);
}
/* 该组件--聊天框进入退出动画 */
.spaceShareInChatT-enter-active{
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.spaceShareInChatT-leave-active{
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(100deg);
            transform: rotateX(100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
}
</style>