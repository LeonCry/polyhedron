<template>
  <div class="login">
    <div class="loginbox">
      <div class="imgbox">
        <img src="../assets/smile.svg" alt="笑脸" />
      </div>
      <div class="inputbox">
        Username:<input type="text" />
        <hr />
        Password:<input type="password" />
      </div>
      <div class="loginbutton">
        <img src="../assets/loginbutton.svg" alt="loginbutton" />
      </div>
      <div class="options">
        <transition-group name="optionsT" appear>
          <button key="1" @click="isoption = !isoption">·+·</button>
          <button key="2" v-show="isoption">QQ快速登录</button>
          <button key="3" v-show="isoption">忘记密码</button>
          <button key="4" v-show="isoption">用户注册</button>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      isoption: false,
    };
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
}
/* 登录盒子 */
.loginbox {
  position: relative;
  width: 500px;
  display: flex;
  flex-flow: column;
  background: rgba(32, 30, 35, 0.75);
  border-radius: 15px;
  height: 165px;
  display: flex;
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
  cursor: pointer;
  border-radius: 100% 100%;
  text-align: center;
  background: rgba(32, 30, 35, 1);
  box-sizing: border-box;
  border: 5px solid rgba(255, 255, 255, 0.85);
  transition: 0.5s;
}
.loginbutton img{
    position: relative;
    top: 24px;
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
</style>
