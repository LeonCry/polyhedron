<template>
  <div class="shopDetail">
    <br><br>
    <div class="info">
      <br>
      <span style="position: absolute;;width:100%;text-align: center;">"印有LOGO的T恤"</span>
      <br><br><hr>
      <span class="intro">&nbsp &nbsp&nbsp
         这是一件印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤
         这是一件印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤
         这是一件印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤印有POLYHEDRON字样的T恤
         </span>
    </div>
    <div class="bought">
        <div class="carousel">
        <el-carousel :interval="5000"  arrow="hover" height="500px">
          <el-carousel-item v-for="item in Allpic" :key="item">
            <el-image class="elimage"  :key="item+'x'" :src="item"  :preview-src-list="Allpic" ></el-image>
          </el-carousel-item>
        </el-carousel>
        <div class="connect">
            <span style="font-weight:350"><i class="el-icon-info"></i>购买商品前请先填好以下信息:</span>
            <span><i class="el-icon-map-location"></i> 收件地址: <input class="address" v-model="address" placeholder="请输入收件地址(必填)"> </span>
            <span><i class="el-icon-user"></i> 收 件 人: <input class="address" v-model="buyName" placeholder="请输入收件人姓名(必填)"> </span>
            <span><i class="el-icon-mobile-phone"></i> 收件电话: <input maxlength="11" class="address" v-model="buyPhone" placeholder="请输入收件人电话(必填)"> </span>
            <span><i class="el-icon-edit"></i> 商品备注: <input  class="address" v-model="beizhu" placeholder="(选填)"></span>
        </div>
        </div>
        <div class="option">
          <br>
          <span>商品来源: 淘宝</span>
          <span>售卖店铺: BELLKEN 早起工作室</span>
          <span>商品名称: Bellken 早起工作室日系复古T恤男短袖holiday印花宽松简约情侣装</span>
          <span>商品网址: <a class="www" href="https://www.baidu.com" target="_blank">点击此处前往淘宝商品页面</a></span>
          <span style="flex:2">商品价格: <a style="font-size:2vh;color:orangered;text-decoration: line-through;text-align:left;font-weight:500">P9999</a></span>
          <span>商品优惠: 本产品享受 1 折优惠!</span>
          <span style="flex:2">优惠价格: <a style="font-size:2vh;color:orangered;text-align:left;font-weight:500">P999.9</a></span>
          <span>商品限购: 1件 / 剩余:12件</span>
          <span>本站销量: 1件</span>
          <span>支持快递: 中通,圆通,申通等免运费,顺丰2元加急</span>
          <span>发货地区: 北京</span>

          <div class="keyinputs">
            <span>选择尺码:     
              <el-radio-group  v-model="opt1" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" label="S"></el-radio-button>
                <el-radio-button class="radiobt" label="M"></el-radio-button>
                <el-radio-button class="radiobt" label="L"></el-radio-button>
                <el-radio-button class="radiobt" label="XL"></el-radio-button>
                <el-radio-button class="radiobt" label="XXL"></el-radio-button>
                <el-radio-button class="radiobt" label="XXXL"></el-radio-button>
               </el-radio-group>
               </span>
               <span>选择颜色:     
              <el-radio-group  v-model="opt2" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" label="红"></el-radio-button>
                <el-radio-button class="radiobt" label="橙"></el-radio-button>
                <el-radio-button class="radiobt" label="黄"></el-radio-button>
                <el-radio-button class="radiobt" label="绿"></el-radio-button>
                <el-radio-button class="radiobt" label="青"></el-radio-button>
                <el-radio-button class="radiobt" label="蓝"></el-radio-button>
               </el-radio-group>
               </span>
               <span>选择性别:     
              <el-radio-group  v-model="opt3" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" label="男"></el-radio-button>
                <el-radio-button class="radiobt" label="女"></el-radio-button>
               </el-radio-group>
               </span>
               <span>选择型号:     
              <el-radio-group  v-model="opt4" class="radioG" fill="rgba(255, 68, 0, 0.5)">
                <el-radio-button class="radiobt" label="型号1"></el-radio-button>
                <el-radio-button class="radiobt" label="型号2"></el-radio-button>
               </el-radio-group>
               </span>
               <span>购买个数:     
              <el-input-number size="small" v-model="buyNum" :min="1" :max="10" label="描述文字"></el-input-number>
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
  <span>这将从您的余额中扣除<span style="color:orangered;text-weight:500;font-size:2vh"> P999 </span>且不支持退款.</span>
  <br><br>
  <span>购买后余额: </span>
  <span style="color:orangered;text-weight:500;font-size:2vh"> P9999 <i class="el-icon-right"></i> P999</span>
  <br><br>
  <el-progress v-show="isProcess" type="circle" :percentage="percentage" :status="confirmStatus" width="60"></el-progress>
  <span v-show="isConfirmNotice"><br><br>恭喜,您已成功完成购买!</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBuy">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
export default {
name:'shopDetail',
data(){
  return{
    Allpic:['https://tva1.sinaimg.cn/large/e6c9d24ely1h4dhhzmwabj20ed0eyjrt.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h4dhincg1zj20mo0hb3zt.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h4dcomteefj21900u0dj0.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h4dd75bdx1j21900u07ao.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h4bbomf2c1j21900u0ju9.jpg'],
    dialogVisible:false,
    isProcess:false,
    isConfirmNotice:false,
    confirmStatus:'',
    percentage:0,
    address:'',
    opt1:'S',
    opt2:'红',
    opt3:'男',
    opt4:'型号1',
    buyNum:1,
    buyName:'',
    buyPhone:'',
    beizhu:'',
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
    this.isProcess = true;
    setTimeout(() => {
      this.percentage = 25;
    }, 500);
    setTimeout(() => {
      this.percentage = 73;
    }, 1000);
    setTimeout(() => {
      this.percentage = 100;
      this.confirmStatus = "success";
      this.isConfirmNotice = true;
    }, 1500);
    setTimeout(() => {
      this.dialogVisible = false;
    }, 3000);
  }
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