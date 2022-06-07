// 提示弹窗--
<template>
  <transition name="tipsT">
    <div v-show="isShow" class="tips">
      <div class="top"></div>
      <span>{{ message }}</span>
      <input ref="input" type="text" v-model="value" maxlength="12" />
      <div class="but">
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
  name: "tips",
  data() {
    return {
      isShow: false,
      message: "请输入更改备注名:",
      value: "",
      oldValue: "",
      friend: "",
    };
  },
  computed: {
    ...mapState("userInfo", ["user"]),
  },
  methods: {
    cancel() {
      this.isShow = false;
    },
    async confirm() {
        let res = '';
        await this.$axios
          .post("/api/updateFriend", {
            friendQQ: this.friend.friendQQ,
            userQQ: this.user.userQQ,
            friendRemarkName: this.value,
          })
          .then(
            (response) => {
              res = response.data;
              this.$bus.$emit("chatNotice", true, "修改成功!");
            },
            (error) => {
              console.log(error.message);
            }
          );
        if(res==1){
            this.isShow = false;
            // 重新刷新friend界面
            this.$axios.post('/api/getAllFriends',{userQQ:this.user.userQQ}).then(response=>{
                this.$bus.$emit('getAllFriends',response.data);
                // 刷新正在聊天界面 to chat
                this.$bus.$emit('freshChat',{friendQQ:this.friend.friendQQ,userQQ:this.user.userQQ});
                // 刷新最近聊天界面--其他界面的备注信息
                this.$bus.$emit('remakeNameChange',{friendQQ:this.friend.friendQQ,userQQ:this.user.userQQ});
            },error=>{
                console.log(error.message);
            }); 
        }
    },
    changeRemakeName(friend) {
      // 获取用户原备注
      let remakeName = friend.friendRemarkName;
      this.value = remakeName;
      this.oldValue = remakeName;
      this.message = "请输入新的备注名..";
      this.friend = friend;
    },
  },
  mounted() {
    this.$bus.$on("WhereTips", (data) => {
      this.isShow = true;
      this.$nextTick(()=>{
          this.$refs.input.focus();
      })
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
  background-color: rgba(99, 110, 114, 0.8);
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

.but button:nth-of-type(1):hover {
  box-shadow: 0px 0px 25px maroon;
  background-color: maroon;
}
.but button:nth-of-type(2):hover {
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