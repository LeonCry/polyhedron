<template>
  <div class="login" :class="loginBoxPullup">
    <transition name="loginboxT">
    <div  v-show="islogin" class="loginbox" :class="{loginboxinregiest:registerState}">
      <div class="imgbox">
        <img src="../assets/smile.svg" alt="笑脸" />
      </div>
      <form action=" " target="blankFrame">
      <div class="inputbox">
        <transition-group name="inputboxesT" appear>
        <!-- 正常登录box -->
        <div key="1" class="inputboxes" v-show="normalState">
          Username:<input type="text" required/>
          <hr/>
          Password:<input type="password" required/>
        </div>
        <!-- QQ快速登录box -->
        <div key="2" class="inputboxes" v-show="QQstate">
          <span class="backward" @click="backward">◀</span>
          QQ:<input type="text" required/>
          <hr/>
        </div>
        <!-- 注册box -->
        <div key="3" class="inputboxes" v-show="registerState">
          <span class="backward" @click="backward">◀</span>
          Email:<input type="email" required/>
          <hr>
          Password:<input type="password" required/>
          <br>
          Code:<input type="text" required/>
          <br>
        </div>
        <!-- 忘记密码box -->
        <div key="4" v-show="forgetPassState">
          <span class="backward" @click="backward">◀</span>
          Username:<input type="text" required/>
          <hr/>
        </div>
        </transition-group>
      </div>
      <button class="loginbutton" @click="logining" :class="{loginbuttonclick:loginButtonClickState}">
        <img src="../assets/loginbutton.svg" alt="loginbutton" />
      </button>
      </form>
      <div class="options">
        <transition-group name="optionsT" appear>
          <button key="1" @click="isoption = !isoption">·+·</button>
          <button key="2" v-show="isoption" @click="QQquickLogin">QQ快速登录</button>
          <button key="3" v-show="isoption" @click="fogetPassword">忘记密码</button>
          <button key="4" v-show="isoption" @click="register">用户注册</button>
        </transition-group>
      </div>
    </div>
    </transition>
  <!-- 登录成功后出现的进入主页的按钮 -->
  <transition name="enterbuttonT">
    <button v-show="enterstate" class="enterindex" @click="enterIndex" :class="{loginbuttonclick:enterButtonClickState}">
        <img src="../assets/loginbutton.svg" alt="进入主页" />
    </button>
    </transition>
  <iframe src="" frameborder="0" name="blankFrame" style="display:none"></iframe>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      // 选项
      isoption: false,
      // 是否登录
      islogin : false,
      // 登录状态
      loginingStatae: false,
      // 进入主页状态-控制按钮显示
      enterstate:false,
      // 登录盒子样式
      loginBoxPullup:'',
      // 登录按钮点击状态
      loginButtonClickState:false,
      // 进入主页按钮点击状态
      enterButtonClickState:false,
      // 是否正常登录
      normalState:true,
      // 是否QQ快速登录
      QQstate:false,
      // 是否注册
      registerState:false,
      // 是否忘记密码
      forgetPassState:false,
    }
  },
  methods:{
    // QQ快速登录
    QQquickLogin(){
      this.normalState = false;
      this.QQstate = true;
      this.registerState = false;
      this.forgetPassState = false;
      this.isoption = false;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit('svgchange',require('../assets/QQ.svg'),require('../assets/login_v.svg'));

    },
    // 忘记密码
    fogetPassword(){
      this.normalState = false;
      this.QQstate = false;
      this.registerState = false;
      this.forgetPassState = true;
      this.isoption = false;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit('svgchange',require('../assets/login_x.svg'),require('../assets/keys.svg'));
    },
    // 用户注册
    register(){
      this.normalState = false;
      this.QQstate = false;
      this.registerState = true;
      this.forgetPassState = false;
      this.isoption = false;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit('svgchange',require('../assets/login_x.svg'),require('../assets/login_add.svg'));
    },
    // 返回按钮
    backward(){
      this.normalState = true;
      this.QQstate = false;
      this.registerState = false;
      this.forgetPassState = false;
      this.isoption = false;
      // 向loginx图标组件发送数据,更改响应的svg
      this.$bus.$emit('svgchange',require('../assets/login_x.svg'),require('../assets/login_v.svg'));
    },
    // 点击登录按钮后,向兄弟组件发送logining状态,以加载loading特效,也是登录功能
    logining(){
      this.loginingStatae = true;
      this.$bus.$emit('loading',this.loginingStatae);
      // 点击后给该按钮一个点击反馈
      this.loginButtonClickState = true;
      setTimeout(() => {
         this.loginButtonClickState = false;
      }, 800);
      // "TTEST":此处仅做模仿测试用
      setTimeout(() => {
      this.loginingStatae = false;
      // 传给兄弟组件,登录成功通知
      this.$bus.$emit('loading',this.loginingStatae);
      this.$bus.$emit('loginSuccess',this.enterstate);
      // 登录成功,将loginbox删除
      this.islogin = false;
      // 进入主页按钮显示
      this.enterstate = true;
      }, 5000);
      // "TTEST"
    },
    // 进入主页的按钮响应
    enterIndex(){
      // 点击后给该按钮一个点击反馈
      this.enterButtonClickState = true;
      setTimeout(() => {
         this.enterButtonClickState = false;
      }, 800);
    }
  },
  mounted(){
    // 接收兄弟组件loginx状态
    this.$bus.$on('loginxState',(islogin)=>{
      this.islogin = islogin;
      this.loginBoxPullup = 'loginBoxPullup';
    })
  },
  beforeDestroy(){
    this.$bus.$off('loginxState');
  }

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
.loginBoxPullup{
	animation: slide-in-blurred-bottom 1s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
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
.loginboxinregiest{
    height: 250px;
}
.loginbox:hover{
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
.inputboxes{
  padding: 2px;
}
/* 返回按钮 */
.backward{
  display: block;
  width: 30px;
  height: 30px;
  margin-top: -45px;
  margin-bottom: 15px;
  transition: 0.55s;

}
.backward:hover{
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
  transition: 0.5s;
}
.loginbutton img{
    position: relative;
    transition: 0.8s;
}
.loginbutton:hover{
      border: 50px solid black;
      background: black;
}
.loginbutton:hover img{
    transform: rotateY(180deg);
    top: -20px;
    left: -15px;
}
/* 点击按钮反馈样式 */
.loginbuttonclick{
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
  transition: 0.5s;
}
.enterindex img{
    transform: rotateY(180deg);
    position: relative;
    transition: 0.8s;
}
.enterindex:hover{
      border: 50px solid black;
      background: black;
}
.enterindex:hover img{
    transform: rotateZ(90deg);
    top: -20px;
    left: -20px;
}
/* 进入按钮点击按钮反馈样式 */
.loginbuttonclick{
  cursor: pointer;
  border: 50px solid white !important;
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
.loginboxT-leave-active{
   animation: scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
/* 进入主页进入退出动画 */
.enterbuttonT-enter,
.enterbuttonT-leave-to {
  opacity: 0;
  transform: translateX(200%) rotateZ(180deg);
}
.enterbuttonT-enter-active,
.enterbuttonT-leave-active {
  transition: 0.5s;
}
.enterbuttonT-enter-to,
.enterbuttonT-leave {
  opacity: 1;
  transform: translateX(0) rotateZ(0deg);
}
/* 许多input盒子组的进入退出动画 */
.inputboxesT-enter-active{
animation: tracking-in-contract 0.55s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}
/* .inputboxesT-leave-active{
animation: tracking-in-contract 0s cubic-bezier(0.215, 0.610, 0.355, 1.000) both reverse;
} */

/* 登录box上升的动画 */
@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(0)  scaleY(2.5) scaleX(0.2);
            transform: translateY(0)  scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-225px) scaleY(1) scaleX(1);
            transform: translateY(-225px)  scaleY(1) scaleX(1);
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


</style>
