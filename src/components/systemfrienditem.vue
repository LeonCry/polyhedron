// 系统界面通知-单个friend
<template>
  <transition name="frienditemT" appear>
    <div
      v-show="isShow"
      :class="{
        hasAccept: isAccept,
        hasRefuse: isRefuse,
        frienditem: isNormal,
      }"
    >
      <!-- 头像 -->
      <img v-if="notice.userHead" :src="require(`../assets/Heads/${notice.userHead}`)" alt="头像" />
      <!-- 网名,个签内容物 -->
      <div class="content">
        <!-- 名字和签名 -->
        <div class="nameandsign">
          <!-- 名字 -->
          <div class="username">
            <!-- 用户名 -->
            <span
              >{{ prefix }}
              <span style="color: pink">{{ notice.userName }}</span>
              <span>{{ suffix }}</span></span
            >
            <!-- 最后消息时间 -->
            <span>{{
              new Date(parseInt(noticeprops.noticeTime))
                .toLocaleString()
                .slice(5)
            }}</span>
          </div>
          <!-- 聊天内容 -->
          <div class="chats">
            <span>{{ noticeprops.remarks }}</span>
          </div>
        </div>
        <!-- 个人空间 -->
        <div class="starspace">
          <img
            class="star"
            src="../assets/space.svg"
            alt="空间"
            @click="enterHerSpace"
          />
          <img
            v-show="consider"
            class="accpet"
            src="../assets/yes.svg"
            alt="接受"
            @click="accpetAsFriend"
          />
          <img
            v-show="consider"
            class="refuse"
            src="../assets/x.svg"
            alt="拒绝"
            @click="refuseAsFriend"
          />
          <img
            v-show="!consider"
            class="delete"
            src="../assets/delete.svg"
            alt="删除"
            @click="deleteNotice"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "systemfrienditem",
  props: ["noticeprops"],
  data() {
    return {
      isShow: true,
      // 是否接受作为好友
      isAccept: false,
      // 是否拒绝接受作为好友
      isRefuse: false,
      // 是否未作响应
      isNormal: true,
      // 删除按钮出现
      consider: true,
      // 一个接收的notice对象
      notice: "",
      // 页面展示的内容
      prefix: "",
      suffix: "",
    };
  },
  computed: {
    ...mapState("userInfo", ["user"]),
  },
  methods: {
    // 进入她的空间
    enterHerSpace() {
      // 向starspace组件发送数据,显示聊天框
      this.$bus.$emit("spaceappear", true, false);
    },
    // 接受作为好友的状态class
    greenAccept() {
      this.isAccept = true;
      this.isRefuse = false;
      this.isNormal = false;
      this.consider = false;
    },
    // 拒绝作为好友的状态class
    redAccept() {
      this.isAccept = false;
      this.isRefuse = true;
      this.isNormal = false;
      this.consider = false;
    },

    // 接受为好友,更新数据
    accpetAsFriend() {
      // 更新数据
      this.$axios
        .post("/api/updateNoticeData", {
          sendUserQQ: this.noticeprops.sendUserQQ,
          receiveUserQQ: this.user.userQQ,
          isAccept: 1,
        })
        .then(
          (response) => {
            console.log("已接受该好友请求", response.data);
            this.greenAccept();
          },
          (error) => {
            this.$bus.$emit("systemNotice", false, error.message);
          }
        );
      //   向FriendList数据库中添加数据
      this.$axios
        .post("/api/addOneFriend", {
          userQQ: this.user.userQQ,
          friendQQ: this.noticeprops.sendUserQQ,
          friendName:this.notice.userName,
          beFriendTime: Date.now(),
        })
        .then(
          // eslint-disable-next-line no-unused-vars
          (response) => {
            // 更新名称信息
            this.$axios.post("/api/updateFriend",{userQQ: this.noticeprops.sendUserQQ,friendQQ:this.user.userQQ,friendName:this.user.userName}).then(
              // eslint-disable-next-line no-unused-vars
              (response)=>{
                this.$bus.$emit("systemNotice", true, "已接受该好友请求~");
              },
              (error)=>{
                console.log(error.message);
                
              }
            )
          },
          (error) => {
            console.log(error.message);
            this.$bus.$emit("systemNotice", false, error.message);
          }
        );
    },
    // 拒绝为好友,更新数据
    refuseAsFriend() {
      // 更新数据
      this.$axios
        .post("/api/updateNoticeData", {
          sendUserQQ: this.noticeprops.sendUserQQ,
          receiveUserQQ: this.user.userQQ,
          isAccept: 2,
        })
        .then(
          (response) => {
            console.log("已拒绝该好友请求", response.data);
            this.$bus.$emit("systemNotice", false, "已拒绝该好友请求~");
            this.redAccept();
          },
          (error) => {
            this.$bus.$emit("systemNotice", false, error.message);
          }
        );
    },
    // 删除该条通知
    deleteNotice() {
      // 如果是我发出的信息
      if (this.user.userQQ == this.noticeprops.sendUserQQ) {
        this.$axios
          .post("/api/updateNoticeData", {
            sendUserQQ: this.user.userQQ,
            receiveUserQQ: this.noticeprops.receiveUserQQ,
            isDelete: 1,
          })
          .then(
            (response) => {
              console.log(response.data);
              this.isShow = false;
            },
            (error) => {
              this.$bus.$emit("systemNotice", false, error.message);
            }
          );
      } else {
        this.$axios
          .post("/api/updateNoticeData", {
            sendUserQQ: this.noticeprops.sendUserQQ,
            receiveUserQQ: this.user.userQQ,
            isDelete: 1,
          })
          .then(
            (response) => {
              console.log(response.data);
              this.isShow = false;
            },
            (error) => {
              this.$bus.$emit("systemNotice", false, error.message);
            }
          );
      }
    },
    // 判断+ 头像请求和用户名
    headRequest() {
      // 如果是我发出的请求,则请求我的信息,删除接收和拒绝方法
      if (this.user.userQQ == this.noticeprops.sendUserQQ) {
        this.consider = false;
        this.prefix = "你申请添加 ";
        this.suffix = "为好友";
        this.$axios
          .post("api/getUser", { userQQ: this.noticeprops.receiveUserQQ })
          .then(
            (response) => {
              console.log("接收到的数据:", response.data);

              this.notice = response.data;
            },
            (error) => {
              console.log(error.message);
            }
          );
      } else {
        this.consider = true;
        this.prefix = "";
        this.suffix = "申请添加为好友";
        this.$axios
          .post("api/getUser", { userQQ: this.noticeprops.sendUserQQ })
          .then(
            (response) => {
              this.notice = response.data;
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
    },
    // 判断是已接受还是拒绝状态还是删除
    stateJudgment() {
      if (this.noticeprops.isDelete == 1) {
        this.isShow = false;
        return 0;
      }
      if (this.noticeprops.isAccept == 1) {
        this.greenAccept();
      } else if (this.noticeprops.isAccept == 2) {
        this.redAccept();
      }
    },
  },
  mounted() {
    // 头像请求和同户名
    this.headRequest();
    // 判断是已接受还是拒绝状态还是删除
    this.stateJudgment();
  },
};
</script>

<style scoped>
/* 单个好友 */
.frienditem {
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.55s;
  height: 60px;
  font-size: 1.6vh;
  border-radius: 50px 0 0 50px;
  background-color: rgba(61, 61, 61, 0.5);
  color: rgba(255, 255, 255, 0.7);
}
.frienditem:hover {
  background-color: rgba(61, 61, 61, 1);
  border-radius: 50px 0 0 50px;
  box-shadow: -8px 0 25px rgba(61, 61, 61, 1);
  color: white;
}
/* 头像 */
.frienditem > img {
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  margin-left: 2.5px;
  border: 5px solid rgba(61, 61, 61, 1);
}
/* 网名,个签内容物 */
.content {
  position: relative;
  width: 450px;
  display: flex;
  flex-flow: row nowrap;
  height: 55px;
}
/* 更改名字和签名的长度 */
.content:hover .nameandsign {
  flex: 4;
}
/* 更改个人空间 */
.content:hover .starspace {
  cursor: pointer;
  flex: 1.5;
  opacity: 1;
}
/* 名字和签名 */
.nameandsign {
  position: relative;
  flex: 8;
  display: flex;
  flex-flow: column nowrap;
  transition: 0.55s;
  margin-left: 10px;
  height: 55px;
}
/* 用户名字 */
.username {
  margin-top: 5px;
  position: relative;
  display: flex;
  height: 20px;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* 个性签名 */
.chats {
  position: relative;
  margin-top: 10px;
  display: flex;
  height: 20px;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* 消息个数样式 */
.messagenum {
  position: absolute;
  background-color: rgba(242, 63, 63, 0.885);
  left: -25px;
  border-radius: 25px;
  max-width: 30px;
  min-width: 20px;
  font-weight: bold;
  text-align: center;
  height: 20px;
}
/* 接受作为好友 */
.hasAccept {
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.55s;
  height: 60px;
  font-size: 1.6vh;
  border-radius: 50px 0 0 50px;
  background-color: rgb(44, 124, 44);
  box-shadow: 0 0 8px greenyellow;
  color: pink;
}
.hasAccept:hover {
  border-radius: 50px 0 0 50px;
  box-shadow: 0 0 15px greenyellow;
}
/* 头像 */
.hasAccept > img {
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  margin-left: 2.5px;
  border: 5px solid rgba(61, 61, 61, 0.33);
}
/* 拒绝作为好友 */
.hasRefuse {
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: 0.55s;
  height: 60px;
  font-size: 1.6vh;
  border-radius: 50px 0 0 50px;
  background-color: darkred;
  box-shadow: 0 0 8px orangered;
  color: pink;
}
.hasRefuse:hover {
  border-radius: 50px 0 0 50px;
  box-shadow: 0 0 15px orangered;
}
/* 头像 */
.hasRefuse > img {
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  margin-left: 2.5px;
  border: 5px solid rgba(61, 61, 61, 0.33);
}

/* 个人空间 */
.starspace {
  position: relative;
  flex: 1;
  opacity: 0;
  height: 20px;
  transition: 0.55s;
  margin-top: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border-left: 2px solid white;
}
/* 个人空间hover时img的变化 */
.star {
  transition: 1s;
  margin-left: 10px;
}
.accpet {
  transition: 0.55s;
  margin-left: 10px;
}
.refuse {
  transition: 0.55s;
  margin-left: 10px;
}
.delete {
  transition: 0.55s;
  margin-left: 10px;
}
.starspace:hover > img:nth-of-type(1) {
  transform: rotateZ(360deg);
}
.accpet:hover {
  border-radius: 50%;
  background-color: darkgreen;
  box-shadow: 0 0 15px yellowgreen;
}
.refuse:hover {
  border-radius: 50%;
  background-color: brown;
  box-shadow: 0 0 15px orangered;
}
.star:hover {
  border-radius: 50%;
  background-color: darkgoldenrod;
  box-shadow: 0 0 15px yellow;
}
.delete:hover {
  border-radius: 50%;
  background-color: rgba(255, 192, 203, 0.45);
  box-shadow: 0 0 15px pink;
}
/* 更改字体滑过时鼠标 */
span {
  cursor: default;
}
/* 好友个体进入退出动画 */
.frienditemT-enter-active {
  animation: slide-in-blurred-right 0.3s cubic-bezier(0.23, 1, 0.32, 1) both;
}
.frienditemT-leave-active {
  animation: slide-in-blurred-right 0.3s cubic-bezier(0.23, 1, 0.32, 1) both
    reverse;
}
/* 好友个体进入退出动画 */
@keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(200px) scaleX(2.5) scaleY(0.2);
    transform: translateX(200px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
</style>