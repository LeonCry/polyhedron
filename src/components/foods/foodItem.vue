<template>
  <div class="foodItem">
    <div class="imgs">
        <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h5aacw5zaaj20ia0ia75q.jpg" alt="">
    </div>
    <div class="intro">
        <span style="font-size:2vh;">整鸡蛋糕儿整鸡蛋糕儿整鸡蛋糕儿</span>
        <br>
        <div class="tagdiv">
        <span class="tags">1人份</span>
        <span class="tags">土豆</span>
        <span class="tags">鸡蛋</span>
        <span class="tags">牛奶</span>
        <span class="tags">洋葱</span>
        <span class="tags">可乐</span>
        <span class="tags">花生</span>
        <span class="tags">. . .</span>
        </div>
        <span>已做: 3次</span>
        <br>
        <div class="cost">
             <span><i class="el-icon-lollipop"></i> X 15 </span>
             <div class="buyButs">
                <button class="but-des"> - </button>
                <span class="buy-num"> 2 </span>
                <button class="but-inc"> + </button>
             </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
name:'foodItem',
}
</script>

<style scoped>
.foodItem{
    position: relative;
    width: 97%;
    height: 150px;
    left: 2%;
    margin-top: 10px;
    margin-bottom: 20px;
    padding-left: 3px;
    background-color: var(--friColor);
    display: flex;
    flex-flow: row nowrap;
    color: #2b2c34;
    transition: 0.33s;
    border-radius: 10px;
}
.foodItem:hover{
    background-color: var(--secColor);
    color: white;
}
.imgs{
    position: relative;
    height: 120px;
    margin-top: 8px;
    width: auto;
    padding-left: 4px;
    border-radius: 10px;
}
.imgs img{
    position: relative;
    width: auto;
    height: 100%;
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
  height: auto;
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
    color:tomato;
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

</style>