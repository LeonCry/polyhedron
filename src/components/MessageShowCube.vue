<template>
<transition appear name="MessageShowCubeT">
  <div v-show="isShow" class="MessageShowCube" @click="enterFace" @mouseover="showAlways" @mouseout="showCancel">
  <!-- 名字和消息 -->
  <div class="nameAndMessage">
        <div class="name">
                   <span><b>{{userName}} <span v-show="this.friend.friendRemarkName!=''"> ({{this.friend.friendRemarkName}})</span></b></span>
        </div>
        <div class="cont">
                   <b style="color:royalblue">[新消息] </b>
                    <b ref="messageContent">消息内容...</b>
        </div>
  </div>
  <div class="heads">
          <img v-if="this.userHead" :src="(`${publicPath}/HeadsAndBacks/Heads/${this.userHead}`)" alt="头像">
  </div>
  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'MessageShowCube',
data(){
    return{
        isShow:false,
        // 定时器ID
        setTimeId:'',
        // 用户名称
        userName:'',
        // 用户头像
        userHead:'',
        // 发消息者
        friend:'',
        publicPath: process.env.BASE_URL,
    }
},
computed:{
...mapState('userInfo',['user']),
},
methods:{
        // 点击后显示详细信息,打开弹窗
        enterFace(){
                this.$bus.$emit('showChatBoxFromCube',{friendQQ:this.friend.user.userQQ,userQQ:this.user.userQQ});
                        this.setTimeId = setTimeout(() => {
                           this.isShow = false;     
                        }, 1000);
         },
//     显示详细信息
        shwoMessage(data){          
                this.friend = data.friend;
                // 如果发送的上一条未显示完,则清除定时器
                if(this.isShow){
                        clearTimeout(this.setTimeId);
                }
                // 如果是发给我的消息,则显示
                if(data.messageData.receiveUserQQ==this.user.userQQ){
                        this.isShow = true;
                        // 显示用户名及头像
                        this.userName = data.friend.user.userName;
                        this.userHead = data.friend.user.userHead;
                        // 显示消息内容
                        setTimeout(() => {
                                if(data.messageData.chatContent=="A9wadv正在拨打..."){
                                        this.$refs.messageContent.innerHTML = "邀请你语音通话";
                                }
                                else{
                                        this.$refs.messageContent.innerHTML = data.messageData.chatContent;
                                }
                        }, 100);
                        this.setTimeId = setTimeout(() => {
                           this.isShow = false;     
                        }, 3500);
                }
        },
        // 鼠标选中时,一直显示
        showAlways(){
                clearTimeout(this.setTimeId);
        },
        // 鼠标移出,不再显示
        showCancel(){

                        this.setTimeId = setTimeout(() => {
                           this.isShow = false;     
                        }, 1500);  
        }

},

mounted(){
    this.$bus.$on('messageShowCube',(data)=>{
            this.shwoMessage(data);
    })
},
}
</script>

<style scoped>
/* 信息通知栏 */
.MessageShowCube{
  position: absolute;
  right: 0;
  top: 10px;
  z-index: 999;
  transition: 0.55s;
  border-radius: 18px 0 0 18px;
  border: 4px solid #1A191B;
  border-right: 0;
  display: flex;
  flex-flow: row nowrap;
  width:300px;
  height: 60px;
  background-color: snow;
}
.MessageShowCube:hover{
        cursor: pointer;
        background-color: #1A191B;
        border: 2.5px solid snow;
        border-right: 0;
}
.MessageShowCube:hover > div:nth-of-type(1){
color: snow;
border-right: 3px solid white;
}
.MessageShowCube:hover div:nth-of-type(3){
border: 2px dashed snow;
border-radius: 50%;
}
.MessageShowCube:hover > div:nth-of-type(2){
border: 2px dashed snow;
border-radius: 50%;
}
.nameAndMessage{
        position: relative;
        height: 100%;
        border-right: 3px solid #1A191B;
        margin-right: 10px;
        margin-left: 5px;
        height: 90%;
        transition: 0.25s;
        display: flex;
        flex-flow: column nowrap;
        font-size: 1.6vh;
        align-self: center;
        flex: 9;
        border-radius: 18px 0 0 18px;
}
.name{
        overflow: hidden;
        flex: 1;
        margin-right: 5px;
        align-self: flex-end;
}
.cont{
        overflow: hidden;
        display: flex;
        flex-flow: row nowrap;
        flex: 1;
}
.cont b:nth-of-type(1){
        flex: 2;
}
.cont b:nth-of-type(2){
        height: 20px;
        overflow: hidden;
        flex: 5;
}


.heads{
        border: 3px solid #1A191B;
        margin-right: 5px;
        border-radius: 15px;
        height: 80%;
        align-self: center;
        transition: 0.8s;
        overflow: hidden;
        flex: 2;
}
.heads img{
 width: 100%;
 height: 100%;
}



.MessageShowCubeT-enter-active{
animation: tilt-in-right-1 0.55s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.MessageShowCubeT-leave-active{
animation: tilt-in-right-1 0.55s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}


@keyframes tilt-in-right-1 {
  0% {
    -webkit-transform: rotateX(-30deg) translateX(300px) skewX(30deg);
            transform: rotateX(-30deg) translateX(300px) skewX(30deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg) translateX(0) skewX(0deg);
            transform: rotateX(0deg) translateX(0) skewX(0deg);
    opacity: 1;
  }
}


</style>