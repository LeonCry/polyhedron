// 写动态组件
<template>
  <div class="writespacebox">
      <!-- 写的内容 -->
      <div contenteditable></div>
      <!-- 表情图片 -->
      <div>
          <img src="../assets/exsmile.svg" alt="表情">
          <img src="../assets/picture.svg" alt="图片">
      </div>
      <br>
      <button>发表</button>
       <img v-show="isLoading" class="loading" src="../assets/loading.svg" alt="加载">
      <br>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'writespace',
    data(){
        return{
            // 是否加载
            isLoading:false,
        }
    }
}
</script>

<style scoped>
.writespacebox{
    position: relative;
    width: 100%;
    height: 420px;
    margin-top: 25px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-bottom: 2px solid rgba(47, 53, 66,0.5);
}
/* 写动态div */
.writespacebox > div{
    position: relative;
    width: 80%;
    height: 90px;
    padding: 20px;
    border-radius: 15px 15px 0 0;
    transition: 0.55s;
    background-color: rgba(47, 53, 66,0.25);
    overflow-y: auto;
    outline: 0;
}
.writespacebox > div:focus{
   outline: 0.5px solid rgba(0, 0, 0, 0);
}
/* 表情栏 */
.writespacebox div:nth-child(2){
    height: 10px;
    transition: 0.55s;
    padding-top: 0;
    overflow-y: hidden;
    border-radius: 0 0 15px 15px;
    background-color: rgba(47, 53, 66,0.25);
}
.writespacebox div:nth-child(2) img{
    margin-right: 20px;
    cursor: pointer;
}
/* 发表按钮 */
button {
  position: relative;
  align-self: center;
  width: 100px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: pink;
  font-size: 1.8vh;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
}
button:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}
/* loading */
.loading{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>