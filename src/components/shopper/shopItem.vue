<template>
  <div class="sopItemBox">
        <div class="imgs">
            <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h4dhhzmwabj20ed0eyjrt.jpg" alt="商品图片">
        </div>
        <div class="info">
            <br>
            <span style="font-size:1.7vh;text-align:center">印有LOGO的T恤</span>
            <span >印有POLYHEDRON字样的T恤</span>
            <span style="font-size:2vh;color:orangered;text-decoration: line-through;text-align:left;">&nbsp P9999
                <span style="font-size:2vh;color:orangered;position: absolute;text-align:left;" >&nbsp P999.9</span></span>
            <span style="text-align:center;">限购:1件 / 剩余:12件</span>
            <span style="font-size:1.5vh;text-align:center;">限时优惠中..</span>
            <button @click="routerTo('shopDetail')" class="butt1"><i class="el-icon-s-goods"></i> 查看详情</button>
            
        </div>
  </div>
</template>

<script>
export default {
name:'shopItem',

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