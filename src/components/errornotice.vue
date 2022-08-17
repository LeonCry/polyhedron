// 错误提示---仅在登录时
<template>
<transition name="errornoticeT">
  <div v-show="isShow" class="errornoticebox">
      <span class="te">▼</span>
      <span>{{errorMessage}}</span>
      <audio ref="audio" class="erroraudio" src="../assets/audio/error.wav" ></audio>
  </div>
  </transition>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'errornotice',
data(){
    return{
        isShow:false,
        errorMessage:'出错了...',
    }
},
mounted(){
    this.$bus.$on('errormessage',(message)=>{
        this.errorMessage = message;
        this.isShow = true;
        this.$refs.audio.play();
        setTimeout(() => {
        this.isShow = false;
        }, 2500);

    })
}
}

</script>

<style scoped>
.errornoticebox{
    position: absolute;
    max-width: 350px;
    height: 50px;
    background-color: rgba(26, 25, 27, 0.77);
    left: 275px;
    top: -35px;
    z-index: 2;
    font-size: 1.6vh;
    color: white;
    font-weight: bold;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
}
.te{
    position: absolute;
    left: -5px;
    color: rgba(26, 25, 27, 0.77);
    font-size: 2.2vh;
    top: 30px;
    transform: rotateZ(60deg);
}
/* 错误铃声 */
.erroraudio{
    display: none;
}
/* 进入退出动画 */
.errornoticeT-enter-active{
animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.errornoticeT-leave-active{
animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}
@keyframes swing-in-left-fwd {
  0% {
    -webkit-transform: rotateY(100deg);
            transform: rotateY(100deg);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 1;
  }
}

@media only screen and (orientation: portrait) {
  .errornoticebox{
    position: absolute;
    left: 5%;
    width: 80%;
    height: 50px;
    background-color: rgba(26, 25, 27, 0.77);
    top: -70px;
    z-index: 2;
    font-size: 1.6vh;
    color: white;
    font-weight: bold;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
}
.te{
    position: absolute;
    left: 40%;
    color: rgba(26, 25, 27, 0.77);
    font-size: 2.2vh;
    top: 40px;
    /* transform: rotateZ(60deg); */
}
}


</style>