// 设置组件
<template>
  <transition name="settingboxT">
    <div v-show="isShow" class="settingbox" :style="settingLocation" @mousedown="changeIndex">
      <!-- 头部 -->
      <div class="toper" @mousedown="moveBegin">
        <!-- 设置 -->
        <span>设 置</span>
      </div>
      <!-- 退出按钮 -->
      <div class="exit">
        <img src="../assets/exit2.svg" alt="退出" @click="exitChat" />
      </div>
      <!-- 所有设置 -->
      <div class="allsetting">
        <!-- 账户设置 -->
        <div class="setting" @click="userDetailAppear">
          <span>账 户 设 置</span>
          <img
            src="../assets/rightnrror.svg"
            alt="detail"
            :style="userDetailDropStyle"
          />
        </div>
        <transition name="DetailT">
          <!-- 账户设置细节 -->
          <div v-show="userDetail" class="settingdetail">
            <!-- 用户QQ -->
            <div>
              <span>用户QQ</span>
              <input type="text" value="1395346178" disabled />
            </div>
            <!-- 用户名 -->
            <div>
              <span>用户名</span>
              <input type="text" value="Leoncry" />
            </div>
            <!-- 用户邮箱 -->
            <div>
              <span>用户邮箱</span>
              <input type="text" value="1395346178@qq.com" />
            </div>
            <!-- 个性签名 -->
            <div>
              <span>个性签名</span>
              <input type="text" value="风不住的往北吹..." />
            </div>
            <!-- 头像 -->
            <div>
              <span>头像</span>
              <button class="upload">
                <img src="../assets/upload.svg" alt="上传" />
              </button>
            </div>
            <!-- 个人背景 -->
            <div>
              <span>个人背景</span>
              <button class="upload">
                <img src="../assets/upload.svg" alt="上传" />
              </button>
            </div>
          </div>
        </transition>
        <!-- 消息通知 -->
        <div class="setting" @click="noticeDetailAppear">
          <span>消 息 通 知</span>
          <img
            src="../assets/rightnrror.svg"
            alt="detail"
            :style="noticeDetailDropStyle"
          />
        </div>
        <transition name="DetailT">
          <!-- 消息通知细节 -->
          <div v-show="noticeDetail" class="settingdetail">
            <!-- 声音提示 -->
            <div>
              <span>声音提示</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="voiceSwitch" :style="voiceSwitchStyle"/>
            </div>
            <!-- 好友消息邮箱通知 -->
            <div>
              <span>好友消息邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="friendSwitch" :style="friendSwitchStyle"/>
            </div>
            <!-- 空间动态邮箱通知 -->
            <div>
              <span>空间动态邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="spaceSwitch" :style="spaceSwitchStyle"/>
            </div>
            <!-- 添/删好友邮箱通知 -->
            <div>
              <span>添/删好友邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="changeSwitch" :style="changeSwitchStyle"/>
            </div>
            <!-- 登录邮箱通知 -->
            <div>
              <span>登录邮箱通知</span>
              <img class="switch" src="../assets/switch.svg" alt="开关" @click="loginSwitch" :style="loginSwitchStyle"/>
            </div>
          </div>
        </transition>
        <!-- 客服热线 -->
        <div class="setting" @click="serviceDetailAppear">
          <span>客 服 热 线</span>
          <img
            src="../assets/rightnrror.svg"
            alt="detail"
            :style="serviceDetailDropStyle"
          />
        </div>
        <transition name="DetailT">
          <!-- 客服热线细节 -->
          <div v-show="serviceDetail" class="settingdetail">
            <!-- 客服热线1 -->
            <div>
              <span>小姐姐QQ</span>
              <span>1793023418</span>
            </div>
            <div>
              <span>小哥哥QQ</span>
              <span>1395346178</span>
            </div>
          </div>
        </transition>
      </div>
      <!-- 保存按钮 -->
      <div class="savediv">
        <button class="save">保存</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "setting",
  data() {
    return {
      //   是否展示该组件--设置
      isShow: false,
      //   窗口移动要用到到的y坐标
      pox: 400 + "px",
      //   窗口移动要用到到的y坐标
      poy: 500 + "px",
      //   判断是否鼠标按下的判定flag
      isMove: false,
      //   声音通知,按钮方向判定
      voiceNotice: false,
      voiceSwitchDeg:0,
      //   消息通知,按钮方向判定
      friendNotice: false,
      friendSwitchDeg:0,
      //   空间通知通知,按钮方向判定
      spaceNotice: false,
      spaceSwitchDeg:0,
      //   增删通知,按钮方向判定
      changeNotice: false,
      changeSwitchDeg:0,
      //   登录通知,按钮方向判定
      loginNotice: false,
      loginSwitchDeg:0,
      //   账户设置细节展开,下拉框改变方向
      userDetail: false,
      userDetailDrop: 0,
      //   消息通知细节展开,下拉框改变方向
      noticeDetail: false,
      noticeDetailDrop: 0,
      //   客服细节展开,下拉框改变方向
      serviceDetail: false,
      serviceDetailDrop: 0,
      // 此组件Z轴高度 6 - 7
      zIndex:6,
    };
  },
  computed: {
    //改变聊天窗口的位置
    settingLocation() {
      return { top: this.poy - 30 + "px", left: this.pox - 100 + "px",zIndex:this.zIndex };
    },
    // 改变账户设置细节处下拉框转向
    userDetailDropStyle() {
      return { transform: "rotateZ(" + this.userDetailDrop + ")" };
    },
    // 改变通知细节细节处下拉框转向
    noticeDetailDropStyle() {
      return { transform: "rotateZ(" + this.noticeDetailDrop + ")" };
    },
    // 改变客服细节处下拉框转向
    serviceDetailDropStyle() {
      return { transform: "rotateZ(" + this.serviceDetailDrop + ")" };
    },
    // 声音通知按钮转向
    voiceSwitchStyle(){
        return { transform: "rotateZ(" + this.voiceSwitchDeg + ")" };
    },
    // 好友通知按钮转向
    friendSwitchStyle(){
        return { transform: "rotateZ(" + this.friendSwitchDeg + ")" };
    },
    // 空间通知按钮转向
    spaceSwitchStyle(){
        return { transform: "rotateZ(" + this.spaceSwitchDeg + ")" };
    },
    // 添删通知按钮转向
    changeSwitchStyle(){
        return { transform: "rotateZ(" + this.changeSwitchDeg + ")" };
    },
    // 登录通知按钮转向
    loginSwitchStyle(){
        return { transform: "rotateZ(" + this.loginSwitchDeg + ")" };
    },
  },
  methods: {
    // 账户设置细节出现
    userDetailAppear() {
      this.userDetail = !this.userDetail;
      if (!this.userDetailDrop) {
        this.userDetailDrop = 90 + "deg";
      } else {
        this.userDetailDrop = 0;
      }
    },
    // 通知细节出现
    noticeDetailAppear() {
      this.noticeDetail = !this.noticeDetail;
      if (!this.noticeDetailDrop) {
        this.noticeDetailDrop = 90 + "deg";
      } else {
        this.noticeDetailDrop = 0;
      }
    },
    // 客服细节出现
    serviceDetailAppear() {
      this.serviceDetail = !this.serviceDetail;
      if (!this.serviceDetailDrop) {
        this.serviceDetailDrop = 90 + "deg";
      } else {
        this.serviceDetailDrop = 0;
      }
    },
    // 声音提示按钮转换+数据更改
    voiceSwitch(){
        this.voiceNotice = !this.voiceNotice;
        if(this.voiceNotice){
            this.voiceSwitchDeg = 540 + 'deg';
        }
        else{
            this.voiceSwitchDeg = 0;
        }
    },
    // 好友消息提示按钮转换+数据更改
    friendSwitch(){
        this.friendNotice = !this.friendNotice;
        if(this.friendNotice){
            this.friendSwitchDeg = 540 + 'deg';
        }
        else{
            this.friendSwitchDeg = 0;
        }
    },
    // 空间动态提示按钮转换+数据更改
    spaceSwitch(){
        this.spaceNotice = !this.spaceNotice;
        if(this.spaceNotice){
            this.spaceSwitchDeg = 540 + 'deg';
        }
        else{
            this.spaceSwitchDeg = 0;
        }
    },
    // 添\删好友提示按钮转换+数据更改
    changeSwitch(){
        this.changeNotice = !this.changeNotice;
        if(this.changeNotice){
            this.changeSwitchDeg = 540 + 'deg';
        }
        else{
            this.changeSwitchDeg = 0;
        }
    },
    // 登录提示按钮转换+数据更改
    loginSwitch(){
        this.loginNotice = !this.loginNotice;
        if(this.loginNotice){
            this.loginSwitchDeg = 540 + 'deg';
        }
        else{
            this.loginSwitchDeg = 0;
        }
    },
    //   鼠标按下,开始移动
    moveBegin(e) {
      // 获得按下的x坐标
      this.pox = e.clientX;
      // 获得按下的y坐标
      this.poy = e.clientY;
      // 判定在按下
      this.isMove = true;
      console.log(this.isMove);
    },
    // 退出按钮
    exitChat() {
      this.isShow = false;
      this.$bus.$emit('settingappear',this.isShow);
    },
            changeIndex(){
      // 聚焦,改变高度,同时降低其他两个窗口的高度
      // 从左往右分别为 空间\聊天\设置
      this.$bus.$emit('changeZindex',6,6,7);
        },
  },
  mounted() {
    //   实时监听鼠标移动,更改位置数据
    window.addEventListener("mousemove", (e) => {
      if (this.isMove) {
        this.pox = e.clientX;
        // 获得按下的y坐标
        this.poy = e.clientY;
        console.log(this.poy);
      }
    }),
      //   实时监听--鼠标停止按下,则不再进行移动功能
      window.addEventListener("mouseup", () => {
        this.isMove = false;
      }),
      // 接收来自user组件的数据
      // 进行展示与否
      this.$bus.$on("settingappear", (data1) => {
        this.isShow = data1;
      });
        // 接收来自其他窗口的数据,进行高度改变
        this.$bus.$on('changeZindex',(spaceZ,chatsZ,settingZ)=>{
          this.zIndex = settingZ;
        });
  },
  beforeDestroy() {
    this.$bus.$off("settingappear");
    this.$bus.$off("changeZindex");
  },
};
</script>

<style scoped>
.settingbox {
  position: absolute;
  width: 400px;
  height: 600px;
  top: 12%;
  left: 25%;
  z-index: 6;
  background-color: #1a191b;
  border-radius: 15px;
  box-shadow: 0 0 25px 5px black;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1.8vh;
  color: white;
}
.settingbox:hover {
  border-radius: 25px;
  box-shadow: 0 0 30px 10px black;
}
/* 抬头 */
.toper {
  position: relative;
  width: 400px;
  height: 55px;
  border-radius: 25px 25px 0 0;
  display: flex;
  transition: 0.55s;
  flex-flow: row nowrap;
  background-color: rgba(47, 53, 66, 0.25);
}

.toper:hover{
  background-color: rgba(99, 110, 114, 0.2);
}

/* 设置名字 */
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
/* 所有设置 */
.allsetting {
  position: relative;
  width: 100%;
  max-height: 460px;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-flow: column nowrap;
}
/* 外层设置 */
.setting {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 10px;
  padding-left: 0;
  cursor: pointer;
  transition: 0.55s;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px rgba(47, 53, 66, 0.25) solid;
}
.setting span {
  margin-left: 25px;
  font-size: 2.2vh;
}
.setting img {
  transition: 0.55s;
}
/* 内层设置 */
.settingdetail {
  position: relative;
  width: 90%;
  left: 5%;
  padding: 5px;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
}
/* 具体设置设置 */
.settingdetail div {
  position: relative;
  width: 100%;
  height: 45px;
  display: flex;
  transition: 0.55s;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px rgba(47, 53, 66, 0.25) solid;
}
.settingdetail div span {
  margin-left: 25px;
}
input {
  position: relative;
  width: 40%;
  height: 100%;
  border: 0;
  outline: 0;
  padding-left: 30px;
  transition: 0.55s;
  border-radius: 10px;
  background-color: rgba(99, 110, 114, 0);
  font-size: 1.8vh;
  color: pink;
}
input:focus {
  font-size: 2vh;
  border-radius: 20px;
  background-color: rgba(99, 110, 114, 0.1);
  color: greenyellow;
}
/* 上传按钮 */
.upload {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  color: pink;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
  width: 40%;
  height: 100%;
}
.upload:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}
/* 开关按钮 */
.switch {
  cursor: pointer;
  transition: 0.2s;
}
/* 保存div */
.savediv {
  position: absolute;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  bottom: 0;
  flex-flow: row nowrap;
  justify-content: space-between;
}
/* 保存 */
.save {
  position: relative;
  align-self: center;
  width: 100px;
  height: 100%;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: pink;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
  margin-left: 38%;
}
.save:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}
/* 所有hover效果 */
.setting:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.2);
  background-color: rgba(99, 110, 114, 0.2);
}
.settingdetail div:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.2);
  background-color: rgba(99, 110, 114, 0.2);
}

/* 该组件--聊天框进入退出动画 */
.settingboxT-enter-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.settingboxT-leave-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both
    reverse;
}
/* 细节部分进入退出动画 */
.DetailT-enter-active {
  animation: slide-in-blurred-bottom 0.55s cubic-bezier(0.23, 1, 0.32, 1) both;
}
.DetailT-leave-active {
  animation: slide-in-blurred-bottom 0.2s cubic-bezier(0.23, 1, 0.32, 1) both
    reverse;
}
/* 该组件--聊天框进入退出动画 */
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
/* 细节部分进入退出动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(600px) scaleY(2.5) scaleX(0.2);
    transform: translateY(600px) scaleY(2.5) scaleX(0.2);
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