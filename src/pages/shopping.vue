<template>
<div class="sbox">
  <div class="shopBox">
    <back-button :roots="'/'"></back-button>
    <div>
      <div class="title" ref="poly"> 
      <span>欢迎来到 南北市场</span>
      <br>
      <span>WELCOME TO NB-MA<span class="animationS">L</span>L</span>
      </div>
    </div>
    <div></div>
    <div class="mainShop" ref="mainShop">
        <div class="midd"></div>
        <div class="shops">
          <br>
          <transition name="backT">
          <el-button v-show="isBack" class="back" @click="back">返回</el-button>
          </transition>
          <span>{{title}}</span>
          <br><br>
          <router-view name="shop"></router-view>
        </div>
        <div class="midd"></div>
        <div class="myInfo">
            <div class="userInfo">
              <div>
                <img  v-if="this.user.userHead" :src="(`${publicPath}/HeadsAndBacks/Heads/${this.user.userHead}`)" alt="头像">
                <br><br>
                <span>{{this.user.userName}}</span>
                <br><br>
                <span>我的PX币:{{userMoney}} <i style="cursor: pointer;" class="el-icon-question"></i> </span>
                 <br><br>
                <span>已花费: 0 PX币</span>
                 <br><br>
                <span>已购买: {{hasBoughtNum}} 件商品</span>
                 <br><br>
                <span>待收货: {{waitRece}} 件商品</span>
              </div>
            </div>
            <div class="Buts">
              <button ref="creatbut" @click="routerTo('nbMall')" class="butt1"><i class="el-icon-office-building"></i> 南北市场</button>
              <button @click="routerTo('hasBought')" class="butt1"><i class="el-icon-shopping-cart-full"></i> 已购商品</button>
              <button @click="routerTo('shopTraining')" class="butt1"><i class="el-icon-truck"></i> 正在运输 {{trainingNum}}</button>
              <button @click="routerTo('shopHistory')" class="butt1"><i class="el-icon-wallet"></i> 收支明细</button>
              <button @click="routerTo('browseHistory')" class="butt1"><i class="el-icon-copy-document"></i> 浏览历史</button>
            </div>
        </div>
        <div class="midd"></div>
    </div>
  </div>
</div>
</template>
<script>
import backButton from '@/components/backButton.vue';
import { mapState } from 'vuex'
export default {
  components: { backButton },
// eslint-disable-next-line vue/multi-word-component-names
name:'shopping',
computed:{
  ...mapState('userInfo',['user']),
},
data(){
  return{
    publicPath: process.env.BASE_URL,
    title:'南北市场',
    isBack:false,
    width:0,
    hasBoughtNum:0,
    waitRece:0,
    xNum:0,
    trainingNum:0,
    userMoney:-1,
  }
},
methods:{

    back(){
      this.isBack = false;
      this.$router.back();
      setTimeout(() => {
        var path = this.$route.path;
        switch(path){
          case ('/shopping/nbMall'):
            this.title = "南北市场";
            break;
          case ('/shopping/hasBought'):
            this.title = "已购商品";
            break;
          case ('/shopping/shopTraining'):
            this.title = "正在运输";
            break;
          case ('/shopping/shopHistory'):
            this.title = "收支明细";
            break;
          case ('/shopping/browseHistory'):
            this.title = "浏览历史";
            break;
        }
      }, 100);
    },

    routerTo(rout){
        this.$router.push({
            name:rout,
        });
        this.isBack = false;
        switch(rout){
          case ('nbMall'):
            this.title = "南北市场";
            break;
          case ('hasBought'):
            this.title = "已购商品";
            break;
          case ('shopTraining'):
            this.title = "正在运输";
            break;
          case ('shopHistory'):
            this.title = "收支明细";
            break;
          case ('browseHistory'):
            this.title = "浏览历史";
            break;
        }
},

    // 用户余额获取
  getUserMoney(){
    this.$axios.post('/api/getUser',{userQQ:this.user.userQQ}).then(response=>{
      this.userMoney = response.data.userMoney;
    },error=>{
      console.log(error.message);
    });
  },
    // 已购买和待收货个数
  getHasBought(){
    this.waitRece = 0;
    this.trainingNum = 0;
      this.$axios.post('/api/returnShopOrderByName',{buyUser:this.user.userQQ}).then(response=>{
        this.hasBoughtNum = response.data.length;
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if(element.orderStatus!='收件人已签收'){
            this.waitRece++;
          }
          if(element.orderStatus=='正在运输'){
            this.trainingNum++;
          }
        }
      },error=>{
        console.log(error.message);
      });
  }
},
mounted(){
  this.$bus.$on('changeTitle',data=>{
    this.isBack = true;
    this.title = data;
  });
  this.$bus.$on('updateMoney',()=>{
    this.getUserMoney();
    this.getHasBought();
  });
  setTimeout(() => {
    this.getUserMoney();
    this.getHasBought();
  }, 1000);
},
created(){
  // this.getUserMoney();
  // this.getHasBought();
var loginR = '';
      this.$axios.post('/api/returnDetailsByNameAndTypeAndItem',{pxUser:this.user.userQQ,pxType:'点击 L*66',pxItem:'点击 L*66'}).then(response=>{
          loginR = response.data[0];
        // 如果item没有被看过
        if(loginR==undefined){
          let _this = this;
      document.onkeydown = function () {
        let key = window.event.keyCode;
        if (key === 76){
          _this.xNum = _this.xNum + 1;
          _this.$refs.poly.style.color = "black";
          setTimeout(() => {
          _this.$refs.poly.style.color = "white";
          }, 330);
          if(_this.xNum>66){
            _this.$addPxDetail(_this.user.userQQ,1,'点击 L*66',250,'点击 L*66',"触发了彩蛋,获得PX币+250");
            _this.xNum = 0;
          }
      }
  }
 }
        },error=>{
          console.log(error.message);
        });
  setTimeout(() => {
    this.$refs.creatbut.click();
    this.$refs.mainShop.style.width = window.screen.width;
  }, 1000);
}
}
</script>

<style scoped>
.sbox{
  position: relative;
  width: 100.3%;
  height: 100%;
  z-index: 80;
  overflow: auto;
}
.shopBox{
    position: relative;
    background-color: whitesmoke;
    width: 100%;
    height: 200%;
    z-index: 80;
    font-size: 1.65vh;
    overflow: auto;
    color: black;
    font-weight: bold;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  /* 酒吧 */
  /* https://tva1.sinaimg.cn/large/e6c9d24ely1h4ddbsizidj21hc0u0q9x.jpg */
  background-image: url('https://tva1.sinaimg.cn/large/e6c9d24ely1h4ddltt5itj21lb0u0gpp.jpg');
}
.shopBox > div:nth-of-type(1){
  position: relative;
  width: 100%;
  flex: 20;
  border-bottom: 2px solid black;
  border-radius: 0 0 25px 25px;
  box-shadow: 0 0 15px black;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  /* 酒吧 */
  /* https://tva1.sinaimg.cn/large/e6c9d24ely1h4ddbsizidj21hc0u0q9x.jpg */
  background-image: url('https://tva1.sinaimg.cn/large/e6c9d24ely1h4ddltt5itj21lb0u0gpp.jpg');

  text-align: center;
  color: whitesmoke;
  font-size: 15vh;
  font-weight: 100;
  font-family: 'Courier New', Courier, monospace;
}
.shopBox > div:nth-of-type(3){
  width: 95%;
  left: 2.5%;
  flex: 19;
  border-bottom: 2px solid black;
  border-radius: 25px 25px 0 0;
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.55);
}
.shopBox > div:nth-of-type(2){
  width: 100%;
  flex: 1;
}

.mainShop{
  display: flex;
  flex-flow: row nowrap;
  
}

.shops{
  position: relative;
  flex: 79;
  height: 95%;
  top: 2.5%;
  font-size: 3vh;
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);

}
.shops span{
  position: absolute;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 25px;
  text-align: center;
  left: 31.5%;
  width: 500px;
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
.realShops{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
}

.midd{
  flex: 1;
}
.myInfo{
  position: relative;
  flex: 20;
  height: 95%;
  top: 2.5%;
  border-radius: 25px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}

.userInfo{
  position: relative;
  flex: 10;
  width: 90%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-size: 2vh;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  justify-content: space-around;
}
.userInfo > div:nth-of-type(1){
  position: relative;
  top: 10%;
  width: 100%;
  text-align: center;
}
.userInfo img{
  position: relative;
  height: 55px;
  padding: 3px;
  border-radius: 40px;
  border: 3px solid seagreen;
}

.Buts{
  position: relative;
  flex: 14;
  width: 90%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

.butt1{
  font-weight: bold;
  position: relative;
  padding: 15px 60px;
  border: none;
  letter-spacing: 2px;
  color: black;
  font-size: 2vh;
  transition: 0.55s;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 60px;
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
.butt1:hover {
  padding: 18px 65px;
  letter-spacing: 6px;
  cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}

.back{
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(0, 0, 0, 0.3);
  color: whitesmoke;
  top: 50px;
  border-radius: 50px 25px 25px 50px;
  transition: 0.2s;
  left: 4%;
}
.back:hover{
  background-color: white;
  color: black;
  border: 2px solid black;
  transform: rotate(360deg);
  border-radius: 25px 50px 50px 25px;
}


.title{
  position: relative;
  top: 25%;
  transition: 0.3s;
  animation: text-flicker-in-glow 4s linear both;
}
.animationS{
  animation: text-flicker-in-glow 1.6s linear both infinite;
}
.animationT{
  animation: text-flicker-in-glow 2.1s linear both infinite;
}


.backT-enter-active{
    animation: bounce-in-right 0.65s both;
}
.backT-leave-active{
    animation: bounce-in-right 0.65s both reverse;
}

@keyframes bounce-in-right {

  0% {
    -webkit-transform: translateX(250px);
            transform: translateX(250px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateX(32px);
            transform: translateX(32px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateX(16px);
            transform: translateX(16px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateX(4px);
            transform: translateX(4px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}




@keyframes text-flicker-in-glow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
    text-shadow: none;
  }
  10.1% {
    opacity: 1;
    text-shadow: none;
  }
  10.2% {
    opacity: 0;
    text-shadow: none;
  }
  20% {
    opacity: 0;
    text-shadow: none;
  }
  20.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
  }
  20.6% {
    opacity: 0;
    text-shadow: none;
  }
  30% {
    opacity: 0;
    text-shadow: none;
  }
  30.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.5% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  30.6% {
    opacity: 0;
    text-shadow: none;
  }
  45% {
    opacity: 0;
    text-shadow: none;
  }
  45.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  55% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.45), 0 0 60px rgba(255, 255, 255, 0.25);
  }
  55.1% {
    opacity: 0;
    text-shadow: none;
  }
  57% {
    opacity: 0;
    text-shadow: none;
  }
  57.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
  }
  60% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35);
  }
  60.1% {
    opacity: 0;
    text-shadow: none;
  }
  65% {
    opacity: 0;
    text-shadow: none;
  }
  65.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.35), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  75.1% {
    opacity: 0;
    text-shadow: none;
  }
  77% {
    opacity: 0;
    text-shadow: none;
  }
  77.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  85% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.55), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 110px rgba(255, 255, 255, 0.2), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  85.1% {
    opacity: 0;
    text-shadow: none;
  }
  86% {
    opacity: 0;
    text-shadow: none;
  }
  86.1% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 110px rgba(255, 255, 255, 0.25), 0 0 100px rgba(255, 255, 255, 0.1);
  }
}
</style>