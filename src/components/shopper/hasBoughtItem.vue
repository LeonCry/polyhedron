<template>
  <div class="sopItemBox">
        <div class="imgs">
            <img v-if="orderProp.shopping.picSrc1" :src="orderProp.shopping.picSrc1" alt="商品图片">
            <div class="infos">
                <span>收件人:{{orderProp.receiveName}}</span>
                <br><br>
                <span>联系方式:{{orderProp.receivePhone}}</span>
                <br><br>
                <span>邮寄地址:{{orderProp.receiveAddress}}</span>
                <br><br>
                <span>交易时间: <br> {{new Date(parseInt(orderProp.buyTime)).toLocaleString()}}</span>
                <br><br>
                <span>订单编号:{{'74921531'+orderProp.orderId}}</span>
            </div>
        </div>
        <div class="info">
            <br>
            <span style="font-size:1.7vh;text-align:center">{{orderProp.buyShopName}}</span>
            <span >购买用户: {{orderProp.buyUser}}</span>
            <span>购买了 {{orderProp.buyNum}} 件</span>
            <span>商品来源:{{orderProp.shopping.shopFrom}}</span>
            <span>快递编号: <br>{{orderProp.trainNumber}}</span>
            <span>购买参数: <br>
            {{orderProp.buyParamName1}}<span v-show="orderProp.buyParamName1!=''">:</span>{{orderProp.buyParamValue1}}
            {{orderProp.buyParamName2}}<span v-show="orderProp.buyParamName2!=''">:</span>{{orderProp.buyParamValue2}}
            {{orderProp.buyParamName3}}<span v-show="orderProp.buyParamName3!=''">:</span>{{orderProp.buyParamValue3}}
            {{orderProp.buyParamName4}}<span v-show="orderProp.buyParamName4!=''">:</span>{{orderProp.buyParamValue4}}
             </span>
            <span style="font-size:2vh;color:orangered;position: relative;text-align:left;" >消费: P{{orderProp.buyPrice}}</span>
            <span style="color:seagreen">订单状态:{{orderProp.orderStatus}}</span>
            <button @click="routerTo('shopDetail')" class="butt1"><i class="el-icon-s-goods"></i> 商品详情</button>
            
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'hasBoughtItem',
props:['orderProp'],
computed:{
    ...mapState('userInfo',['user']),
},
data(){
    return{
        
    }
},

methods:{
    routerTo(rout){
        this.$router.push({
            name:rout,
            query:{
                shop:this.orderProp.shopping,
                browseUser:this.user.userQQ,
            }
        });
        this.$bus.$emit('changeTitle','商品详情');

},
}
}
</script>

<style scoped>
.sopItemBox{
    position: relative;
    width: 435px;
    margin: 10px;
    height: 640px;
    display: flex;
    flex-flow: row nowrap;
    transition: 0.25s;
    border-radius: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
.sopItemBox:hover{
    border: 2px solid rgba(0, 0, 0, 0.5);
      box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}
.sopItemBox:hover span{
    font-weight: 350;
}


.imgs{
    position: relative;
    height: 100%;
    flex: 14;
}
.imgs > img{
  position: relative;
  width: 250px;
  height: 300px;
  padding-top: 5px;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 1);
}
.infos{
    font-size: 1.6vh;
    font-weight: 300;
    border-top: 1px dotted black;
    padding: 10px;
    position: relative;
    width: 80%;
    margin-left: 5%;
    height: 210px;
}



.info{
    position: relative;
    height: 100%;
    flex: 10;
    display: flex;
    font-size: 1.45vh;
    padding: 15px;
    flex-flow: column nowrap;
    align-items: left;
    justify-content: space-around;
}
.info span{
    position: relative;
    font-weight:300;
    flex: 10;
    width: 100%;
}
.info button{
    position: relative;
    flex: 4;
}


.butt1{
  font-weight: 350;
  position: relative;
  padding: 15px 28px;
  right: 120px;
  border: none;
  margin-bottom: 20px;
  color: black;
  font-size: 1.8vh;
  transition: 0.55s;
  border-radius: 60px;
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
.butt1:hover {
  padding: 15px 28px;
  letter-spacing: 2px;
  right: 120px;
  cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}
@media only screen and (orientation: portrait) {
.sopItemBox{
    position: relative;
    width: 95%;
    margin: 10px;
    height: auto;
    display: flex;
    flex-flow: row nowrap;
    transition: 0.25s;
    border-radius: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
    .butt1{
  font-weight: 350;
  position: relative;
  padding: 0;
  width: 100px;
  right: 120px;
  border: none;
  margin-bottom: 20px;
  color: black;
  font-size: 1.8vh;
  transition: 0.55s;
  border-radius: 60px;
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
.butt1:hover {
  padding: 15px 28px;
  letter-spacing: 2px;
  padding: 0;
  width: 100px;
  cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}
}
</style>