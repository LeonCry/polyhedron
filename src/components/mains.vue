<template>
    <transition appear name="logoT">
  <div :class="{'logopullupcss':logopullup,'loginsuccesss':loginsuccess}">
      <img v-if="src" :src="require(`../assets/${src}`)" alt="logo"/>

        <div class="bot"> 
    <a style="color:gray;" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鲁ICP备2021023307号-2</a>
    <br>
    <span style="color:gray;">Copyright ©2022.PolyhedronX All rights reserved.</span>
  </div>
  </div>

  </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'mains',
    data(){
      return{
        logopullup:false,
        src:'LOGOX.svg',
        srcArray:['LOGOX.svg','LOGOY.svg'],
        srcCount:0,
        loginsuccess:false,
      }
    },
    computed:{
      ...mapState('userInfo',['user']),
    },
    created(){
      setInterval(() => {
        let x = 0;
        if(this.srcCount++%2==0){x=0}else{x=1}
        this.src = this.srcArray[x];
      }, 12000);
    },
    mounted(){
      // 收到来自兄弟组件的islogin信息,并改变logo位置
      // eslint-disable-next-line no-unused-vars
      this.$bus.$on('loginxState',(islogin)=>{
        this.logopullup = true;
      })
      setTimeout(() => {
            if(this.user.length!=0){
            this.loginsuccess = true;
      }
      }, 1000);
    },
    beforeDestroy(){
      this.$bus.$off('loginxState');
    }


}
</script>

<style scoped>
div{
    margin-top: 250px;
    position: relative;
    text-align: center;
}
/* logo升起来的样式 */
.logopullupcss{
	animation: slide-in-blurred-bottom 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
/* logo进入退出动画 */
.logoT-enter,.logoT-leave-to{
    opacity: 0;
}
.logoT-enter-active,.logoT-leave-active{
    transition: 2s;
}
.logoT-enter-to,.logoT-leave{
    opacity: 1;
}
.bot{
  top: 380px;
  width: 100%;
  font-size: 1.4vh;
  position: absolute;
  opacity: 0.66;
  text-align: center;
}

.bot span{
 position: relative;
 text-align: center;
}


.loginsuccesss{
  margin-top: 300px;
}

/* logo闪烁样式 */
img{
-webkit-animation: flicker-4 4s linear infinite both;
 animation: flicker-4 4s linear infinite both;
}
img:hover{
-webkit-animation: flicker-4 1s linear infinite both;
 animation: flicker-4 1s linear infinite both;
}
/* logohover动画 */
@keyframes rotate-in-hor {
  0% {
    -webkit-transform: rotateX(360deg);
            transform: rotateX(360deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    opacity: 1;
  }
}
/* logo闪烁动画 */
@keyframes flicker-4 {
  0%,
  100% {
    opacity: 1;
  }
  0%,1%{
    opacity: 0;
  }
     98% ,100% {
    opacity: 0;
  }
  31.98% {
    opacity: 1;
  }
  32% {
    opacity: 0;
  }
  32.8% {
    opacity: 0;
  }
  32.82% {
    opacity: 1;
  }
  34.98% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  35.7% {
    opacity: 0;
  }
  35.72% {
    opacity: 1;
  }
  36.98% {
    opacity: 1;
  }
  37% {
    opacity: 0;
  }
  37.6% {
    opacity: 0;
  }
  37.62% {
    opacity: 1;
  }
  67.98% {
    opacity: 1;
  }
  68% {
    opacity: 0;
  }
  68.4% {
    opacity: 0;
  }
  68.42% {
    opacity: 1;
  }
  95.98% {
    opacity: 1;
  }
  96% {
    opacity: 0;
  }
  96.7% {
    opacity: 0;
  }
  96.72% {
    opacity: 1;
  }
  98.98% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  99.6% {
    opacity: 0;
  }
  99.62% {
    opacity: 0;
  }

}

/* logo上升的动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(0)  scaleY(2.5) scaleX(0.2);
            transform: translateY(0)  scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-100px) scaleY(1) scaleX(1);
            transform: translateY(-100px)  scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}

</style>

