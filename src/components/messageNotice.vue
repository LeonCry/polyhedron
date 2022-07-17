<template>
  <div v-show="isShow" class="messageNoticebox">
    <div><img class="divimg" src="../assets/message.svg" alt="消息通知" /></div>
    <div></div>
    <div>
    <div class="message"><span style="color:royalblue"><i class="el-icon-loading"></i>{{message}} </span></div>
    <audio
      ref="audio"
      src="../assets/audio/notice.wav"
      style="display: none"
    ></audio>

    </div>

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
  width: 300px;
  height: 100px;
  display: flex;
  flex-flow: column nowrap;
  z-index: 100;
  bottom: 65px;
  right: 0;
  transition: 0.55s;
  bottom: 0;

}
.messageNoticebox:div:nth-of-type(1){
  width: 100%;
  flex: 8;
}
.messageNoticebox:div:nth-of-type(2){
  width: 100%;
  height: 30px;
  flex: 6;
}
.messageNoticebox:div:nth-of-type(3){
  width: 100%;
  flex: 2;
}
.divimg {
  position: relative;
  left: 242px;
  transition: 0.55s;
  animation: shake-vertical 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both;
}

.message{
  width: 15%;
  right: 2.5%;
  left: 228px;
  bottom: 2px;
  font-weight: bolder;
  border-radius: 10px;
  padding: 2.5px;
  text-align: center;
  border: 2px solid black;
  position: absolute;
  background-color: white;
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