<template>
  <div class="sopItemBox">
        <div class="imgs">
           <img v-if="orderProp.shopping.picSrc1" :src="orderProp.shopping.picSrc1" alt="商品图片">
            <div class="infos">
                <span>收件人:{{orderProp.receiveName}}</span>
                <br><br>
                <span>联系方式:{{orderProp.receivePhone}}</span>
                <br><br>
                <span>邮寄地址:{{orderProp.receiveAddress}}</span>
                <br><br>
                <span>交易时间: <br> {{new Date(parseInt(orderProp.buyTime)).toLocaleString()}}</span>
                <br><br>
                <span>订单编号:{{'74921531'+orderProp.orderId}}</span>
                <br><br>
                 <button @click="routerTo('shopDetail')" class="butt1"><i class="el-icon-s-goods"></i> 商品详情</button>
            </div>
        </div>
        <div class="info">
            <br>
            <span style="font-size:1.7vh;text-align:center">{{orderProp.buyShopName}} <br><br>
             <span>快递编号:{{orderProp.trainNumber}}</span>
             <br><br>
             <span style="text-align:center;">消费: <a style="font-size:2vh;color:orangered;">P{{orderProp.buyPrice}}</a></span>
              </span>
              <br><br>
            <span style="text-align:left;font-size:1.7vh">物流详情</span>  
            <br><br>
            <div v-if="trainData" class="train"> 
                <span>当前状态:{{trainData.status}}</span>
                <br><br>
                <span v-for="data of trainData.data" :key="data.index">时间:{{data.time}} <br> {{data.context}} <br><br></span>
            </div>

        </div>
  </div>
</template>

<script>
import trainCode from "../../common/trainsCode";
import { mapState } from 'vuex';
export default {
name:'trainItem',
props:['orderProp'],
computed:{
    ...mapState('userInfo',['user']),
},

data(){
    return{
        trainData:{"success":true,"reason":"","data":[{"time":"2015-10-20 18:35:13","context":"\u5df2\u7b7e\u6536,\u7b7e\u6536\u4eba\u662f:\u95e8\u536b\u7b7e\u6536"
	},
	{"time":"2015-10-20 10:20:17","context":"\u56db\u5ddd\u8fbe\u5dde\u5927\u7af9\u516c\u53f8\r\r\u7684\u6d3e\u4ef6\u5458\u718a\u59d0\u6b63\u5728\u6d3e\u4ef6"
	},
	{"time":"2015-10-20 09:40:40","context":"\u5feb\u4ef6\u5df2\u5230\u8fbe\u56db\u5ddd\u8fbe\u5dde\u5927\u7af9\u516c\u53f8"
	},
	{"time":"2015-10-20 03:00:23","context":"\u56db\u5ddd\u5357\u5145\u4e2d\u8f6c\u90e8\r\r\u6b63\u5728\u8fdb\u884c\u88c5\u8f66\u626b\u63cf"
	},
	{"time":"2015-10-20 03:00:23","context":"\u7531\u56db\u5ddd\u5357\u5145\u4e2d\u8f6c\u90e8\r\r\u53d1\u5f80\u56db\u5ddd\u8fbe\u5dde\u5927\u7af9\u516c\u53f8"
	},
	{"time":"2015-10-17 23:49:41", "context":"\u7531\u4e0a\u6d77\u822a\u7a7a\u90e8\r\r\u53d1\u5f80\u56db\u5ddd\u6210\u90fd\u822a\u7a7a\u90e8"
	},
	{"time":"2015-10-17 21:10:16","context":"\u7531\u6c5f\u82cf\u5434\u6c5f\u516c\u53f8\r\r\u53d1\u5f80\u4e0a\u6d77\u822a\u7a7a\u90e8"
	},
	{"time":"2015-10-17 20:57:19","context":"\u7531\u6c5f\u82cf\u5434\u6c5f\u516c\u53f8\r\r\u53d1\u5f80\u4e0a\u6d77\u822a\u7a7a\u90e8"
	},
	{"time":"2015-10-17 20:57:19","context":"\u6c5f\u82cf\u5434\u6c5f\u516c\u53f8\r\r\u6b63\u5728\u8fdb\u884c\u88c5\u888b\u626b\u63cf"
	},
	{"time":"2015-10-17 20:23:17","context":"\u6c5f\u82cf\u5434\u6c5f\u516c\u53f8\r\r\u7684\u6536\u4ef6\u5458\u9ece\u91cc\u7247\u533a\u6dd8\u5b9d\u5df2\u6536\u4ef6"
	}],
	"status":6
      },
    }
},
methods:{
    routerTo(rout){
        this.$router.push({
            name:rout,
            shop:this.orderProp.shopping,
            browseUser:this.user.userQQ,
        });
        this.$bus.$emit('changeTitle','商品详情');

},
},
created(){
    // 查询物流:
    this.$axios.get('/train/openapi.html?id=[]&com='+trainCode.get(this.orderProp.orderTrain)+'&nu='+this.orderProp.trainNumber+'&show=0&muti=0&order=desc').then(response=>{
        this.trainData = response.data;
                switch(response.data.status){
          case (0):
            this.trainData.status = "物流单号暂无结果";
            break;
          case (3):
            this.trainData.status = "正在运输..";
            break;
          case (4):
            this.trainData.status = "揽件";
            break;
          case (5):
            this.trainData.status = "快递邮寄过程中出现问题";
            break;
          case (6):
            this.trainData.status = "收件人已签收";
            this.$axios.post('/api/updateAShopOrder',{orderId:this.orderProp.orderId,orderStatus:'收件人已签收'}).then(response=>{
                console.log(response.data);
            },error=>{
                console.log(error.message);
            });
            break;
          case (7):
            this.trainData.status = "退签";
            break;
          case (8):
            this.trainData.status = "派件";
            break;
          case (9):
            this.trainData.status = "退回";
            break;
        }
    },error=>{
        console.log(error.message);
    });

}
}
</script>

<style scoped>
.sopItemBox{
    position: relative;
    width: 670px;
    margin: 10px;
    height: 640px;
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
.sopItemBox:hover span{
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
.infos{
    font-size: 1.6vh;
    font-weight: 300;
    border-top: 1px dotted black;
    padding: 10px;
    position: relative;
    width: 80%;
    margin-left: 5%;
    height: 210px;
}



.info{
    position: relative;
    height: 100%;
    flex: 20;
    font-size: 1.45vh;
    text-align: center;
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
.train{
    position: relative;
    width: 90%;
    overflow-y:auto;
    border-top: 1px dotted black;
    height: 430px;
    font-size: 1.45vh;
    padding: 10px;
}


.butt1{
  font-weight: 350;
  position: relative;
  padding: 15px 28px;
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
  cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}

</style>