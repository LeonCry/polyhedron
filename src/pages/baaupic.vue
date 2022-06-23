<template>
  <div class="beauBox">
    <div ref="allpass" class="allpassbe">
      RELOADING..
    </div>
    <div class="topBox">
      
      <div class="picture">
        <div class="imgpass" ref="imgpass">Loading...</div>
        <!-- <img class="imgg" src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3gxanzo5hj21900u0gog.jpg" alt=""> -->
      </div>
      <div class="blueInfo">
        <div class="infopass" ref="infopass"></div>
        <div class="hovers"> <i class="el-icon-guide"></i> <b> 红绿灯</b> </div>
        <div class="hovers"> <i class="el-icon-camera"></i> <b> Canon EOS 850D</b> </div>
        <div class="hovers"> <i class="el-icon-video-camera"></i> <b>EF 50mm f1.8</b> </div>
        <div class="hovers"> <i class="el-icon-set-up"></i> <b>f1.8 1/60s ISO 6400</b> </div>
        <div class="hovers"> <i class="el-icon-location-information"></i> <b>济南会展路</b> </div>
        <div class="hovers"> <i class="el-icon-time"></i> <b>2022-6-10</b> </div>
        <div class="hovers"> <i class="el-icon-watch"></i> <b>18:03</b> </div>
        <div style="font-size:5vh"> <i class="el-icon-sunny"></i> </div>
      </div>
       
      <div class="info">
       <div class="commentPass" ref="commentPass"></div>
       <div class="bacright"></div>
            <div class="writecomment">
            <input ref="searchInput" type="text" v-model="contents" placeholder="写下感言..">
            <button>发表</button>
            </div>
        <picture-comment :commentProps="comment"></picture-comment>
        <picture-comment :commentProps="comment"></picture-comment>
        <picture-comment :commentProps="comment"></picture-comment>
        <picture-comment :commentProps="comment"></picture-comment>
        <picture-comment :commentProps="comment"></picture-comment>
        <picture-comment :commentProps="comment"></picture-comment>
        <picture-comment :commentProps="comment"></picture-comment>
        <picture-comment :commentProps="comment"></picture-comment>
      </div>
      
    </div>

     <div class="botBox">
      <div class="more">
        <div class="morepass" ref="morepass"></div>
        <div class="progress" ref="progress"></div>

        <div class="page">
          <img class="pageimg" src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3g2nmx5tuj21hb0u047z.jpg" alt="" @click="pageUp">
          <div class="pagefont">
          <b style="font-size:3.2vh"> </b>
          <br>
          <span style="font-weight: lighter;"> 绿灯停 ▶</span>
          </div>
          
        </div>
        <div class="page">
          <img class="pageimg" src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3g2ju9hhgj21il0u0tao.jpg" alt="" @click="pageDown">
          <div class="pagefont">
          <b style="font-size:3.2vh"> </b>
          <br>
          <span  style="font-weight: lighter;">红灯行 ▶</span>
          </div>
        </div>
      </div>
      <div class="play">
          <i class="el-icon-video-pause playing" ref="playing" @click="pauseIt"></i>
          <i class="el-icon-video-play pausing" ref="pausing" @click="playIt"></i>
      </div>
      <div class="good" ref="good">
          <div class="goodpass" ref="goodpass"></div>
        <transition-group name="operationT">
        <img key="3" v-show="!isLike" src="../assets/good.svg" alt="点赞" @click="likes" class="cmgs">
        <img key="4" v-show="isLike" src="../assets/goodactive.svg" alt="点赞active" @click="likes" class="cmgs">
        </transition-group>


      </div>
      <div class="save" ref="save">

        <transition-group name="operationT">
        <img key="1" v-show="!isCollection" src="../assets/space.svg" alt="收藏" @click="collection" class="cmgs" >
        <img key="2" v-show="isCollection" src="../assets/spaceactive.svg" alt="收藏active" @click="collection" class="cmgs">
        </transition-group>

      </div>
      <div class="userSeen">
        <div class="tocollpass" ref="tocollpass"></div>
        <div class="tocollection">
            TO MY COL
        </div>
        <div class="mudd">
            Hover ME
        </div>
        <div class="tocollectionright">
            LECTIONS ▶
       </div>
      </div>
     </div>

  </div>
</template>

<script>
import PictureComment from '@/components/pictureApp/pictureComment.vue'
export default {
  components: { PictureComment },
// eslint-disable-next-line vue/multi-word-component-names
name:'baaupic',
data(){
  return{
    isCollection:false,
    isLike:false,
    contents:'',
    comment:{user:{userHead:'defaultHead.jpg',userName:'小李'},commentTime:465465465454,commentContent:'真好看',commentQQ:'lbh'}
  }
},
methods:{
  collection(){
    this.isCollection = !this.isCollection;
    if(this.isCollection){
      this.$refs.save.style.backgroundColor = "rgb(63, 196, 121)";
    }
    else{
      this.$refs.save.style.backgroundColor = "gray";
    }
  },
  likes(){
    this.isLike = !this.isLike;
     if(this.isLike){
      this.$refs.good.style.backgroundColor = "rgb(63, 196, 121)";
    }
    else{
      this.$refs.good.style.backgroundColor = "gray";
    }
  },
  pauseIt(){
    console.log("pauseIt");
    this.$refs.playing.style.display = 'none';
    this.$refs.playing.style.Zindex = 1;
    this.$refs.pausing.style.display = 'inline';
    this.$refs.pausing.style.Zindex = 2;
    this.animationPlayState('paused');
  },
  playIt(){
    console.log("playIt");
    this.$refs.playing.style.display = 'inline';
    this.$refs.playing.style.Zindex = 2;
    this.$refs.pausing.style.display = 'none';
    this.$refs.pausing.style.Zindex = 1;
    this.animationPlayState('running');
  },
  animationPlayState(state){
     this.$refs.progress.style.animationPlayState = state;
     this.$refs.imgpass.style.animationPlayState = state;
     this.$refs.infopass.style.animationPlayState = state;
     this.$refs.commentPass.style.animationPlayState = state;
     this.$refs.morepass.style.animationPlayState = state;
     this.$refs.goodpass.style.animationPlayState = state;
     this.$refs.tocollpass.style.animationPlayState = state;
  },
  pageUp(){
    this.emptypass(false);
    this.$refs.allpass.className = "allpass";
    setTimeout(() => {
      this.emptypass(true);
    }, 500);
    setTimeout(() => {
      this.$refs.allpass.className = "allpassbe";
    }, 2000);
  },
  pageDown(){
    this.emptypass(false);
    this.$refs.allpass.className = "allpass";
        setTimeout(() => {
      this.emptypass(true);
    }, 500);
    setTimeout(() => {
      this.$refs.allpass.className = "allpassbe";
    }, 2000);
  },
  emptypass(data){
    if(!data){
     this.$refs.progress.className = ' ';
     this.$refs.imgpass.className = ' ';
     this.$refs.infopass.className = ' ';
     this.$refs.commentPass.className = ' ';
     this.$refs.morepass.className = ' ';
     this.$refs.goodpass.className = ' ';
     this.$refs.tocollpass.className = ' ';
    }
    else{
     this.$refs.progress.className = 'progress';
     this.$refs.imgpass.className = 'imgpass';
     this.$refs.infopass.className = 'infopass';
     this.$refs.commentPass.className = 'commentPass';
     this.$refs.morepass.className = 'morepass';
     this.$refs.goodpass.className = 'goodpass';
     this.$refs.tocollpass.className = 'tocollpass';
    }
  }
},
}
</script>

<style scoped>
.beauBox{
    position: absolute;
    background-color: white;
    width: 100%;
    height: 100%;
    z-index: 900;
    transition: 0.55s;
    font-size: 1.6vh;
    overflow: hidden;
    text-align: center;
    font-weight: bolder;
    display: flex;
    flex-flow: column nowrap;

}
/* 上方 */
.topBox{
  flex: 7;
  display: flex;
  flex-flow: row nowrap;
}
.picture{
  position: relative;
  flex: 6;
  z-index: 10;
  background-size: 100% 100%;
  background-image: url('https://tva1.sinaimg.cn/large/e6c9d24ely1h3gxanzo5hj21900u0gog.jpg');
}
.imgg{
  position: relative;
}
.blueInfo{
  flex: 2;
  background-color: #F0ECE0;
  display: flex;
  font-size: 2.3vh;
  z-index: 7;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  /* align-content: flex-start; */
}
.info{
  padding-top: 100px;
  height: 650px;
  overflow-y: auto;
  flex: 2;
  background-color: #70D2CB;
}
.bacright{
  position: absolute;
  width: 10%;
  right: 0;
  top: 0;
  height: 750px;
  background-color: deepskyblue;
}
/* 下方 */
.botBox{
  flex: 2;
  display: flex;
  flex-flow: row nowrap;
}
.more{
  flex: 5;
  z-index: 6;
  background-color: #FFE396;
  display: flex;
  flex-flow: row nowrap;

}
.play{
  flex: 1;
  z-index: 5;
  transition: 0.4s;
  background-color: #9499ff;
  filter: blur(1px);
}
.play:hover{
  background-color: #535adf;
}
.playing{
  position: absolute;
  margin-top: 55px;
  margin-left: -10px;
  transform: scale(3);
  cursor: pointer;
  z-index: 2;

}
.playing:hover{
  color: #FFE396;
}

.pausing{
  position: absolute;
   margin-top: 55px;
   margin-left: -10px;
  transform: scale(3);
  cursor: pointer;
  display: none;
  z-index: 1;
}
.pausing:hover{
  color: #FFE396;
}
/* 进度条 */
.progress{
  position: absolute;
  height: 100%;
  z-index: 2;
  border-right: 4px solid black;
  animation: progress 10s both ease-in-out infinite;
}
.page{
  width: 250px;
  height: 100%;
  margin-left: 80px;
  margin-right: 80px;
  z-index: 5;
}
.pagefont{
  position: absolute;
  z-index: 4;
}
.pageimg{
  z-index: 3;
  position: absolute;
  transition: 0.33s;
  width: 180px;
  margin-top: 10px;
  border-radius: 10px;
  border: 3px solid white;
}
.pageimg:hover{
  width: 190px;
  cursor: pointer;
  margin-top: 5px;
  margin-left: -5px;
}

.good{
  flex: 1;
  z-index: 3;
  transition: 0.4s;
  background-color: grey;
  /* background-color: rgb(63, 196, 121); */
}
.good:hover{
  background-color: black;
}
.save{
  flex: 1;
  z-index: 2;
  transition: 0.4s;
  background-color: grey;
  /* background-color: rgb(63, 196, 121); */
}
.save:hover{
  background-color: black;
}
.userSeen{
  flex: 2;
  transition: 0.44s;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  line-height: 450%;
  font-size: 3vh;
}
.tocollection{
  flex: 0;
  height: 100%;
  transition: 0.55s;
  text-align: right;
  overflow: hidden;
  color: black;
  background-color: black;
}
.mudd{
  flex: 198;
    height: 100%;
    text-align: right;
  transition: 0.25s;
  background-color: #F97796;
  color: #FFE396;
}
.tocollectionright{
  flex: 1;
  height: 100%;
  transition: 0.25s;
  color: #F97796;
  text-align: left;
  background-color: #F97796;
}

.userSeen:hover>div:nth-of-type(2){
  cursor: pointer;
  flex: 50;
  background-color: white;
  border: 1px solid black;
  border-right: none;
}
.userSeen:hover>div:nth-of-type(3){
    cursor: pointer;
    flex: 0;
    font-size: 0;
   background-color: seagreen;
   color: seagreen;
}

.userSeen:hover>div:nth-of-type(4){
    cursor: pointer;
    flex: 50;
   background-color: black;
   color: white;
     border: 1px solid white;
     border-left: none;
}
.cmgs{
  position: absolute;
  transition: 0.25s;
  margin-left: -10px;
  margin-top: 50px;
  transform: scale(1.5);
  cursor: pointer;
}



.hovers{
  width: 100%;
  height: 50px;
  line-height: 250%;
  /* text-align: center; */
  transition: 0.33s;
}
.hovers:hover{
  background-color: black;
  color: white;
}
/* 写评论 */
.writecomment{
    width: 300px;
    top: 35px;
    position: fixed;
    z-index: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    align-self: center;
}
.writecomment input {
  position: relative;
  width: 75%;
  height: 40px;
  border: 0;
  outline: 0;
  margin-top: 20px;
  padding-left: 20px;
  transition: 0.55s;
  background-color: rgba(240, 230, 140, 0.8);
  font-size: 1.5vh;
  color: darkslateblue;
}
.writecomment input:focus {
  font-size: 1.6vh;
  background-color: khaki;
  color: black;
}
/* 发表评论按钮 */
.writecomment button{
  width: 20%;
  height: 40px;
  cursor: pointer;
  background-color: rgba(240, 230, 140, 0.8);
  color: black;
  font-size: 1.6vh;
  border-radius: 0 10px 10px 0;
  transition: 0.55s;
  border: 0;
}
.writecomment button:hover {
  background-color: rgba(240, 230, 140, 1);
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

@keyframes progress {
  0%{
    width: 0;
    background-color: #9298ff;
    filter: blur(2px);
  }
  80%{
    width: 50%;
    background-color: #9499ff;
    filter: blur(2px);
  }
  95%{
    width: 50%;
    background-color: #9499ff;
    filter: blur(2px);
  }
  100%{
    width: 0;
    background-color: #9298ff;
    filter: blur(2px);
  }
}

/* 图片PASS */
.imgpass{
  position: absolute;
  text-align: center;
  font-size: 15vh;
  color: white;
  font-style: italic;
  line-height: 500%;
  overflow: hidden;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  /* overflow: hidden; */
  height: 100%;
  width: 0;
  right: 0;
  z-index: 11;
  background-color: #F97796;
  animation: imgpassF 10s both ease-in-out infinite;
}

@keyframes imgpassF {
  0%{
    width: 0;
    right: 0;
  }
  80%{
    width: 0;
    right: 0;
  }
  90%{
    width: 100%;
    right: 0;
  }
  100%{
    width: 100%;
    right: 100%;
  }
}
/* 信息PASS */
.infopass{
    position: absolute;
    width: 0;
    height: 750px;
    right: 20%;
    z-index: 8;
    background-color: deepskyblue;
    animation: infopassF 10s both infinite;
}
@keyframes infopassF {
  0%{
    width: 0;
    right: 20%;
  }
  85%{
    width: 0;
    right: 20%;
  }
  90%{
    width: 20%;
    right: 20%;
  }
  95%{
    width: 20%;
    right: 40%;
  }
  100%{
    width: 20%;
    right: 40%;
  }
}
.commentPass{
  position: absolute;
  width: 0;
  right: 0;
  top: 0;
  height: 750px;
  z-index: 6;
  background-color: rgb(255, 138, 118);
  animation: commentPassF 10s both infinite;

}
@keyframes commentPassF {
  0%{
    width: 0;
    right: 0;
  }
  75%{
    width: 0;
    right: 0;
  }
  85%{
    width: 20%;
    right: 0;
  }
  98%{
    width: 20%;
    right: 20%;
  }
  100%{
    width: 20%;
    right: 20%;
  }
}
.morepass{
  position: absolute;
  width:0;
  right: 40%;
  z-index: 6;
  height: 100%;
  background-color: rgb(255, 62, 62);
  animation: morepassF 10s both infinite;
}
@keyframes morepassF {
  0%{
    width: 0;
    right: 40%;
  }
  75%{
    width: 0;
    right: 40%;
  }
  90%{
    width: 60%;
    right: 40%;
  }
  100%{
    width: 60%;
    right: 100%;
  }
}
.goodpass{
 position: absolute;
 width: 10%;
 right: 20%;
 height: 100%;
 z-index: 4;
 background-color: #FFE396;
 animation: goodpass 10s both infinite;
}
@keyframes goodpass {
  0%{
    width: 0;
    right: 20%;
  }
  85%{
    width: 0;
    right: 20%;
  }
  90%{
    width: 20%;
    right: 20%;
  }
  95%{
    width: 20%;
    right: 40%;
  }
  100%{
    width: 20%;
    right: 40%;
  }
}
.tocollpass{
  position: absolute;
  width: 0%;
  height: 100%;
  right: 0;
  z-index: 1;
  background-color: #70D2CB;
  animation: tocollpassF 10s infinite both;
}
@keyframes tocollpassF {
  0%{
    width: 0;
    right: 0%;
  }
  78%{
    width: 0;
    right: 0;
  }
  88%{
    width: 20%;
    right: 0;
  }
  98%{
    width: 20%;
    right: 20%;
  }
  100%{
    width: 20%;
    right: 20%;
  }
}
.allpass{
  position: absolute;
  z-index: 100;
  width: 0;
  height: 100%;
  overflow: hidden;
  font-size: 20vh;
  color: white;
  font-style: italic;
  font-family: 'Courier New', Courier, monospace;
  line-height: 500%;
  background-color: #2f3542;
  animation: allpassF 2s both;
}
.allpassbe{
  display: none;
}
@keyframes allpassF {
  0%{
    width: 0;
    left: 0;
  }
  50%{
    width: 100%;
    left: 0;
  }
  100%{
    width: 100%;
    left: 100%;
  }
}

</style>