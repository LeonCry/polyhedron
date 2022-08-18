<template>
  <div ref="item" class="foodItem"  :class="{jsChangeBackbefore:isChangeBack}">
    <div class="imgs" @click="showDetail" >
        <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5aacw5zaaj20ia0ia75q.jpg" alt="">
    </div>
    <div class="intro">
        <span style="font-size:2vh;">整鸡蛋糕儿整鸡蛋糕儿整鸡蛋糕儿</span>
        <br>
        <div class="tagdiv">
        <span class="tags">1人份</span>
        <span class="tags">土豆</span>
        <span class="tags">鸡蛋</span>
        <span class="tags">牛奶</span>
        <span class="tags">洋葱</span>
        <span class="tags">可乐</span>
        <span class="tags">花生</span>
        <span class="tags">. . .</span>
        </div>
        <span>已做: 3次 </span>
        <span>  <i class="el-icon-watch"></i>: 约20分钟</span>
        <br>
        <div class="cost">
             <span><i class="el-icon-lollipop"></i> X 15 </span>
             <div class="buyButs">
                <button ref="desbut" v-show="orderNum!=0" @click="desNum"  class="but-des"> - </button>
                <!-- 红色小球 -->
                <div class="fakeRed" ref="fakeRed" :class="{fakeRed:!isRedActive,fakeRedActive:isRedActive}"></div>
                <span v-show="orderNum!=0" class="buy-num"> {{orderNum}} </span>
                <button ref="incbut" class="but-inc" @click="incNum"> + </button>
                <!-- 绿色小球 -->
                <div class="fakeGreen" ref="fakeGreen" :class="{fakeGreen:!isGreenActive,fakeGreenActive:isGreenActive}"></div>
             </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
name:'foodItem',
data(){
    return{
        orderNum:0,
        isGreenActive:false,
        isRedActive:false,
        isChangeBack:false,
    }
},
methods:{
    // 减法
    desNum(){
        if(this.orderNum<=1){
            this.orderNum = 0;
        }
        else{
            this.orderNum--;
        }
    // 获取元素距离左侧的位置
    var tp = document.documentElement.clientTop;
    var el = this.$refs.desbut;
    var rect = el.getBoundingClientRect();
    var bottomLength = window.screen.height - rect.bottom + tp;
    var leftLength = rect.left-100;
    this.$refs.fakeRed.style.opacity = 1;
    this.$refs.fakeRed.style.zIndex = 9999;
    this.$refs.fakeRed.style.marginTop = bottomLength + 'px';
    this.$refs.fakeRed.style.marginRight = leftLength + 'px';
    setTimeout(() => {
        this.$bus.$emit('orderShake','red');
        this.isRedActive = true;
        var le5 = leftLength/50;
        var bo2 = bottomLength/2500;
        var time = 0;
        // this.$refs.fakeGreen.style.marginTop = bottomLength + 'px';
        // this.$refs.fakeGreen.style.marginRight = leftLength + 'px';
        var timer = setInterval(() => {
            time++;
            this.$refs.fakeRed.style.marginRight= leftLength - le5*time + 'px';
            this.$refs.fakeRed.style.marginTop =bottomLength - bo2*time*time + 'px';
        }, 10);
        setTimeout(() => {
        clearInterval(timer);
        this.$refs.fakeRed.style.opacity = 0;
        this.$refs.fakeRed.style.zIndex = -1;
        this.$refs.fakeRed.style.marginRight = bottomLength + 'px';
        this.$refs.fakeRed.style.marginTop = leftLength + 'px';
        this.isChangeBack = true;
        setTimeout(() => {
            this.isChangeBack = false;
        }, 330);
        }, 500);
    }, 10);
    },
    // 加法
    incNum(){
        if(this.orderNum>=8){
            this.orderNum = 9;
        }
        else{
            this.orderNum++;
        }
    // 获取元素距离左侧的位置
    var tp = document.documentElement.clientTop;
    var el = this.$refs.incbut;
    var rect = el.getBoundingClientRect();
    var bottomLength = window.screen.height - rect.bottom + tp;
    var leftLength = rect.left-100;
    this.$refs.fakeGreen.style.opacity = 1;
    this.$refs.fakeGreen.style.zIndex = 9999;
    this.$refs.fakeGreen.style.marginRight = 0;
    this.$refs.fakeGreen.style.marginTop = 0;
    setTimeout(() => {
        this.isGreenActive = true;
        var le5 = leftLength/50;
        var bo2 = bottomLength/2500;
        var time = 0;
        // this.$refs.fakeGreen.style.marginTop = bottomLength + 'px';
        // this.$refs.fakeGreen.style.marginRight = leftLength + 'px';
        var timer = setInterval(() => {
            time++;
            this.$refs.fakeGreen.style.marginRight= le5*time + 'px';
            this.$refs.fakeGreen.style.marginTop = bo2*time*time + 'px';
        }, 10);
        setTimeout(() => {
        clearInterval(timer);
        this.$refs.fakeGreen.style.opacity = 0;
        this.$refs.fakeGreen.style.zIndex = -1;
        this.$refs.fakeGreen.style.marginRight = 0;
        this.$refs.fakeGreen.style.marginTop = 0;
        this.$bus.$emit('orderShake','green');
        }, 500);



    }, 10);

    },
    showDetail(){
        this.$bus.$emit('showDetail');
    }
}
}
</script>

<style scoped>
.foodItem{
    position: relative;
    width: 97%;
    height: 150px;
    left: 2%;
    margin-bottom: 30px;
    padding-left: 3px;
    padding-bottom: 10px;
    background-color: var(--friColor);
    display: flex;
    flex-flow: row nowrap;
    color: #2b2c34;
    transition: 0.33s;
    border-radius: 10px;
}
.foodItem:hover{
    background-color: var(--secColor);
    color: white;
}
.jsChangeBackbefore{
    background-color: pink !important;
}
.imgs{
    position: relative;
    height: 120px;
    margin-top: 8px;
    width: auto;
    padding-left: 4px;
    border-radius: 10px;
}
.imgs img{
    position: relative;
    width: auto;
    height: 100%;
    border-radius: 10px;
}
.intro{
    position: relative;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: left;
    font-size: 1.6vh;
}
.tagdiv{
  position: relative;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
}
.tags{
  position: relative;
  width: auto;
  height: 8px;
  padding: 3px;
  padding-bottom: 10px;
  margin: 2px;
  font-size: 1vh;
  border-radius: 8px;
  font-weight: 100;
  background-color: rgba(128, 128, 128, 0.3);
}
.cost{
    position: relative;
    font-size:2.2vh;
    color:salmon;
    top: 8px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.buyButs{
    position: relative;
    display: flex;
    flex-flow: row nowrap;
}
.but-des{
position: relative;
border: none;
background-color: #F56C6C;
width: 20px;
height: 20px;
font-size: 2vh;
color: white;
margin-right: 5px;
border-radius: 6px;
}
.but-inc{
position: relative;
border: none;
background-color: #67C23A;
width: 20px;
height: 20px;
font-size: 2vh;
color: white;
margin-left: 5px;
border-radius: 6px;
}
.buy-num{
position: relative;
font-size: 2vh;
top: -1px;
}
.fakeRed{
position: absolute;
right: 0;
z-index: -1;
opacity: 0;
width: 15px;
height: 15px;
border-radius: 50%;
background-color: #F56C6C;
/* transition: 2s; */
}
.fakeRedActive{
position: absolute;
right: 0;
opacity: 1;
z-index: 9999;
width: 15px;
height: 15px;
border-radius: 50%;
background-color: #F56C6C;
transition: 0.001s;
}
.fakeGreen{
position: absolute;
right: 0;
opacity: 0;
z-index: -1;
width: 15px;
height: 15px;
border-radius: 50%;
background-color: #67C23A;
/* transition: 2s; */
}
.fakeGreenActive{
position: absolute;
right: 0;
opacity: 1;
z-index: 9999;
width: 15px;
height: 15px;
border-radius: 50%;
background-color: #67C23A;
transition: 0.001s;
}



@media only screen and (orientation: portrait) {
.foodItem{
    position: relative;
    width: 97%;
    height: 150px;
    left: 2%;
    padding-left: 3px;
    background-color: var(--friColor);
    display: flex;
    flex-flow: row nowrap;
    color: #2b2c34;
    transition: 0.33s;
    border-radius: 10px;
}
}

</style>