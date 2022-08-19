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
    <br>
    <span style="color:darkgray">订单状态: 已下单|烹饪中|已完成</span>
    <br>
    <span style="color: salmon;font-size:1.4vh;">本单收入:<i class="el-icon-lollipop"></i>x15</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
name:'foodAdminItem',


methods:{
    // 展示订单详情
    showDetail(){
        this.$bus.$emit('adminOrderShow');
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
    height: 100px;
    width: 100px;
    padding: 10px;
    border-radius: 10px;
}
.dimgs img{
    position: relative;
    width: 100px;
    height: 100px;
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