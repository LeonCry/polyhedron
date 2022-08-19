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
        <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5bc893t2cj21900u0q6q.jpg" alt="">
    </div>
    <div class="introduces">
      <transition name="DetailT-2">
        <span v-show="isDetail" class="detailTitle">订 单 详 情</span>
      </transition>
      <br><br>
      <transition name="DetailT-3">
        <div class="tagdiv" v-show="isDetail">
        <span style="color:aliceblue">下单时间: 2022-2-2 13:59:40</span>
        <br><br>
        <span style="color:aliceblue">下单编号: 9d6793f7bf73b05cf69767ef39e8c74b</span>
        <br><br>
        </div>
        </transition>
      <transition-group name="DetailT-4">
      <span v-show="isDetail" key="1">用餐: 4人 菜肴: 3份 时间: 约60分钟 状态:正在烹饪</span>
      <br key="3"><br key="4">
      <span v-show="isDetail" key="2" style="color: rgb(0, 145, 255);font-size:2.2vh;"><i class="el-icon-lollipop"></i> X 15 </span>
      <br key="5"><br key="6">
      </transition-group>
      <transition name="DetailT-5">
      <div v-show="isDetail" class="more" >
        <admin-order-item></admin-order-item>
        <admin-order-item></admin-order-item>
        <admin-order-item></admin-order-item>
        <admin-order-item></admin-order-item>
        <admin-order-item></admin-order-item>
         </div>
      </transition>
      <transition name="DetailT-5">
      <button v-show="isDetail" class="updateOrder" key="2">更改状态为:{{nextStatus}}</button>
      </transition>
    </div>
    </div>
    </transition>
  </div>
 </transition>
</template>

<script>
import AdminOrderItem from './adminOrderItem.vue';
export default {
components: { AdminOrderItem },
name:'foodAminOrders',

data(){
  return{
    isDetail:false,
    nextStatus:'正在烹饪',
  }
},
methods:{
exitDetail(){
  this.isDetail = false;
},
},
mounted(){
this.$bus.$on('adminOrderShow',()=>{
  this.isDetail = true;
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
.orderBox{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9600;
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
  transition: 0.33s;
}
.introduces:hover{
    top: -150px;
}
.introduces:hover .more{
    max-height: 320px;
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
  transition: 0.66s;
}
.updateOrder{
  position: relative;
  margin-top: 15px;
  width: 160px;
  height: 40px;
  border: none;
  background-color: khaki;
  font-size: 1.6vh;
  border-radius: 15px;
  box-shadow: khaki 0 0 10px;
  color: #303133;

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