<template>
<div class="allBack">
  <div class="otherBox">
    <div class="topper">
      <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5a2jkj6o9j218z0u0wlv.jpg" alt="">
    </div>
    <div class="intro">
      <div class="head">
        <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5a34he552j20fy0fytag.jpg" alt="">
      </div>
      <h1 class="title">李大厨<br>I am Chef Li</h1>
      <div class="xux"></div>
      <div class="says">
        <span>好吃程度: <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> </span>
        <br>
        <span>出餐速度: <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> </span>
        <br>
        <span>综合评分: <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i>
        <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> </span>
        <br>
      </div>
      <div class="tagdiv">
        <span class="tags">点评高分店铺</span>
        <span class="tags">高回头客率</span> 
        <span class="tags">海鲜人气榜第1名</span>
        <span class="tags">水果人气榜第1名</span>
        <span class="tags">口碑飙升</span>
        <span class="tags">热情掌柜</span>
        <span class="tags">韩料人气榜第1名</span>
        <span class="tags">非遗厨师</span>
        <span class="tags">日料人气榜第1名</span>
        <span class="tags">金字招牌</span>
        <span class="tags">川菜人气榜第1名</span>
        <span class="tags">人气飙升</span>
        <span class="tags">鲁菜人气榜第1名</span>
        <span class="tags">热销榜第1名</span>
        <span class="tags">仅此一家</span>
        <span class="tags">过了这个村</span>
        <span class="tags">没了这个店</span>
        <span class="tags">...</span>
        </div>
        <div class="sail">
          <span>总销量:9854</span>
          <span>一道菜约30分钟</span>
          <span>人均花费: <i class="el-icon-lollipop" style="color:tomato;font-weight:bolder"></i> X15 </span>
          <br><br>
          <div class="sp">高端的食材往往只需要最简单的烹饪方式,致力于健康时尚的餐饮方式,懂你的心,更懂你的胃,服务无止境,口碑永流传~</div>
        </div>
    </div>
    <div class="pictrans">
    <el-carousel height="200px" style="border-radius:10px" class="ppiicc">
      <el-carousel-item v-for="pic in allPic" :key="pic.index">
         <el-image
          class="elimage"
          :src="pic"
          fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
    </div>
    <div class="empty">
      <div class="butes">
        <input :class="{inputShow:isSearch}" type="text" class="input" placeholder="请输入要搜索的菜肴..">
        <button class="empty-buts" @click="searchFood" :class="{buttedbuts:isSearch}"> <i class="el-icon-search"></i> </button>
        <button class="empty-buts" @click="orderAllShow"> <i class="el-icon-s-order"></i> </button>
      </div>
    </div>
    <transition name="DetailT">
    <div v-show="isDetail" ref="detail" class="detail">
      <transition name="DetailT-1">
      <div v-show="isDetail" class="detailBox">
      <!-- 退出按钮 -->
      <div class="exit">
        <img src="../assets/exit2.svg" alt="退出" @click="exitDetail" />
      </div>
    <div class="detailimgs">
        <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h57vi4iyrjj21hc0u0acn.jpg" alt="">
    </div>
    <div class="introduces">
      <transition name="DetailT-2">
        <span v-show="isDetail" class="detailTitle">鸡蛋花儿鸡蛋花儿鸡蛋花儿</span>
      </transition>
      <br><br><br>
      <transition-group name="DetailT-3">
      <span v-show="isDetail" key="1">剂量: 1人份 时间: 约20分钟 已做: 3份 </span>
      <br key="3"><br key="4">
      <span v-show="isDetail" key="2" style="color: rgb(0, 145, 255);font-size:2.2vh;"><i class="el-icon-lollipop"></i> X 15 </span>
      <br key="5"><br key="6">
      </transition-group>
      <transition name="DetailT-4">
        <div class="tagdiv" v-show="isDetail">
        <span style="color:aliceblue" class="tags">1人份</span>
        <span style="color:aliceblue" class="tags">土豆</span>
        <span style="color:aliceblue" class="tags">鸡蛋</span>
        <span style="color:aliceblue" class="tags">牛奶</span>
        <span style="color:aliceblue" class="tags">洋葱</span>
        <span style="color:aliceblue" class="tags">可乐</span>
        <span style="color:aliceblue" class="tags">花生</span>
        <span style="color:aliceblue" class="tags">牛奶</span>
        <span style="color:aliceblue" class="tags">洋葱</span>
        <span style="color:aliceblue" class="tags">可乐</span>
        <span style="color:aliceblue" class="tags">花生</span>
        </div>
        </transition>
      <transition name="DetailT-5">
      <div v-show="isDetail" class="more" >
         详情:
         <br>
         鸡蛋糕口感清香,滑嫩,老少皆宜!鸡蛋糕口感清香,滑嫩,老少皆宜!鸡蛋糕口感清香,滑嫩,老少皆宜!鸡蛋糕口感清香,滑嫩,老少皆宜!鸡蛋糕口感清香,滑嫩,老少皆宜!
         <br><br>
         步骤:
         <br>
         1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱
         1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱
         1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱1.开火 2.关火 3.热爱
         <br><br>
      </div>
      </transition>
    </div>
      </div>
      </transition>
    </div>
    </transition>
    <div class="fooder"   ref="fooder" @touchmove.stop>
      <div class="food-left" ref="foodLeft">
        <food-left-button v-for="type of foodTpye" :key="type.index" :foodTypeProps="type"></food-left-button>
      </div>
      <div class="food-right" ref="foodRight">
        <food-item></food-item>
        <food-item></food-item>
        <food-item></food-item>
        <food-item></food-item>
        <food-item></food-item>
        <food-item></food-item>
        <food-item></food-item>
        <food-item></food-item>
        <food-item></food-item>


        
      </div>
    </div>
    <div ref="hasOrder"  @click="orderShow" class="hasOrder">
      <div class="trans"></div>
      <div class="meatsIcon">
        <img  :src="realIcon" alt="">
      </div>
      <div class="orderInfo">
        <span>菜肴 X 2</span>
        <span>耗时:40min</span>
        <span style="color: salmon;font-size:1.8vh;"><i class="el-icon-lollipop"></i> X 15 </span>
        <span>Cooking <i class="el-icon-loading"></i> </span>
      </div>
    </div>
    <food-orders></food-orders>
    <food-all-order></food-all-order>
  </div>
  </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import foodLeftButton from '@/components/foods/foodLeftButton.vue';
import FoodItem from '@/components/foods/foodItem.vue';
import FoodOrders from '@/components/foods/foodOrders.vue';
import FoodAllOrder from '@/components/foods/foodAllOrder.vue';
export default {
  components: { foodLeftButton, FoodItem, FoodOrders, FoodAllOrder },
// eslint-disable-next-line vue/multi-word-component-names
name:'other',
data(){
  return{
    visitorId:'',
    isDetail:false,
    allPic:['https://tva1.sinaimg.cn/large/e6c9d24ely1h57vi4iyrjj21hc0u0acn.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h5a2yuiguqj21900u0dmk.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h5a2jkj6o9j218z0u0wlv.jpg'],
    foodTpye:['单人套餐','招牌套餐','热销套餐','主食','涮菜','涮菜组合','餐具'],
    allIcons:['meea1.svg','meea2.svg','meea3.svg','meea4.svg','meea5.svg',
              'meea6.svg','meea7.svg','meea8.svg','meea9.svg','meea10.svg',
              'meea11.svg','meea12.svg','meea13.svg','meea14.svg','meea15.svg',
              'meea16.svg','meea17.svg','meea18.svg','meea19.svg','meea20.svg',
              'meea21.svg','meea22.svg','meea23.svg','meea24.svg','meea25.svg',
              'meea26.svg'],
    iconTime:0,
    isSearch:false,
    searchContent:'',
    realIcon:require("../assets/meea/meea1.svg"),


  }
},
methods:{
   // 获取设备唯一标识
getUniqueCode(){
    FingerprintJS.load().then(fp => {
        fp.get().then(result => {
           this.visitorId = result.visitorId;
          console.log('获取设备唯一标识：',this.visitorId);
        });
    });
},
// icon轮换
transIcon(){
setInterval(() => {
  this.iconTime++;
  if(this.iconTime==26){
    this.iconTime = 0;
  }
  this.realIcon = require('../assets/meea/'+this.allIcons[this.iconTime]);
}, 10000);
},
exitDetail(){
  this.isDetail = false;
},
// 展示订单
orderShow(){
  this.$bus.$emit('orderShow');
},
// 展示所有订单
orderAllShow(){
  this.$bus.$emit('allOrderShow');
},
// 搜索食物
searchFood(){
  this.isSearch = !this.isSearch;
  this.searchContent = '';
},



},
mounted(){
  this.transIcon();
  this.getUniqueCode();
  // detail出现
  this.$bus.$on('showDetail',(data)=>{
    this.isDetail = true;
  })
  // 闪一下
  this.$bus.$on('orderShake',(data)=>{
    if (data=='green') {
      this.$refs.hasOrder.style.backgroundColor = 'springgreen';
    }
    else{
      this.$refs.hasOrder.style.backgroundColor = 'red';
    }
    setTimeout(() => {
      this.$refs.hasOrder.style.backgroundColor = '#303133';
    }, 330);
  })
},

created(){
  // 获得屏幕长
  setTimeout(() => {
    this.$refs.fooder.style.height = window.screen.height-90+ 'px';
    this.$refs.foodLeft.style.height = window.screen.height-90+ 'px';
    this.$refs.foodRight.style.height = window.screen.height-90 + 'px';
    this.$refs.detail.style.height = window.screen.height + 'px';
  }, 500);
}
}
</script>

<style scoped>
.allBack{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #2b2c34;
  z-index: 10;
}
.otherBox{
    position: relative;
    background-color: var(--friColor);
    width: 500px;
    height: 100%;
    z-index: 80;
    margin-left: 35%;
    transition: 0.55s;
    font-size: 1.2vh;
    overflow: auto;
    text-align: center;
    font-weight: bolder;
    color: rgb(0, 145, 255);
}
.detail{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.55);
}
.detailBox{
  position: relative;
  width: 95%;
  left: 2.5%;
  top: 7.5%;
  height: 85%;
  background-color: #303133;
  border-radius: 15px;
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
  font-size: 2vh;
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
  max-height: 180px;
  overflow: auto;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 1.65vh;
  color: aliceblue;
  padding: 5px;
  border-radius: 15px;
  letter-spacing: 2px;
  line-height: 150%;
}



.topper{
  position: relative;
  width: auto;
  top: -50px;
  height: 250px;
}
.topper img{
  position: relative;
  width: 100%;
  height: auto;
}
.intro{
  position: relative;
  width: 100%;
  height: 400px;
  z-index: 3;
  border-radius: 20px 20px 0 0;
  background-color: var(--friColor);
  top: -50px;
}
.title{
  position: relative;
  top: -20px;
  font-size: 2.5vh;
  font-weight: 500;
  letter-spacing: 1px;
}
.head{
  position: relative;
  width: 100px;
  margin: auto;
  top: -35px;
  height: 100px;
  border: 2px solid pink;
  border-radius: 20px;
}
/* 虚线 */
.xux{
position: relative;
top: -5px;
width: 100%;
height: 2px;
border-top: 5px dotted rgba(73, 37, 80, 0.237);
}
.says{
  position: relative;
  width: 100%;
  font-size: 1.6vh;
  font-weight: 100;
  color: #2b2c34;
}
.yellow{
  color: #f25f4c;
}

.head img{
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 20px;
}
.tagdiv{
  position: relative;
  width: 100%;
  height: auto;
  padding: 15px;
  display: flex;
  flex-flow: row wrap;
}
.sp{
  position: relative;
  height: 30px;
  width: 90%;
}
.tags{
  position: relative;
  width: auto;
  height: 10px;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 10px;
  margin: 2px;
  font-size: 1.4vh;
  border-radius: 10px;
  font-weight: 100;
  color: #2b2c34;
  background-color: rgba(128, 128, 128, 0.3);
}
.sail{
  position: relative;
  font-weight: 100;
  color: #2b2c34;
  width: 100%;
  font-size: 1.6vh;
  height: auto;
  padding: 20px;
  padding-top: 0;
  text-align: left;
}
.sail span{
  margin-right: 10px;
}
.pictrans{
  position: relative;
  width: 98%;
  height: 200px;
  left: 1%;
  z-index: 4;
  border-radius: 10px;

}
.ppiicc{
  box-shadow: #2b2c34 0 0 8px;
}
.elimage{
  border-radius: 10px;
}
.empty{
  position: relative;
  z-index: 3;
  width: 100%;
  height: 40px;
  display: flex;
  flex-flow: row-reverse nowrap;
  background-color: khaki;
}
.butes{
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 35%;
  height: 80%;
  top: 10%;
  background-color: #303133;
  border-radius: 20px;

}
.empty-buts{
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 10px;
  /* margin-top: 8px; */
  margin-left: 25px;
  background-color: #303133;
  color: #F2F6FC;
  font-size: 2.3vh;
  font-weight: bolder;
  text-align: center;
  transition: 0.33s;
}
.empty-buts:active{
  background-color: royalblue;
  color: khaki;
}
.buttedbuts{
    background-color: royalblue;
    color: khaki;
}
.input{
  position: absolute;
  width: 0;
  height: 100%;
  border-radius: 15px 0 0 15px;
  padding-left: 20px;
  /* margin-top: 8px; */
  right: 135px;
  border: none;
  outline: none;
  background-color: #303133;
  color: #F2F6FC;
  font-size: 1.6vh;
  transition: 0.55s;
}
.inputShow{
  width: 200px;
}

.fooder{
  position: relative;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-flow: row nowrap;
  z-index: 2;
}
.food-left{
  position: relative;
  overflow: auto;
  flex: 2;
  border-radius: 10px 10px 0 0;
  background-color: rgb(206, 198, 100);
}

.food-right{
  position: relative;
  overflow: auto;
  flex: 8;
}
.hasOrder{
  position: sticky;
  width: 45%;
  height: 68px;
  bottom: 0;
  border: 1px solid khaki;
  z-index: 2;
  background-color: #303133;
  display: flex;
  border-radius: 15px;
  flex-flow: row nowrap;
  transition: 0.33s;
}
.trans{
  position: absolute;
  width: 10px;
  height: 100%;
  border-radius: 10px;
  background-color: khaki;
  transition: 0.55s;
}
.hasOrder:hover .trans{
width: 100%;
border: 1px solid #303133;
}
.hasOrder:hover .orderInfo{
color: #303133;
}
.meatsIcon{
  position: relative;
  width: auto;
  height: 100%;
  animation: round 10s linear infinite both;
}
.meatsIcon img{
  position: relative;
  width: auto;
  height: 100%;
  filter: blur(100px);
  transition: 1s;
  animation: jello-horizontal 2.7s infinite both;
}
.meatsIcon img:hover{
  filter: blur(0);
}
.orderInfo{
  position: relative;
  width: 45%;
  height: 100%;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  transition: 0.55s;
}
.fakeRed{
position: absolute;
left: 0;
opacity: 1;
width: 15px;
z-index: 10;
height: 15px;
border-radius: 50%;
background-color: #F56C6C;
transition: 0.8s;
}
.fakeGreen{
position: absolute;
right: 0;
opacity: 1;
z-index: 10;
width: 15px;
height: 15px;
border-radius: 50%;
background-color: #67C23A;
transition: 0.8s;
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





@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  33.3%{
    transform: scale3d(1, 1, 1);
  }
  43% {
    transform: scale3d(1.25, 0.75, 1);
  }
  46.2% {
    transform: scale3d(0.75, 1.25, 1);
  }
  49.5% {
    transform: scale3d(1.15, 0.85, 1);
  }
  54.45% {
    transform: scale3d(0.95, 1.05, 1);
  }
  57.75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  66.6%{
    transform: scale3d(1, 1, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes round {
  0%{
    transform: rotateY(0) scale(0);
  }
  5%{
    transform: rotateY(5deg) scale(1);
  }
  90%{
    transform: rotateY(45deg) scale(1);
  }
  95%{
    transform: rotateY(45deg) scale(0);
  }
  100%{
    transform: rotateY(0) scale(0);
  }
}

@media only screen and (orientation: portrait) {
  .otherBox{
    position: absolute;
    background-color: var(--friColor);
    width: 100%;
    height: 100%;
    z-index: 80;
    margin-left: 0;
    transition: 0.55s;
    font-size: 1.2vh;
    overflow: auto;
    text-align: center;
    font-weight: bolder;
    color: rgb(0, 145, 255);
}
}
</style>