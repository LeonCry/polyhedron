<template>
  <div class="beauBox">
    <div ref="allpass" class="allpassbe">RELOADING..</div>
    <div class="topBox">
      <div class="picture" ref="picture">
        <div class="imgpass" ref="imgpass">Loading...</div>
        <!-- <img class="imgg" src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3gxanzo5hj21900u0gog.jpg" alt=""> -->
      </div>
      <div class="blueInfo">
        <div class="infopass" ref="infopass"></div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-guide"></i>
          <b>{{ allPics[currPicPage].picName }}</b>
        </div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-camera"></i>
          <b>{{ allPics[currPicPage].cameraName }}</b>
        </div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-video-camera"></i>
          <b>{{ allPics[currPicPage].cameraInfo }}</b>
        </div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-set-up"></i>
          <b>{{ allPics[currPicPage].cameraSetting }}</b>
        </div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-location-information"></i>
          <b>{{ allPics[currPicPage].location }}</b>
        </div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-time"></i>
          <b>{{
            new Date(parseInt(allPics[currPicPage].picTime))
              .toLocaleString()
              .split(" ")[0]
          }}</b>
        </div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-watch"></i>
          <b>{{
            new Date(parseInt(allPics[currPicPage].picTime))
              .toLocaleString()
              .split(" ")[1]
          }}</b>
        </div>
        <div v-if="allPics.length != 0" class="hovers">
          <i class="el-icon-sunny"></i>
          <b>{{ allPics[currPicPage].weather }}</b>
        </div>
        <el-button
          v-if="allPics.length != 0"
          type="primary"
          round
          icon="el-icon-loading"
          @click="copySrc(allPics[currPicPage].picScr)"
          >复制图片链接</el-button
        >
      </div>

      <div class="info">
        <div class="commentPass" ref="commentPass"></div>
        <div class="bacright"></div>
        <div class="writecomment">
          <input
            ref="searchInput"
            type="text"
            v-model="inputText"
            placeholder="写下感言.."
          />
          <button @click="putText">发表</button>
        </div>
        <transition-group name="commentT" appear v-if="allPics.length != 0">
          <picture-comment
            :commentProps="comment"
            v-for="comment of allComments"
            :key="comment.picCommentId"
          ></picture-comment>
        </transition-group>
      </div>
    </div>

    <div class="botBox">
      <div class="more">
        <div class="morepass" ref="morepass"></div>
        <div class="progress" ref="progress"></div>

        <div class="page" v-if="currPicPage > 0">
          <img
            class="pageimg"
            :src="allPics[currPicPage - 1].picScr"
            alt=""
            @click="pageUp"
          />
          <div class="pagefont">
            <b style="font-size: 3.2vh"> </b>
            <br />
            <span style="font-weight: lighter"
              >{{ allPics[currPicPage - 1].picName }} ▶</span
            >
          </div>
        </div>
        <div class="page" v-if="currPicPage < allPics.length - 1">
          <img
            class="pageimg"
            :src="allPics[currPicPage + 1].picScr"
            alt=""
            @click="pageDown"
          />
          <div class="pagefont">
            <b style="font-size: 3.2vh"> </b>
            <br />
            <span style="font-weight: lighter"
              >{{ allPics[currPicPage + 1].picName }} ▶</span
            >
          </div>
        </div>
      </div>
      <div class="play">
        <i
          class="el-icon-video-pause playing"
          ref="playing"
          @click="pauseIt"
        ></i>
        <i class="el-icon-video-play pausing" ref="pausing" @click="playIt"></i>
      </div>
      <div class="good" ref="good">
        <div class="goodpass" ref="goodpass"></div>
        <transition-group name="operationT">
          <img
            key="3"
            v-show="!isLike"
            src="../assets/good.svg"
            alt="点赞"
            @click="likes"
            class="cmgs"
          />
          <img
            key="4"
            v-show="isLike"
            src="../assets/goodactive.svg"
            alt="点赞active"
            @click="likes"
            class="cmgs"
          />
        </transition-group>
        <p
          v-show="thisGoods != 0"
          v-if="allPics.length != 0"
          style="
            position: relative;
            margin-top: 85px;
            color: white;
            font-size: 1.6vh;
          "
        >
          {{ thisGoods }}
        </p>
      </div>
      <div class="save" ref="save">
        <transition-group name="operationT">
          <img
            key="1"
            v-show="!isCollection"
            src="../assets/space.svg"
            alt="收藏"
            @click="collection"
            class="cmgs"
          />
          <img
            key="2"
            v-show="isCollection"
            src="../assets/spaceactive.svg"
            alt="收藏active"
            @click="collection"
            class="cmgs"
          />
        </transition-group>
        <p
          v-show="thisCollections != 0"
          v-if="allPics.length != 0"
          style="
            position: relative;
            margin-top: 85px;
            color: white;
            font-size: 1.6vh;
          "
        >
          {{ thisCollections }}
        </p>
      </div>
      <div class="userSeen" @click="toMyCollections('baaupicSelf')">
        <div class="tocollpass" ref="tocollpass"></div>
        <div class="tocollection">TO MY COL</div>
        <div class="mudd">Hover ME</div>
        <div class="tocollectionright">LECTIONS ▶</div>
      </div>
    </div>
  </div>
</template>

<script>
import PictureComment from '@/components/pictureApp/pictureComment.vue'
import { mapState } from 'vuex';
export default {
  components: { PictureComment },
// eslint-disable-next-line vue/multi-word-component-names
name:'baaupic',
data(){
  return{
    isCollection:false,
    isLike:false,
    allPics:[],
    currPicPage:0,
    setIntervalId:0,
    setIntervalAllId:0,
    setIntervalPassId:0,
    passTime:0,
    t:0,
    timeBegin:0,
    timeEnd:0,
    isPausing:false,
    inputText:'',
    allComments:[],
    spaceWiths:[],
    collectionss:[],
    collectionssOriData:'',
    goodss:[],
    goodssOriData:'',
    thisGoods:0,
    thisCollections:0,
  }
},
computed:{
  ...mapState('userInfo',['user']),
},
methods:{
 async collection(){
    this.isCollection = !this.isCollection;
    if(this.isCollection){
      this.thisCollections =  this.thisCollections + 1;
      this.$refs.save.style.backgroundColor = "rgb(63, 196, 121)";
      // eslint-disable-next-line no-unused-vars
  await   this.$axios.post('/api/updatePic',{picId:this.allPics[this.currPicPage].picId,collectionNumbers: this.thisCollections}).then(response=>{

        
      },error=>{
        console.log(error.message);
      });
      // eslint-disable-next-line no-unused-vars
   await   this.$axios.post('/api/updatePicWith',{picWithQQ:this.user.userQQ,picCollections:this.collectionssOriData + this.allPics[this.currPicPage].picId.toString() + ','}).then(response=>{
   },error=>{
    console.log(error.message);
   });
    }
    else{
      this.thisCollections =  this.thisCollections - 1;
    this.$refs.save.style.backgroundColor = "gray";
    // eslint-disable-next-line no-unused-vars
    await  this.$axios.post('/api/updatePic',{picId:this.allPics[this.currPicPage].picId,collectionNumbers: this.thisCollections}).then(response=>{
      },error=>{
        console.log(error.message);
      });
      // eslint-disable-next-line no-unused-vars
      await   this.$axios.post('/api/updatePicWith',{picWithQQ:this.user.userQQ,picCollections:this.collectionssOriData.replace(this.allPics[this.currPicPage].picId.toString() + ',','')}).then(response=>{
   },error=>{
    console.log(error.message);
   });
    }
    this.picWithCreated();
  },
 async likes(){
    this.isLike = !this.isLike;
     if(this.isLike){
       this.thisGoods =  this.thisGoods + 1;
      this.$refs.good.style.backgroundColor = "rgb(63, 196, 121)";
      // eslint-disable-next-line no-unused-vars
    await  this.$axios.post('/api/updatePic',{picId:this.allPics[this.currPicPage].picId,goodNumbers:this.thisGoods}).then(response=>{
      },error=>{
        console.log(error.message);
      });
      // eslint-disable-next-line no-unused-vars
         await   this.$axios.post('/api/updatePicWith',{picWithQQ:this.user.userQQ,picGoods:this.goodssOriData + this.allPics[this.currPicPage].picId.toString() + ','}).then(response=>{
   },error=>{
    console.log(error.message);
   });
    }
    else{
      this.thisGoods =  this.thisGoods - 1;
      this.$refs.good.style.backgroundColor = "gray";
      // eslint-disable-next-line no-unused-vars
     await this.$axios.post('/api/updatePic',{picId:this.allPics[this.currPicPage].picId,goodNumbers:this.thisGoods}).then(response=>{
      },error=>{
        console.log(error.message);
      });
      // eslint-disable-next-line no-unused-vars
            await   this.$axios.post('/api/updatePicWith',{picWithQQ:this.user.userQQ,picGoods:this.goodssOriData.replace(this.allPics[this.currPicPage].picId.toString() + ',','')}).then(response=>{
   },error=>{
    console.log(error.message);
   });
    }
    this.picWithCreated();
  },

  picWithActions(){
    // this.axios.post(,).then(response=>{},error=>{});
  },
  picWithCreated(){
    this.$axios.post('/api/selectPicWithByUserQQ',{picWithQQ:this.user.userQQ}).then(response=>{
      this.collectionssOriData = response.data[0]['picCollections'];
      this.goodssOriData = response.data[0]['picGoods'];
      this.collectionss = response.data[0]['picCollections'].split(',');
      this.goodss = response.data[0]['picGoods'].split(',');
      this.picWithSelect(); 
    },error=>{
      console.log(error.message);
    });
  },
  picWithSelect(){
    // likes
    for (let index = 0; index < this.goodss.length-1; index++) {
      const coll = this.goodss[index];
      if(coll == this.allPics[this.currPicPage].picId.toString()){
        this.isLike = true;
        this.$refs.good.style.backgroundColor = "rgb(63, 196, 121)";
        break;
      }
      else{
        this.isLike = false;
        this.$refs.good.style.backgroundColor = "gray";
      }
    }
    // collections
    for (let index = 0; index < this.collectionss.length-1; index++) {
      const coll = this.collectionss[index];
      if(coll == this.allPics[this.currPicPage].picId.toString()){
        this.isCollection = true;
        this.$refs.save.style.backgroundColor = "rgb(63, 196, 121)";
        break;
      }
      else{
        this.isCollection = false;
        this.$refs.save.style.backgroundColor = "gray";
      }
    }
  },
  pauseIt(){
    this.timeEnd = new Date().getTime();
    this.$refs.playing.style.display = 'none';
    this.$refs.playing.style.Zindex = 1;
    this.$refs.pausing.style.display = 'inline';
    this.$refs.pausing.style.Zindex = 2;
    this.animationPlayState('paused');
    this.isPausing = true;
    clearInterval(this.setIntervalAllId);
    clearInterval(this.setIntervalPassId);
    clearInterval(this.setIntervalId);
    this.t = this.timeEnd-this.timeBegin;
    this.t = 10000 - this.t;
  },
  playIt(){
      setTimeout(() => {
        if(this.currPicPage==this.allPics.length-1){
        this.currPicPage = 0;
      }
      else{
        this.currPicPage++;
      }
      this.$refs.picture.style.backgroundImage = "url("+this.allPics[this.currPicPage].picScr+")";
      this.selectComments();
      }, this.t-1000);
      setTimeout(() => {
        this.currpageChange();
      }, this.t);
    this.isPausing = false;
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
    clearInterval(this.setIntervalAllId);
    clearInterval(this.setIntervalPassId);
    clearInterval(this.setIntervalId);
    this.t = 10000;
    this.emptypass(false);
    this.$refs.allpass.className = "allpass";
    setTimeout(() => {
      this.currPicPage--;
      this.$refs.picture.style.backgroundImage = "url("+this.allPics[this.currPicPage].picScr+")";
      this.selectComments();
    }, 500);
    setTimeout(() => {
      this.emptypass(true);
      this.$refs.allpass.className = "allpassbe";
      if(!this.isPausing){
      this.currpageChange();
      }
    }, 2000);
  },
  pageDown(){
    clearInterval(this.setIntervalAllId);
    clearInterval(this.setIntervalPassId);
    clearInterval(this.setIntervalId);
    this.t = 10000;
    this.emptypass(false);
    this.$refs.allpass.className = "allpass";
        setTimeout(() => {
      this.currPicPage++;
      this.$refs.picture.style.backgroundImage = "url("+this.allPics[this.currPicPage].picScr+")";
      this.selectComments();
    }, 500);
    setTimeout(() => {
      this.emptypass(true);
      this.$refs.allpass.className = "allpassbe";
      if(!this.isPausing){
      this.currpageChange();
      }
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
  },
  getPicsCreated(){
    this.$axios.post('/api/returnPics',{picId:0,pageStart:0,pageEnd:9999}).then(response=>{
      this.allPics = this.shuffle(response.data);
      this.$refs.picture.style.backgroundImage = "url("+this.allPics[this.currPicPage].picScr+")";
    },error=>{
      console.log(error.message);
    });
  },
  // 打乱数组顺序
  shuffle(arr) {
  var length = arr.length,
      randomIndex,
      temp;
  while (length) {
    randomIndex = Math.floor(Math.random() * (length--));
    temp = arr[randomIndex];
    arr[randomIndex] = arr[length];
    arr[length] = temp
  }
  return arr;
},
// 复制照片信息
  copySrc(src){
	let oInput = document.createElement("input");
	oInput.value = src;
	document.body.appendChild(oInput);
	oInput.select();
	document.execCommand("Copy");
	oInput.remove();
  this.$message({
          message: '照片地址复制成功!',
          type: 'success'
        });
  },
  // 改变当前页
  currpageChange(){
    this.timeBegin = new Date().getTime();
  this.setIntervalAllId = setInterval(() => {
      this.timeBegin = new Date().getTime();
      clearInterval(this.setIntervalId);
        this.setIntervalId = setInterval(() => {
      if(this.currPicPage==this.allPics.length-1){
        this.currPicPage = 0;
      }
      else{
        this.currPicPage++;
      }
      this.$refs.picture.style.backgroundImage = "url("+this.allPics[this.currPicPage].picScr+")";
      this.selectComments();
    }, 9000);
    }, 10000);
  this.setIntervalId = setInterval(() => {
      if(this.currPicPage==this.allPics.length-1){
        this.currPicPage = 0;
      }
      else{
        this.currPicPage++;
      }
      this.$refs.picture.style.backgroundImage = "url("+this.allPics[this.currPicPage].picScr+")";
      this.selectComments();
    }, 9000);
  },

  // 写下感言
  putText(){
    if(this.inputText==''){
      this.$message.error("不可输入空白内容!");
    }
    else{
      // eslint-disable-next-line no-unused-vars
      this.$axios.post('/api/insertPicComment',{picCommentPicId:this.allPics[this.currPicPage].picId,picCommentQQ:this.user.userQQ,picCommentContent:this.inputText,picCommentTime:Date.now()}).then(response=>{
        this.selectComments();
        this.$message({
          message: '已成功发表感言!',
          type: 'success'
        });
      },error=>{
        console.log(error.message);
      });
      this.inputText = '';
    }
  },
  // 返回留言
  selectComments(){
    this.allComments = [];
    this.$axios.post('/api/selectPicCommentByPicId',{picCommentPicId:this.allPics[this.currPicPage].picId}).then(response=>{
      this.allComments = response.data;
    },error=>{
      console.log(error.message);
    });
    this.picWithSelect();
    this.$axios.post('/api/returnPicsById',{picId:this.allPics[this.currPicPage].picId}).then(response=>{
    this.thisGoods = response.data.goodNumbers;
    this.thisCollections = response.data.collectionNumbers;
    },error=>{
      console.log(error.message);
    });


  },
toMyCollections(rout){
    this.emptypass(false);
    this.$refs.allpass.className = "allpass";
    setTimeout(() => {
    }, 500);
    setTimeout(() => {
      this.routerTo(rout);
    }, 1000);
    setTimeout(() => {
      this.emptypass(true);
    }, 2000);
},





routerTo(rout){
this.$router.push({
            name:rout,
        })
}






},
created(){
  // 初次初始化获得所有照片信息
  this.getPicsCreated();
  this.currpageChange();
  setTimeout(() => {
      this.selectComments();
      this.picWithCreated();
  }, 250);
},
beforeDestroy(){
  this.pauseIt();
}
}
</script>

<style scoped>
.beauBox {
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 80;
  transition: 0.55s;
  font-size: 1.6vh;
  overflow: hidden;
  text-align: center;
  font-weight: bolder;
  display: flex;
  flex-flow: column nowrap;
}
/* 上方 */
.topBox {
  flex: 7;
  display: flex;
  flex-flow: row nowrap;
}
.picture {
  position: relative;
  flex: 6;
  z-index: 10;
  background-size: 100% 100%;
  /* background-image: url('https://tva1.sinaimg.cn/large/e6c9d24ely1h3gxanzo5hj21900u0gog.jpg'); */
  background-color: #f97796;
}
.imgg {
  position: relative;
}
.blueInfo {
  flex: 2;
  background-color: #f0ece0;
  display: flex;
  font-size: 2.3vh;
  z-index: 7;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  /* align-content: flex-start; */
}
.info {
  padding-top: 100px;
  height: 650px;
  overflow-y: auto;
  flex: 2;
  background-color: #70d2cb;
}
.bacright {
  position: absolute;
  width: 10%;
  right: 0;
  top: 0;
  height: 750px;
  background-color: deepskyblue;
}
/* 下方 */
.botBox {
  flex: 2;
  display: flex;
  flex-flow: row nowrap;
}
.more {
  flex: 5;
  z-index: 6;
  background-color: #ffe396;
  display: flex;
  flex-flow: row nowrap;
}
.play {
  flex: 1;
  z-index: 5;
  transition: 0.4s;
  background-color: #9499ff;
  filter: blur(1px);
}
.play:hover {
  background-color: #535adf;
}
.playing {
  position: absolute;
  margin-top: 55px;
  margin-left: -10px;
  transform: scale(3);
  cursor: pointer;
  z-index: 2;
}
.playing:hover {
  color: #ffe396;
}

.pausing {
  position: absolute;
  margin-top: 55px;
  margin-left: -10px;
  transform: scale(3);
  cursor: pointer;
  display: none;
  z-index: 1;
}
.pausing:hover {
  color: #ffe396;
}
/* 进度条 */
.progress {
  position: absolute;
  height: 100%;
  z-index: 2;
  border-right: 4px solid black;
  animation: progress 10s both ease-in-out infinite;
}
.page {
  width: 250px;
  height: 100%;
  margin-left: 80px;
  margin-right: 80px;
  z-index: 5;
}
.pagefont {
  position: absolute;
  z-index: 4;
}
.pageimg {
  z-index: 3;
  position: absolute;
  transition: 0.33s;
  width: 150px;
  margin-top: 10px;
  border-radius: 10px;
  border: 3px solid skyblue;
}
.pageimg:hover {
  width: 160px;
  cursor: pointer;
  margin-top: 5px;
  margin-left: -5px;
  border: 3px solid darksalmon;
}

.good {
  flex: 1;
  z-index: 3;
  transition: 0.4s;
  background-color: grey;
  /* background-color: rgb(63, 196, 121); */
}
.good:hover {
  background-color: black;
}
.save {
  flex: 1;
  z-index: 2;
  transition: 0.4s;
  background-color: grey;
  /* background-color: rgb(63, 196, 121); */
}


.good img:hover{
    transform: translateY(-5px) rotateZ(-25deg) scale(1.55);
    transform-origin: 50% 100%;
}
.save img:hover{
    transform: translateY(-5px) rotateZ(-25deg) scale(1.55);
    transform-origin: 50% 100%;
}

.userSeen {
  flex: 2;
  transition: 0.44s;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  line-height: 450%;
  font-size: 3vh;
}
.tocollection {
  flex: 0;
  height: 100%;
  transition: 0.55s;
  text-align: right;
  overflow: hidden;
  color: black;
  background-color: black;
}
.mudd {
  flex: 198;
  height: 100%;
  text-align: right;
  transition: 0.25s;
  background-color: #f97796;
  color: #ffe396;
}
.tocollectionright {
  flex: 1;
  height: 100%;
  transition: 0.25s;
  color: #f97796;
  text-align: left;
  background-color: #f97796;
}

.userSeen:hover > div:nth-of-type(2) {
  cursor: pointer;
  flex: 50;
  background-color: white;
  border: 1px solid black;
  border-right: none;
}
.userSeen:hover > div:nth-of-type(3) {
  cursor: pointer;
  flex: 0;
  font-size: 0;
  background-color: seagreen;
  color: seagreen;
}

.userSeen:hover > div:nth-of-type(4) {
  cursor: pointer;
  flex: 50;
  background-color: black;
  color: white;
  border: 1px solid white;
  border-left: none;
}
.cmgs {
  position: absolute;
  transition: 0.25s;
  margin-left: -10px;
  margin-top: 50px;
  transform: scale(1.5);
  cursor: pointer;
}

.hovers {
  width: 100%;
  height: 50px;
  line-height: 250%;
  /* text-align: center; */
  transition: 0.33s;
}
.hovers:hover {
  background-color: black;
  color: white;
}
/* 写评论 */
.writecomment {
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
.writecomment button {
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
.operationT-enter-active {
  animation: bounce-top 0.55s both;
}
.operationT-leave-active {
  animation: bounce-top 0.55s both reverse;
}
.commentT-enter-active {
  animation: tilt-in-left-1 0.44s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.commentT-leave-active {
  animation: tilt-in-left-1 0.01s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
    reverse;
}
@keyframes tilt-in-left-1 {
  0% {
    -webkit-transform: rotateX(-30deg) translateX(-200px) skewX(-30deg);
    transform: rotateX(-30deg) translateX(-200px) skewX(-30deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg) translateX(0) skewX(0deg);
    transform: rotateX(0deg) translateX(0) skewX(0deg);
    opacity: 1;
  }
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
  0% {
    width: 0;
    background-color: #9298ff;
    filter: blur(2px);
  }
  80% {
    width: 50%;
    background-color: #9499ff;
    filter: blur(2px);
  }
  95% {
    width: 50%;
    background-color: #9499ff;
    filter: blur(2px);
  }
  100% {
    width: 0;
    background-color: #9298ff;
    filter: blur(2px);
  }
}

/* 图片PASS */
.imgpass {
  position: absolute;
  text-align: center;
  font-size: 15vh;
  color: white;
  font-style: italic;
  line-height: 500%;
  overflow: hidden;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  /* overflow: hidden; */
  height: 100%;
  width: 0;
  right: 0;
  z-index: 11;
  background-color: #f97796;
  animation: imgpassF 10s both ease-in-out infinite;
}

@keyframes imgpassF {
  0% {
    width: 0;
    right: 0;
  }
  80% {
    width: 0;
    right: 0;
  }
  90% {
    width: 100%;
    right: 0;
  }
  100% {
    width: 100%;
    right: 100%;
  }
}
/* 信息PASS */
.infopass {
  position: absolute;
  width: 0;
  height: 750px;
  right: 20%;
  z-index: 8;
  background-color: deepskyblue;
  animation: infopassF 10s both infinite;
}
@keyframes infopassF {
  0% {
    width: 0;
    right: 20%;
  }
  85% {
    width: 0;
    right: 20%;
  }
  90% {
    width: 20%;
    right: 20%;
  }
  95% {
    width: 20%;
    right: 40%;
  }
  100% {
    width: 20%;
    right: 40%;
  }
}
.commentPass {
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
  0% {
    width: 0;
    right: 0;
  }
  75% {
    width: 0;
    right: 0;
  }
  85% {
    width: 20%;
    right: 0;
  }
  95% {
    width: 20%;
    right: 0;
  }
  100% {
    width: 20%;
    right: 20%;
  }
}
.morepass {
  position: absolute;
  width: 0;
  right: 40%;
  z-index: 6;
  height: 100%;
  background-color: rgb(255, 62, 62);
  animation: morepassF 10s both infinite;
}
@keyframes morepassF {
  0% {
    width: 0;
    right: 40%;
  }
  75% {
    width: 0;
    right: 40%;
  }
  90% {
    width: 60%;
    right: 40%;
  }
  100% {
    width: 60%;
    right: 100%;
  }
}
.goodpass {
  position: absolute;
  width: 10%;
  right: 20%;
  height: 100%;
  z-index: 4;
  background-color: #ffe396;
  animation: goodpass 10s both infinite;
}
@keyframes goodpass {
  0% {
    width: 0;
    right: 20%;
  }
  85% {
    width: 0;
    right: 20%;
  }
  90% {
    width: 20%;
    right: 20%;
  }
  95% {
    width: 20%;
    right: 40%;
  }
  100% {
    width: 20%;
    right: 40%;
  }
}
.tocollpass {
  position: absolute;
  width: 0%;
  height: 100%;
  right: 0;
  z-index: 1;
  background-color: #70d2cb;
  animation: tocollpassF 10s infinite both;
}
@keyframes tocollpassF {
  0% {
    width: 0;
    right: 0%;
  }
  78% {
    width: 0;
    right: 0;
  }
  88% {
    width: 20%;
    right: 0;
  }
  98% {
    width: 20%;
    right: 20%;
  }
  100% {
    width: 20%;
    right: 20%;
  }
}
.allpass {
  position: absolute;
  z-index: 100;
  width: 0;
  height: 100%;
  overflow: hidden;
  font-size: 20vh;
  color: white;
  font-style: italic;
  font-family: "Courier New", Courier, monospace;
  line-height: 500%;
  background-color: #2f3542;
  animation: allpassF 2s both;
}
.allpassbe {
  display: none;
}
@keyframes allpassF {
  0% {
    width: 0;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 100%;
    left: 100%;
  }
}
</style>