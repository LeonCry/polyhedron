<template>
  <div class="allBack">
    <span class="presays">移动端有更好的体验哦~</span>
    <div class="otherBox">
      <fooder-creater></fooder-creater>
      <food-admin-orders></food-admin-orders>
      <food-admin></food-admin>
      <div class="topper">
        <img src="https://img95.699pic.com/photo/60053/3528.jpg_wh860.jpg" alt="" />
        <el-button @click="admin" class="admin" round>返回</el-button>
      </div>
      <div class="intro">
        <div class="head">
          <img src="https://bpic.588ku.com/back_pic/05/93/93/775d1ec96f92de1.jpg" alt="" />
        </div>
        <h1 class="title">李大厨<br />I am Chef Li</h1>
        <div class="xux"></div>
        <div class="says">
          <span>好吃程度: <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> </span>
          <br />
          <span>出餐速度: <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> </span>
          <br />
          <span>综合评分: <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> <i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i><i class="el-icon-star-on yellow"></i> </span>
          <br />
        </div>
        <div class="tagdiv">
          <span class="tags">点评高分店铺</span>
          <span class="tags">高回头客率</span>
          <span class="tags">口碑飙升</span>
          <span class="tags">海鲜人气榜第1名</span>
          <span class="tags">水果人气榜第1名</span>
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
          <span>人均花费: <i class="el-icon-lollipop" style="color: tomato; font-weight: bolder"></i> X15 </span>
          <br /><br />
          <div class="sp">高端的食材往往只需要最简单的烹饪方式,致力于健康时尚的餐饮方式,懂你的心,更懂你的胃,服务无止境,口碑永流传~</div>
        </div>
      </div>
      <div class="pictrans">
        <el-carousel height="200px" style="border-radius: 10px" class="ppiicc">
          <el-carousel-item v-for="pic in allPic" :key="pic.index">
            <el-image class="elimage" :src="pic" fit="fit"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="empty">
        <div class="butes">
          <input :class="{ inputShow: isSearch }" type="text" class="input" @input="searchIt" placeholder="请输入要搜索的菜肴.." v-model="searchContent" />
          <button class="empty-buts" @click="searchFood" style="margin-left: 5px" :class="{ buttedbuts: isSearch }"><i class="el-icon-search"></i></button>
          <button class="empty-buts" @click="orderAllShow"><i class="el-icon-s-order"></i></button>
          <button class="empty-buts" @click="refresh" style="right: 5px"><i class="el-icon-refresh"></i></button>
        </div>
      </div>
      <food-details></food-details>
      <div class="fooder" ref="fooder" @touchmove.stop>
        <div class="food-left" ref="foodLeft">
          <food-left-button v-for="type of foodTpye" :key="type.index" :foodTypeProps="type"></food-left-button>
        </div>
        <div class="food-right" ref="foodRight">
          <food-item v-for="food of allFoods" :key="food.foodId" :foodProp="food"></food-item>
        </div>
      </div>
      <div ref="hasOrder" @click="orderShow" class="hasOrder">
        <div class="trans"></div>
        <div class="meatsIcon">
          <img class="meatsIconimg" :class="{ meatsIconblur: isCooking }" :src="realIcon" alt="" />
        </div>
        <div v-if="foodsTotal != 0" class="orderInfo">
          <span>菜肴 X {{ foodsTotal }}</span>
          <span>耗时:{{ timesTotal }}min</span>
          <span style="color: salmon; font-size: 1.8vh"><i class="el-icon-lollipop"></i> X {{ priceTotal }} </span>
          <span>{{ statusTotal }} <i class="el-icon-loading"></i> </span>
        </div>
      </div>
      <food-orders></food-orders>
      <food-all-order></food-all-order>
    </div>
  </div>
</template>
<script>
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import foodLeftButton from '@/components/foods/foodLeftButton.vue'
import FoodItem from '@/components/foods/foodItem.vue'
import FoodOrders from '@/components/foods/foodOrders.vue'
import FoodAllOrder from '@/components/foods/foodAllOrder.vue'
import FooderCreater from '@/components/foods/fooderCreater.vue'
import FoodAdmin from '@/components/foods/foodAdmin.vue'
import FoodAdminOrders from '@/components/foods/foodAdminOrders.vue'
import FoodDetails from '@/components/foods/foodDetails.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { foodLeftButton, FoodItem, FoodOrders, FoodAllOrder, FooderCreater, FoodAdmin, FoodAdminOrders, FoodDetails },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'other',
  data() {
    return {
      visitorId: '',
      isDetail: false,
      allPic: ['https://bpic.588ku.com/back_pic/05/93/93/775d1ec96f92de1.jpg', 'https://cbu01.alicdn.com/img/ibank/O1CN01mIu6gZ28CQ8NaGOxc_!!2214653797896-0-cib.jpg', 'https://img95.699pic.com/photo/60067/2884.jpg_wh860.jpg'],
      foodTpye: ['所有菜肴'],
      allIcons: ['meea1.svg', 'meea2.svg', 'meea3.svg', 'meea4.svg', 'meea5.svg', 'meea6.svg', 'meea7.svg', 'meea8.svg', 'meea9.svg', 'meea10.svg', 'meea11.svg', 'meea12.svg', 'meea13.svg', 'meea14.svg', 'meea15.svg', 'meea16.svg', 'meea17.svg', 'meea18.svg', 'meea19.svg', 'meea20.svg', 'meea21.svg', 'meea22.svg', 'meea23.svg', 'meea24.svg', 'meea25.svg', 'meea26.svg'],
      iconTime: 0,
      isSearch: false,
      searchContent: '',
      realIcon: require('../assets/meea/meea1.svg'),

      allFoods: '',
      saveAllFoods: '',
      foodItemShow: true,
      foodsTotal: 0,
      timesTotal: 0,
      priceTotal: 0,
      ids: [],
      statusTotal: '',
      isCooking: false,
      settimeIn: '',
    }
  },
  computed: {
    ...mapState('foodOrder', ['orders']),
  },
  methods: {
    ...mapActions('foodOrder', ['uploadOrderId', 'uploadOrderUser', 'uploadOrdeConent']),
    // 获取设备唯一标识
    getUniqueCode() {
      FingerprintJS.load().then((fp) => {
        fp.get().then((result) => {
          this.visitorId = result.visitorId
        })
      })
    },
    // icon轮换
    transIcon() {
      setInterval(() => {
        this.iconTime++
        if (this.iconTime == 26) {
          this.iconTime = 0
        }
        this.realIcon = require('../assets/meea/' + this.allIcons[this.iconTime])
      }, 10000)
    },
    // 展示订单
    orderShow() {
      this.$bus.$emit('orderShow', this.orders)
    },
    // 展示所有订单
    orderAllShow() {
      this.$bus.$emit('allOrderShow', this.orders)
    },
    // 搜索食物
    searchFood() {
      this.isSearch = !this.isSearch
      this.searchContent = ''
      this.$bus.$emit('leftButtonOneClick')
    },
    refresh() {
      location.reload()
    },
    // 返回admin
    admin() {
      this.$bus.$emit('adminShow')
    },
    scoller() {
      this.$bus.$emit('scollLinstener')
    },
    // 初始时获得所有食物信息
    getAllFoods() {
      this.$axios.post('/api/selectAllFoods').then(
        (response) => {
          this.allFoods = response.data
          this.saveAllFoods = response.data
          for (let index = 0; index < response.data.length; index++) {
            var sameType = false
            const element = response.data[index]
            for (let j = 0; j < this.foodTpye.length; j++) {
              if (element.foodType == this.foodTpye[j]) {
                sameType = true
              }
            }
            if (!sameType) {
              this.foodTpye.push(element.foodType)
            }
          }
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
    searchIt() {
      this.allFoods = []
      this.$axios.post('/api/selectFoodsByName', { foodName: this.searchContent }).then(
        (response) => {
          this.allFoods = response.data
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
    // 每30s查看订单一次
    everyTimeCheck() {
      this.$axios.post('/api/selectFoodOrdersById', { orderId: this.orders.orderId }).then(
        (response) => {
          if (response.data.length != 0) {
            var three = response.data[0]
            if (three.orderContent != '' || three.orderContent == undefined) {
              var newContent = JSON.parse(three.orderContent)
              this.$bus.$emit('contentUpdate', newContent)
            }
            if (this.statusTotal != three.orderStatus) {
              this.$message({
                message: '您的订单状态有更新.',
                type: 'success',
              })
            }
            this.statusTotal = three.orderStatus
            if (this.statusTotal != '') {
              this.$bus.$emit('orderStatus1', this.statusTotal)
            }
            if (three.orderStatus == '已完成') {
              this.$message({
                message: '您的订单已完成,5s后将离开本页面.',
                type: 'success',
              })
              setTimeout(() => {
                location.reload()
              }, 5000)
            }
            if (this.statusTotal == '烹饪中') {
              this.isCooking = true
            }
          }
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
  },
  mounted() {
    this.transIcon()
    this.getUniqueCode()
    // 闪一下
    this.$bus.$on('orderShake', (data) => {
      if (data == 'green') {
        this.$refs.hasOrder.style.backgroundColor = 'springgreen'
      } else {
        this.$refs.hasOrder.style.backgroundColor = 'red'
      }
      setTimeout(() => {
        this.$refs.hasOrder.style.backgroundColor = '#303133'
      }, 330)
    })
    // 根据分类展示菜肴
    this.$bus.$on('foodsByType', (data) => {
      if (data == '所有菜肴') {
        this.allFoods = this.saveAllFoods
      } else {
        this.allFoods = []
        for (let index = 0; index < this.saveAllFoods.length; index++) {
          const element = this.saveAllFoods[index]
          if (element.foodType == data) {
            this.allFoods.push(element)
          }
        }
      }
    })
    this.$bus.$on('orderStatus', (data) => {
      this.statusTotal = data
    })
    this.$bus.$on('updateSmallOrder', (id, num, times, price, mode) => {
      var flag = false
      if (num != 0) {
        for (let i = 0; i < this.ids.length; i++) {
          const e = this.ids[i]
          if (id == e) {
            flag = true
          }
        }
        // 有这个食物
        //     foodsTotal timesTotal priceTotal
        if (flag) {
          // 加法
          if (mode == 'inc') {
            this.timesTotal += times
            this.priceTotal += price
          } else {
            this.timesTotal -= times
            this.priceTotal -= price
          }
        }
        // 无这个食物
        else {
          this.ids.push(id)
          this.foodsTotal++
          this.timesTotal += times
          this.priceTotal += price
        }
      } else {
        this.foodsTotal--
        this.timesTotal -= times
        this.priceTotal -= price
      }
      // this.foodProp.foodId,this.orderNum,this.foodProp.foodMadeTimes,this.foodProp.foodPrice
    })

    // 元素滚动
    this.$refs.foodRight.addEventListener('scroll', this.scoller, true)
    window.addEventListener('scroll', this.scoller, true)
  },
  destroyed() {
    this.$refs.foodRight.removeEventListener('scroll', this.scoller, true)
    window.removeEventListener('scroll', this.scoller, true)
  },
  created() {
    // 每30s查看订单一次
    this.settimeIn = setInterval(() => {
      this.everyTimeCheck()
    }, 30000)

    // 获得屏幕长
    setTimeout(() => {
      this.$refs.fooder.style.height = window.screen.height - 90 + 'px'
      this.$refs.foodLeft.style.height = window.screen.height - 90 + 'px'
      this.$refs.foodRight.style.height = window.screen.height - 90 + 'px'
    }, 500)
    // 初始化内容
    setTimeout(() => {
      this.getAllFoods()
    }, 500)
    // 获得订单信息
    setTimeout(() => {
      var foods = 0
      var times = 0
      var price = 0
      this.$axios.post('/api/selectFoodOrdersById', { orderId: this.orders.orderId }).then(
        (response) => {
          if (response.data.length != 0) {
            this.statusTotal = response.data[0].orderStatus
            if (this.statusTotal == '烹饪中') {
              this.isCooking = true
            }
          }
        },
        (error) => {
          console.log(error.message)
        }
      )
      for (let i = 0; i < this.orders.orderContent.length; i++) {
        const el = this.orders.orderContent[i]
        if (el.orderFoodNums != 0) {
          this.ids.push(el.orderFoodId)
          foods++
          times += el.orderFoodMadeTimes
          price += el.orderFoodPrice * el.orderFoodNums
        }
      }
      this.foodsTotal = foods
      this.timesTotal = times
      this.priceTotal = price
    }, 2000)
  },
}
</script>

<style scoped>
.allBack {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #2b2c34;
  z-index: 10;
}
.presays {
  position: absolute;
  font-size: 2vh;
  bottom: 20px;
  color: aliceblue;
}
.otherBox {
  position: relative;
  background-color: var(--friColor);
  width: 450px;
  height: 100%;
  z-index: 80;
  margin-left: 700px;
  transition: 0.55s;
  font-size: 1.2vh;
  overflow: auto;
  overflow-x: hidden;
  text-align: center;
  font-weight: bolder;
  color: rgb(0, 145, 255);
}
.detail {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.55);
}
.detailBox {
  position: relative;
  width: 95%;
  left: 2.5%;
  top: 7.5%;
  height: 85%;
  background-color: #303133;
  border-radius: 15px;
}
.detailimgs {
  position: relative;
  background-color: rgba(255, 255, 255, 0.33);
  height: 250px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  border-radius: 15px;
}
.detailimgs img {
  position: relative;
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}
.introduces {
  position: relative;
  width: 100%;
  border-radius: 15px;
  top: -30px;
  font-size: 1.6vh;
  color: aliceblue;
  height: 400px;
  background-color: #303133;
}
.detailTitle {
  position: relative;
  font-size: 2vh;
  color: aliceblue;
  width: 100%;
  padding: 15px;
  background-color: #303133;
  border-radius: 15px;
}
.admin {
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  font-size: 1.6vh;
  color: white;
  /* bottom: 20%; */
  top: 25%;
  left: 1.5%;
  transition: 0.33s;
}
.more {
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

.topper {
  position: relative;
  width: auto;
  top: -50px;
  height: 250px;
}
.topper img {
  position: relative;
  width: 100%;
  height: auto;
}
.intro {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 3;
  border-radius: 20px 20px 0 0;
  background-color: var(--friColor);
  top: -50px;
}
.title {
  position: relative;
  top: -20px;
  font-size: 2.5vh;
  font-weight: 500;
  letter-spacing: 1px;
}
.head {
  position: relative;
  width: 100px;
  margin: auto;
  top: -35px;
  height: 100px;
  border: 2px solid pink;
  border-radius: 20px;
}
/* 虚线 */
.xux {
  position: relative;
  top: -5px;
  width: 100%;
  height: 2px;
  border-top: 5px dotted rgba(73, 37, 80, 0.237);
}
.says {
  position: relative;
  width: 100%;
  height: auto;
  font-size: 1.6vh;
  font-weight: 100;
  color: #2b2c34;
}
.yellow {
  color: #f25f4c;
}

.head img {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 20px;
}
.tagdiv {
  position: relative;
  width: 90%;
  left: 5%;
  height: auto;
  overflow: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-flow: row wrap;
}
.sp {
  position: relative;
  height: 30px;
  width: 90%;
}
.tags {
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
.sail {
  position: relative;
  font-weight: 100;
  color: #2b2c34;
  width: 100%;
  font-size: 1.6vh;
  height: auto;
  padding-left: 20px;
  padding-top: 0;
  text-align: left;
}
.sail span {
  margin-right: 10px;
}
.pictrans {
  position: relative;
  width: 98%;
  margin-bottom: 5px;
  height: 200px;
  left: 1%;
  z-index: 4;
  border-radius: 10px;
}
.ppiicc {
  position: relative;
  box-shadow: #2b2c34 0 0 8px;
}
.elimage {
  border-radius: 10px;
}
.empty {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 40px;
  display: flex;
  flex-flow: row-reverse nowrap;
  background-color: khaki;
}
.butes {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 35%;
  margin-right: 2%;
  height: 80%;
  top: 10%;
  background-color: #303133;
  border-radius: 20px;
}
.empty-buts {
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 10px;
  /* margin-top: 8px; */
  margin-left: 25px;
  background-color: #303133;
  color: #f2f6fc;
  font-size: 2.3vh;
  font-weight: bolder;
  text-align: center;
  transition: 0.33s;
}
.empty-buts:active {
  background-color: royalblue;
  color: khaki;
}
.buttedbuts {
  background-color: royalblue;
  color: khaki;
}
.input {
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
  color: #f2f6fc;
  font-size: 1.6vh;
  transition: 0.55s;
}
.inputShow {
  width: 200px;
}

.fooder {
  position: relative;
  width: 100%;
  overflow-y: auto;
  display: flex;
  overflow-x: hidden;
  flex-flow: row nowrap;
  z-index: 2;
}
.food-left {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 2;
  border-radius: 10px 10px 0 0;
  background-color: rgb(206, 198, 100);
}

.food-right {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 8;
}
.hasOrder {
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
.trans {
  position: absolute;
  width: 10px;
  height: 100%;
  border-radius: 10px;
  background-color: khaki;
  transition: 0.55s;
}
.hasOrder:hover .trans {
  width: 100%;
  border: 1px solid #303133;
}
.hasOrder:hover .orderInfo {
  color: #303133;
}
.meatsIcon {
  position: relative;
  width: auto;
  height: 100%;
  animation: round 10s linear infinite both;
}
.meatsIconimg {
  position: relative;
  width: auto;
  height: 100%;
  filter: blur(100px);
  transition: 1s;
  animation: jello-horizontal 2.7s infinite both;
}
.meatsIconblur {
  position: relative;
  width: auto;
  height: 100%;
  filter: blur(0);
  transition: 1s;
  animation: jello-horizontal 2.7s infinite both;
}
.orderInfo {
  position: relative;
  width: 45%;
  height: 100%;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  transition: 0.55s;
}
.fakeRed {
  position: absolute;
  left: 0;
  opacity: 1;
  width: 15px;
  z-index: 10;
  height: 15px;
  border-radius: 50%;
  background-color: #f56c6c;
  transition: 0.8s;
}
.fakeGreen {
  position: absolute;
  right: 0;
  opacity: 1;
  z-index: 10;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #67c23a;
  transition: 0.8s;
}

@keyframes round2 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  33.3% {
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
  66.6% {
    transform: scale3d(1, 1, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes round {
  0% {
    transform: rotateY(0) scale(0);
  }
  5% {
    transform: rotateY(5deg) scale(1);
  }
  90% {
    transform: rotateY(45deg) scale(1);
  }
  95% {
    transform: rotateY(45deg) scale(0);
  }
  100% {
    transform: rotateY(0) scale(0);
  }
}

@media only screen and (orientation: portrait) {
  .otherBox {
    position: absolute;
    background-color: var(--friColor);
    width: 100%;
    height: 100%;
    z-index: 80;
    margin-left: 0;
    overflow-x: hidden;
    transition: 0.55s;
    font-size: 1.2vh;
    overflow-y: auto;
    text-align: center;
    font-weight: bolder;
    color: rgb(0, 145, 255);
  }
  .presays {
    position: absolute;
    font-size: 5vh;
    display: none;
  }
}
</style>
