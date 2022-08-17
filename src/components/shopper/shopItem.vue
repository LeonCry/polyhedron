<template>
  <div class="sopItemBox">
        <div class="imgs">
            <img :src="shop.picSrc1" alt="商品图片">
        </div>
        <div class="info">
            <br>
            <span style="font-size:1.7vh;text-align:center">{{shop.shopName}}</span>
            <span >{{shopIntr}}</span>
            <span style="font-size:2vh;color:orangered;text-decoration: line-through;text-align:center;">P{{shop.shopPrice}}</span>
            <span v-if="shop.shopPrice!=shop.discountPrice" style="font-size:2vh;color:orangered;text-align:center;" >P{{shop.discountPrice}}</span>
            <span style="text-align:center;">限购:{{shop.buyLimit}}件 / 剩余:{{shop.shopNums}}件</span>
            <span style="font-size:1.5vh;text-align:center;">{{shop.discountInfo}}</span>
            <button @click="routerTo('shopDetail')" class="butt1"><i class="el-icon-s-goods"></i> 查看详情</button>
            
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'shopItem',
props:['shopProp'],
computed:{
    ...mapState('userInfo',['user']),
},
data() {
    return {
        shop:this.shopProp,
        shopIntr:'',
    }
},

methods:{
    routerTo(rout){
        this.$router.push({
            name:rout,
            query:{
                shop:this.shopProp,
                browseUser:this.user.userQQ,
            }
        });
        this.$bus.$emit('changeTitle','商品详情');
        let _thisShopId = this.shop.shopId;
        // 添加浏览明细-先查询是否有该商品的浏览历史
        this.$axios.post('/api/returnBrowseHistoryByName',{browseUser:this.user.userQQ}).then(response=>{
            if(response.data.length==0){
                // 则添加浏览历史
                var data = {browseUser:this.user.userQQ,browseShop:this.shop.shopName,browseShopId:this.shop.shopId,browseNums:1,browseTimes:Date.now()};
                // eslint-disable-next-line no-unused-vars
                this.$axios.post('/api/addABrowseHistory',data).then(response=>{
                },error=>{
                    console.log(error.message);
                });
            }
            else{
                var hasUpdate = false;
                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i];
                    if(element.shopping.shopId==_thisShopId){
                        // 则更新时间和浏览次数
                        var data2 = {browseId:element.browseId,browseNums:element.browseNums+1,browseTimes:Date.now()};
                        // eslint-disable-next-line no-unused-vars
                        this.$axios.post('/api/updateABrowseHistory',data2).then(response=>{
                        },error=>{
                        console.log(error.message);
                        });
                        hasUpdate = true;
                        break;
                    }
                }
                if(!hasUpdate){
                    // 则添加浏览历史
                        var data3 = {browseUser:this.user.userQQ,browseShop:this.shop.shopName,browseShopId:this.shop.shopId,browseNums:1,browseTimes:Date.now()};
                        // eslint-disable-next-line no-unused-vars
                        this.$axios.post('/api/addABrowseHistory',data3).then(response=>{
                        },error=>{
                                console.log(error.message);
                        });
                }
            }
        },error=>{
            console.log(error.message);
        });
},
},

created(){
    if(this.shopProp.shopIntro.length>20){
        this.shopIntr = this.shopProp.shopIntro.slice(0,20) + '...';
    }
    else{
        this.shopIntr = this.shopProp.shopIntro;
    }
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
@media only screen and (orientation: portrait) {
    .sopItemBox{
    position: relative;
    width: 90%;
    left: 4%;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 100px;
    height: auto;
    display: flex;
    flex-flow: column nowrap;
    transition: 0.25s;
    border-radius: 20px;
    border: 2px solid black;
    box-shadow:none;
}
.sopItemBox:hover{
    border: 2px solid purple;
      box-shadow: none;
}
.sopItemBox:hover div:nth-of-type(2) span{
    font-weight: 350;
}

.imgs{
    position: relative;
    width: 70%;
    left: 12%;
    margin-top: 10px;
    height: auto;
    flex: 14;
}
.imgs > img{
  position: relative;
    width: 100%;
    height: auto;
  padding-top: 0;
  border-radius: 20px;
  border: 2px solid seagreen;
}


.info{
    position: relative;

    width: 100%;
    height: 100%;
    flex: 100;
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
    flex: 2;
}


.butt1{
position: relative;
  font-weight: 350;
  position: relative;
  padding: 10px;
  width: 150px;
  left: 100px;
  border: 1px dashed black;
  margin-top: 10px;
  background-color: white;
  right: 0;
  letter-spacing: 2px;
  color: black;
  font-size: 1.8vh;
  transition: 0.55s;
  border-radius: 60px;
  box-shadow: none;
  margin-bottom: 10px;
}
.butt1:hover {
  padding: 10px;
  letter-spacing: 5px;
  left: 100px;
  right: 0;
  cursor: pointer;
  box-shadow: none;
}
}

</style>