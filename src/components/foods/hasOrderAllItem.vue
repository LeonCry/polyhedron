<template>
  <div class="hasOrderItem" @click="showDetail">
 <div class="dimgs">
            <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h57vi4iyrjj21hc0u0acn.jpg" alt="">
  </div>
  <div class="intro">
    <div>
    <span>订单:2022-12-5 13:54:55</span>
    <br>
    <span style="color:darkgray">用餐人数: 2人</span>
    <br>
    <span style="color:darkgray">点单菜肴: 2份</span>
    </div>
    <div>
        <br><span style="color: salmon;font-size:1.4vh;"><i class="el-icon-lollipop"></i>x15</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:'hasOrderAllItem',


methods:{
    // 展示订单详情
    showDetail(){
        this.$bus.$emit('orderShow');
    },
}
}
</script>

<style scoped>
.hasOrderItem{
  position: relative;
  width: 95%;
  left: 2.5%;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #303133;
  display: flex;
  flex-flow: row nowrap;
  border-radius: 15px;
  transition: 0.33s;
}
.hasOrderItem:hover{
    background-color: rgb(64, 192, 120,0.33);
}
.dimgs{
    position: relative;
    height: 50px;
    width: 50px;
    padding: 10px;
    border-radius: 10px;
}
.dimgs img{
    position: relative;
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
}
.intro{
    position: relative;
    width: 80%;
    overflow: auto;
    height: 100%;
    padding: 10px;
    font-size: 1.4vh;
    color: aliceblue;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
</style>