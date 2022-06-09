// 提示弹窗--
<template>
  <transition name="tipsT">
    <div v-show="isShow" class="tips">
      <div class="top"></div>
      <span>{{ message }}</span>
      <span style="color:red"><b>{{message2}}</b></span>
      <input style="display:none" ref="input" type="text" v-model="value" maxlength="12" />
      <div class="but" :style="hidden">
        <button @click="cancel">取消</button>
        <button @click="confirm">确定</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "delTips",
  data() {
    return {
      isShow: false,
      message: "确定要删除好友关系吗?",
      message2 : '"你将丢失与TA的所有聊天记录"',
      value: "",
      oldValue: "",
      friend: "",
      hidden:'',
    };
  },
  computed: {
    ...mapState("userInfo", ["user","socket"]),
  },
  methods: {
    cancel() {
      this.isShow = false;
    },
      // 发送好友请求通知
    sendNoticeByWST(msg){
            let message = "A9wadv::NEW" + this.user.userQQ + msg; 
            this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.friend.friendQQ,message:message}));
    },
    async confirm() {
        // 第一步:文本变化,对话框变化,消息列表变化
       this.message = "正在删除...";
       this.message2 = "Maybe that's our.."
       this.hidden = "display:none";
      //  发送消息
       this.sendNoticeByWST("已与你解除好友关系.");
       setTimeout(() => {
    //    删除好友关系
    this.$axios.post("/api/deleteFriend",{userQQ:this.user.userQQ,friendQQ:this.friend.friendQQ}).then(response=>{
        console.log("deleteFriend",response.data);
        // 删除聊天记录
        this.$axios.post("/api/deleteChats",{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ}).then(
            response=>{
                console.log("deleteChats",response.data);
                // 好友列表变化-消失
                this.$bus.$emit("refreshLists",false);
                // 最近聊天-消失
                this.$bus.$emit("deleteChats",{userQQ:this.user.userQQ,friendQQ:this.friend.friendQQ});
                 this.message = "已解除好友关系.";
                 this.message2 = "Maybe that's our...end";
                setTimeout(() => {
                    this.isShow = false;
                     // 对话框变化-消失
                    this.$bus.$emit("chatboxappear",false);
                    setTimeout(() => {
                        // 返回原样
                         this.hidden = '';
                         this.message = "确定要删除好友关系吗?";
                         this.message2 = '"你将丢失与TA的所有聊天记录"';

                    }, 3000);
                }, 2000);
            },error=>{
                console.log(error.message);
            });
    },
    error=>{
        console.log(error.message);
    });
       }, 500);
    },
    changeRemakeName(friend) {
      this.friend = friend;
    },
  },
  mounted() {
    this.$bus.$on("delTips", (data) => {
      this.isShow = true;
      this.changeRemakeName(data.friend);
    });
  },
};
</script>

<style scoped>
.top {
  border-radius: 25px 25px 0 0;
  max-width: 350px;
  height: 25px;
  z-index: 100;
  background-color: maroon;
}
.tips {
  position: absolute;
  min-width: 350px;
  max-width: 500px;
  max-height: 200px;
  background-color: black;
  border-radius: 25px;
  top: 30%;
  left: 35%;
  display: flex;
  flex-flow: column nowrap;
  color: white;
  font-size: 1.6vh;
}
.tips span {
  margin-top: 10px;
  overflow: hidden;
  text-align: center;
  padding: 10px;
  max-width: 300px;
}
input {
  position: relative;
  width: 75%;
  left: 8.5%;
  top: 20px;
  height: 30px;
  border: 0;
  outline: 0;
  padding-left: 20px;
  transition: 0.55s;
  border-left: 2px solid darkgrey;
  background-color: rgba(99, 110, 114, 0.33);
  font-size: 1.5vh;
  color: pink;
}
input:focus {
  font-size: 1.6vh;
  background-color: rgba(99, 110, 114, 0.6);
  color: greenyellow;
}
.but {
  max-width: 350px;
  height: 100px;
  margin-bottom: 15px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: flex-end;
}
.but button {
  position: relative;
  width: 80px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: white;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
}

.but button:nth-of-type(2):hover {
  box-shadow: 0px 0px 25px maroon;
  background-color: maroon;
}
.but button:nth-of-type(1):hover {
  box-shadow: 0px 0px 25px green;
  background-color: green;
}
.tipsT-enter-active{
animation: slide-in-blurred-top 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tipsT-leave-active{
animation: slide-in-blurred-top 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000) both reverse;
}
@keyframes slide-in-blurred-top {
  0% {
    -webkit-transform: translateY(-200px) scaleY(2.5) scaleX(0.2);
            transform: translateY(-200px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
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