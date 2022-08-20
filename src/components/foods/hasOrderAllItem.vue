<template>
  <div ref="hasOrderItem" class="hasOrderItem" @click="showDetail">
 <div class="dimgs">
            <img :src="dataProp.orderContent[0][0].orderFoodPic" alt="">
  </div>
  <div class="intro">
    <div>
    <span>订单:{{new Date(parseInt(dataProp.orderTime)).toLocaleString()}}</span>
    <br>
    <span style="color:darkgray">人数: {{dataProp.orderDiners}}人</span> <span style="color:darkgray">菜肴: {{foodNums}}份</span>
    <br>
    <span style="color:darkgray">订单状态: {{dataProp.orderStatus}}</span>
    </div>
    <div>
        <br><span style="color: salmon;font-size:1.4vh;"><i class="el-icon-lollipop"></i>x{{priceTotal}}</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:'hasOrderAllItem',
props:['dataProp'],
data(){
    return{
        foodNums:0,
        priceTotal:0,
    }
},
methods:{
    // 展示订单详情
    showDetail(){
        this.$bus.$emit('orderShow',{orderId:this.dataProp.orderId});
    },
},
created(){
    var nums = 0;
    var price = 0;
    for (let i = 0; i < this.dataProp.orderContent[0].length; i++) {
        const element = this.dataProp.orderContent[0][i];
        if(element.orderFoodNums!=0){
            nums++;
            price += element.orderFoodPrice*element.orderFoodNums;
        }
    }
    this.foodNums = nums;
    this.priceTotal = price;
    setTimeout(() => {
            if(this.dataProp.orderStatus=='已完成'){
        this.$refs.hasOrderItem.style.backgroundColor = 'rgb(64, 192, 120,0.5)';
    }
    }, 100);

}
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
.dimgs{
    position: relative;
    height: 65px;
    width: 65px;
    padding: 10px;
    border-radius: 10px;
}
.dimgs img{
    position: relative;
    width: 65px;
    height: 65px;
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