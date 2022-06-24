// 空间动态置顶信息提示,emit为 backNotice,即可正确信息,也可错误信息
<template>
<transition name="errorT">
  <div v-show="isShow" class="errorbox" :class="{greenboxclass:greenbox}">
      <span>{{errorMessage}}</span>
      <audio ref="audioerror" style="display:none" src="../../assets/audio/error2.mp3" ></audio>
      <audio ref="audioyes" style="display:none" src="../../assets/audio/buding.wav" ></audio>
  </div>
  </transition>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'backNotice',
data(){
    return{
        errorMessage:'',
        isShow:false,
        greenbox:false,
    }
},
mounted(){
    this.$bus.$on('backNotice',(isGreenbox,message)=>{
        this.errorMessage = message;
        this.isShow = true;
        this.greenbox = isGreenbox;
        // 如果是错误信息
        if(!isGreenbox){
            this.$refs.audioerror.play();
        }
        // 如果是正确信息
        else{
            this.$refs.audioyes.play();
        }
        setTimeout(() => {
        this.isShow = false;
        }, 2500);
    })
},
beforeDestroy(){
    this.$bus.$off('backNotice');
}
}
</script>

<style scoped>
    .errorbox{
        position: absolute;
        top: 2.5%;
        left: 10%;
        width: 80%;
        padding-top: 10px;
        padding-bottom: 10px;
        max-height: 100px;
        text-align: center;
        border-radius: 25px;
        background-color: rgba(255, 0, 0, 0.666);
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.666);
        font-size: 1.8vh;
        color: aliceblue;
        font-weight: bold;
        z-index: 99;
    }
    .greenboxclass{
        position: absolute;
        top: 2.5%;
        left: 10%;
        width: 80%;
        padding-top: 10px;
        padding-bottom: 10px;
        max-height: 100px;
        text-align: center;
        border-radius: 25px;
        background-color: greenyellow;
        box-shadow: 0 0 15px greenyellow;
        font-size: 1.8vh;
        color: dodgerblue;
        font-weight: bold;
    }
    .errorbox span{
        padding: 15px;
    }
    .errorT-enter-active{
        animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    }
    .errorT-leave-active{
        animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
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
</style>