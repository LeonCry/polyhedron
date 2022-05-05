// 聊天组件
<template>
<!-- 聊天盒子 -->
  <div class="chatbox">
      <!-- 抬头 -->
      <div class="toper">
          <!-- 名字 -->
          <span>你的名字</span>
          <!-- 退出按钮 -->
          <div>
              <img src="../assets/exit.svg" alt="退出">
          </div>
      </div>
      <!-- 内容 -->
      <div class="content">
          <!-- 左侧聊天栏 -->
          <div class="chatter">

          </div>
          <!-- 右侧更多栏 -->
          <div class="morer">

          </div>
      </div>
      <!-- 输入栏 -->
      <div class="inputbox">
          <!-- 表情栏 -->
          <div class="expression">
              <!-- 表情图标 -->
              <div>
                  <img src="../assets/exsmile.svg" alt="表情">
                  <img src="../assets/picture.svg" alt="图片">
                  <img src="../assets/video.svg" alt="字体">
                  <img src="../assets/wind.svg" alt="吹一吹">
              </div>
              <!-- 收起侧边栏 -->
              <div>
                  <img src="../assets/nrror.svg" alt="收起">
              </div>
          </div>
          <!-- 键入文字栏 -->
          <div class="typetext">

          </div>

      </div>

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chats",
};
</script>

<style scoped>
/* 聊天界面box */
.chatbox{
    position:absolute;
    width: 1000px;
    height: 650px;
    top: 12%;
    left: 25%;
    z-index: 5;
    background-color: #1A191B;
    border-radius: 15px;
    box-shadow: 0 0 25px 5px black;
    transition: 0.55s;
    display: flex;
    flex-flow: column nowrap;
    font-size: 2vh;
    color: white;
}
.chatbox:hover{
    border-radius: 25px;
    box-shadow: 0 0 30px 10px black;
}
/* 抬头 */
.toper{
    position: relative;
        width: 1000px;
        height: 55px;
        border-radius: 25px 25px 0 0;
        display: flex;
        flex-flow: row nowrap;
        background-color: rgba(47, 53, 66,0.25);
}   
/* 用户名字 */
.toper > span{
    line-height: 55px;
    flex: 1;
    text-align: center;
}
/* 退出按钮 */
.toper > div{
    position: absolute;
    right:0;
    padding-right: 20px;
    line-height: 65px;
}
.toper > div > img{
    transition: 0.8s;
}
.toper > div > img:hover{
    transform: rotateZ(720deg) scale(1.33);
    cursor: pointer;
}

/* 中间聊天框+选项框 */
.content{
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 465px;
}
/* 左边聊天框 */
.chatter{
    position: relative;
    height: 100%;
    flex: 10;
}



/* 右边选项框 */
.morer{
    position: relative;
    height: 100%;
    flex: 0;
    background-color: aqua;
    opacity: 0;
}
/* 表情栏 */
.expression{
    position: relative;
    width: 100%;
    height: 35px;
    display: flex;
    flex-flow: row nowrap;
}
/* 表情svg栏 */
.expression > div{
    position: relative;
    flex: 15;
    line-height: 10px;
}
.expression > div img{
    position: relative;
    margin-left: 20px;
    margin-right: 10px;
    transition: 0.55s;
    cursor: pointer;
}
.expression > div img:hover{
    transform: translateY(-5.55px);
}
/* 侧边栏按钮 */
.expression > div:nth-child(2){
    position: relative;
    flex: 1;
}
.expression > div:nth-child(2) img{
    position: relative;
    transition: 0.55s;
    right: 0;
     cursor: pointer;
}
.expression > div:nth-child(2) img:hover{
    transform: rotateZ(900deg) scale(1.25);
}



/* 输入框 */
.typetext{
    position: relative;
    width: 100%;
    height: 95px;
    border-radius: 0 0 15px 15px;
    background-color: rgba(47, 53, 66,0.25);
}






</style>