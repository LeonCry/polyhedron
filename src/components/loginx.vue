// 未登录前loginx的组件
<template>
  <div>
      <div class="loginIcon" >
       <transition name="loginxT" appear>    
        <img src="../assets/login_x.svg" alt="未登录" @click="changeLogin">
       </transition>
      </div>
  </div>
  
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "loginx", 
  data(){
      return{
          islogin:false,
      }
  },
  methods:{
      changeLogin(){
          this.islogin = !this.islogin;
      }
  }
};
</script>

<style scoped>
/* 登录按钮 */
.loginIcon{
    top: 200px;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
}
.loginIcon img{
    cursor: pointer;
}
/* 登录按钮的进入退出动画 */
.loginxT-enter-active{
	-webkit-animation: ping 0.8s ease-in-out infinite both reverse;
	animation: ping 0.8s ease-in-out infinite both reverse;
}
.loginxT-leave-active{
	-webkit-animation: ping 0.8s ease-in-out infinite both;
	animation: ping 0.8s ease-in-out infinite both;
}
@-webkit-keyframes ping {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 0.8;
  }
  80% {
    -webkit-transform: scale(1.2);
            transform: scale(1.2);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(3.2);
            transform: scale(3.2);
    opacity: 0;
  }
}
@keyframes ping {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 0.8;
  }
  80% {
    -webkit-transform: scale(1.2);
            transform: scale(1.2);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(3.2);
            transform: scale(3.2);
    opacity: 0;
  }
}

img{
        transition: 0.5s;
}

img:hover{
    transform: scale(1.2);
}

</style>