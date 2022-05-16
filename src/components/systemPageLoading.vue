// 系统通知的loading emit:searchAddLoading
<template>
<transition name="loadingT">
  <div v-show="isShow" class="loadingbox">
      <img class="loadings" src="../assets/loadingbigger.svg" alt="loading">
      <span>{{message}}..</span>
  </div>
  </transition>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'systemPageLoading',
data(){
    return{
        isShow:false,
        message:'加载中',
    }
},
mounted(){
    // 改变loading出现状态
    this.$bus.$on('systemPageLoading',(data,message)=>{
        this.isShow = data;
        this.message = message;
    });
},
beforeDestroy(){
    this.$bus.$off('systemPageLoading');
}
}
</script>

<style scoped>

.loadingbox{
    position: absolute;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.666);
}
.loadingbox span{
    position: relative;
    top: -5%;
    animation: flicker-in-1 2s linear both infinite;
}
/* loading特效 */
.loadings{
  position: relative;
  top: -10%;
  animation: loading-frame 4s cubic-bezier(0.600, -0.280, 0.735, 0.045)  infinite alternate-reverse;
}
.loadingT-enter-active{
animation: fade-out 0.25s ease-out both reverse;
}
.loadingT-leave-active{
animation: fade-out 0.25s ease-out both;
}

/* loading动画 */
@keyframes loading-frame {
  0%{
            transform: rotate(270deg) scale(1);
    }
  10% {
            transform: rotate(0) scale(1);
  }
  25% {
            transform: rotate(90deg) scale(0.9);
            
  }
  50% {
            transform: rotate(180deg) scale(0.8);
  }
  75% {
            transform: rotate(270deg) scale(0.9);
  }
  90% {
            transform: rotate(360deg) scale(1);
  }
}
@keyframes flicker-in-1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0.5;
  }
  20% {
    opacity: 0.5;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0.5;
  }
  30% {
    opacity: 0.5;
  }
  30.1% {
    opacity: 1;
  }
  30.5% {
    opacity: 1;
  }
  30.6% {
    opacity: 0;
  }
  45% {
    opacity: 0.5;
  }
  45.1% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  55.1% {
    opacity: 0.5;
  }
  57% {
    opacity: 0;
  }
  57.1% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  60.1% {
    opacity: 0.5;
  }
  65% {
    opacity: 0.5;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0.5;
  }
  77% {
    opacity: 0;
  }
  77.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0.5;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>