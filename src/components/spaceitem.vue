// 单个动态组件
<template>
  <div v-if="space" class="spaceitembox">
    <!-- 头像网名 -->
    <div class="myhead">
      <img :src="require('../assets/Heads/'+space.user.userHead)" alt="头像"/>
      <!-- 网名和发表时间 -->
      <div class="usernametime">
        <span>{{space.user.userName}}</span>
        <span>{{new Date(parseInt(space.publishTime))
                .toLocaleString()
                .slice(5)}}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
        {{space.spaceContent}}
    </div>
<!-- 点赞收藏等操作 -->
    <div class="operation">
        <transition-group name="operationT">
        <img key="1" v-show="!isCollection" src="../assets/space.svg" alt="收藏" @click="collection" style="position: absolute;left:49%">
        <img key="2" v-show="isCollection" src="../assets/spaceactive.svg" alt="收藏active" @click="collection" style="position: absolute;left:49%">
        <img key="3" v-show="!isLike" src="../assets/good.svg" alt="点赞" @click="likes" style="position: absolute;left:61%">
        <img key="4" v-show="isLike" src="../assets/goodactive.svg" alt="点赞active" @click="likes" style="position: absolute;left:61%">
        <img key="5" v-show="!isNoLike" src="../assets/notgood.svg" alt="点踩" @click="noLikes" style="position: absolute;left:72%">
        <img key="6" v-show="isNoLike" src="../assets/notgoodactive.svg" alt="点踩active" @click="noLikes" style="position: absolute;left:72%">
        <img key="7" src="../assets/share.svg" alt="分享" @click="shares">
        </transition-group>
    </div>

    <!-- 谁谁谁觉得很赞 -->
    <span class="whothinkgood">
      <span>2人觉得很赞</span>
      <span>2人分享了动态</span>
      <span>2人收藏了动态</span>
      </span>

    <!-- 写评论功能 -->
    <div class="writecomment">
    <input  type="text" placeholder="写评论..">
    <button>评论</button>
    </div>
    <!-- 评论列表 -->
    <commentbox></commentbox>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import commentbox from './commentbox.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "spaceitem",
  components:{commentbox},
  props:['spaceProp'],
  data(){
      return{
        //   状态:是否点赞
          isLike:false,
        //   状态:是否点踩
          isNoLike:false,
        //   状态:是否收藏
          isCollection:false,
          // 接收到的space信息
          space:this.spaceProp,
          // 图像的显示
          imgShow:false,
      }
  },
  computed:{
    ...mapState('userInfo',['user']),
  },
  // created:{
  //   create(){
  //     this.space = this.spaceProp;
  //   }
  // },

  methods:{
    //   点击收藏
      collection(){
          this.isCollection = !this.isCollection;
      },
    //   点击喜欢
      likes(){
          this.isLike = !this.isLike;
          if(this.isLike && this.isNoLike){
              this.isNoLike = false;
          }
      },
    //   点击不喜欢
      noLikes(){
          this.isNoLike = !this.isNoLike;
          if(this.isLike && this.isNoLike){
              this.isLike = false;
          }
      },
    //   点击分享
      shares(){
          console.log('分享');
      }
  },
  mounted(){
    // 当全部加载完毕才显示img,防止出现 undefined
    // this.imgShow = true;
    // console.log(this.spaceProp);
    // this.space = this.spaceProp;
    // this.imgShow = true;

  }
};
</script>

<style scoped>
.spaceitembox {
  position: relative;
  width: 95%;
  left: 2.5%;
  margin-top: 25px;
  margin-bottom: 15px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-bottom: 2px solid rgba(47, 53, 66, 1);
}
/* 头像 */
.myhead {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
/* 头像图片 */
.myhead > img {
  position: relative;
  height: 45px;
  border-radius: 50px;
}
/* 网名和时间 */
.usernametime {
  display: flex;
  max-width: 150px;
  height: 50px;
  flex-flow: column nowrap;
  justify-content: center;
  align-self: flex-start;
}
/* 网名 */
.usernametime span {
  margin-left: 10px;
  margin-top: 5px;
}
/* 发表时间 */
.usernametime span:nth-of-type(2) {
  font-size: 1.4vh;
  color: darkgray;
}
/* 内容 */
.content {
  position: relative;
  width: 90%;
  padding: 10px;
}
/*点赞收藏等操作  */
.operation{
    width: 90%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
}
.operation img{
    margin-left: 15px;
    margin-right: 5px;
    cursor: pointer;
    /* transition: 0.55s; */
}
.operation img:hover{
    transform: translateY(-5px) rotateZ(-25deg);
    transform-origin: 50% 100%;
}
/* 觉得赞 */
.whothinkgood{
    width: 95%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    justify-self: flex-start;
    font-size: 1.6vh;
    margin-top: 10px;
    color: pink;
}
.whothinkgood span{
  padding: 5px;
  cursor: pointer;
  transition: 0.55s;
}
.whothinkgood span:hover{
  color: black;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 15px whitesmoke;
}

/* 写评论 */
.writecomment{
    width: 85%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
}
.writecomment input {
  position: relative;
  width: 75%;
  height: 30px;
  border: 0;
  outline: 0;
  margin-top: 20px;
  padding-left: 20px;
  transition: 0.55s;
  border-radius: 25px 0 0 25px;
  background-color: rgba(99, 110, 114, 0.2);
  font-size: 1.5vh;
  color: pink;
}
.writecomment input:focus {
  font-size: 1.8vh;
  background-color: rgba(99, 110, 114, 0.6);
  color: greenyellow;
}
/* 发表评论按钮 */
.writecomment button{
  width: 25%;
  height: 30px;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: pink;
  font-size: 1.6vh;
  border-radius: 0 25px 25px 0;
  transition: 0.55s;
  border: 0;
}
.writecomment button:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}

/* 点赞收藏转发进入退出动画 */
.operationT-enter-active{
    animation: bounce-top 0.55s both;
}
.operationT-leave-active{
    animation: bounce-top 0.55s both reverse;
}
@keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
    
  }
  24% {
    opacity: 0;
  }
  40% {
    -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
}




</style>