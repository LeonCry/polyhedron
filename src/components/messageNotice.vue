<template>
  <div v-show="isShow" class="messageNoticebox">
    <!-- 音效初始化 -->
    <img src="../assets/message.svg" alt="消息通知" />
    <div><br/>{{message}}</div>
    <audio
      ref="audio"
      src="../assets/audio/notice.wav"
      style="display: none"
    ></audio>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "messageNotice",
  data() {
    return {
      isShow: false,
      message:0,
    };
  },
  computed:{
...mapState('userInfo',['user']),
  },
  methods: {
    // 初始化
    messageCreated() {
      this.isShow = true;
      let totalMessage = 0;
      // 先读取总未读消息数
      if (localStorage.getItem(":totalMessage:" + this.user.userQQ) == null) {
        totalMessage = 0;
      } else {
        totalMessage = localStorage.getItem(":totalMessage:" + this.user.userQQ);
      }
     this.message = totalMessage;
     if(this.message==0){
       this.isShow = false;
     }
    },
  },
  created() {
  },
  mounted(){
    // 接收App数据,以显示未读消息数
    this.$bus.$on('messageNotice',()=>{
      setTimeout(() => {
        this.isShow = true;
        this.message = localStorage.getItem(":totalMessage:" + this.user.userQQ);
     if(this.message==0){
       this.isShow = false;
     }
      }, 100);
    })
      // 初始化显示
  this.$bus.$on('messageNoticeDefalut',()=>{
    this.messageCreated();
  })
  },
};
</script>

<style scoped>
.messageNoticebox {
  position: absolute;
  width: 60px;
  height: 25px;
  border-radius: 50px;
  display: flex;
  flex-flow: row nowrap;
  z-index: 100;
  bottom: 65px;
  right: 0;
  transition: 0.55s;
}
.messageNoticebox img {
  transition: 0.55s;
  animation: shake-vertical 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite
    both;
}
.messageNoticebox div {
  position: relative;
  width: 10px;
  height: 25px;
  margin-left: 5px;
  text-align: center;
  /* background-color: rgb(247, 76, 76); */
  font-size: 1.6vh;
  color: pink;
  font-weight: bolder;
  border-radius: 50px;
  transition: 0.55s;
}


@keyframes shake-vertical {
  0%,
  50%,
  60%,
  70%,
  80%,
  90%,
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  10%,
  20%,
  30% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
  }
  15%,
  25% {
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
  34% {
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
  }
  40% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
  }
  45% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
}
</style>