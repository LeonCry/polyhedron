<template>
  <div class="sopItemBox">
        <div class="imgs">
            <img v-if="browse.shopping.picSrc1" :src="browse.shopping.picSrc1" alt="商品图片">
        </div>
        <div class="info">
            <br>
            <span style="font-size:1.7vh;text-align:center">{{browse.shopping.shopName}}</span>
            <span style="text-align:center" >浏览次数:{{browse.browseNums}}</span>
            <span style="font-size:2vh;color:orangered;text-decoration: line-through;text-align:center;">P{{browse.shopping.shopPrice}}</span>
            <span style="font-size:2vh;color:orangered;text-align:center;" >P{{browse.shopping.discountPrice}}</span>
            <span style="text-align:center;font-weight:500;color:black;font-size:1.8vh">浏览时间:</span>
            <span style="font-size:1.5vh;text-align:center;font-weight:500;color:black">{{times[0]}} <br> {{times[1]}}</span>
            <button @click="routerTo('shopDetail')" class="butt1"><i class="el-icon-s-goods"></i> 查看详情</button>
            
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'historyItem',
props:['browseProp'],
computed:{
    ...mapState('userInfo',['user']),
},
data(){
    return{
        browse:this.browseProp,
        times:new Date(parseInt(this.browseProp.browseTimes)).toLocaleString().split(' '),
    }
},
methods:{
    routerTo(rout){
        this.$router.push({
            name:rout,
            query:{
                shop:this.browse.shopping,
                browseUser:this.user.userQQ,
            }
        });
        this.$bus.$emit('changeTitle','商品详情');

},
}
}
</script>

<style scoped>
.sopItemBox{
    position: relative;
    width: 435px;
    margin: 10px;
    height: 310px;
    display: flex;
    flex-flow: row nowrap;
    transition: 0.25s;
    border-radius: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
.sopItemBox:hover{
    border: 2px solid rgba(0, 0, 0, 0.5);
      box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}
.sopItemBox:hover div:nth-of-type(2) span{
    font-weight: 350;
}


.imgs{
    position: relative;
    height: 100%;
    flex: 14;
}
.imgs > img{
  position: relative;
  width: 250px;
  height: 300px;
  padding-top: 5px;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 1);
}


.info{
    position: relative;
    height: 100%;
    flex: 10;
    display: flex;
    font-size: 1.45vh;
    flex-flow: column nowrap;
    align-items: left;
    justify-content: space-around;
}
.info span{
    position: relative;
    font-weight:300;
    flex: 10;
    width: 100%;
}
.info button{
    position: relative;
    flex: 4;
}


.butt1{
  font-weight: 350;
  position: relative;
  padding: 15px 28px;
  right: 3px;
  border: none;
  letter-spacing: 2px;
  color: black;
  font-size: 1.8vh;
  transition: 0.55s;
  border-radius: 60px;
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
}
.butt1:hover {
  padding: 15px 28px;
  letter-spacing: 5px;
  right: 3px;
  cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}

</style>