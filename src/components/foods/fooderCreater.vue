<template>
<transition name="DetailT" appear>
  <div class="fooderCreater" ref="fooderCreater" v-show="isCreated">
    <back-button :roots="'/'" v-if="isUser"></back-button>
    <div class="notice">
    <span>{{notice}}</span>
    </div>
    <el-button ref="admin" @click="admin" :class="{salmon:isAdmin}" class="admin" icon="el-icon-s-help" circle></el-button>
    <img class="imgs" src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5bwnqjwtrj20u01900yw.jpg" alt="">
     <transition name="DetailT-2" appear>
    <div v-show="isCreated" class="fooder">
        <br><br>
        <span>请选择就餐人数 : {{pnums}}人</span>
        <transition name="DetailT-3" appear>
        <div v-show="isCreated" class="tagdiv">
        <span ref="1" @click="pnum(1)" class="tags">1人用餐</span>
        <span ref="2" @click="pnum(2)" class="tags">2人用餐</span> 
        <span ref="3" @click="pnum(3)" class="tags">3人用餐</span>
        <span ref="4" @click="pnum(4)" class="tags">4人用餐</span>
        <span ref="5" @click="pnum(5)" class="tags">5人用餐</span>
        <span ref="6" @click="pnum(6)" class="tags">6人用餐</span>
        <span ref="8" @click="pnum(8)" class="tags">8人用餐</span>
        <span ref="12" @click="pnum(12)" class="tags">12人用餐</span>
        <span ref="16" @click="pnum(16)" class="tags">16人用餐</span>
        </div>
        </transition>
        <br>
        <transition name="DetailT-4" appear>
        <button v-show="isCreated" @click="confirms" class="buts">确定</button>
        </transition>
        <br><br>
        <input class="input" :class="{inputShow:isAdmin}" type="password" placeholder="管理员密码" v-model="password">
    </div>
     </transition>
  </div>
</transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import backButton from "../backButton.vue"
import FingerprintJS from '@fingerprintjs/fingerprintjs';
export default {
components: { backButton},
name:'fooderCreater',
data(){
    return{
        pnums:1,
        isCreated:false,
        isAdmin:false,
        password:'',
        notice:'已经有一单了?可能上一单已经完成,请进入查看所有订单',
        isUser:false,
        isNewCreated:false,
        visitorId:'',
        hasOrderId:'',
    }
},
computed:{
  ...mapState('userInfo',['user']),
  ...mapState('foodOrder',['orders']),
},
methods:{
  ...mapActions('foodOrder',['uploadOrderId','uploadOrderUser','uploadOrderConent']),
  ...mapMutations('foodOrder',['SAVEORDERID','SAVEORDERUSER','SAVECONTENT']),
    pnum(p){
        var allP = ['1','2','3','4','5','6','8','12','16'];
        for (let index = 0; index < allP.length; index++) {
            const element = allP[index];
            if(element==p.toString()){
                 this.$refs[element].style.backgroundColor = 'royalblue';
            }
            else{
                this.$refs[element].style.backgroundColor = 'rgba(162, 159, 159, 0.3)';
            }
        }
        this.pnums = p;
    },
    // 获取设备唯一标识
    getUniqueCode(){
    FingerprintJS.load().then(fp => {
        fp.get().then(result => {
           this.visitorId = result.visitorId;
           this.isOrdering();
        });
    });
},
  async confirms(){
        this.isCreated = false;
        // 先检查是否是从主页面返回过来更改用餐人数的
      await this.isChangeOrder();
        // 如果是新创建的订单(卖坑多重axios请求导致时间不一)
        setTimeout(() => {
        if(this.isNewCreated){
        // 创建一个订单
        this.isNewCreated = false;
        this.$axios.post('/api/insertFoodOrders',{orderPerson:this.visitorId,orderDiners:this.pnums,orderContent:'',orderStatus:'点菜中',orderTime:Date.now()}).then(response=>{
            console.log("创建订单.");
            console.log(response.data);
                this.uploadOrderId(response.data[0].orderId);
                this.uploadOrderUser(response.data[0].orderPerson);
        },error=>{
            console.log(error.message);
        });}
        // 如果是返回来修改的订单
        else{
            //更新订单
            this.$axios.post('/api/updateFoodOrders',{orderId:this.hasOrderId,orderDiners:this.pnums}).then(response=>{
                console.log("更新订单.");
                console.log(response.data);
                this.uploadOrderId(response.data[0].orderId);
                this.uploadOrderUser(response.data[0].orderPerson);
                this.notice = '已为您更改用餐人数';
                setTimeout(() => {
                    this.notice = 'I am Chef Li';
                }, 3000);
            },error=>{
                console.log(error.message);
            });
        }
        }, 500);
    },
    admin(){
        if(!this.isAdmin){
            this.isAdmin = true;
        }
        else{
            if(this.password==''){
                this.notice = 'I am Chef Li'
                this.isAdmin = false;
            }
            else{
                this.$axios.post('/api/userLogin',{userQQ:'SYSTEM',userPassword:this.password}).then(response=>{
                if(response.data==-1){
                        this.notice = 'password error.'
                    }
                    else{
                        // 显示管理员窗口
                        this.$bus.$emit('adminBox');
                    }
                },error=>{
                    console.log(error.message);
                });
            }
        }
    },
    // 先请求数据库,看该顾客是否有正在订单中
    isOrdering(){
        this.$axios.post('/api/selectFoodOrdersByNameAndStatus',{orderPerson:this.visitorId,orderStatus:'点菜中'}).then(response=>{
            if(response.data.length==0){
                // 没有正在点菜的订单,看是否有已下单的订单
                this.$axios.post('/api/selectFoodOrdersByNameAndStatus',{orderPerson:this.visitorId,orderStatus:'已下单'}).then(response=>{
                    if(response.data.length==0){
                        // 没有已下单的订单,看是否有正在烹饪的订单
                        this.$axios.post('/api/selectFoodOrdersByNameAndStatus',{orderPerson:this.visitorId,orderStatus:'烹饪中'}).then(response=>{
                            if(response.data.length==0){
                                // 说明没有正在进行的订单,该页面需要进行显示
                                this.isCreated = true;
                            }
                            else{
                                this.uploadOrderId(response.data[0].orderId);
                                this.uploadOrderUser(response.data[0].orderPerson);
                                if(response.data[0].orderContent!=''){
                                    this.SAVECONTENT(JSON.parse(response.data[0].orderContent));
                                }

                            }
                        },error=>{
                            console.log(error.message);
                        });
                    }
                    else{
                        this.uploadOrderId(response.data[0].orderId);
                        this.uploadOrderUser(response.data[0].orderPerson);
                        if(response.data[0].orderContent!=''){
                            this.SAVECONTENT(JSON.parse(response.data[0].orderContent));
                        }
                    }
                },error=>{
                    console.log(error.message);
                });
            }
            else{
                this.uploadOrderId(response.data[0].orderId);
                this.uploadOrderUser(response.data[0].orderPerson);
                if(response.data[0].orderContent!=''){
                    this.SAVECONTENT(JSON.parse(response.data[0].orderContent));
                }
            }
        },error=>{
            console.log(error.message);
        });
    },
  async isChangeOrder(){
        await this.$axios.post('/api/selectFoodOrdersByNameAndStatus',{orderPerson:this.visitorId,orderStatus:'点菜中'}).then(response=>{
            if(response.data.length==0){
                // 没有正在点菜的订单,看是否有已下单的订单
                this.isChangeOrder2();
            }
            else{
                this.hasOrderId = response.data[0].orderId;
            }
        },error=>{
            console.log(error.message);
        });
    },
async isChangeOrder2(){
                
               await this.$axios.post('/api/selectFoodOrdersByNameAndStatus',{orderPerson:this.visitorId,orderStatus:'已下单'}).then(response=>{
                    if(response.data.length==0){
                        // 没有已下单的订单,看是否有正在烹饪的订单
                        this.isChangeOrder3();
                    }
                    else{
                        this.hasOrderId = response.data[0].orderId;
                    }
                },error=>{
                    console.log(error.message);
                });
},
async isChangeOrder3(){
   await this.$axios.post('/api/selectFoodOrdersByNameAndStatus',{orderPerson:this.visitorId,orderStatus:'烹饪中'}).then(response=>{
        if(response.data.length==0){
            // 说明没有正在进行的订单,该页面需要进行显示
            this.isNewCreated = true;
        }
        else{
            this.hasOrderId = response.data[0].orderId;
        }
        },error=>{
            console.log(error.message);
        });
},
},

mounted(){
  this.$bus.$on('adminShow',()=>{
    this.isCreated = true;
  });
},

created(){
  // 获得屏幕长
  setTimeout(() => {
    this.$refs.fooderCreater.style.height = window.screen.height + 'px';
    this.$refs['1'].click();
    if(this.user!=''){
        this.isUser = true;
    }
  }, 100);
  this.getUniqueCode();

},
// 获得订单信息
}
</script>

<style scoped>
@media only screen and (orientation: portrait) {
.fooderCreater{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9000;
  background-color: rgba(0, 0, 0, 0.55);
}
}
.fooderCreater{
  position: fixed;
  width: 450px;
  top: 0;
  z-index: 9000;
  background-color: rgba(0, 0, 0, 0.55);
}
.fooder{
  position: absolute;
  width: 95%;
  left: 2.5%;
  top: 30%;
  height: 40%;
  font-size: 1.8vh;
  color: aliceblue;
  z-index: 2;
  background-color: rgba(48, 49, 51,0.8);
  border-radius: 15px;
  box-shadow:  rgba(48, 49, 51,1) 0 0 15px;
}
.admin{
    position: absolute;
    z-index:2;
    background-color:rgba(0,0,0,0);
    border:none;
    font-size:3vh;
    color:white;
    animation: round 10s linear both infinite;
    bottom: 20%;
    left: 44%;
    transition: 0.33s;
}
.notice{
    position: absolute;
    z-index:2;
    width: 100%;
    text-align: center;
    background-color:rgba(0,0,0,0);
    border:none;
    font-size:2vh;
    color:white;
    bottom: 10%;
    transition: 0.33s;
}

.imgs{
    position: relative;
    width: 100%;
    height: 100%;
    display: inline;
    object-fit: cover;
    filter: blur(4px);
}
.tagdiv{
  position: relative;
  width: 100%;
  height: auto;
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
}
.salmon{
    color: salmon;
}
.tags{
  position: relative;
  width: auto;
  height: 30px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 13px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 1.6vh;
  border-radius: 10px;
  font-weight: 100;
  color: aliceblue;
  transition: 0.33s;
  background-color: rgba(162, 159, 159, 0.3);
}
.tags:hover{
     background-color: royalblue;
}
.buts{
    width: 60px;
    height: 30px;
    border: none;
    color: aliceblue;
    background-color: rgba(255, 118, 73, 0.8);
    box-shadow: rgba(255, 118, 73, 1) 0 0 10px;
    border-radius: 10px;
    transition: 0.33s;
}
.buts:hover{
    background-color: rgba(73, 118, 255, 0.8);
    box-shadow: rgb(72, 118, 255) 0 0 10px;
}

.input{
  position: relative;
  width: 0;
  opacity: 0;
  height: 40px;
  border-radius: 15px;
  padding-left: 20px;
  /* margin-top: 8px; */
  border: none;
  outline: none;
  background-color: #303133;
  color: #F2F6FC;
  font-size: 1.6vh;
  transition: 0.55s;
}
.inputShow{
  width: 200px;
  opacity: 1;
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

@keyframes round{
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
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