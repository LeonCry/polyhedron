<template>
  <div class="userbox">
      <transition name="userappearT" appear>
      <div v-show="isshow" class="user">
      <img src="../assets/user.svg" alt="用户">
      </div>
      </transition>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'user',
data(){
    return{
        isshow : false,
    }
},
methods:{
},
mounted(){
    this.$bus.$on('loginSuccess',(enterstate)=>{
        console.log(enterstate);
        setTimeout(() => {
            this.isshow = true;
        }, 1500);
    })
}
}
</script>

<style scoped>
.user{
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 20px;
    text-align: center;
    transition: 0.55s;
    right: 0;
    bottom: 0;
}
.user img{
    margin-top: 5px;
}
.user:hover{
    border-radius: 100%;
    background-color: black;
    cursor: pointer;
}

/* 用户出现动画 */
.userappearT-enter-active{
    animation: slide-in-blurred-bottom 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
/* 用户出现关键帧动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(100px) scaleY(2.5) scaleX(0.2);
            transform: translateY(100px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}

</style>