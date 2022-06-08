// 聊天右侧更多/选项栏
<template>
  <div class="morerbox">
      <!-- 搜索框 -->
      <transition name="tranT0">
      <!-- 他的空间 -->
      <div v-show="itemIsShow" @click="searchChats">
          <img src="../assets/search.svg" alt="搜索">
          <span >搜索聊天记录</span>
      </div>
      </transition>
      <transition name="tranT1">
      <!-- 他的空间 -->
      <div v-show="itemIsShow" @click="enterSpace">
          <img src="../assets/space.svg" alt="空间">
          <span>TA的空间</span>
      </div>
      </transition>
      <transition name="tranT2">
      <!-- 送她礼物 -->
      <div v-show="itemIsShow" @click="changeRename">
          <img src="../assets/rewrite.svg" alt="备注">
          <span>更改备注</span>
      </div>
       </transition>
      <transition name="tranT3">
      <!-- 他的角色 -->
      <div v-show="itemIsShow" @click="gameShow">
          <img src="../assets/home.svg" alt="home">
          <span>TA的避难所</span>
      </div>
       </transition>
      <transition name="tranT4">
      <!-- 删除好友 -->
      <div v-show="itemIsShow" class="deletefriend" @click="deletefriend">
          <img src="../assets/delete.svg" alt="删除">
          <span>删除好友</span>
      </div>
      </transition>
      <!-- 占位 -->
            <div class="empty">

            </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'morer',
    data(){
        return{
            itemIsShow:false,
            friend:'',
        }
    },
    computed:{
        ...mapState('userInfo',['user']),
    },
    methods:{
        // 进入空间
        enterSpace(){
            this.$bus.$emit('enterSpaceFromMorer',this.friend);
        },
        // 更改备注
        changeRename(){
            this.$bus.$emit('WhereTips',{friend:this.friend});
        },
        // 进入游戏
        gameShow(){
            this.$bus.$emit('chatNotice',false,"[避难所]正在开发中...");
        },
        deletefriend(){
            this.$bus.$emit('delTips',{friend:this.friend});
        },
        searchChats(){
            this.$bus.$emit('searchShowToChat');
            this.$bus.$emit('showSearchChats',this.friend);
        }

    },
    mounted(){
        //接收chats组件数据,控制每个item的显示
        this.$bus.$on('itemisshow',(data1)=>{
            this.itemIsShow = data1;
        })
        // 接收chat组件的数据,接收friend数据
        this.$bus.$on('friendToMorer',(data)=>{
            this.friend = data;
        });
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
    font-size: 1.65vh;
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
.morerbox div:nth-of-type(1):hover{
    background-color: seagreen;
    border-radius: 25px;
}
.morerbox div:nth-of-type(2):hover{
    background-color: pink;
    border-radius: 25px;
}
.morerbox div:nth-of-type(3):hover{
    background-color: rebeccapurple;
    border-radius: 25px;
}
.morerbox div:nth-of-type(4):hover{
    background-color: rgba(24, 181, 238, 0.66);
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
.empty{
    position: absolute;
    width: 100px;
    height: 50px;
}
/* 删除好友 */
.deletefriend:hover{
background-color: brown !important;
border-radius: 25px;
animation: vibrate-3 0.5s linear infinite both;

}
/* 每个item出现动画 */
.tranT0-enter-active{
    animation: slide-in-blurred-bottom 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tranT1-enter-active{
    animation: slide-in-blurred-bottom 0.9s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tranT2-enter-active{
    animation: slide-in-blurred-bottom 1.3s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tranT3-enter-active{
    animation: slide-in-blurred-bottom 1.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.tranT4-enter-active{
    animation: slide-in-blurred-bottom 1.8s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
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
@keyframes vibrate-3 {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  10% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  20% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  30% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  50% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  70% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  80% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  90% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
}

</style>