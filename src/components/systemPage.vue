// 系统聊天界面
<template>
  <!--  -->
  <transition name="chatboxT">
    <div v-show="isShow" class="chatbox" :style="ChatLocation">
      <system-notice></system-notice>
      <system-page-loading></system-page-loading>
      <SpaceNoticeInSYS></SpaceNoticeInSYS>
      <!-- 抬头 -->
      <div class="toper" @mousedown="moveBegin">
        <!-- 名字 -->
        <span>系统通知</span>
        <!-- 退出按钮 -->
      </div>
      <!-- 退出按钮 -->
      <div class="exit">
        <img src="../assets/exit.svg" alt="退出" @click="exitChat" />
      </div>
      <!-- 内容 -->
      <div class="contents">
        <span>动态通知</span>
        <system-space-item
          v-show="space.noticeType == 0"
          v-for="space of asSpaceData"
          :key="space.sysNoticeId"
          :noticeprops="space"
        ></system-space-item>
        <img v-show="isSpaceEmpty" src="../assets/empty.svg" alt="空的" />
        <span>新的朋友</span>
        <systemfrienditem
          v-show="item.noticeType != 0"
          v-for="item of asReceiverData"
          :key="item.sysNoticeId"
          :noticeprops="item"
        ></systemfrienditem>
        <img v-show="isReceiverEmpty" src="../assets/empty.svg" alt="空的" />
        <span>我的请求</span>
        <systemfrienditem
          v-show="item.noticeType !== 0"
          v-for="item of asSenderData"
          :key="item.sysNoticeId"
          :noticeprops="item"
        ></systemfrienditem>
        <img v-show="isSenderEmpty" src="../assets/empty.svg" alt="空的" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import SpaceNoticeInSYS from './spaceNoticeInSYS.vue';
import systemfrienditem from "./systemfrienditem.vue";
import SystemNotice from "./systemNotice.vue";
import SystemPageLoading from "./systemPageLoading.vue";
import SystemSpaceItem from "./systemSpaceItem.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chats",
  components: {
    systemfrienditem,
    SystemNotice,
    SystemSpaceItem,
    SystemPageLoading,
    SpaceNoticeInSYS,
  },
  data() {
    return {
      //   是否展示该组件--聊天窗口
      isShow: false,
      //   窗口移动要用到到的x坐标
      pox: 400 + "px",
      //   窗口移动要用到到的y坐标
      poy: 500 + "px",
      //   判断是否鼠标按下的判定flag
      isMove: false,
      // 此组件Z轴高度 6 - 7
      //   三种状态空否
      isSpaceEmpty: false,
      isReceiverEmpty: false,
      isSenderEmpty: false,
      zIndex: 107,
      asSpaceData: [],
      asReceiverData: [],
      asSenderData: [],
    };
  },
  computed: {
    ...mapState("userInfo", ["user"]),
    //改变聊天窗口的位置
    ChatLocation() {
      return {
        top: this.poy - 30 + "px",
        left: this.pox - 150 + "px",
        zIndex: this.zIndex,
      };
    },
  },

  methods: {
    //   鼠标按下,开始移动
    moveBegin(e) {
      if(window.innerWidth<window.innerHeight){
        return 0;
      }
      // 获得按下的x坐标
      this.pox = e.clientX;
      // 获得按下的y坐标
      this.poy = e.clientY;
      // 判定在按下
      this.isMove = true;
    },
    // 退出按钮
    exitChat() {
      this.isShow = false;
    },
    // 向服务器发送请求,查询通知信息数据
    receiveSysNotices() {
      // 加载loading
      this.asSpaceData = [];
      this.asReceiverData = [];
      this.asSenderData = [];
      this.isSpaceEmpty = false;
      this.isReceiverEmpty = false;
      this.isSenderEmpty = false;
      this.$bus.$emit("systemPageLoading", true, "加载中..");
      // 查询我是接收方时的数据
      this.$axios
        .post("/api/selectByReceiver", { receiveUserQQ: this.user.userQQ })
        .then(
          (response) => {
            // 进行空间动态和收到的好友请求区分
            response.data.forEach((element) => {
              if (element.noticeType == 0) {
                if(element.sendUserQQ!=this.user.userQQ){this.asSpaceData.unshift(element);}
              } else if(element.noticeType != 3){
                this.asReceiverData.unshift(element);
              }
            });
            // 查询我是发送方时的数据
            this.$axios
              .post("/api/selectBySender", { sendUserQQ: this.user.userQQ })
              .then(
                (response) => {
                  response.data.forEach(data => {
                     this.asSenderData.unshift(data);
                  });
                  // 判断场景是否为空
                  this.isEmpty();
                  this.$bus.$emit("systemPageLoading", false, "加载中..");
                },
                (error) => {
                  console.log(error.message);
                  this.$bus.$emit("systemNotice", false, error.message);
                }
              );
          },
          (error) => {
            console.log(error.message);
            this.$bus.$emit("systemNotice", false, error.message);
          }
        );
    },
    // 判断场景是否为空
    isEmpty() {
      var spaceDelete = false;
      var receiveDelete = false;
      var sendDelete = false;
      // 判断空间是否为空
      this.asSpaceData.forEach((space) => {
        if (space.isDelete == 0) {
          spaceDelete = true;
          return 0;
        }
      });

      this.asReceiverData.forEach((receiver) => {
        if (receiver.isDelete == 0) {
          receiveDelete = true;
          return 0;
        }
      });

      this.asSenderData.forEach((sender) => {
        if (sender.isDelete == 0) {
          sendDelete = true;
          return 0;
        }
      });

      if (!spaceDelete) {
        // 为空
        this.isSpaceEmpty = true;
      }
      if (!receiveDelete) {
        // 为空
        this.isReceiverEmpty = true;
      }
      if (!sendDelete) {
        // 为空

        this.isSenderEmpty = true;
      }
    },
  },
  mounted() {
    //   实时监听鼠标移动,更改位置数据
    window.addEventListener("mousemove", (e) => {
      if (this.isMove) {
        this.pox = e.clientX;
        // 获得按下的y坐标
        this.poy = e.clientY;
      }
    }),
      //   实时监听--鼠标停止按下,则不再进行移动功能
      window.addEventListener("mouseup", () => {
        this.isMove = false;
      }),
      // 接收来自friendrecentitem和friendlistitem组件的数据
      // 进行展示与否  并向服务器发送请求接收数据
      this.$bus.$on("systemPageShow", (data1) => {
        this.isShow = data1;
        this.receiveSysNotices();
      });
      // 取得spaceitem并进行添加
  },
  beforeDestroy() {
    this.$bus.$off("chatboxappear");
    this.$bus.$off("changeZindex");
    this.$bus.$off("chatemoji");
  },
  //   created(){
  //     if(window.innerWidth<window.innerHeight){
  //       this.ChatLocation = {top: 10 + "px", left: 0,zIndex:108};
  //     }
  // }
};
</script>

<style scoped>
/* 聊天界面box */
.chatbox {
  position: absolute;
  width: 500px;
  height: 550px;
  top: 12%;
  left: 25%;
  z-index: 108;
  background-color: #1a191b;
  border-radius: 15px;
  box-shadow: 0 0 25px 5px black;
  display: flex;
  flex-flow: column nowrap;
  font-size: 2vh;
  color: white;
}
.chatbox:hover {
  border-radius: 25px;
  box-shadow: 0 0 30px 10px black;
}
/* 抬头 */
.toper {
  position: relative;
  width: 100%;
  height: 55px;
  border-radius: 25px 25px 0 0;
  display: flex;
  transition: 0.55s;
  flex-flow: row nowrap;
  background-color: rgba(47, 53, 66, 0.25);
}
.toper:hover {
  background-color: rgba(99, 110, 114, 0.2);
}
/* 用户名字 */
.toper > span {
  line-height: 55px;
  flex: 1;
  text-align: center;
}
/* 退出按钮 */
.exit {
  position: absolute;
  right: 0;
  z-index: 11;
  padding-right: 20px;
  line-height: 65px;
  cursor: pointer;
}
.exit img {
  transition: 0.8s;
}
.exit img:hover {
  transform: rotateZ(720deg) scale(1.33);
}

/* 中间框 */
.contents {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  top: 10px;
  overflow-y: auto;
  height: 82%;
}
.contents span {
  position: relative;
  padding: 10px;
  font-weight: bolder;
  font-size: 1.8vh;
  text-align: center;
  color: pink;
  width: 30%;
  left: 35%;
  margin-top: 15px;
  border-radius: 25px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.5);
  background-color: rgba(99, 110, 114, 0.33);
}
.contents img{
    position: relative;
    width: 150px;
    margin: 20px;
    height: 150px;
    align-self: center;
}

/* 该组件--聊天框进入退出动画 */
.chatboxT-enter-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.chatboxT-leave-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both
    reverse;
}

@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
    opacity: 1;
  }
}
@media only screen and (orientation: portrait) {
  /* 抬头 */
.toper {
  position: relative;
  width: 100%;
  height: 55px;
  border-radius: 0;
  display: flex;
  transition: 0.55s;
  flex-flow: row nowrap;
  background-color: rgba(47, 53, 66, 0.25);
}
  /* 聊天界面box */
.chatbox {
  position: absolute;
  width: 100%;
  height: 180%;
  top: 0;
  left: 0;
  z-index: 108;
  background-color: #1a191b;
  border-radius: 15px;
  border-radius: 0;
  box-shadow: 0;
  display: flex;
  flex-flow: column nowrap;
  font-size: 2vh;
  color: white;
}
.chatbox:hover {
  border-radius: 0;
  box-shadow: 0;
}
/* 中间框 */
.contents {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  top: 10px;
  overflow-y: auto;
  height: 50%;
}

}



</style>