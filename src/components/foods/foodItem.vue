<template>
  <div ref="item" class="foodItem"  :class="{jsChangeBackbefore:isChangeBack,'slideInLeft':isVisialy}">
    <div class="imgs" @click="showDetail" >
        <img :src="foodProp.foodPic" alt="">
    </div>
    <div class="intro">
        <span style="font-size:2vh;">{{foodProp.foodName}}</span>
        <br>
        <div class="tagdiv">
        <span class="tags">{{foodProp.foodCopy}}人份</span>    
        <span class="tags" v-for="material of foodMaterial" :key="material.index">{{material}}</span>
        <span class="tags">. . .</span>
        </div>
        <span>已做: {{foodProp.foodMadeNums}}份 </span>
        <span>  <i class="el-icon-watch"></i>: 约{{foodProp.foodMadeTimes}}分钟</span>
        <br>
        <div class="cost">
             <span><i class="el-icon-lollipop"></i> X {{foodProp.foodPrice}} </span>
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
import { mapState,mapActions } from 'vuex';
export default {
name:'foodItem',
props:['foodProp'],
data(){
    return{
        orderNum:0,
        isGreenActive:false,
        isRedActive:false,
        isChangeBack:false,
        foodMaterial:[],
        sendMaterial:[],
        isVisialy:false,
        tempOrders:[],
    }
},
computed:{
  ...mapState('foodOrder',['orders']),
},
methods:{
    ...mapActions('foodOrder',['uploadOrderId','uploadOrderUser','uploadOrderConent']),
    // 减法
    desNum(){
        if(this.orderNum<=1){
            this.orderNum = 0;
        }
        else{
            this.orderNum--;
        }
    // 更新订单信息--
        this.updateFoodContent();


    // 获取元素距离左侧的位置---动画效果
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
        this.$bus.$emit('updateSmallOrder',this.foodProp.foodId,this.orderNum,this.foodProp.foodMadeTimes,this.foodProp.foodPrice,'des');
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
    // 更新订单信息--
    this.updateFoodContent();
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
        this.$bus.$emit('updateSmallOrder',this.foodProp.foodId,this.orderNum,this.foodProp.foodMadeTimes,this.foodProp.foodPrice,'inc');
        }, 500);



    }, 10);

    },
    showDetail(){
        this.$bus.$emit('showDetail',this.foodProp,this.sendMaterial);
    },
    // 将foodProp中的材料进行分块
    foodMaterialSplit(){
        this.foodMaterial = this.foodProp.foodMaterial.split(',');
        this.sendMaterial = this.foodMaterial;
        if(this.foodMaterial.length>6){
            this.foodMaterial = this.foodMaterial.slice(0,6);
        }
        console.log(this.foodMaterial);
    },
    // 点多点少的 更新store中的content
    updateFoodContent(){
        var hasFoodFlag = false;
        console.log(this.tempOrders);
        // 先查询orderContent里面有没有该food
        for (let i = 0; i < this.tempOrders.orderContent.length; i++) {
            const el = this.tempOrders.orderContent[i];
            // 已经有这个food了,则更新food份数
            if(el.orderFoodId==this.foodProp.foodId){
                hasFoodFlag = true;
                this.tempOrders.orderContent[i].orderFoodNums = this.orderNum;
                this.tempOrders.orderContent[i].orderFoodName = this.foodProp.foodName;
                this.tempOrders.orderContent[i].orderFoodPic = this.foodProp.foodPic;
                this.tempOrders.orderContent[i].orderFoodCopy = this.foodProp.foodCopy;
                this.tempOrders.orderContent[i].orderFoodMadeTimes = this.foodProp.foodMadeTimes;
                this.tempOrders.orderContent[i].orderFoodPrice = this.foodProp.foodPrice;
                this.uploadOrderConent(this.tempOrders.orderContent);
                break;
            }
        }
            // 没有这个food,则在结尾处新添加一个该food结构
            if(!hasFoodFlag){
                var newFood = {
                    orderFoodId:this.foodProp.foodId,
                    orderFoodNums:this.orderNum,
                    orderFoodName : this.foodProp.foodName,
                    orderFoodPic : this.foodProp.foodPic,
                    orderFoodCopy : this.foodProp.foodCopy,
                    orderFoodMadeTimes : this.foodProp.foodMadeTimes,
                    orderFoodPrice : this.foodProp.foodPrice,
                    };
                this.tempOrders.orderContent.push(newFood);
                this.uploadOrderConent(this.tempOrders.orderContent);
            }
    },
    itemCreated(){
            // 获取每个item的订单信息
    setTimeout(() => {
        if(this.orders.orderContent.length!=0){
            console.log(this.orders.orderContent);
            for (let i = 0; i < this.orders.orderContent.length; i++) {
                const el = this.orders.orderContent[i];
                if(el.orderFoodId==this.foodProp.foodId){
                    this.orderNum = el.orderFoodNums;
                }
            }
        }
    }, 1000);
    },
},

mounted(){
    this.foodMaterialSplit();
    this.tempOrders = this.orders;
    if(this.$refs.item!=undefined){
                if(window.screen.height - this.$refs.item.getBoundingClientRect().bottom + 80<0){
                    this.isVisialy = false;
                }
                else{
                    this.isVisialy = true;
                } 
            }
    this.$bus.$on('scollLinstener',()=>{
        setTimeout(() => {
            if(this.$refs.item!=undefined){
                if(window.screen.height - this.$refs.item.getBoundingClientRect().bottom + 80<0){
                    this.isVisialy = false;
                }
                else{
                    this.isVisialy = true;
                } 
            }
        }, 10);
    })
},
created(){
    this.itemCreated();
},
}
</script>

<style scoped>
.foodItem{
    position: relative;
    width: 97%;
    height: 150px;
    left: 2%;
    margin-bottom: 20px;
    padding-left: 3px;
    padding-bottom: 10px;
    background-color: var(--friColor);
    display: flex;
    flex-flow: row nowrap;
    color: #2b2c34;
    transition: 0.33s;
    opacity: 0;
    border-radius: 10px;
}
.slideInLeft{
    animation: slide-InLeft 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.foodItem:hover{
    background-color:#303133;
    color: white;
}
.jsChangeBackbefore{
    background-color: pink !important;
}
.imgs{
    position: relative;
    height: 120px;
    margin-top: 8px;
    width: 120px;
    padding-left: 4px;
    border-radius: 10px;
}
.imgs img{
    position: relative;
    width: 120px;
    height: 120px;
    object-fit: cover;
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
  height: 50px;
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
/* transition: 0.001s; */
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
/* transition: 0.001s; */
}

@keyframes slide-InLeft {
    0%{
        transform: translateX(100px);
        opacity: 0;
    }
    100%{
        transform: translateX(0);
        opacity: 1;
    }
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