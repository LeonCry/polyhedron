<template>
  <div class="hasOrderItem" :class="{'finish':isFinish}" v-show="dataProp.orderFoodNums!=0">
 <div class="dimgs">
            <img :src="dataProp.orderFoodPic" alt="">
  </div>
  <div class="intro">
    <div>
    <span>{{dataProp.orderFoodName}}</span>
    <br>
    <span style="color:darkgray">{{dataProp.foodCopy}}人份</span>
    <br>
    <span style="color:darkgray">x{{dataProp.orderFoodNums}}</span>
    <br>
    <span style="color: salmon;font-size:1.4vh;"><i class="el-icon-lollipop"></i>x{{dataProp.orderFoodPrice*dataProp.orderFoodNums}}</span>
    </div>
    <div>
        <button v-show="!isFinish" @click="finishIt" class="updateOrder">出锅</button>
       <i v-show="isFinish" class="icon" :class="{'el-icon-loading':!isFinish,'el-icon-success':isFinish,'iconFinish':isFinish}"></i>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:'adminOrderItem',
props:['dataProp','allDataProp'],
data(){
  return{
    isFinish:false,
    allData:this.allDataProp,
  }
},
methods:{
    finishIt(){
        this.isFinish = true;
        for (let i = 0; i < this.allData.orderContent[0].length; i++) {
          const el = this.allData.orderContent[0][i];
          if(el.orderFoodId==this.dataProp.orderFoodId){
            this.allData.orderContent[0][i].status = '已出锅';
          }
        }
        this.$axios.post('/api/selectFoodsByName',{foodName:this.dataProp.orderFoodName}).then(response=>{
          var foodNum = response.data[0].foodMadeNums;
          // eslint-disable-next-line no-unused-vars
          this.$axios.post('/api/updateFoods',{foodId:this.dataProp.orderFoodId,foodMadeNums:foodNum+this.dataProp.orderFoodNums}).then(response=>{

          },error=>{
            console.log(error.message);
          });  
        },error=>{
          console.log(error.message);
        });
      this.$axios.post('/api/updateFoodOrders',{orderId:this.allData.orderId,orderContent:JSON.stringify(this.allData.orderContent[0])}).then(response=>{
        console.log(response.data);
      },error=>{
        console.log(error.message);
      });
    }
},
created(){
  if(this.dataProp.status=='已出锅'){
    this.isFinish = true;
  }
  else{
    this.isFinish = false;
  }
},
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
    height: 75px;
    width: 75px;
    padding: 10px;
    border-radius: 10px;
}
.dimgs img{
    position: relative;
    width: 75px;
    height: 75px;
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
.updateOrder{
  position: relative;
  margin-top: 20px;
  width: 60px;
  height: 40px;
  border: none;
  background-color: khaki;
  font-size: 1.2vh;
  border-radius: 15px;
  box-shadow: khaki 0 0 10px;
  color: #303133;
}
.icon{
  margin-top: 32px;
  font-size: 2vh;
  color: khaki;
  transition: 0.33s;
  opacity: 0;
}
.iconFinish{
  opacity: 1;
  transition: 0.33s;
}
.finish{
  background-color: rgb(46, 139, 87,0.33);
  transition: 0.33s;
}
</style>