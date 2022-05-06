// 聊天右侧更多/选项栏
<template>
  <div class="morerbox">
      <!-- 搜索框 -->
      <div>
          <input type="text" name="" id="" placeholder="搜索聊天记录">
      </div>
      <transition name="tranT1">
      <!-- 他的空间 -->
      <div v-show="itemIsShow">
          <img src="../assets/space.svg" alt="空间">
          <span>TA的空间</span>
      </div>
      </transition>
      <transition name="tranT2">
      <!-- 送她礼物 -->
      <div v-show="itemIsShow">
          <img src="../assets/rewrite.svg" alt="备注">
          <span>更改备注</span>
      </div>
       </transition>
      <transition name="tranT3">
      <!-- 他的角色 -->
      <div v-show="itemIsShow">
          <img src="../assets/home.svg" alt="home">
          <span>TA的避居所</span>
      </div>
       </transition>
      <transition name="tranT4">
      <!-- 删除好友 -->
      <div v-show="itemIsShow" class="deletefriend">
          <img src="../assets/delete.svg" alt="删除">
          <span>删除好友</span>
      </div>
      </transition>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'morer',
    data(){
        return{
            itemIsShow:false
        }
    },
    mounted(){
        //接收chats组件数据,控制每个item的显示
        this.$bus.$on('itemisshow',(data1)=>{
            this.itemIsShow = data1;
        })
    },
    beforeDestroy(){
        this.$bus.$off('itemisshow');
    }
}
</script>

<style scoped>
.morerbox{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
}
.morerbox div{
    width: 100%;
    position: relative;
    display: flex;
    transition: 0.55s;
    flex-flow: row nowrap;
    justify-content: left;
    cursor: pointer;
    align-items: center;
}
.morerbox div:hover{
    background-color: rgba(99, 110, 114,0.25);
    border-radius: 25px;
}

input{
    position: relative;
    width: 80%;
    height: 30px;
    border: 0;
    outline: 0;
    padding-left: 30px;
    transition: 0.55s;
    border-radius: 25px;
    background-color: rgba(99, 110, 114,0.25);
    font-size: 1.5vh;
    color: white;
}
input:focus {
  font-size: 1.8vh;
  color: greenyellow;
}
img{
    transform: translateX(20px);
}
span{
    transform: translateX(35px);
}
/* 删除好友 */
.deletefriend:hover{
background-color: brown !important;
}
/* 每个item出现动画 */
.tranT1-enter-active{
    animation: slide-in-blurred-bottom 0.8s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tranT2-enter-active{
    animation: slide-in-blurred-bottom 1.4s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tranT3-enter-active{
    animation: slide-in-blurred-bottom 2.0s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tranT4-enter-active{
    animation: slide-in-blurred-bottom 2.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}

@keyframes slide-in-blurred-bottom {
  0% {
    -webkit-transform: translateY(500px) scaleY(2.5) scaleX(0.2);
            transform: translateY(500px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}

</style>