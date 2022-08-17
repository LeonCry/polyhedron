<template>
  <div class="otherBox">
    <div class="topper">
      <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5a2jkj6o9j218z0u0wlv.jpg" alt="">
    </div>
    <div class="intro">
      <div class="head">
        <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5a34he552j20fy0fytag.jpg" alt="">
      </div>
      <h1 class="title">嗨吃嗨喝嗨皮<br>Hai eat Hai drink Hai play</h1>
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
          <span>平均花费: <i class="el-icon-lollipop" style="color:tomato;font-weight:bolder"></i> X15 </span>
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
    <div class="empty"></div>
    <div class="fooder"  ref="fooder" @touchmove.stop>
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
    <div class="hasOrder">

    </div>
  </div>
</template>

<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import foodLeftButton from '@/components/foods/foodLeftButton.vue';
import FoodItem from '@/components/foods/foodItem.vue';
export default {
  components: { foodLeftButton, FoodItem },
// eslint-disable-next-line vue/multi-word-component-names
name:'other',
data(){
  return{
    visitorId:'',
    allPic:['https://tva1.sinaimg.cn/large/e6c9d24ely1h57vi4iyrjj21hc0u0acn.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h5a2yuiguqj21900u0dmk.jpg','https://tva1.sinaimg.cn/large/e6c9d24ely1h5a2jkj6o9j218z0u0wlv.jpg'],
    foodTpye:['单人套餐','招牌套餐','热销套餐','主食','涮菜','涮菜组合','餐具'],
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
},




mounted(){
  this.getUniqueCode();
},
created(){
  // 获得屏幕长
  setTimeout(() => {
    this.$refs.fooder.style.height = window.screen.height-90+ 'px';
    this.$refs.foodLeft.style.height = window.screen.height-90+ 'px';
    this.$refs.foodRight.style.height = window.screen.height-90 + 'px';
  }, 500);
}
}
</script>

<style scoped>

.otherBox{
    position: absolute;
    background-color: var(--friColor);
    width: 100%;
    height: 100%;
    z-index: 80;
    transition: 0.55s;
    font-size: 1.2vh;
    overflow: auto;
    text-align: center;
    font-weight: bolder;
    color: rgb(0, 145, 255);
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
  background-color: khaki;
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
  background-color: rgb(206, 198, 100);
}

.food-right{
  position: relative;
  overflow: auto;
  flex: 8;
}
.hasOrder{
  position: sticky;
  width: 35%;
  height: 80px;
  bottom: 0;
  border-left: 8px solid khaki;
  z-index: 2;
  background-color: royalblue;
}
</style>