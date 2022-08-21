<template>
 <transition name="DetailT">
  <div class="orderBox" ref="orderBox" v-show="isDetail">
    <transition name="DetailT-1">
    <div class="order">
      <!-- 退出按钮 -->
      <div class="exit">
        <img src="../../assets/exit2.svg" alt="退出" @click="exitDetail" />
      </div>
    <div class="detailimgs">
        <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5bw5w7rqjj21900u0q7e.jpg" alt="">
    </div>
    <div class="introduces">
      <transition name="DetailT-2">
        <span v-show="isDetail" class="detailTitle">所 有 订 单</span>
      </transition>
      <br><br>
      <transition name="DetailT-3">
        <div class="tagdiv" v-show="isDetail">
        <span v-if="allData" style="color:aliceblue">用户编号: {{allData[0].orderPerson}}</span>
        <br><br>
        <span style="color:aliceblue">订单数: {{allData.length}}</span>
        <br><br>
        </div>
        </transition>
      <transition-group name="DetailT-4">
      <span v-show="isDetail" key="1">总花费棒棒糖 </span>
      <span v-show="isDetail" key="2" style="color: rgb(0, 145, 255);font-size:2.2vh;"><i class="el-icon-lollipop"></i> X {{priceTotal}} </span>
      <br key="5"><br key="6">
      </transition-group>
      <transition name="DetailT-5">
      <div v-show="isDetail" class="more" >
        <has-order-all-item v-for="data of allData" :key="data.orderId" :dataProp="data"></has-order-all-item>
         </div>
      </transition>
    </div>
    </div>
    </transition>
  </div>
 </transition>
</template>

<script>
import HasOrderAllItem from './hasOrderAllItem.vue';
export default {
  components: {HasOrderAllItem },
name:'foodAllOrder',
data(){
  return{
    isDetail:false,
    allData:'',
    priceTotal:0,
  }
},
methods:{
exitDetail(){
  this.isDetail = false;
},
},
mounted(){
this.$bus.$on('allOrderShow',(data)=>{
  this.isDetail = true;
  var price = 0;
  this.$axios.post('/api/selectFoodOrdersByName',{orderPerson:data.orderUser}).then(response=>{
    console.log(response.data);
    this.allData = response.data;
    for (let i = 0; i < this.allData.length; i++) {
      const el1 = this.allData[i];
      if(el1.orderContent!=''){
      var content = JSON.parse(el1.orderContent);
      this.allData[i].orderContent = [];
      console.log(content);
      this.allData[i].orderContent.push(content);
      for (let j = 0; j < content.length; j++) {
        const el2 = content[j];
        if(el2.orderFoodNums!=0){
          price += el2.orderFoodPrice*el2.orderFoodNums;
        }
      }
      }
      this.priceTotal = price;
    }
  },error=>{
    console.log(error.message);
  });
});
},
created(){
  // 获得屏幕长
  setTimeout(() => {
    this.$refs.orderBox.style.height = window.screen.height + 'px';
  }, 100);
},
}
</script>

<style scoped>
@media only screen and (orientation: portrait) {
.orderBox{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 8000;
  background-color: rgba(0, 0, 0, 0.55);
}
}
.orderBox{
  position: fixed;
  width: 450px;
  top: 0;
  z-index: 8000;
  background-color: rgba(0, 0, 0, 0.55);
}
.order{
  position: relative;
  width: 95%;
  left: 2.5%;
  top: 7.5%;
  height: 85%;
  background-color: #303133;
  border-radius: 15px;
  box-shadow: black 0 0 15px;
}
/* 退出按钮 */
.exit {
  position: absolute;
  right: 0;
  z-index: 999;
  padding-right: 20px;
  line-height: 65px;
  cursor: pointer;
}
.exit img {
  transition: 0.8s;
}
.exit img:hover {
  transform: rotateZ(720deg) scale(1.33);
}
.detailimgs{
    position: relative;
    background-color: rgba(255, 255, 255,0.33);
    height: 250px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    border-radius: 15px;
}
.detailimgs img{
    position: relative;
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
}
.introduces{
  position: relative;
  width: 100%;
  border-radius: 15px;
  top: -30px;
  font-size: 1.6vh;
  color: aliceblue;
  height: 400px;
  background-color: #303133;
}
.detailTitle{
  position: relative;
  font-size: 2.4vh;
  color: aliceblue;
  width: 100%;
  padding: 15px;
  background-color: #303133;
  border-radius: 15px;
}
.more{
  position: relative;
  width: 90%;
  left: 4%;
  max-height: 200px;
  overflow: auto;
  text-align: left;
  font-size: 1.65vh;
  color: aliceblue;
  padding: 5px;
  border-radius: 15px;
  letter-spacing: 2px;
  line-height: 150%;
}


/* 动画效果 */
    .DetailT-enter-active{
        animation: slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-leave-active{
        animation: slide-top 0.4s 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-1-enter-active{
        animation: tilt-in-right-1 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-1-leave-active{
        animation: tilt-in-right-1 0.4s 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-2-enter-active{
        animation: slide-top 0.4s 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-2-leave-active{
        animation: slide-top 0.2s 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-3-enter-active{
        animation: slide-top 0.4s 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-3-leave-active{
        animation: slide-top 0.2s 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-4-enter-active{
        animation: slide-top 0.4s 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-4-leave-active{
        animation: slide-top 0.2s 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-5-enter-active{
        animation: slide-top 0.4s 1.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-5-leave-active{
        animation: slide-top 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }

@keyframes slide-top {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes tilt-in-right-1 {
  0% {
    transform: rotateX(-30deg) translateX(300px) skewX(30deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg) translateX(0) skewX(0deg);
    opacity: 1;
  }
}


</style>