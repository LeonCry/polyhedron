<template>
<transition name="AppearT">
<div class="backEnd" v-if="isShow">
  <div class="toper">
    <span><b>POLYHEDRON 后台管理系统</b></span>
          <!-- 退出按钮 -->
            <div class="exit">
              <img src="../../assets/exit.svg" alt="退出" @click="exitChat">
          </div>
  </div>
  <back-notice></back-notice>
    <div class="main">
         <div class="on-left">
            <back-left></back-left>
         </div>
         <div class="on-mid">
            <div class="test"></div>
         </div>
         <div class="on-right">
            <router-view name="backs"></router-view>
         </div>
         <back-right-loading></back-right-loading>
    </div>
</div>
</transition>
</template>

<script>
import backLeft from './backLeft.vue';
import BackNotice from './backNotice.vue';
import BackRightLoading from './backRightLoading.vue';
export default {
  components: { backLeft, BackRightLoading, BackNotice},
name:"allBackGround",
data(){
    return{
        isShow:false,
    }
},
methods:{
    exitChat(){
        this.isShow = false;
    }
},
mounted(){
    // 后台的显示
    this.$PubSub.subscribe('BackEndShow',(data)=>{
        this.isShow = data;
    })
}
}
</script>

<style scoped>
.test{
    position: relative;
    height: 100%;
}


.backEnd{
    position: absolute;
    background-color: #eceff5;
    width: 100%;
    height: 100%;
    z-index: 95;
    font-size: 1.6vh;
    overflow: hidden;
}
/* 圆角 */
.radius{
    border-radius: 15px;
}
/* 抬头 */
.toper{
        position: relative;
        width: 100%;
        height: 6%;
        display: flex;
        flex-flow: row nowrap;
        border-bottom: #6f7379a4 3px solid;
        background-image: linear-gradient(125deg,#2d3436,#2f3542,#a4b0be,#1e272e);
        background-size: 400%;
        background-repeat: no-repeat;
        background-attachment: fixed;
        animation: backtrans 20s infinite;
}  
.main{
    position: relative;
    height: 94%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
}
/* 用户名字 */
.toper > span{
    line-height: 55px;
    font-size: 2.2vh;
    color: whitesmoke;
    flex: 1;
    text-align: center;
}
/* 退出按钮 */
.exit{
    position: absolute;
    width: 98%;
    height: 55px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
}
.exit img{
    transition: 0.25s;
    cursor: pointer;
}
.exit img:hover{
    transform: rotateZ(180deg) scale(1.2);
}
.on-left{
    position: relative;
    height: 100%;
    flex: 4;
    overflow-y: auto;
    background-color: #313A46;
    
}
.on-mid{
    position: relative;
    height: 100%;
    flex: 1;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0);
    
}
.on-right{
    position: relative;
    right: 35px;
    height: 100%;
    flex: 19;
    overflow-y: hidden;
    background-color: rgba(0, 0, 0, 0);

}


/* 该组件--聊天框进入退出动画 */
.AppearT-enter-active{
    animation: swing-in-top-fwd 0.33s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.AppearT-leave-active{
    animation: swing-in-top-fwd 0.33s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}

@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
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


@keyframes backtrans{
    0%{
        background-position: 0% 50%;
    }
    50%{
        background-position: 100% 50%;
    }
    100%{
        background-position: 0% 50%;
    }
}

</style>