<template>
  <div class="sopItemBox" ref="soit">
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
                <br><br>
                 <el-button @click="routerTo('shopDetail')" round type="primary" plain><i class="el-icon-s-goods"></i> 商品详情</el-button>
                 <br><br>
                 <el-button v-if="trainData.status == '收件人已签收'" @click="deleteOrder" round type="danger" plain ><i class="el-icon-delete-solid"></i> 删除订单</el-button>
            </div>
        </div>
        <div class="info">
            <br>
     
            <span style="font-size:1.7vh;text-align:center">{{orderProp.buyShopName}} <br><br>
             <span>快递编号:{{orderProp.trainNumber}}</span>
             <br><br>
             <span style="text-align:center;">消费: <a style="font-size:2vh;color:orangered;">P{{orderProp.buyPrice}}</a></span>
              </span>
              <br><br>
            <span style="text-align:left;font-size:1.7vh">物流详情</span>  
            <br><br>
            <div v-if="trainData" class="train"> 
                <span class="fontcolor">当前状态:{{trainData.status}}</span>
                <br><br>
                <span v-for="data of trainData.result.list" :key="data.time">时间:{{data.time}} <br> {{data.status}} <br><br></span>
            </div>

        </div>
       
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'trainItem',
props:['orderProp'],
computed:{
    ...mapState('userInfo',['user']),
},

data(){
    return{
      trainData:'',
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
hasFinish(){
// 背景变绿
this.$refs.soit.style.backgroundColor = 'pink';
},
// 删除订单
deleteOrder(){
  // eslint-disable-next-line no-unused-vars
  this.$axios.post('/api/updateAShopOrder',{orderId:this.orderProp.orderId,orderTrain:'是'}).then(response=>{
    this.$message({
          message: '已删除订单',
          type: 'success'
        });
  },error=>{
    console.log(error.message);
  });
}
},
created(){
    // 查询物流:
    this.$axios.post('/train/express/query?appkey=22d8a17ec09ee8c0&type=auto&number='+this.orderProp.trainNumber+'&mobile='+this.orderProp.receivePhone).then(response=>{
        this.trainData = response.data;
        switch(response.data.result.deliverystatus){
          case (1):
            this.trainData.status = "在途中";
            break;
          case (2):
            this.trainData.status = "正在运输..";
            break;
          case (3):
            this.trainData.status = "收件人已签收";
            // eslint-disable-next-line no-unused-vars
            this.$axios.post('/api/updateAShopOrder',{orderId:this.orderProp.orderId,orderStatus:'收件人已签收'}).then(response=>{
            },error=>{
                console.log(error.message);
            });
            break;
          case (4):
            this.trainData.status = "派送失败";
            break;
          default:
            this.trainData.status = "暂无物流信息";
            break;
        }
        if(this.trainData.status == "收件人已签收"){
          // 执行收件人已签收函数
          this.hasFinish();
        }
    },error=>{
        console.log(error.message);
    });

}
}
</script>

<style scoped>
.sopItemBox{
    position: relative;
    width: 670px;
    margin: 10px;
    height: 660px;
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
    flex: 20;
    font-size: 1.45vh;
    text-align: center;
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
.train{
    position: relative;
    width: 90%;
    overflow-y:auto;
    border-top: 1px dotted black;
    height: 430px;
    font-size: 1.45vh;
    padding: 10px;
}
.del{
  position: absolute;
  left: 0;
  bottom: 0;
}

.butt1{
  font-weight: 350;
  position: relative;
  padding: 15px 28px;
  border: none;
  letter-spacing: 2px;
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
  letter-spacing: 5px;
  cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}
.fontcolor{
  color:royalblue;
  font-size: 1.8vh;
  font-weight: 500;
}
@media only screen and (orientation: portrait) {
.sopItemBox{
    position: relative;
    width: 95%;
    margin: 10px;
    height: auto;
    display: flex;
    flex-flow: column nowrap;
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
.imgs{
    position: relative;
    height: 100%;
    text-align: center;
    flex: 14;
}
.imgs > img{
  position: relative;
  width: 80%;
  height: auto;
  padding-top: 0;
  margin-top: 5px;
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
    height: auto;
}

.info{
    position: relative;
    height: 100%;
    flex: 20;
    font-size: 1.45vh;
    text-align: center;
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
.train{
    position: relative;
    width: 90%;
    overflow-y:auto;
    border-top: 1px dotted black;
    height: 430px;
    font-size: 1.45vh;
    padding: 10px;
}
.del{
  position: absolute;
  left: 0;
  bottom: 0;
}
}
</style>