<template>
  <div class="hasOrderItem" :class="{'finish':isFinish}">
 <div class="dimgs">
            <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h57vi4iyrjj21hc0u0acn.jpg" alt="">
  </div>
  <div class="intro">
    <div>
    <span>整鸡蛋糕儿整鸡蛋糕儿</span>
    <br>
    <span style="color:darkgray">1人份</span>
    <br>
    <span style="color:darkgray">x2</span>
    <br>
    <span style="color: salmon;font-size:1.4vh;"><i class="el-icon-lollipop"></i>x15</span>
    </div>
    <div>
        <button v-show="!isFinish" @click="finishIt" class="updateOrder">已出锅</button>
       <i v-show="isFinish" class="icon" :class="{'el-icon-loading':!isFinish,'el-icon-success':isFinish}"></i>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:'adminOrderItem',
data(){
  return{
    isFinish:false,
  }
},
methods:{
    finishIt(){
        this.isFinish = true;
    }
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
}
.finish{
  background-color: rgb(46, 139, 87,0.33);
}
</style>