// 空间组件
<template>
<transition name="starspaceboxT">
  <div v-if="isShow" class="starspacebox" :style="settingLocation" @mousedown="changeIndex">
    <!-- 头部 -->
    <div class="toper" @mousedown="moveBegin">
      <!-- 设置 -->
      <span>{{spaceUser.userName}}的空间</span>
    </div>
    <!-- 退出按钮 -->
    <div class="exit">
      <img src="../assets/exit2.svg" alt="退出" @click="exitChat" />
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 背景和头像 -->
      <div class="backandhead">
        <!-- 背景 -->
        <div class="myback">
          <img :src="require(`../assets/Backs/${spaceUser.userBack}`)" alt="背景" />
        </div>
        <!-- 头像网名 -->
        <div class="myhead">
          <img :src="require(`../assets/Heads/${spaceUser.userHead}`)" alt="头像" />
          <br />
          <!-- 网名 -->
          <span>{{spaceUser.userName}}</span>
        </div>
      </div>
      <!-- 写动态 -->
      <writespace v-show="isMySpace"></writespace>
      <!-- 下拉框分类展示 -->
      <div v-show="isMySpace" class="seecategory">
        <img src="../assets/eyes.svg" alt="眼睛">
        <select v-model="selects" @change="changeSpace">
          <option value="mySpace">我的动态</option>
          <option value="friendSpace">好友动态</option>
          <option value="myGooder">我点赞的</option>
          <option value="myNoGooder">我点踩的</option>
          <option value="myCollection">我收藏的</option>
          <option value="myShare">我分享的</option>
        </select>
      </div>
      <!-- 单个动态 -->
      <spaceitem v-show="!isEmpty"  :spaceProp="space" v-for="space of allSpaceSum" :key="space.publishId"></spaceitem>
      <img class="empty" v-show="isEmpty" src="../assets/empty.svg" alt="空的">
    </div>
          <space-loading></space-loading>
      <space-notice></space-notice>
  </div>
</transition>
</template>

<script>
import writespace from './writespace.vue';
import spaceitem from './spaceitem.vue';
import { mapState } from 'vuex';
import SpaceLoading from './spaceLoading.vue';
import SpaceNotice from './spaceNotice.vue';
export default {
  components: { writespace,spaceitem, SpaceLoading, SpaceNotice},
  // eslint-disable-next-line vue/multi-word-component-names
  name: "starspace",
  data() {
    return {
      //   是否为我的空间
      isMySpace:true,
      //   是否展示该组件--聊天窗口
      isShow: false,
      //   窗口移动要用到到的y坐标
      pox: 800 + "px",
      //   窗口移动要用到到的y坐标
      poy: 500 + "px",
      //   判断是否鼠标按下的判定flag
      isMove: false,
      // 此组件Z轴高度 6 - 7
      zIndex:6,
      spaceUser:'',
      spaceSum:[],
      allSpaceSum:[],
      selects:"mySpace",
      // spaceitem是否为空
      isEmpty:false,
    };
  },
  computed: {
    //改变聊天窗口的位置
    ...mapState('userInfo',['user','spaceWith']),
    settingLocation() {
      return { top: this.poy - 30 + "px", left: this.pox - 100 + "px",zIndex:this.zIndex};
    },
  },
  methods: {
    //   鼠标按下,开始移动
    moveBegin(e) {
      // 获得按下的x坐标
      this.pox = e.clientX;
      // 获得按下的y坐标
      this.poy = e.clientY;
      // 判定在按下
      this.isMove = true;
      console.log(this.isMove);
    },
    // 退出按钮
    exitChat() {
      this.isShow = false;
      this.$bus.$emit('spaceappear',this.isShow,this.isMySpace,this.spaceUser);
    },
    changeIndex(){
      // 聚焦,改变高度,同时降低其他两个窗口的高度
      // 从左往右分别为 空间\聊天\设置
      this.$bus.$emit('changeZindex',7,6,6);
    },

    // 改变可见的空间范围--我的/我点赞的/...
    changeSpace(){
      // 我的动态
      if(this.selects=='mySpace'){
          this.allSpaceSum = this.spaceSum;
      }
      // 好友的动态
      else if(this.selects=='friendSpace'){
        this.friendSpace();
      }
      // 我点赞的
      else if(this.selects=='myGooder'){
        this.myGooder();
      }
      // 我点踩的
      else if(this.selects=='myNoGooder'){
        this.myNoGooder();
      }
      // 我收藏的
      else if(this.selects=='myCollection'){
        this.myCollection();
      }
      // 我分享的
      else if(this.selects=='myShare'){
        this.myShare();
      }      
    },
  // 好友的动态
async friendSpace(){
    // 首先查询关于我的好友列表
  let friendSpaces = [];
  this.$bus.$emit('spaceLoading',true,"加载好友动态..");
  await this.$axios.post('/api/getAllFriends',{userQQ:this.user.userQQ}).then(response=>{
    if(response.data.length==0){
      // 空态
      this.isEmpty = true;
      this.$bus.$emit('spaceLoading',false,"..");
    }
    else{
      this.isEmpty = false;
            // 遍历每一个朋友
      response.data.forEach(friend => {
        // 对每一个朋友查询其动态
        this.$axios.post('/api/selectSpaces',{publishQQ:friend.friendQQ,pageStart:0,pageEnd:9999}).then(response=>{
          response.data.forEach(space => {
            friendSpaces.push(space);
            this.$bus.$emit('spaceLoading',false,"加载好友动态..");
          });
        },error=>{
          console.log(error.message);
        });
        
      });
    }
    },error=>{
      console.log(error.message);
      
    });
    // 排序方法:
// person.sort((a,b)=>{ return a.age-b.age})//升序
// person.sort((a,b)=>{ return b.age-a.age})//降序
friendSpaces.sort((a,b)=>{return a.publishTime-b.publishTime});
this.allSpaceSum = friendSpaces;
  },
    // 我点赞的
async myGooder(){
// 首先查询spacewith 数据库
let goodsSpace = [];
this.$bus.$emit('spaceLoading',true,"加载点赞动态..");
if(this.spaceWith['goods'].length==0){
  // 空态
  this.isEmpty = true;
   this.$bus.$emit('spaceLoading',false,"..");
}
else{
  this.isEmpty = false;
// foreach 不能使用 async await,forEach 属于并发操作 需要锁定住每一次循环体,for 不是并发操作 无需锁定每一次的循环
for (let index = 0; index < this.spaceWith['goods'].length; index++) {
  const goods = this.spaceWith['goods'][index];
  await this.$axios.post('/api/selectSpacesById',{publishId:goods,pageStart:0,pageEnd:9999}).then(response=>{
        goodsSpace.push(response.data[0]);
        this.$bus.$emit('spaceLoading',false,"加载点赞动态..");
        },error=>{
          console.log(error.message);
        });
}
goodsSpace.sort((a,b)=>{return a.publishTime-b.publishTime});
this.allSpaceSum = goodsSpace;
}
  },
    // 我点踩的
async myNoGooder(){
// 首先查询spacewith 数据库
let goodsSpace = [];
this.$bus.$emit('spaceLoading',true,"加载点赞动态..");
if(this.spaceWith['noGoods'].length==0){
  // 空态
  this.isEmpty = true;
   this.$bus.$emit('spaceLoading',false,"..");
}
else{
this.isEmpty = false;
// foreach 不能使用 async await,forEach 属于并发操作 需要锁定住每一次循环体,for 不是并发操作 无需锁定每一次的循环
for (let index = 0; index < this.spaceWith['noGoods'].length; index++) {
  const goods = this.spaceWith['noGoods'][index];
  await this.$axios.post('/api/selectSpacesById',{publishId:goods,pageStart:0,pageEnd:9999}).then(response=>{
        goodsSpace.push(response.data[0]);
        this.$bus.$emit('spaceLoading',false,"加载点赞动态..");
        },error=>{
          console.log(error.message);
        });
}
goodsSpace.sort((a,b)=>{return a.publishTime-b.publishTime});
this.allSpaceSum = goodsSpace;
}
  },
    // 我收藏的
async myCollection(){
// 首先查询spacewith 数据库
let goodsSpace = [];
this.$bus.$emit('spaceLoading',true,"加载点赞动态..");
if(this.spaceWith['collections'].length==0){
  // 空态
  this.isEmpty = true;
   this.$bus.$emit('spaceLoading',false,"..");
}
else{
this.isEmpty = false;
// foreach 不能使用 async await,forEach 属于并发操作 需要锁定住每一次循环体,for 不是并发操作 无需锁定每一次的循环
for (let index = 0; index < this.spaceWith['collections'].length; index++) {
  const goods = this.spaceWith['collections'][index];
  await this.$axios.post('/api/selectSpacesById',{publishId:goods,pageStart:0,pageEnd:9999}).then(response=>{
        goodsSpace.push(response.data[0]);
        this.$bus.$emit('spaceLoading',false,"加载点赞动态..");
        },error=>{
          console.log(error.message);
        });
}
goodsSpace.sort((a,b)=>{return a.publishTime-b.publishTime});
this.allSpaceSum = goodsSpace;
}
  },
    // 我分享的
async  myShare(){
// 首先查询spacewith 数据库
let goodsSpace = [];
this.$bus.$emit('spaceLoading',true,"加载点赞动态..");
if(this.spaceWith['shares'].length==0){
  // 空态
  this.isEmpty = true;
   this.$bus.$emit('spaceLoading',false,"..");
}
else{
this.isEmpty = false;
// foreach 不能使用 async await,forEach 属于并发操作 需要锁定住每一次循环体,for 不是并发操作 无需锁定每一次的循环
for (let index = 0; index < this.spaceWith['shares'].length; index++) {
  const goods = this.spaceWith['shares'][index];
  await this.$axios.post('/api/selectSpacesById',{publishId:goods,pageStart:0,pageEnd:9999}).then(response=>{
        goodsSpace.push(response.data[0]);
        this.$bus.$emit('spaceLoading',false,"加载点赞动态..");
        },error=>{
          console.log(error.message);
        });
}
goodsSpace.sort((a,b)=>{return a.publishTime-b.publishTime});
this.allSpaceSum = goodsSpace;
}
  },
  },
  mounted() {
    //   实时监听鼠标移动,更改位置数据
    window.addEventListener("mousemove", (e) => {
      if (this.isMove) {
        this.pox = e.clientX;
        // 获得按下的y坐标
        this.poy = e.clientY;
        console.log(this.poy);
      }
    }),
      //   实时监听--鼠标停止按下,则不再进行移动功能
      window.addEventListener("mouseup", () => {
        this.isMove = false;
      });
        // 接收self,friendlistitem,friendrecentitem组件数据,进行页面切换效果
        this.$bus.$on('spaceappear',(data1,data2,friendUser)=>{
            this.isShow = data1;
            this.isMySpace = data2;
            // 如果点击的是我的空间
            this.$bus.$emit('spaceLoading',true,"加载动态..");
            if(this.isMySpace==true){
              this.spaceUser = this.user;
            }
            // 如果点击的是别人的空间
            else{
              this.spaceUser = friendUser;
            }
            if(data1){
            // 进行数据库查询,因为进入不管是我的空间还是他人的空间,默认都是出现为 this.spaceUser 的空间内容,所以这里统一查询
            this.$axios.post('/api/selectSpaces',{publishQQ:this.spaceUser.userQQ,pageStart:0,pageEnd:10}).then(response=>{
              this.spaceSum = [],
              this.$bus.$emit('spaceLoading',false,"加载动态..");
              response.data.forEach(space => {
                this.spaceSum.push(space);
              });
              this.allSpaceSum = this.spaceSum;
              if(this.allSpaceSum.length==0){
                this.isEmpty = true;
              }
            },error=>{
              console.log(error.message);
            });
            }
            

        });
        // 接收来自其他窗口的数据,进行高度改变
        this.$bus.$on('changeZindex',(spaceZ)=>{
          this.zIndex = spaceZ;
        });

  },
  beforeDestroy(){
     this.$bus.$off('spaceappear');
     this.$bus.$off('changeZindex');
  }
};
</script>

<style scoped>
.starspacebox {
  position: absolute;
  width: 400px;
  height: 750px;
  top: 8%;
  left: 35%;
  z-index: 6;
  background-color: #1a191b;
  border-radius: 15px;
  box-shadow: 0 0 25px 5px black;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1.8vh;
  font-weight: bold;
  color: white;
}
.starspacebox:hover {
  border-radius: 25px;
  box-shadow: 0 0 30px 10px black;
}
/* 抬头 */
.toper {
  position: relative;
  width: 400px;
  height: 55px;
  border-radius: 25px 25px 0 0;
  display: flex;
  flex-flow: row nowrap;
  transition: 0.55s;
  background-color: rgba(47, 53, 66, 0.25);
}
.toper:hover{
  background-color: rgba(99, 110, 114, 0.2);
}
/* 空间 */
.toper > span {
  line-height: 55px;
  flex: 1;
  text-align: center;
}
/* 退出按钮 */
.exit {
  position: absolute;
  right: 0;
  z-index: 11;
  padding-right: 20px;
  line-height: 65px;
  cursor: pointer;
}
.exit img {
  transition: 0.8s;
}
.exit img:hover {
  transform: rotateZ(720deg) scale(1.33);
}
/* 内容物 */
.content{
  position: relative;
  width: 100%;
  height: 660px;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
  overflow-y: auto;
}
/*头像和背景 */
.backandhead {
  position: relative;
  width: 100%;
  height: 250px;
}

/* 背景 */
.myback {
  position: relative;
  width: 100%;
  height: 180px;
}
/* 背景图片 */
.myback > img {
  width: 100%;
  height: 100%;
  transition: 30s;
}
/* 头像 */
.myhead {
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 50px;
  text-align: center;
}
/* 头像图片 */
.myhead > img {
  position: relative;
  height: 50px;
  border-radius: 50px;
  top: -30px;
  border: 10px solid #1a191b;
}
/* 网名 */
.myhead span {
  position: relative;
  top: -30px;
}
/* 下拉框分类展示 */
.seecategory{
  position: relative;
  height: 50px;
  width: 80%;
  left: 10%;
  top: 10px;
  margin-bottom: 25px;
  border-bottom: 2px solid rgba(47, 53, 66,0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
}
.seecategory select{
  width: 40%;
  height: 35px;
  font-size: 1.8vh;
  color: white;
  font-weight: bold;
  outline: 0;
  transition: 0.55s;
  background-color: rgba(47, 53, 66, 0);
  border: 0;
}
.empty{
  width: 50%;
  height: 50%;
  position: relative;
  left: 25%;
}



/* 该组件--空间进入退出动画 */
.starspaceboxT-enter-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.starspaceboxT-leave-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both
    reverse;
}
/* 该组件--空间进入退出动画 */
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}



</style>