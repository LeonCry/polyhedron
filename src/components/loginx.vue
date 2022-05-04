// 未登录前loginx的组件
<template>
  <div>
    <div class="loginIcon">
      <transition name="loginxT" appear>
        <img v-show="!loginx" :class="{hasloginclass:changeTop}" :src="svgForward" alt="未登录" @click="changeLogin" />
      </transition>
      <span v-show="islogin" :class="{hasloginclass:changeTop}">——</span>
      <img v-show="islogin" :class="{hasloginclass:loadingstate1,loadings:loadingstate2}" src="../assets/loading.svg" alt="loading">
      <span v-show="islogin" :class="{hasloginclass:changeTop}" style="color: darkgray">—</span>
      <transition name="loginxT" appear>
      <img v-show="islogin" :class="{hasloginclass:changeTop}" :src="svgBackward" alt="登录">
      </transition>
    </div>
    <transition name="svgMoveT" appear>
    <img v-show="svgMove" class="fakeaim"  src="../assets/login_v.svg" alt="暂时存在的假人">
    </transition>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "loginx",
  data() {
    return {
      // 控制弹出登录状态时loginx的显示状态
      islogin: false,
      // svg上升的样式
      changeTop: false,
      // 登录状态样式
      loadingstate1:false,
      loadingstate2:false,
      // svg去右下角的状态
      svgMove : false,
      // 原始的loginx svg
      loginx: false,
      // 界面的前方的svg 注意使用require    !important
      svgForward: require('../assets/login_x.svg'),
      // 界面的前方的svg
      svgBackward:require('../assets/login_v.svg'),

    };
  },
  methods: {
    changeLogin() {
      this.islogin = true;
      this.loadingstate1 = true;
      this.changeTop = true;
      // 向兄弟组件发送loginx的状态
      this.$bus.$emit('loginxState',this.islogin);
    },
  },
  mounted(){
    // 接收来自login处登录时传来的数据,控制loading及其他特效
    this.$bus.$on('loading',(loginingStatae)=>{
      console.log('loading:'+loginingStatae);
      // 加载loading特效
      if(loginingStatae){
        this.loadingstate1 = false;
        this.loadingstate2 = true;
      }
      // 停止加载loading特效//登录成功[目前]
      else{
        this.svgMove = true;
        this.changeTop =false;
        this.loginx = true;
        this.islogin = false;
        this.loadingstate1 = true;
        this.loadingstate2 = false;
        // 动画播放完毕后将其隐藏
        setTimeout(() => {
          this.svgMove = false;
        }, 1);
      }
    })
    // 接收来自login处改变登录选项的数据,更改svg图标
    this.$bus.$on('svgchange',(data1,data2)=>{
      console.log(data1);
      this.svgForward = data1;
      this.svgBackward = data2;
      
    })
  },
  beforeDestroy(){
    this.$bus.$off('loginxState');
    this.$bus.$off('svgchange');

  }
};
</script>

<style scoped>
/* 登录按钮 */
.loginIcon {
  top: 200px;
  position: relative;
  display: flex;
  /* transition: 1s; */
  flex-flow: row nowrap;
  justify-content: center;
}
.loginIcon img {
  cursor: pointer;
}
/* loading特效 */
.loadings{
  transition: 0s;
  margin-top: -400px;
  animation: loading-frame 5s cubic-bezier(0.600, -0.280, 0.735, 0.045) both infinite;
}
/* 登录svg的进入动画 */
.loginxT-enter-active {
  animation: ping 0.8s ease-in-out both reverse;
}
.loginxT-leave-active {
  animation: ping 0s ease-in-out both;
}


/* loginx的属性 */
img {
  transition: 0.5s;
}

img:hover {
  transform: scale(1.2);
}
/* 短线属性 */
span{
  font-size: 2.5vh;
  font-weight: bold;
  color: white;
  margin: 5px;
}
/* 假人的样式 */
.fakeaim{
  position: absolute;
  left: 50%;
}
/* 登录按钮 已点击登录的样式 */
/* 已选择登录 */
.hasloginclass{
	animation: slide-in-blurred-bottom 1s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}

/* 去到最右下角svg的动画样式 */
.svgMoveT-leave-active{
  animation: slide-out-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

/* 登录按钮的进入动画 */
@keyframes ping {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  80% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    -webkit-filter: blur(20px);
    filter: blur(20px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(3.2);
    transform: scale(3.2);
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
}
/* 已选择登录动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(0)  scaleY(2.5) scaleX(0.2);
            transform: translateY(0)  scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-200px) scaleY(1) scaleX(1);
            transform: translateY(-200px)  scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
/* loading动画 */
@keyframes loading-frame {
  0% {
            transform: rotate(0) scale(1);
  }
  25% {
            transform: rotate(90deg) scale(1.2);
            
  }
  50% {
            transform: rotate(180deg) scale(1.3);
  }
  75% {
            transform: rotate(270deg) scale(1.2);
  }
  100% {
            transform: rotate(360deg) scale(1);
  }
}
/* svg退出动画 */
@keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(400px);
            transform: translateY(400px);
    opacity: 0;
  }
}


</style>