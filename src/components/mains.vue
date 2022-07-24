<template>
    <transition appear name="logoT">
  <div :class="{'logopullupcss':logopullup,'loginsuccesss':loginsuccess}">
      <!-- <img v-if="false"  :src="require(`../assets/${src}`)" alt="logo"/> -->
        <div class="polybox">
        <span ref="poly" class="poly">P O L Y H E D R O N <span class="anx">X</span></span>
        </div>
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
        // src:'LOGOX.svg',
        // srcArray:['LOGOX.svg','LOGOY.svg'],
        // srcCount:0,
        xNum:0,
        loginsuccess:false,
      }
    },
    computed:{
      ...mapState('userInfo',['user']),
    },
    created(){
      var loginR = '';
      this.$axios.post('/api/returnDetailsByNameAndTypeAndItem',{pxUser:this.user.userQQ,pxType:'点击 X*66',pxItem:'点击 X*66'}).then(response=>{
          loginR = response.data[0];
        // 如果item没有被看过
        if(loginR==undefined){
          let _this = this;
      document.onkeydown = function () {
        let key = window.event.keyCode;
        if (key === 88){
          _this.xNum = _this.xNum + 1;
          _this.$refs.poly.style.color = "black";
          setTimeout(() => {
          _this.$refs.poly.style.color = "white";
          }, 330);
          if(_this.xNum>66){
            _this.$addPxDetail(_this.user.userQQ,1,'点击 X*66',250,'点击 X*66',"触发了彩蛋,获得PX币+250");
            _this.xNum = 0;
          }
      }
  }
 }
        },error=>{
          console.log(error.message);
        });
      // setInterval(() => {
      //   let x = 0;
      //   if(this.srcCount++%2==0){x=0}else{x=1}
      //   this.src = this.srcArray[x];
      // }, 12000);
      
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
      document.onkeydown = null; 
    }


}
</script>

<style scoped>
div{
    margin-top: 250px;
    position: relative;
    text-align: center;
}
.polybox{
  position: relative;
  width: 100%;
  padding: 1vh;
  height: 18vh;
  overflow: hidden;
}
.poly{
  position: relative;
  transition: 0.33s;
  width: 100%;
  font-size: 15vh;
  overflow: hidden;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 100;
  animation: focus-in-expand 3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.anx{
  text-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 1);   
  animation: text-flicker-in-glow 2s linear both infinite;
}

@keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  60%{
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);        
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 1);        
    opacity: 1;
  }
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
/* img{
-webkit-animation: flicker-4 4s linear infinite both;
 animation: flicker-4 4s linear infinite both;
}
img:hover{
-webkit-animation: flicker-4 1s linear infinite both;
 animation: flicker-4 1s linear infinite both;
} */
/* logohover动画 */
/* @keyframes rotate-in-hor {
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
} */
/* logo闪烁动画 */
/* @keyframes flicker-4 {
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

} */

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

@keyframes text-flicker-in-glow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0;
  }
  30% {
    opacity: 0;
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
    opacity: 0;
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
    opacity: 0;
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
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0;
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
    opacity: 0;
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



</style>

