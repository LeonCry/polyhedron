<template>
  <div class="sopItemBox">
        <div class="imgs">
            <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h4dhhzmwabj20ed0eyjrt.jpg" alt="商品图片">
            <div class="infos">
                <span>收件人:阿萨德</span>
                <br><br>
                <span>联系方式:15554454068</span>
                <br><br>
                <span>邮寄地址:山东省济宁市嘉祥县马村镇</span>
                <br><br>
                <span>交易时间: <br> 2022.6.3 15:33:21</span>
                <br><br>
                <span>订单编号:65465484213</span>
            </div>
        </div>
        <div class="info">
            <br>
            <span style="font-size:1.7vh;text-align:center">印有LOGO的T恤</span>
            <span >印有POLYHEDRON字样的T恤印有字样的T恤</span>
            <span>购买了 1 件</span>
            <span>商品来源:淘宝</span>
            <span>发货快递:申通</span>
            <span>快递编号: <br>64564654654654654</span>
            <span>购买参数: <br>
            尺码:S 颜色:红色 性别:男 型号:A
             </span>
            <span style="font-size:2vh;color:orangered;position: relative;text-align:left;" >消费: P999.9</span>
            <span style="color:seagreen">交易状态:已收货</span>
            <button @click="routerTo('shopDetail')" class="butt1"><i class="el-icon-s-goods"></i> 商品详情</button>
            
        </div>
  </div>
</template>

<script>
export default {
name:'hasBoughtItem',

methods:{
    routerTo(rout){
        this.$router.push({
            name:rout,
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
    flex: 10;
    display: flex;
    font-size: 1.45vh;
    padding: 15px;
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
  right: 120px;
  border: none;
  margin-bottom: 20px;
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
  letter-spacing: 2px;
  right: 120px;
  cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}

</style>