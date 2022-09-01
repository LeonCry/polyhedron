<template>
  <div class="hasOrderItem" @click="showDetail">
 <div class="dimgs">
            <img v-if="dataProp.orderContent.length!=0&&dataProp.orderContent[0]!=undefined" :src="dataProp.orderContent[0][0].orderFoodPic" alt="">
  </div>
  <div class="intro">
    <div>
    <span>订单: {{new Date(parseInt(dataProp.orderTime)).toLocaleString()}}</span>
    <br>
    <span style="color:darkgray">用餐人数: {{dataProp.orderDiners}}人</span>
    <br>
    <span style="color:darkgray">点单菜肴: {{numTotal}}份</span>
    <br>
    <span style="color:darkgray">订单状态: <span style="color:pink">{{data.orderStatus}}</span> </span>
    <br>
    <span style="color: salmon;font-size:1.4vh;">本单收入:<i class="el-icon-lollipop"></i>x{{priceTotal}}</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:'foodAdminItem',
props:['dataProp'],
data(){
  return{
    numTotal:0,
    priceTotal:0,
    data:this.dataProp,
  }
},
methods:{
    // 展示订单详情
    showDetail(){
        this.$bus.$emit('adminOrderShow',this.dataProp.orderId);
    },
},
mounted(){
  this.$bus.$on('updateOrderStatusB',(id,newStatus)=>{
    if(this.dataProp.orderId==id){
      this.data.orderStatus = newStatus;
    }
    });
    this.$bus.$on('adminItemChange',()=>{
      var price = 0;
      var num = 0;
        if(this.dataProp.orderContent.length!=0&&this.dataProp.orderContent[0]!=undefined){
  for (let i = 0; i < this.dataProp.orderContent[0].length; i++) {
    const element = this.dataProp.orderContent[0][i];
    if(element.orderFoodNums!=0){
      num++;
      price += element.orderFoodPrice*element.orderFoodNums;
    }
  }
  this.numTotal = num;
  this.priceTotal = price;
        }
    });
},
created(){
  var price = 0;
  var num = 0;
  if(this.dataProp.orderContent.length!=0&&this.dataProp.orderContent[0]!=undefined){
  for (let i = 0; i < this.dataProp.orderContent[0].length; i++) {
    const element = this.dataProp.orderContent[0][i];
    if(element.orderFoodNums!=0){
      num++;
      price += element.orderFoodPrice*element.orderFoodNums;
    }
  }
  this.numTotal = num;
  this.priceTotal = price;
}}
}
</script>

<style scoped>
.hasOrderItem{
  position: relative;
  width: 95%;
  left: 2.5%;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #303133;
  display: flex;
  flex-flow: row nowrap;
  border-radius: 15px;
  transition: 0.33s;
}
.hasOrderItem:hover{
    background-color: rgb(64, 192, 120,0.33);
}
.dimgs{
    position: relative;
    height: 100px;
    width: 100px;
    padding: 10px;
    border-radius: 10px;
}
.dimgs img{
    position: relative;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
}
.intro{
    position: relative;
    width: 80%;
    overflow: auto;
    height: 100%;
    padding: 10px;
    font-size: 1.4vh;
    color: aliceblue;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
</style>