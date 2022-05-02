<template>
    <transition appear name="logoT">
  <div>
      <img src="../assets/logo.svg" alt="logo"/>
  </div>
  </transition>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'mains',


}
</script>

<style scoped>
div{
    margin-top: 225px;
    position: relative;
    text-align: center;
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
/* logo闪烁样式 */
img{
-webkit-animation: flicker-4 4s linear infinite both;
 animation: flicker-4 4s linear infinite both;
}
img:hover{
	-webkit-animation: rotate-in-hor 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: rotate-in-hor 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
/* logohover动画 */
@-webkit-keyframes rotate-in-hor {
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
@-webkit-keyframes flicker-4 {
  0%,
  100% {
    opacity: 1;
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
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  99.6% {
    opacity: 0;
  }
  99.62% {
    opacity: 1;
  }
}
@keyframes flicker-4 {
  0%,
  100% {
    opacity: 1;
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
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  99.6% {
    opacity: 0;
  }
  99.62% {
    opacity: 1;
  }
}

</style>

