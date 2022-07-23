<template>
  <div class="shopDetail">
    <br><br>
    <div class="info">
      <br>
      <span style="position: absolute;;width:100%;text-align: center;">"{{shop.shopName}}"</span>
      <br><br><hr>
      <span class="intro">&nbsp&nbsp&nbsp
        {{shop.shopIntro}}
         </span>
    </div>
    <div class="bought">
        <div class="carousel">
        <el-carousel :interval="5000"  arrow="hover" height="500px">
          <el-carousel-item v-for="item in Allpic" :key="item+Math.random()">
            <el-image v-if="item!=''" class="elimage"  :key="item+Math.random()" :src="item"  :preview-src-list="Allpic" ></el-image>
          </el-carousel-item>
        </el-carousel>
        <div class="connect">
            <span style="font-weight:350"><i class="el-icon-info"></i>购买商品前请先填好以下信息:</span>
            <span><i class="el-icon-map-location"></i> 收件地址: <input class="address" v-model="createData.receiveAddress" placeholder="请输入收件地址(必填)" maxlength="100"> </span>
            <span><i class="el-icon-user"></i> 收 件 人: <input class="address" v-model="createData.receiveName" placeholder="请输入收件人姓名(必填)" maxlength="100"> </span>
            <span><i class="el-icon-mobile-phone"></i> 收件电话: <input maxlength="11" class="address" v-model="createData.receivePhone" placeholder="请输入收件人电话(必填)"> </span>
            <span><i class="el-icon-edit"></i> 商品备注: <input  class="address" v-model="createData.receiveRemarks" placeholder="(选填)" maxlength="500"></span>
        </div>
        </div>
        <div class="option">
          <br>
          <span>商品来源: {{shop.shopFrom}}</span>
          <span>售卖店铺: {{shop.shoper}}</span>
          <span>商品名称: {{shop.shoperName}}</span>
          <span>商品网址: <a class="www" :href="shop.shoperWebsite" target="_blank">点击此处前往淘宝商品页面</a></span>
          <span style="flex:2">商品价格: <a style="font-size:2vh;color:orangered;text-decoration: line-through;text-align:left;font-weight:500">P{{shop.shopPrice}}</a></span>
          <span>商品优惠: {{shop.discountInfo}}</span>
          <span v-if="shop.discountPrice!=shop.shopPrice" style="flex:2">优惠价格: <a style="font-size:2vh;color:orangered;text-align:left;font-weight:500">P{{shop.discountPrice}}</a></span>
          <span>商品限购: {{shop.buyLimit}}件 / 剩余:{{shop.shopNums}}件</span>
          <span>本站销量: {{shop.allSales}}件</span>
          <span>支持快递: {{shop.supportTrain}}</span>
          <span>发货地区: {{shop.expressRegion}}</span>

          <div class="keyinputs">
            <span v-if="shop.paramName1!=''">选择{{shop.paramName1}}:     
              <el-radio-group v-if="shop.paramName1!=''"  v-model="createData.buyParamValue1" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" :label="value" v-for="value of shop.paramValue1" :key="value"></el-radio-button>
               </el-radio-group>
               </span>
               <span v-if="shop.paramName2!=''">选择{{shop.paramName2}}:     
              <el-radio-group v-if="shop.paramName2!=''"  v-model="createData.buyParamValue2" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" :label="value" v-for="value of shop.paramValue2" :key="value"></el-radio-button>
               </el-radio-group>
               </span>
               <span v-if="shop.paramName3!=''">选择{{shop.paramName3}}:     
              <el-radio-group v-if="shop.paramName3!=''"  v-model="createData.buyParamValue3" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" :label="value" v-for="value of shop.paramValue3" :key="value"></el-radio-button>
               </el-radio-group>
               </span>
               <span v-if="shop.paramName4!=''">选择{{shop.paramName4}}:     
              <el-radio-group v-if="shop.paramName4!=''"  v-model="createData.buyParamValue4" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" :label="value" v-for="value of shop.paramValue4" :key="value"></el-radio-button>
               </el-radio-group>
               </span>
               <span>购买个数:     
              <el-input-number size="small" v-model="createData.buyNum" :min="1" :max="99" label="描述文字"></el-input-number>
               </span>
          </div>

          <el-button @click="dialogVisible = true" class="buybutton"><i class="el-icon-sold-out"></i> 立即购买</el-button>
        </div>
    </div>
    <div class="details">
      <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h4dpmq2r95j20l3acw1kx.jpg" alt="">
    </div>
    <el-dialog
    class="confirmForm"
  title="确认购买吗?"
  :visible.sync="dialogVisible"
  append-to-body
  width="30%">
  <span>这将从您的余额中扣除<span style="color:orangered;text-weight:500;font-size:2vh"> P{{this.shop.discountPrice*this.createData.buyNum}} </span>且不支持退款.</span>
  <br><br>
  <span>购买后余额: </span>
  <span style="color:orangered;text-weight:500;font-size:2vh"> P{{userMoney}} <i class="el-icon-right"></i> P{{userMoney-this.shop.discountPrice*this.createData.buyNum}}</span>
  <br><br>
  <el-progress v-show="isProcess" type="circle" :percentage="percentage" :status="confirmStatus" :width="60"></el-progress>
  <span v-show="isConfirmNotice"><br><br>{{confirmText}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel" v-show="!isFinish">取 消</el-button>
    <el-button type="primary" @click="confirmBuy">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'shopDetail',
computed:{
    ...mapState('userInfo',['user']),
},
data(){
  return{
    shop:this.$route.query.shop,
    browse:this.$route.query.browseUser,
    Allpic:[],
    userMoney:-1,
    confirmText:"",
    dialogVisible:false,
    isProcess:false,
    isFinish:false,
    isConfirmNotice:false,
    isStep2:false,
    confirmStatus:null,
    percentage:0,
    createData:{
      buyNum:1,
    },

  }
},
watch:{
 // 限制数字
    buyPhone: function () {
      this.buyPhone = this.buyPhone.replace(/[^0-9]/g, "");
    },
},
methods:{
  // 确认购买
  confirmBuy(){
    var state = new Map();
    // 说明第二阶段,点击确定
    if(this.isStep2){
      this.isProcess = false;
      this.percentage = 0;
      this.confirmText = "";
      this.confirmStatus = null;
      this.isStep2 = false;
      this.dialogVisible = false;
      this.isConfirmNotice = false;
      this.isFinish = false;
      setTimeout(() => {
        this.routerTo('hasBought');
      }, 1000);
       return 0;
    }

    this.isProcess = true;
    this.isConfirmNotice = true;
    if(this.userMoney-this.shop.discountPrice*this.createData.buyNum<0){
        state.set(1,false);
      }
      else if(this.createData.buyNum > this.shop.buyLimit){
        state.set(1,true);
        state.set(2,false);
      }
      else if(this.createData.buyNum > this.shop.shopNums){
        state.set(1,true);
        state.set(2,true);
        state.set(3,false);
      }
      else if(this.createData.receiveName==''||this.createData.receivePhone==''||this.createData.receiveAddress==''){
        state.set(1,true);
        state.set(2,true);
        state.set(3,true);
        state.set(4,false);
      }
      else{
        state.set(1,true);
        state.set(2,true);
        state.set(3,true);
        state.set(4,true);
        state.set(5,true);
      }

      if(state.has(1)){
          setTimeout(() => {
            this.percentage = 23;
              // 余额不足
              if(!state.get(1)){
              this.confirmText = "对不起,您的余额不足,无法完成购买.";
              this.isStep2 = true;
              this.confirmStatus = "exception";
              }
          }, 500);
      }
      if(state.has(2)){
          setTimeout(() => {
            this.percentage = 46;
              // 余额不足
              if(!state.get(2)){
              this.confirmText = "对不起,您的购买超出购买件数限制,无法完成购买.";
              this.isStep2 = true;
              this.confirmStatus = "exception";
              }
          }, 1000);
      }
      if(state.has(3)){
          setTimeout(() => {
            this.percentage = 65;
              // 余额不足
              if(!state.get(3)){
              this.confirmText = "对不起,库存不足,无法完成购买.";
              this.isStep2 = true;
              this.confirmStatus = "exception";
              }
          }, 1500);
      }
      if(state.has(4)){
          setTimeout(() => {
            this.percentage = 88;
              // 余额不足
              if(!state.get(4)){
              this.confirmText = "请完善收件信息后再进行购买.";
              this.isStep2 = true;
              this.confirmStatus = "exception";
              }
          }, 2000);
      }
      if(state.has(5)){
          setTimeout(() => {
            this.percentage = 100;
            this.isFinish = true;
              var data = {
                buyShopName:this.shop.shopName,
                buyShopId:this.shop.shopId,
                buyUser:this.user.userQQ,
                buyNum:this.createData.buyNum,
                buyPrice:this.shop.discountPrice*this.createData.buyNum,
                receiveName:this.createData.receiveName,
                receivePhone:this.createData.receivePhone,
                receiveAddress:this.createData.receiveAddress,
                receiveRemarks:this.createData.receiveRemarks,
                buyTime:Date.now(),
                buyParamName1:this.shop.paramName1,
                buyParamValue1:this.createData.buyParamValue1,
                buyParamName2:this.shop.paramName2,
                buyParamValue2:this.createData.buyParamValue2,
                buyParamName3:this.shop.paramName3,
                buyParamValue3:this.createData.buyParamValue3,
                buyParamName4:this.shop.paramName4,
                buyParamValue4:this.createData.buyParamValue4,
                orderTrain:'暂无信息',
                trainNumber:'暂无信息',
                orderStatus:'已下单',
              }
              this.$axios.post('/api/addAShopOrder',data).then(response=>{
                console.log(response.data);
                var money = this.userMoney - this.shop.discountPrice*this.createData.buyNum;
                this.$axios.post('/api/updateUserInfo',{userQQ:this.user.userQQ,userMoney:money}).then(response=>{
                  console.log(response.data);
                  // 更新金钱
                  this.$bus.$emit('updateMoney');
                  // 更新商品信息
                  this.$axios.post('/api/updateAShopping',{shopId:this.shop.shopId,shopNums:this.shop.shopNums-this.createData.buyNum,allSales:this.shop.allSales + this.createData.buyNum}).then(response=>{
                    console.log(response.data);
                  },error=>{
                    console.log(error.message);
                  });
                },error=>{
                  console.log(error.message);
                });

              },error=>{
                console.log(error.message);
              });
              this.confirmText = "恭喜您,购买成功!";
              this.isStep2 = true;
              this.confirmStatus = "success";
          }, 2500);
      }
  },
  // 取消
  cancel(){
      this.isProcess = false;
      this.percentage = 0;
      this.confirmText = "";
      this.confirmStatus = null;
      this.isStep2 = false;
      this.dialogVisible = false;
      this.isConfirmNotice = false;
  },
    // 用户余额获取
async getUserMoney(){
  await  this.$axios.post('/api/getUser',{userQQ:this.user.userQQ}).then(response=>{
      this.userMoney = response.data.userMoney;
    },error=>{
      console.log(error.message);
    });
  },
    routerTo(rout){
        this.$router.push({
            name:rout,
        });
},



},
created(){
  // 图片created
  for (let i = 1; i <= 6; i++) {
    if(this.$route.query.shop['picSrc'+i]!=""){
      this.Allpic.push(this.$route.query.shop['picSrc'+i]);
    }
  }
  // param参数数组化
  for (let j = 1; j <= 4; j++) {
    if(this.$route.query.shop['paramName'+j]!=""){
      this.$route.query.shop['paramValue'+j] = this.$route.query.shop['paramValue'+j].split(',');
    }
  // 接收参数
  this.createData = {
      buyParamValue1:this.$route.query.shop.paramValue1[0],
      buyParamValue2:this.$route.query.shop.paramValue2[0],
      buyParamValue3:this.$route.query.shop.paramValue3[0],
      buyParamValue4:this.$route.query.shop.paramValue4[0],
      buyNum:1,
      receiveAddress:'',
      receiveName:'',
      receivePhone:'',


    };
  }
  // 用户余额获取
  this.getUserMoney();


}

}
</script>

<style scoped>
.shopDetail{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
}

.bought{
  position: relative;
  top: 60px;
  width: 90%;
  left: 4%;
  padding: 10px;
  border-radius: 20px;
  border: 5px dotted whitesmoke;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-flow: row nowrap;
}

.carousel{
  position: relative;
  width: 35%;
  padding-bottom: 10px;
  border-radius: 15px;
  padding-top: 0; 
  border: 3px dotted whitesmoke;
  background-color: rgba(65, 105, 225, 0.05);
}
.www{
  text-decoration: none;
  color: royalblue;
}
.option{
  margin-left: 1.5%;
  width: 63.5%;
  height: 820px;
  padding-bottom: 10px;
  border-radius: 20px;
  padding-top: 10px; 
  background-color: rgba(65, 105, 225, 0.05);
  border: 3px dotted whitesmoke;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  font-size: 1.8vh;
  font-weight: 300;
}
.option span{
  flex: 2;
  position: relative;
  width: 90%;
  left: 2.5%;
  line-height: 250%;
  padding-left: 2.5%;
  transition: 0.25s;
  border: 2px solid rgba(0, 0, 0, 0);
}
.option span:hover{
  border-radius: 15px;
  background-color: white;
  border: 2px solid black;
}
.buybutton{
  position: relative;
  height: 50px;
  align-self: center;
  border-radius: 15px;
  background-color: rgba(255, 68, 0, 0.5);
  box-shadow: 0 0 15px orangered;
  border: 0;
  transition: 0.35s;
  filter: blur(0.5px);
}
.buybutton:hover{
  background-color: rgba(255, 68, 0, 0.7);
  box-shadow: 0 0 20px orangered;
  filter: blur(0);
  color: white;
}
.keyinputs{
  padding-top: 5px;
  border-top: 1px dotted black;
  position: relative;
  width: 90%;
  left: 5%;
  flex: 10;
  display: flex;
  flex-flow: column nowrap;
}
.connect{
  position: relative;
  padding-top: 10px;
  border-top: 1px dotted black;
  position: relative;
  width: 90%;
  left: 5%;
  display: flex;
  flex-flow: column nowrap;
}
.connect span{
    font-size: 1.8vh;
    font-weight: 300;
    flex: 2;
    position: relative;
    width: 90%;
    left: 2.5%;
    line-height: 200%;
    padding-left: 2.5%;
}

.keyinputs span{
  border: none;
  transition: 0;
  flex: 1;
}
.keyinputs span:hover{
  background-color: rgba(0, 0, 0, 0);
  border: none;
}
.address{
  position: relative;
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 1px solid black;

}
.address:focus{
    outline: none;
}


.radiobt{
  position: relative;
  margin-left: 5px;
}


.info{
  position: relative;
  width: 90%;
  left: 4%;
  padding: 10px;
  border-radius: 20px;
  border: 5px dotted whitesmoke;
  background-color: rgba(0, 0, 0, 0.05);
}
.intro{
  position: relative;
  text-align: left;
  width: 90%;
  line-height: 150%;
  font-weight: 400;
  font-size: 1.8vh;
}
.elimage{
  border-radius: 15px;
  border: 2px solid rgba(0, 0, 0, 0.1);
}
.details{
  position: relative;
  top: 100px;
  width: 90%;
  left: 4%;
  padding: 10px;
  border-radius: 20px;
  border: 5px dotted whitesmoke;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.05);
}
.confirmForm{
  text-align: center;
}




</style>