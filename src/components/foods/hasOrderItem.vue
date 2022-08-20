<template>
  <div class="hasOrderItem" :class="{'finish':isFinish}">
 <div class="dimgs">
            <img :src="dataProp.orderFoodPic" alt="">
  </div>
  <div class="intro">
    <div>
    <span>{{dataProp.orderFoodName}}</span>
    <br>
    <span style="color:darkgray">{{dataProp.orderFoodCopy}}人份</span>
    <br>
    <span style="color:darkgray">x{{dataProp.orderFoodNums}}</span>
    <br>
    <span style="color: salmon;font-size:1.4vh;"><i class="el-icon-lollipop"></i>x{{dataProp.orderFoodNums*dataProp.orderFoodPrice}}</span>
    </div>
    <div>
       <i class="icon" :class="{'el-icon-loading':!isFinish,'el-icon-success':isFinish}"></i>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:'hasOrderItem',
props:['dataProp'],
data(){
  return{
    isFinish:false,
  }
},
mounted(){
  if(this.dataProp.status==undefined){
    this.isFinish = false;
  }
  else{
    this.isFinish = true;
  }

this.$bus.$on('contentUpdate',(newContent)=>{
  if(this.dataProp.status==undefined){
    for (let i = 0; i < newContent.length; i++) {
      const element = newContent[i];
      if(element.orderFoodId==this.dataProp.orderFoodId){
        if(element.status=='已出锅'){
          this.isFinish = true;
           this.$message({
            message: this.dataProp.orderFoodName+'出锅啦.',
            type: 'success'
        });
    }
        }
        break;
      }
      
    }
});


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
  transition: 0.25s;
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
.icon{
  margin-top: 32px;
  font-size: 2vh;
  color: khaki;
}
.finish{
  background-color: rgb(46, 139, 87,0.33);
}
</style>