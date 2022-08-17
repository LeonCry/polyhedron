// 系统置顶信息提示,emit为videoChatFake,即可正确信息,也可错误信息
<template>
<transition name="errorT">
  <div v-show="isShow" class="errorbox" :class="{greenboxclass:greenbox}">
      <div class="default" v-show="isSender" @click="cancelVideoSender">
      <img src="../assets/video.svg" alt="语音">
      <span>取消</span>
      </div>
      <div class="default" v-show="isReceiver && !isaccept" @click="cancelVideoReceive">
      <img src="../assets/video.svg" alt="语音" >
      <span>拒绝</span>
      </div>
      <div class="accpet" v-show="isReceiver" @click="acceptoReceive">
      <img src="../assets/video.svg" alt="语音">
      <span>接听</span>
      </div>
      <div class="default" v-show="isaccept" @click="byebye">
      <img src="../assets/video.svg" alt="语音">
      <span>挂断</span>
      </div>
      <span>{{errorMessage}}</span>
      <audio ref="audioerror" style="display:none" src="../assets/audio/error2.mp3" ></audio>
      <audio ref="audioyes" style="display:none" src="../assets/audio/buding.wav" ></audio>
      <audio ref="video" style="display:none" loop="loop" src="../assets/audio/video.wav" ></audio>
      <br>
      <br>
  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'systemNotice',
data(){
    return{
        errorMessage:'正在等待对方接收语音通话...',
        isShow:false,
        greenbox:true,
        videoSetTimeOut:'',
        // 是否为发送的一方
        isSender:false,
        // 是否为接收的一方
        isReceiver:false,
        // 是否接听了
        isaccept:false,
        // 接听方对方QQ
        receiveQQ:'',
        // 发起方对方QQ
        senderQQ:'',
    }
},
computed:{
...mapState('userInfo',['user','socket']),
},
methods:{
    // 发送方取消语音通话
    cancelVideoSender(){
        this.$refs.video.pause();
        this.greenbox = false;
        this.errorMessage = "已取消语音通话.";
        // socket发送消息
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.receiveQQ,message:"A9wadv:发送方取消语音通话"}));
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.receiveQQ,message:"我取消了语音通话"}));
        // 永久化存储该状态
        this.$bus.$emit('saveVideoMessage',{from:this.user.userQQ,to:this.receiveQQ,message:"我取消了语音通话"});
        this.$refs.audioerror.play();
        setTimeout(() => {
        this.isShow = false;  
        clearTimeout(this.videoSetTimeOut);        
        }, 2000);
    },
    // 接收方拒绝语音通话
    cancelVideoReceive(){
        this.isaccept = false;
        this.$refs.video.pause();
        this.greenbox = false;
        this.errorMessage = "已拒绝语音通话.";
        // socket发送消息
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.senderQQ,message:"A9wadv:接听方拒绝语音通话"}));
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.senderQQ,message:"我拒绝了对方发起的语音通话"}));
        // 永久化存储该状态
        this.$bus.$emit('saveVideoMessage',{from:this.senderQQ,to:this.user.userQQ,message:"我拒绝了对方发起的语音通话"});
        this.$refs.audioerror.play();
        setTimeout(() => {
        this.isShow = false;  
        // this.$bus.$emit('videoMessage',"我取消了语音通话");
        clearTimeout(this.videoSetTimeOut);        
        }, 2000);
    },
    // 接收方接受通话
    acceptoReceive(){
        this.isaccept = true;
        this.$refs.video.pause();
        this.greenbox = true;
        this.errorMessage = "已接听..";
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.senderQQ,message:"A9wadv:接听方已接听"}));
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.senderQQ,message:"我接听了对方语音通话: 00:00"}));
        // 永久化存储该状态
        this.$bus.$emit('saveVideoMessage',{from:this.senderQQ,to:this.user.userQQ,message:"我接听了对方语音通话: 00:00"});
        this.$refs.audioerror.pause();
        clearTimeout(this.videoSetTimeOut);
        setTimeout(() => {
         this.errorMessage = "实际功能暂未开通..";
        }, 1100);
        setTimeout(() => {
        this.isShow = false;  
        clearTimeout(this.videoSetTimeOut);       
        }, 2500);
    },
     // 接收方挂断
    byebye(){
        this.isaccept = false;
        this.greenbox = false;
        this.errorMessage = "已挂断.";
        this.$refs.audioerror.play();
        setTimeout(() => {
        this.isShow = false;  
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.senderQQ,message:"A9wadv:接听方已挂断"}));
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.senderQQ,message:"我挂断了对方的语音通话"}));
        // 永久化存储该状态
        this.$bus.$emit('saveVideoMessage',{from:this.senderQQ,to:this.user.userQQ,message:"我挂断了对方的语音通话"});
        clearTimeout(this.videoSetTimeOut);        
        }, 2000);
    }
},
mounted(){
    // 拨打的一方
    this.$bus.$on('videoChatFake',(data)=>{
        this.receiveQQ = data.friendQQ;
        this.isSender = true;
        this.isReceiver = false;
        this.errorMessage = "正在等待对方接收语音通话...";  
        this.$bus.$emit('videoMessage',"A9wadv正在拨打...");
        this.$refs.video.play();
        if(this.isShow){
            console.log("A");
        }
        else{
        this.isShow = true;
        this.greenbox = true;
    this.videoSetTimeOut=setTimeout(() => {
        this.$refs.video.pause();
        this.greenbox = false;
            this.errorMessage = "对方无应答.";
            this.$refs.audioerror.play();
            setTimeout(() => {
                this.isShow = false;
                // 向chat组件发送消息,保存到数据库中
                this.$bus.$emit('videoMessage',"对方无应答");
            }, 2500);
        }, 15000);
        }
    })
    // 接收的一方
      this.$bus.$on('receiveVideo',(data)=>{
        this.senderQQ = data.friendQQ;
        this.isSender = false;
        this.isReceiver = true;
          this.isShow = true;
          this.errorMessage = "等待接听...";  
          this.greenbox = true;
          this.$refs.video.play();
          this.videoSetTimeOut=setTimeout(() => {
              setTimeout(() => {
                  this.greenbox = false;
                  this.errorMessage = "您未接听"; 
                  this.$refs.video.pause();
                this.isShow = false;
            }, 2500);
          },15000)

      })



this.$bus.$on('getSocketMessage',(data)=>{
    setTimeout(() => {
            // 如果是发起者的操作 data.from==this.senderQQ
            if(data.from==this.senderQQ && data.to==this.user.userQQ){                    
                if(data.text.substring(0,6)=="A9wadv"){
                    // 进行判断
                    if(data.text=="A9wadv:发送方取消语音通话"){
                        this.errorMessage = "对方已挂断.";
                        clearTimeout(this.videoSetTimeOut);
                        this.$refs.video.pause();
                        this.$refs.audioerror.play();
                        this.greenbox = false;
                        setTimeout(() => {
                            this.isShow = false;
                        }, 2500);
                    }
                }
            }
            // 如果是接听者的操作 data.from==this.receiveQQ
            if(data.from==this.receiveQQ && data.to==this.user.userQQ){
                if(data.text.substring(0,6)=="A9wadv"){
                    // 进行判断
                    if(data.text=="A9wadv:接听方拒绝语音通话"){
                        this.errorMessage = "对方拒绝接听.";
                        clearTimeout(this.videoSetTimeOut);
                        this.$refs.video.pause();
                        this.$refs.audioerror.play();
                        this.greenbox = false;
                        setTimeout(() => {
                            this.isShow = false;
                        }, 2500);
                    }
                    // 进行判断
                    if(data.text=="A9wadv:接听方已挂断"){
                        this.errorMessage = "对方已挂断.";
                        clearTimeout(this.videoSetTimeOut);
                        this.$refs.video.pause();
                        this.$refs.audioerror.play();
                        this.greenbox = false;
                        setTimeout(() => {
                            this.isShow = false;
                        }, 2500);
                    }
                    // 进行判断
                    if(data.text=="A9wadv:接听方已接听"){
                        this.errorMessage = "正在接通...(功能暂未开放)";
                        clearTimeout(this.videoSetTimeOut);
                        this.$refs.video.pause();
                        this.$refs.audioerror.play();
                        this.greenbox = false;
                        setTimeout(() => {
                            this.isShow = false;
                        }, 2500);
                    }
                }
            } 
    }, 10);
        })




},

  


beforeDestroy(){
    this.$bus.$off('videoChatFake');
}
}
</script>

<style scoped>
    .errorbox{
        position: absolute;
        top: 40%;
        left: 25%;
        width: 45%;
        padding-top: 20px;
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
        top: 40%;
        left: 25%;
        width: 45%;
        padding-top: 20px;
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
        position: relative;
        padding: 15px;
        top: 5.5px;
        
    }
    .default{
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        border-radius:0 25px 25px 0;
        height: 100%;
        cursor: pointer;
        transition: 0.55s;
        animation: videos 2s infinite both alternate-reverse ease-in-out;
    }
    .accpet{
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        border-radius:25px 0 0 25px;
        height: 100%;
        cursor: pointer;
        transition: 0.55s;
        animation: acceptvideos 2s infinite both alternate-reverse ease-in-out;
    }
     .accpet:hover{
         background-color: rgba(0, 255, 0, 1);
         animation:none; 
     }
      .accpet:hover span{
       opacity: 1;
         color: white;
         top: 35px;
      }
          .accpet:hover img{
         top: 15px;
     }
     .accpet span{
         position: absolute;
         width: 50px;
         transition: 0.55s;
         left: 6px;
         opacity: 0;
         top: 55px;
     }
    .accpet img{
        position: absolute;
        top: 25px;
        transition: 0.55s;
        right: 40px;
    }
     .default:hover{
         background-color: rgba(255, 0, 0, 0.8);
         animation:none;
     }
    .default:hover span{
         opacity: 1;
         color: yellowgreen;
         top: 35px;
     }
    .default:hover img{
         top: 15px;
     }
     .default span{
         position: absolute;
         width: 50px;
         transition: 0.55s;
         left: 6px;
         opacity: 0;
         top: 55px;
     }
    .default img{
        position: absolute;
        top: 25px;
        transition: 0.55s;
        right: 40px;
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

  @keyframes videos {
  0% {
    background-color: rgba(0, 0, 0, 0.33);
  }
  100% {
    background-color: rgba(255, 0, 0, 0.33);
  }
  
}
  @keyframes acceptvideos {
  0% {
    background-color: rgba(0, 0, 0, 0.33);
  }
  100% {
    background-color: rgba(0, 255, 0, 0.33);
  }}

@media only screen and (orientation: portrait) {
    .errorbox{
        position: absolute;
        top: 20%;
        left: 0;
        width: 100%;
        padding-top: 20px;
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
        top: 20%;
        left: 0;
        width: 100%;
        padding-top: 20px;
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


}



</style>