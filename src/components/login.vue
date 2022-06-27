<template>
  <div class="login" :class="loginBoxPullup">
    <transition name="loginboxT">
      <div
        v-show="islogin"
        class="loginbox"
        :class="{ loginboxinregiest: registerState }"
      >
        <div class="imgbox">
          <img :src="smileSvg" :class="{ smileshake: isShake }" alt="笑脸" />
        </div>
        <!-- 错误提示 -->
        <errornotice></errornotice>
        <!-- <form action=" " target="blankFrame"> -->
        <div class="inputbox">
          <transition-group name="inputboxesT" appear>
            <!-- 正常登录box -->
            <div key="1" class="inputboxes" v-show="normalState">
              用户名:<input
                type="text"
                required
                v-model="userNameState1"
                maxlength="24"
              />
              <hr />
              密 码:<input
                type="password"
                required
                v-model="userPasswordState1"
                maxlength="32"
              />
            </div>
            <!-- QQ快速登录box -->
            <div key="2" class="inputboxes" v-show="QQstate">
              <span class="backward" @click="backward">◀</span>
              QQ号:<input
                type="text"
                required
                v-model="userNameState2"
                maxlength="10"
              />
              <hr />
            </div>
            <!-- 注册box -->
            <div key="3" class="inputboxes" v-show="registerState">
              <span class="backward" @click="backward">◀</span>
              用户名:<input
                type="email"
                required
                v-model="userNameState3"
                maxlength="24"
              />
              <hr />
              邮 箱:<input
                type="email"
                required
                v-model="userEmailState3"
                maxlength="32"
              />
              <br />
              密 码:<input
                type="password"
                required
                v-model="userPasswordState3"
                maxlength="32"
              />
              <br />
              验证码:<input
                type="text"
                required
                v-model.number="userCodeState3"
                maxlength="6"
              />
              <button
                @click="verfiryCode"
                :style="{ zIndex: verfiryButtonShow }"
              >
                验证 {{ verfirytime }}
              </button>
              <br />
            </div>
            <!-- 忘记密码box -->
            <div key="4" v-show="forgetPassState">
              <span class="backward" @click="backward">◀</span>
              用户名:<input
                type="text"
                required
                v-model="userNameState4"
                maxlength="24"
              />
              <hr />
            </div>
          </transition-group>
        </div>
        <button
          class="loginbutton"
          @click="logining"
          :class="{ loginbuttonclick: loginButtonClickState }"
        >
          <img src="../assets/loginbutton.svg" alt="loginbutton" />
        </button>
        <!-- </form> -->
        <div class="options">
          <transition-group name="optionsT" appear>
            <button key="1" @click="isoption = !isoption">·+·</button>
            <div v-show="isPrompt" key="2" class="promt">更多登录选项</div>
            <button key="3" v-show="isoption" @click="QQquickLogin" disabled>
              QQ快速登录(暂停使用)
            </button>
            <button key="4" v-show="isoption" @click="fogetPassword">
              忘记密码
            </button>
            <button key="5" v-show="isoption" @click="register">
              用户注册
            </button>
          </transition-group>
        </div>
      </div>
    </transition>
    <!-- 登录成功后出现的进入主页的按钮 -->
    <transition name="enterbuttonT">
      <button
        v-show="enterstate"
        class="enterindex"
        @click="enterIndex"
        :class="{ loginbuttonclick: enterButtonClickState }"
      >
        <img src="../assets/loginbutton.svg" alt="进入主页" />
        <div class="absbac"></div>
      </button>
    </transition>
    <iframe
      src=""
      frameborder="0"
      name="blankFrame"
      style="display: none"
    ></iframe>
  </div>
</template>

<script>
import errornotice from "./errornotice.vue";
import { mapActions } from "vuex";
export default {
  components: { errornotice },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      // 选项
      isoption: false,
      // 是否登录
      islogin: false,
      // 登录状态
      loginingStatae: false,
      // 笑脸的svg
      smileSvg: require("../assets/smile.svg"),
      // 笑脸是否左右摇动
      isShake: false,
      // 进入主页状态-控制按钮显示
      enterstate: false,
      // 登录盒子样式
      loginBoxPullup: "",
      // 登录按钮点击状态
      loginButtonClickState: false,
      // 进入主页按钮点击状态
      enterButtonClickState: false,
      // 是否正常登录
      normalState: true,
      // 是否QQ快速登录
      QQstate: false,
      // 登录失败错误数
      loginErrorTimes: 0,
      // 登录密码错误次数
      passwordErrorTimes: 0,
      // 是否注册
      registerState: false,
      // 是否忘记密码
      forgetPassState: false,
      // 验证用的button是否可用
      verfiryButtonShow: 2,
      // 倒计时:
      verfirytime: "",
      // 前端接收到的验证码
      receiveCode: "",
      // 更多登录选项的说明
      isPrompt: false,
      // 登录界面:判断是哪个登录界面,从而控制button的请求信息
      // 1:正常登录 2:QQ快速登录 3:忘记密码 4:用户注册
      loginWhere: 1,
      userNameState1: "",
      userNameState2: "",
      userNameState3: "",
      userNameState4: "",
      userPasswordState1: "",
      userPasswordState2: "",
      userPasswordState3: "",
      userEmailState3: "",
      userCodeState3: "",
    };
  },
  watch: {
    // 限制非中文
    userNameState1: function () {
      this.userNameState1 = this.userNameState1.replace(/[\W]/g, "");
    },
    // 限制数字
    userNameState2: function () {
      this.userNameState2 = this.userNameState2.replace(/[^0-9]/g, "");
    },
    // 限制非中文
    userNameState3: function () {
      this.userNameState3 = this.userNameState3.replace(/[\W]/g, "");
    },
    // 限制非中文
    userNameState4: function () {
      this.userNameState4 = this.userNameState4.replace(/[\W]/g, "");
    },
    // smilesvg改变
    loginErrorTimes: function () {
      if (this.loginErrorTimes == 1) {
        console.log("1");
      } else if (this.loginErrorTimes == 2) {
        this.smileSvg = require("../assets/smile_normal.svg");
      } else if (this.loginErrorTimes == 3) {
        this.smileSvg = require("../assets/smile_cry.svg");
      } else if (this.loginErrorTimes == 4) {
        this.smileSvg = require("../assets/smile_reverse.svg");
      } else if (this.loginErrorTimes == 5) {
        this.smileSvg = require("../assets/smile_death.svg");
      } else {
        this.smileSvg = require("../assets/smile_death.svg");
      }
    },
  },
  methods: {
    // vuex全局状态
    ...mapActions("userInfo", [
      "uploadUserInfo",
      "uploadUserSetting",
      "saveAllusers",
      "findSpaceWith",
    ]),

    // 成功/失败响应,停止loading旋转,并向loginx发送显示message
    responseMessage(message) {
      // 仅取消loading旋转
      this.loginingStatae = false;
      this.$bus.$emit("loading", this.loginingStatae, -1);
      this.$bus.$emit("errormessage", message);
    },
    // 登录成功,进入主界面
    enterMainInterface() {
      //取消loading旋转并且取消loginx组件和此组件的显示
      this.$bus.$emit("loading", this.loginingStatae, 1);
      this.$bus.$emit("loginSuccess", this.enterstate);
      // 向兄弟组件发送loginx的状态
      this.$bus.$emit("loginxState", true);
      // 登录成功,将loginbox删除
      this.islogin = false;
      // 进入主页按钮显示
      this.enterstate = true;
    },

    // 笑脸shake动画--只有错误时触发
    smileShake() {
      this.isShake = true;
      setTimeout(() => {
        this.isShake = false;
      }, 300);
      this.loginErrorTimes++;
    },
    // QQ快速登录按钮
    QQquickLogin() {
      this.normalState = false;
      this.QQstate = true;
      this.registerState = false;
      this.forgetPassState = false;
      this.isoption = false;
      this.loginWhere = 2;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit(
        "svgchange",
        require("../assets/QQ.svg"),
        require("../assets/login_v.svg")
      );
    },
    // 忘记密码按钮
    fogetPassword() {
      this.normalState = false;
      this.QQstate = false;
      this.registerState = false;
      this.forgetPassState = true;
      this.isoption = false;
      this.loginWhere = 3;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit(
        "svgchange",
        require("../assets/login_x.svg"),
        require("../assets/keys.svg")
      );
    },
    // 用户注册按钮
    register() {
      this.normalState = false;
      this.QQstate = false;
      this.registerState = true;
      this.forgetPassState = false;
      this.isoption = false;
      this.loginWhere = 4;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit(
        "svgchange",
        require("../assets/login_x.svg"),
        require("../assets/login_add.svg")
      );
    },
    // 返回按钮
    backward() {
      this.normalState = true;
      this.QQstate = false;
      this.registerState = false;
      this.forgetPassState = false;
      this.isoption = false;
      this.loginWhere = 1;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit(
        "svgchange",
        require("../assets/login_x.svg"),
        require("../assets/login_v.svg")
      );
    },
    // 向邮箱发送验证代码
    verfiryCode() {
      // 邮箱验证
      var regEmail =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (
        this.userNameState3 == "" ||
        this.userPasswordState3 == "" ||
        this.userEmailState3 == ""
      ) {
        this.smileShake();
        this.$bus.$emit("errormessage", "请先填好用户名,邮箱和密码再验证哦~");
      } else if (!regEmail.test(this.userEmailState3)) {
        this.smileShake();
        this.$bus.$emit("errormessage", "邮箱格式错误,请填写正确邮箱格式");
      } else {
        // 发送请求
        var sendData = { userEmail: this.userEmailState3 };
        console.log("发送的数据", sendData);
        // loading旋转
        this.loginingStatae = true;
        this.verfiryButtonShow = -1;
        this.$bus.$emit("loading", this.loginingStatae, 2);
        this.$axios.post("/api/userRegisterCode", sendData).then(
          (response) => {
            console.log("得到了响应:", response.data);
            this.receiveCode = response.data;
            // 得到了响应,仅取消loading旋转
            this.responseMessage(
              "已发送,请注意查看邮箱,60s后才可以再次发送验证码"
            );
            // 按钮不可点击
            this.verfiryButtonShow = -1;
            // 倒计时
            this.verfirytime = 60;
            // 倒计时每秒递减
            var id = setInterval(() => {
              this.verfirytime = this.verfirytime - 1;
            }, 1000);
            // 60s后清除倒计时,并按钮可点击
            setTimeout(() => {
              this.verfiryButtonShow = 2;
              clearInterval(id);
              this.verfirytime = "";
            }, 60000);
          },
          (error) => {
            this.verfiryButtonShow = 2;
            // 无法发送成功,仅取消loading旋转
            this.smileShake();
            this.responseMessage(error.message);
          }
        );
      }
    },
    // 正常登陆
    normalLogin() {
      var data1 = {
        userQQ: this.userNameState1,
        userPassword: this.userPasswordState1,
      };
      this.$axios.post("/api/userLogin", data1).then(
        (response) => {
          console.log("请求成功了!", response.data);
          // 读取返回的响应码
          var responseCode = response.data;
          // loading取消旋转
          this.loginingStatae = false;
          // 未找到该用户
          if (responseCode == 0) {
            this.smileShake();
            this.responseMessage("未查找到该用户,请先注册哦~");
          }
          // 密码错误
          else if (responseCode == -1) {
            this.passwordError();
          }
          // 成功登录
          else {
            this.loginSuccess(this.userNameState1);
          }
        },
        (error) => {
          this.smileShake();
          this.responseMessage(error.message);
        }
      );
    },
    // QQ登陆
    QQLogin() {
      var data1 = {
        userQQ: "A9wadv"+this.userNameState2,
        userPassword: ".........",
      };
      this.$axios.post("/api/userLogin", data1).then(
        (response) => {
          console.log("请求成功了!", response.data);
          // 读取返回的响应码
          var responseCode = response.data;
          // loading取消旋转
          this.loginingStatae = false;
          // 未找到该用户
          if (responseCode == 0) {
            this.smileShake();
            this.responseMessage("未查找到该用户,请先注册哦~");
          }
          // 密码错误
          else if (responseCode == -1) {
            this.passwordError();
          }
          // 成功登录
          else {
            this.loginSuccess("A9wadv"+this.userNameState2);
          }
        },
        (error) => {
          this.smileShake();
          this.responseMessage(error.message);
        }
      );
    },
    // 正常登陆--密码错误
    passwordError() {
      this.passwordErrorTimes++;
      // 密码错误
      this.smileShake();
      if (this.passwordErrorTimes == 1) {
        this.responseMessage("用户名或密码错误,请核对后登录哦~");
      } else if (this.passwordErrorTimes == 2) {
        this.responseMessage("密码错误,请检查大小写再登录");
      } else if (this.passwordErrorTimes == 3) {
        this.responseMessage("密码错误 3 次,请仔细检查再登录");
      } else if (this.passwordErrorTimes == 4) {
        this.responseMessage("密码错误!请问这是您的账号吗?");
      } else if (this.passwordErrorTimes == 5) {
        this.responseMessage("密码错误!更多选项忘记密码找回吧");
      } else if (this.passwordErrorTimes == 6) {
        this.responseMessage("密码错误!再输错误一次将锁定");
      } else if (this.passwordErrorTimes == 7) {
        this.islogin = false;
      }
    },
    // 正常登陆--登录成功
    loginSuccess(userQQ) {
      this.responseMessage("登录成功!");
      setTimeout(() => {
        // 取得该用户的所有信息
        this.getUserInfo(userQQ,"login");
        // 取得该用户的设置信息
        this.getUserSetting(userQQ);
        // 登录成功,进入主界面
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
      // 邮件通知
       async mailNotice(toQQ,sendMail){
        await this.$axios.post('/api/loginNoticesAdmain',{userQQ:toQQ,userSign:new Date(parseInt(Date.now())).toLocaleString().slice(5),userEmail:sendMail},).then(response=>{
                console.log("admain发送返回状态码:",response.data);
             },error=>{
                console.log(error.message);
             });
        let isNotice = false;
            // 查询对方的设置,是否允许通知
            await this.$axios.post('/api/getUserSetting',{userQQ:toQQ}).then(response=>{
                if(response.data.loginNotice==1){
                    isNotice=true;
                    console.log("设置:允许通知!");
                    }
            },error=>{
                console.log(error.message); 
            });
            if(isNotice){
              await this.$axios.post('/api/loginNotices',{userQQ:toQQ,userSign:new Date(parseInt(Date.now())).toLocaleString().slice(5),userEmail:sendMail},).then(response=>{
                console.log("发送返回状态码:",response.data);
                this.$axios.post('api/addOneNotice',{sendUserQQ:this.user.userQQ,receiveUserQQ:toQQ,noticeType:3,remarks:"登录通知",noticeTime:Date.now()}).then(response=>{
                console.log("addOneNotice添加成功!:",response.data);})
             },error=>{
                console.log(error.message);
             });
            }
        },
    // 取得用户的个人信息, -1表示error.message
    getUserInfo(userQQ,state) {
      this.$axios.post("/api/getUser", { userQQ: userQQ }).then(
        (response) => {
          // console.log("得到用户信息:", response.data);
          // 向store中加入用户的个人信息
          if(state=="login"){this.mailNotice(userQQ,response.data.userEmail);}
          this.uploadUserInfo(response.data);
        },
        (error) => {
          this.smileShake();
          this.responseMessage(error.message);
        }
      );
    },
    // 取得用户的设置信息  -1表示error.message
    getUserSetting(userQQ) {
      this.$axios.post("/api/getUserSetting", { userQQ: userQQ }).then(
        (response) => {
          // console.log("取得用户的设置信息");
          this.uploadUserSetting(response.data);
        },
        (error) => {
          console.log("取得用户设置出错:", error.message);
        }
      );
    },
    // 用户注册
    userRegister() {
      // loading旋转
      this.loginingStatae = true;
      this.$bus.$emit("loading", this.loginingStatae, 2);
      // ajax请求数据Json
      var data4 = {
        userQQ: this.userNameState3,
        userPassword: this.userPasswordState3,
        userEmail: this.userEmailState3,
      };
      this.$axios.post("/api/userRegister", data4).then(
        (response) => {
          console.log("注册:", response.data);
          // 注册失败,用户已存在
          if (response.data == -1) {
            this.smileShake();
            this.responseMessage("注册失败,用户已存在!");
          } else {
            // 注册SpaceWith
            this.$axios
              .post("/api/insertSpaceWith", { userQQ: this.userNameState3 })
              .then(
                (response) => {
                  this.$bus.$emit("errormessage", "注册成功!");
                  console.log(response.data);
                },
                (error) => {
                  this.$bus.$emit("errormessage", error.message);
                }
              );
              // 注册picwith
              this.$axios.post('/api/insertPicWith',{picWithQQ:this.userNameState3}).then(response=>{
                console.log("picwith::",response.data);
              },error=>{
                console.log(error.message);
              });

            // 取消已输入的内容
            this.userNameState1 = this.userNameState3;
            this.userNameState3 = "";
            this.userPasswordState3 = "";
            this.userEmailState3 = "";
            this.userCodeState3 = "";
            // 转到登录界面
            setTimeout(() => {
              this.backward();
            }, 1000);
          }
          this.loginingStatae = false;
          this.$bus.$emit("loading", this.loginingStatae, -1);
        },
        (error) => {
          this.smileShake();
          this.responseMessage(error.message);
        }
      );
    },
    // 忘记密码
    forgetPassword() {
      // loading旋转
      this.loginingStatae = true;
      this.$bus.$emit("loading", this.loginingStatae, 2);
      var data3 = { userName: this.userNameState4 };
      this.$axios.post("/api/userForgetPassword", data3).then(
        (response) => {
          console.log("forgetmessage", response.data);
          if (response.data == "该用户未注册") {
            this.smileShake();
          }
          this.responseMessage(response.data);
        },
        (error) => {
          this.smileShake();
          this.responseMessage(error.message);
        }
      );
    },
    // 点击登录按钮后,正常登陆\注册\忘记密码\快速登录
    logining() {
      // 首先判断是什么界面下按的登录按钮
      // 如果是正常登录界面
      if (this.loginWhere == 1) {
        // 若未输入东西
        if (this.userNameState1 == "" || this.userPasswordState1 == "") {
          this.smileShake();
          this.$bus.$emit("errormessage", "用户名和密码不可为空哦~");
        } else {
          // loading旋转
          this.loginingStatae = true;
          this.$bus.$emit("loading", this.loginingStatae, 2);
          // 经过前期检验,向服务器发起请求,检查用户名密码是否正确
          this.normalLogin();
        }
      }
      // 如果是注册界面
      if (this.loginWhere == 4) {
        // 若未输入东西
        if (
          this.userNameState3 == "" ||
          this.userPasswordState3 == "" ||
          this.userEmailState3 == "" ||
          this.userCodeState3 == ""
        ) {
          this.smileShake();
          this.$bus.$emit("errormessage", "您有未填项哦~");
        }
        // 若输入的验证码不匹配
        else if (this.userCodeState3 != this.receiveCode) {
          this.smileShake();
          this.$bus.$emit("errormessage", "验证码不匹配");
          // 进入注册流程
        } else {
          this.userRegister();
        }
      }
      // 如果是忘记密码界面
      if (this.loginWhere == 3) {
        // 用户名为空
        if (this.userNameState4 == "") {
          this.smileShake();
          this.$bus.$emit("errormessage", "请输入用户名");
          // 进入忘记密码流程
        } else {
          this.forgetPassword();
        }
      }
      // 如果是快速登录界面
      if (this.loginWhere == 2) {
        let response1 = false;
        // 空态校验
        if (this.userNameState2 == "") {
          this.smileShake();
          this.$bus.$emit("errormessage", "请输入QQ号");
        } else {
          // 向QQ发送请求
          this.$axios
            .get("https://api.usuuu.com/qq/" + this.userNameState2)
            .then(
              (response) => {
                console.log(response.data);
                // 登录不成功
                if (response.data.code != "200") {
                  this.smileShake();
                  this.$bus.$emit("errormessage", response.msg);
                }
                // 登录成功
                else {
                  this.responseMessage("登录成功!");
                  // 查询数据库中有没有这个以QQ号登录的用户
                  this.$axios
                    .post("/api/userLogin", {
                      userQQ: "A9wadv" + this.userNameState2,
                      userPassowrd: ".........",
                    })
                    .then(
                      (response) => {
                        // 用户第一次以QQ号登录,则为他注册
                        if (response.data == 0) {
                          var data4 = {
                            userQQ: "A9wadv" + this.userNameState2,
                            userPassword: ".........",
                            userEmail: this.userNameState2 + "@qq.com",
                          };
                          this.$axios.post("/api/userRegister", data4).then(
                            (response) => {
                              response1 = true;
                              console.log("注册:", response.data);
                              // 注册成功后,为其更改用户名和头像----------搁浅(放最后面做)
                              // this.$axios.post('/api/',).then(response=>{},error=>{});
                              


                                // 注册SpaceWith
                                this.$axios
                                  .post("/api/insertSpaceWith", {
                                    userQQ: "A9wadv" + this.userNameState2,
                                  })
                                  .then(
                                    (response) => {
                                      console.log(response.data);
                                    },
                                    (error) => {
                                      this.$bus.$emit(
                                        "errormessage",
                                        error.message
                                      );
                                    }
                                  );
                            },
                            (error) => {
                              console.log(error.message);
                            }
                          );
                        }
                      var interId = setInterval(() => {
                          if(response1 || response.data){
                        // 说明用户已经注册过了,直接登录
                        console.log("数据库已存在该用户");
                        this.QQLogin();
                        clearInterval(interId);
                          }
                        }, 1000);
                      },
                      (error) => {
                        console.log(error.message);
                      }
                    );
                }
              },
              (error) => {
                this.$bus.$emit("errormessage", error.message);
              }
            );
        }
      }
      //

      // 点击后给该按钮一个点击反馈
      this.loginButtonClickState = true;
      setTimeout(() => {
        this.loginButtonClickState = false;
      }, 800);
    },
    // 检查是否存在cookie
    cookieCheck() {
      console.log("检查是否存在cookie...");
      if (this.$cookies.isKey("userQQ")) {
        var userQQ = this.$cookies.get("userQQ");
        var userPassword = this.$cookies.get("userPassword");
        // 向服务器发送请求,检查密码是否正确
        this.$axios
          .post("/api/userLogin", {
            userQQ: userQQ,
            userPassword: userPassword,
          })
          .then(
            (response) => {
              // 密码正确,则直接进入已登录界面,并更新store中的user和usersetting
              if (response.data != -1) {
                this.enterMainInterface();
                // 请求并向store中加入userInfo用户的信息
                this.getUserInfo(userQQ,"cookie");
                // 请求向store中加入usersetting的信息
                this.getUserSetting(userQQ);
                // 加入Websocket初始化
                this.webSocketIntilization(userQQ);
                // spaceWith初始化
                this.findSpaceWith(userQQ);
              }
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
    },
    // Websocket初始化
    webSocketIntilization(userQQ) {
      // _this 当前组件
      let socket = null;
      let _this = this;
      if (typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        if (socket != null) {
          socket.close();
          socket = null;
        }
        // 开启一个websocket服务
        socket = new WebSocket("ws://localhost:8088/imserver/" + userQQ);
        socket.onopen = function () {
          console.log("websocket已打开..");
        };

        // 接收消息  // 浏览器接收服务端发送过来的消息:所有在线用户,和发送的消息
        socket.onmessage = function (msg) {
          let data = JSON.parse(msg.data);
          // 如果获取的是在线人员
          if (data.users) {
            // 向Vuex全局中加入在线用户信息
            _this.$store.commit("userInfo/SAVEALLUSERSS", data.users);
            // 更新在线状态
            _this.$bus.$emit('refreshUsers',data.users);
          }
          // 否则就是聊天信息{后续应该会有升级},将该信息传到聊天组件
          else {
            _this.$bus.$emit("getSocketMessage", data);
          }
        };
        // 全局存入socket
        this.$store.commit("userInfo/SAVESOCKET", socket);
        //发生了错误
        socket.onerror = function () {
          console.log("websocket发生了错误");
        };
      }
    },

    // 进入主页的按钮响应
    enterIndex() {
      // 点击后给该按钮一个点击反馈
      this.enterButtonClickState = true;
      this.enterstate = false;
      setTimeout(() => {
        this.enterButtonClickState = false;
      }, 800);
      setTimeout(() => {
        this.$bus.$emit('menuShow',true);
        this.$bus.$emit('backShow',true);
      }, 2500);
      setTimeout(() => {
              this.enterButtonClickState = false;
              this.enterstate = true;
      }, 3000);
    },
  },
  mounted() {
    // 接收兄弟组件loginx状态
    this.$bus.$on("loginxState", (islogin) => {
      this.islogin = islogin;
      this.loginBoxPullup = "loginBoxPullup";
      if (this.islogin) {
        setTimeout(() => {
          this.isPrompt = true;
          setTimeout(() => {
            this.isPrompt = false;
          }, 5000);
        }, 2500);
      }
    });

    // 检查是否有cookie
    this.cookieCheck();
  },
  beforeDestroy() {
    this.$bus.$off("loginxState");
    // socket关闭
  },
};
</script>

<style scoped>
.login {
  position: relative;
  top: 250px;
  height: 165px;
  display: flex;
  justify-content: center;
  /* display: none; */
}
/* 登录时盒子上拉 */
.loginBoxPullup {
  animation: slide-in-blurred-bottom 1s cubic-bezier(0.23, 1, 0.32, 1) both;
}
/* 登录盒子 */
.loginbox {
  position: relative;
  width: 500px;
  display: flex;
  flex-flow: column;
  background: rgba(32, 30, 35, 0.75);
  border-radius: 15px;
  transition: 0.55s;
  height: 180px;
  box-shadow: -20px 20px 20px rgba(0, 0, 0, 0.35);
  display: flex;
}
/* 在注册状态下的loginbox盒子 */
.loginboxinregiest {
  height: 250px;
}
.loginbox:hover {
  border-radius: 30px;
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.45);
}
/* 笑脸 */
.imgbox {
  text-align: center;
}
/* 输入盒子 */
.inputbox {
  position: relative;
  margin: 10px;
  font-size: 2.5vh;
  color: whitesmoke;
  font-weight: bold;
  line-height: NaNpx;
  letter-spacing: NaNem;
}
/* 不同情况下的input输入盒子 */
.inputboxes {
  padding: 2px;
}
/* 返回按钮 */
.backward {
  display: block;
  width: 30px;
  height: 30px;
  margin-top: -45px;
  margin-bottom: 15px;
  transition: 0.55s;
}
.backward:hover {
  cursor: pointer;
  color: black;
  background-color: white;
  border-radius: 30px;
}
/* 输入框 */
input {
  border: 0;
  outline: 0;
  padding: 10px;
  transition: 0.5s;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2vh;
  color: white;
}
input:focus {
  font-size: 2.5vh;
  color: greenyellow;
}
/* 登录选项 */
.options {
  position: relative;
  width: 100%;
  height: 15px;
  display: flex;
  flex-flow: row nowrap;
}
button {
  border: 0;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2vh;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  cursor: pointer;
  width: 100px;
  margin-right: 15px;
}
button:hover {
  color: white;
}
/* 登录按钮 */
.loginbutton {
  position: absolute;
  width: 100px;
  height: 100px;
  right: -50px;
  top: 40px;
  border-radius: 100% 100%;
  text-align: center;
  background: rgba(32, 30, 35, 1);
  box-sizing: border-box;
  border: 5px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 10px 2px white;
  transition: 0.5s;
}
.loginbutton img {
  position: relative;
  transition: 0.8s;
}
.absbac{
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  width: 100px;
  height: 100px;
  right: -50px;
  top: -50px;
  border-radius: 50%;
}
.absbac:hover{
  border-left: 1px dashed white;
  box-shadow: 0 0 15px 10px black;
  transition: 200s;
  transform: rotateZ(36000deg);
}

.loginbutton:hover {
  border: 50px solid black;
  background: black;
  box-shadow: 0 0 10px 5px black;
}


.loginbutton:hover img {
  transform: rotateY(180deg);
  top: -20px;
  left: -15px;
}
/* 点击按钮反馈样式 */
.loginbuttonclick {
  cursor: pointer;
  border: 50px solid white !important;
}
/* 进入主页的按钮 */
.enterindex {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 40px;
  border-radius: 100% 100%;
  text-align: center;
  background: rgba(32, 30, 35, 1);
  box-sizing: border-box;
  border: 5px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 20px 10px white;
  transition: 0.5s;
}
.enterindex:hover {
  border: 50px solid black;
  background: black;
  box-shadow: 0 0 20px 10px black;
}
.enterindex img {
  transform: rotateY(180deg);
  position: relative;
  transition: 0.8s;
}
.enterindex:hover img {
  transform: rotateZ(90deg);
  top: -20px;
  left: -20px;
}
/* 进入按钮点击按钮反馈样式 */
.loginbuttonclick {
  cursor: pointer;
  border: 50px solid white !important;
}
/* smile摇头动画 */
.smileshake {
  animation: shake-horizontal 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}
/* 更多登录选项 */
.promt {
  position: absolute;
  border-radius: 15px;
  padding: 10px;
  width: 120px;
  font-size: 1.6vh;
  text-align: center;
  left: -20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.45);
  top: 35px;
}
.promt::before {
  content: "▲";
  position: absolute;
  color: rgba(0, 0, 0, 0.45);
  font-size: 2vh;
  left: 60px;
  top: -17.5px;
}

/* 登录选项进入退出动画 */
.optionsT-enter,
.optionsT-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.optionsT-enter-active,
.optionsT-leave-active {
  transition: 0.5s;
}
.optionsT-enter-to,
.optionsT-leave {
  opacity: 1;
  transform: translateX(0);
}
/* 登录盒子退出 */
.loginboxT-leave-active {
  animation: scale-out-center 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
/* 进入主页进入退出动画 */
.enterbuttonT-leave-active{
animation: puff-out-center 8s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
}
@keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(5);
            transform: scale(5);
    -webkit-filter: blur(20px);
            filter: blur(20px);
    opacity: 0;
  }
}



/* 许多input盒子组的进入退出动画 */
.inputboxesT-enter-active {
  animation: tracking-in-contract 0.55s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
/* .inputboxesT-leave-active{
animation: tracking-in-contract 0s cubic-bezier(0.215, 0.610, 0.355, 1.000) both reverse;
} */

/* 登录box上升的动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(0) scaleY(2.5) scaleX(0.2);
    transform: translateY(0) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-225px) scaleY(1) scaleX(1);
    transform: translateY(-225px) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
/* 登录盒子退出动画 */
@keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
}
/* 许多input盒子组的进入退出动画 */
@keyframes tracking-in-contract {
  0% {
    letter-spacing: 1em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    letter-spacing: normal;
    opacity: 1;
  }
}
/* smile摇头动画 */
@keyframes shake-horizontal {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  80% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }
  90% {
    -webkit-transform: translateX(-8px);
    transform: translateX(-8px);
  }
}
</style>
