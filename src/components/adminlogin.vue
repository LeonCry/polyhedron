<template>
  <div class="adminloginbox">
          <transition name="logindivT" appear="">
      <div v-show="isshow">
          <span @click="exitAdminLogin">X</span>
          <input type="password" required placeholder="请输入管理员密码" v-model="password">
          <b class="tips" :class="{success:isSuccess}">{{errorMessage}}</b>
          <br>
          <button @click="SYSTEMLOGIN">管理员登录</button>
      </div>
      </transition>
  </div>

</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'adminlogin',
    data(){
        return{
            isshow:false,
            password:'',
            isSuccess:false,
            errorMessage:'',
        }
    },
    methods:{
        // 退出管理员登录状态
        exitAdminLogin(){
            this.isshow = false;
            setTimeout(() => {
                // 向App组件传达关闭管理员登录界面
                this.$bus.$emit('tologin',false);

            }, 750);
        },
        // 管理员登录
       async SYSTEMLOGIN(){
          await this.$axios.post('/api/userLogin',{userQQ:'SYSTEM',userPassword:this.password}).then(response=>{
            // 密码错误
            if(response.data==-1){
              this.errorMessage = "管理员密码错误.."
            }
            else{
               this.errorMessage = '密码正确,正在进入管理后台...';
               this.isSuccess = true;
               setTimeout(() => {
                this.exitAdminLogin();
                this.errorMessage = '';
                this.password = '';
                // 显示后台
                this.$PubSub.publish('BackEndShow',true);
               }, 1500);
            }
          },error=>{
            console.log(error.message);
          });
          
        }
    },
 mounted(){
    // 接收来自top组件的数据,使adminlogin组件显示
    // eslint-disable-next-line no-unused-vars
    this.$bus.$on('tologin',(data)=>{
      this.isshow = true;
    })
  },
  beforeDestroy(){
    this.$bus.$off('tologin');
  }
}
</script>

<style scoped>
/* 管理员登录box属性 */
.adminloginbox{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 110;
  display: flex;
  font-size: 1.6vh;
  font-weight: bold;
  text-align: center;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}
.adminloginbox div{
    padding:10px;
    background-color: #1A191B;
    border-radius: 25px;
    display: flex;
    flex-flow: column;
    justify-content: center;
     align-items: center;
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.15);
    width: 600px;
    height: 200px;
}
.tips{
  color: red;
  font-size: 1.2vh;
}
.success{
    color: lightgreen;
  font-size: 1.2vh;
}
/* 输入框 */
input {
  border: 0;
  outline: 0;
  padding: 10px;
  margin-top: 30px;
  border-bottom: 1px solid pink;
  transition: 0.5s;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2vh;
  /* 调整字体间距 */
  letter-spacing: 2px;
  color: white;
}
input:focus {
  font-size: 2.2vh;
  letter-spacing: 5px;
  color: pink;
}
/* input的placehodler居中显示 */
input::-ms-input-placeholder{
text-align: center;
font-weight:bold;
}
input::-webkit-input-placeholder{
text-align: center;
font-weight:bold;
}
/* x取消按钮 */
span{
    width: 30px;
    height: 30px;
    margin-top: -20px;
    align-self: end;
    justify-self: start;
    text-align: center;
    vertical-align: center;
    font-size: 2.2vh;
    transition: 0.55s;
    cursor: pointer;
    top: 0;
}
span:hover{
    background: white;
    border-radius: 35px;
    color: black;
}
/* 登录按钮 */
button{
    background-color: rgba(0, 0, 0, 0);
    color: pink;
    border-radius: 15px;
    transition: 0.55s;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 1);
    border: 0;
    width: 100px;
    height: 50px;
}
button:hover{
    cursor: pointer;
    box-shadow: 0px 0px 25px pink;
}
/* loginbox出现和离开动效 */
.logindivT-enter-active{
    animation: flip-in-hor-top 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.logindivT-leave-active{
    animation: flip-in-hor-top 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}
@keyframes flip-in-hor-top {
  0% {
    -webkit-transform: rotateX(-80deg);
            transform: rotateX(-80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
    opacity: 1;
  }
}

</style>