// 单个动态组件
<template>
  <div v-if="space" class="spaceitembox">
    <!-- 头像网名 -->
    <div class="myhead">
      <img v-if="space.user.userHead" :src="require('../assets/Heads/'+space.user.userHead)" alt="头像"/>
      <!-- 网名和发表时间 -->
      <div class="usernametime">
        <span>{{space.user.userName}}<span v-show="remakeName">({{remakeName}})</span></span>
        <span>{{new Date(parseInt(space.publishTime))
                .toLocaleString()
                .slice(5)}}</span>
      </div>
<transition name="showpeopleT">
    <show-people :peopleProps="peopleProps" :whichState="whichState"  v-if="peopleProps" ></show-people>
</transition>

<transition name="sharepeopleT">
    <share-people v-if="isSharePeopleShow" :spaceProps="spaceProp"></share-people>
</transition>

    </div>
    <!-- 内容 -->
    <div class="content" ref="content">
        
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
        <img key="7" v-show="isShare" src="../assets/share.svg" alt="分享" @click="shares">
        </transition-group>
    </div>

    <!-- 谁谁谁觉得很赞 -->
    <span class="whothinkgood">
      <span @click="showPeople('gooder')">{{likePeople}}人觉得很赞</span>
      <span @click="showPeople('sharer')">{{sharePeople}}人分享了动态</span>
      <span @click="showPeople('collector')">{{collectionPeople}}人收藏了动态</span>
      </span>

    <!-- 写评论功能 -->
    <div class="writecomment">
    <input  type="text" v-model="commentContent" placeholder="写评论..">
    <button @click="comment">评论</button>
    </div>
    <!-- 评论列表 -->
    <commentbox v-if="commentRflesh" :spaceProps="space"></commentbox>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import commentbox from './commentbox.vue';
import SharePeople from './sharePeople.vue';
import ShowPeople from './showPeople.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "spaceitem",
  components:{commentbox, ShowPeople, SharePeople},
  props:['spaceProp'],
  data(){
      return{
        //   状态:是否点赞
          isLike:false,
        //   状态:是否点踩
          isNoLike:false,
        //   状态:是否收藏
          isCollection:false,
          // 是否分享
          isShare:true,
          // 喜欢该动态的人数
          likePeople:0,
          // 不喜欢该动态的人数
          noLikePeople:0,
          // 收藏该动态的人数
          collectionPeople:0,
          // 分享该动态的人数
          sharePeople:0,
          // 已经分享过了吗
          hasShared:false,
          // 接收到的space信息
          space:this.spaceProp,
          // 传送给showpeople的prop
          peopleProps:'',
          // 是点的分享还是觉得赞还是收藏状态
          whichState:'',
          // 评论内容
          commentContent:'',
          // 评论列表闪现刷新
          commentRflesh:true,
          remakeName:'',
          isSharePeopleShow:false,
      }
  },
  computed:{
    ...mapState('userInfo',['user','spaceWith','socket']),

  },
  created(){
    // 初始化点赞\收藏操作,是否active
    if(this.space.collector!=''){
      this.collectionPeople = this.space.collector.split(',').length;
      if(this.space.collector.split(',').includes(this.user.userQQ)){
        this.isCollection = true;
      }
    }
    if(this.space.gooder!=''){
      this.likePeople = this.space.gooder.split(',').length;
      if(this.space.gooder.split(',').includes(this.user.userQQ)){
        this.isLike = true;
      }
    }
    if(this.space.noGooder!=''){
      this.noLikePeople = this.space.noGooder.split(',').length;
      if(this.space.noGooder.split(',').includes(this.user.userQQ)){
        this.isNoLike = true;
      }
    }
    if(this.space.sharer!=''){
      this.sharePeople = this.space.sharer.split(',').length;
    }
  
  },

  methods:{

    ...mapMutations('userInfo',['UPDATESPACEWITH','DELETESPACEWITH']),
    //   点击收藏
      collection(){
          this.isCollection = !this.isCollection;
          // 如果是收藏
          if(this.isCollection){
            this.activeRequest("collector");
            this.spaceWithAdd("collections");
            this.thinkNotice("收藏了一篇动态!");
            this.collectionPeople++;
          }
          // 如果是取消收藏
          else{
            this.negetiveRequest("collector");
            this.spaceWithRemove("collections");
            this.collectionPeople--;
          }
      },
      // 将发表的内容插入到item内,就有样式了
      contentInsert(){
        this.$refs.content.innerHTML = this.space.spaceContent;
      },
    //   点击喜欢
      likes(){
          this.isLike = !this.isLike;
          if(this.isLike){
            this.thinkNotice("赞了一篇动态!");
            this.activeRequest("gooder");
            this.spaceWithAdd("goods");
            this.likePeople++;
            if(this.isNoLike){
              this.isNoLike = false;
              this.negetiveRequest("noGooder");
              this.spaceWithRemove("noGoods");
              this.noLikePeople--;
            }
          }
          else{
            this.negetiveRequest("gooder");
            this.spaceWithRemove("goods");
            this.likePeople--;
          }
      },
    //   点击不喜欢
      noLikes(){
          this.isNoLike = !this.isNoLike;
          if(this.isLike && this.isNoLike){
              this.isLike = false;
              this.activeRequest("noGooder");
              this.spaceWithAdd("noGoods");
              this.negetiveRequest("gooder");
              this.spaceWithRemove("goods");
              this.likePeople--;
              this.noLikePeople++;
          }
          else if(!this.isLike && this.isNoLike){
            this.activeRequest("noGooder");
            this.spaceWithAdd("noGoods");
            this.noLikePeople++;
          }
          else{
            this.negetiveRequest("noGooder");
            this.spaceWithRemove("noGoods");
            this.noLikePeople--;
          }
      },
    //   点击分享
      shares(){
        this.shareAnimation();
        this.isSharePeopleShow = true;
        this.$bus.$emit("shareSpaceItem",this.spaceProp);

        // 如果我已经分享过这个动态了,就不添加到数据库和增加分享次数了
        if(this.hasShared){
          true;
        }
        else{
           if(this.space.sharer!=''){
              if(this.space.sharer.split(',').includes(this.user.userQQ)){
                this.hasShared = true;
              }
              else{
                this.activeRequest("sharer");
                this.spaceWithAdd("shares");
                this.sharePeople++;
                this.hasShared = true;
              }
           }
           else{
                this.activeRequest("sharer");
                this.spaceWithAdd("shares");
                this.sharePeople++;
                this.hasShared = true;
           }
        }
      },
      // share动画效果 + 弹出分享窗口
      shareAnimation(){
        this.isShare = false;
           setTimeout(() => {
            this.isShare = true;
          }, 250);
      },

      // 展示觉得赞\分享\收藏的人
      showPeople(state){
        if(state=='gooder'){
          this.peopleProps = this.space.gooder;
          this.whichState = '觉得赞!';
          if(!this.peopleProps){
            this.$bus.$emit('spaceNotice',false,"暂时没有人觉得赞哦~");
          }
        }
        else if(state=='collector'){
          this.peopleProps = this.space.collector;
          this.whichState = '收藏家们';
          if(!this.peopleProps){
            this.$bus.$emit('spaceNotice',false,"暂时没有人收藏哦~");
          }
        }
        else{
          this.peopleProps = this.space.sharer;
          this.whichState = '分享者们';
          if(!this.peopleProps){
            this.$bus.$emit('spaceNotice',false,"暂时没有人分享哦~");
          }
        }
      },
        // 所有操作添加的发送请求
      activeRequest(operation){
        // 先获取该动态的ID,以及4个对应的数组
        let publishId = this.space.publishId;
        let custom = [];
        if(this.space[operation]!=''){custom = this.space.collector.split(',');}
        custom.push(this.user.userQQ);
        this.space[operation] = custom.toString();     
        // 构建传送参数json
        let D = operation.toString();
        let data = {};
        data["publishId"] = publishId;
        // eval() 函数作用: eval()可以接受一个字符串str作为参数,并把这个参数作为脚本代码来 执行。 :好东西
        data[D] = this.space[operation];
        // eslint-disable-next-line no-unused-vars
        this.$axios.post('api/updateSpace',data).then(response=>{
          if(operation!="sharer"){
            this.$bus.$emit('spaceNotice',true,"完成"+operation);
          }
        },error=>{
          this.$bus.$emit('spaceNotice',false,error.message);
        });
          
      },
      // 所有操作取消添加的发送请求
      negetiveRequest(operation){
        // 先获取该动态的ID,以及4个对应的数组
        let publishId = this.space.publishId;
        let D = operation.toString();
        let custom = [];     
        if(this.space[D]!=''){custom = this.space.collector.split(',');}
        if(custom.includes(this.user.userQQ)){custom.remove(this.user.userQQ);}
        // 构建传送参数json,
        // 此D 实际为collector/gooder等字符串,在json中以 json[D],可以将该D的字符串解析为变量 : 好用
        this.space[D] = custom.toString();
        let data = {};
        data["publishId"] = publishId;
        // eval() 函数作用: eval()可以接受一个字符串str作为参数,并把这个参数作为脚本代码来 执行。 :好用
        data[D] = this.space[D];
        console.log(data);
        
        // eslint-disable-next-line no-unused-vars
        this.$axios.post('api/updateSpace',data).then(response=>{
          this.$bus.$emit('spaceNotice',true,"取消"+operation);
        },error=>{
          this.$bus.$emit('spaceNotice',false,error.message);
          
        });
          
      },

      // 所有与spacewith有关的操作
      // 向数据库中添加
      spaceWithAdd(operation){
        this.UPDATESPACEWITH({operation:operation,publishId:this.space.publishId});
        // this.spaceWith[operation].push(this.space.publishId);
        // 再将数组转换成字符串
        var spaceWithString={};
        for (var val in this.spaceWith){
          spaceWithString[val] = this.spaceWith[val].toString(); 
        }
        // console.log("spaceWithString:",spaceWithString);
        // eslint-disable-next-line no-unused-vars
        this.$axios.post('/api/updateSpaceWith',spaceWithString).then(response=>{
          console.log("spaceWith添加成功!");
        },error=>{
          console.log(error.message);
        });
      },
      // 向数据库中祛除
      spaceWithRemove(operation){
        this.DELETESPACEWITH({operation:operation,publishId:this.space.publishId});
        // this.spaceWith[operation].remove(this.space.publishId);
        // 再将数组转换成字符串
        var spaceWithString={};
        for (var val in  this.spaceWith){
          spaceWithString[val] =this.spaceWith[val].toString();
        }
        // eslint-disable-next-line no-unused-vars
        this.$axios.post('/api/updateSpaceWith',spaceWithString).then(response=>{
          console.log("spaceWith祛除成功!");
        },error=>{
          console.log(error.message);
        });
      },
        //获取备注名
        getRemakeName(userQQ,friendQQ){
            this.$axios.post('/api/getOneFriends',{userQQ:userQQ,friendQQ:friendQQ}).then(response=>{
              if(response.data==null){
                this.remakeName = '';
              }
              else{
                this.remakeName = response.data.friendRemarkName;
              }
            },error=>{
                console.log(error.message);
            });
            
        },
      // 发表评论
    async  comment(){
        if(this.commentContent==''){this.$bus.$emit('spaceNotice',false,"评论内容不可为空")}
        else{
          // 先发送请求返回该ID下的评论,查看自己是第几楼
          let floor = 0;
        await  this.$axios.post('/api/selectCommentBySpaceId',{commentSpaceId:this.space.publishId,pageStart:0,pageEnd:9999}).then(response=>{
            if(response.data.length!=0){
              floor = response.data[0]['commentFloor'];
            }
          },error=>{
            console.log(error.message);
            
          });
          
          // 发送请求,进行评论
          let data = {commentSpaceId:this.space.publishId,commentQQ:this.user.userQQ,commentContent:this.commentContent,commentTime:Date.now(),commentFloor:floor+1}
          this.commentContent = '';
          // eslint-disable-next-line no-unused-vars
          this.$axios.post('/api/insertComment',data).then(response=>{
            this.$bus.$emit('spaceNotice',true,"评论成功!");
            this.commentNotice();
            // 闪现刷新,获取最新的comment数据
            this.commentRflesh = false;
            setTimeout(() => {
            this.commentRflesh = true;
            }, 100);
            
          },error=>{
            console.log(error.message);
          });
        }
      },
              // 回复时,发送通知到sysnotice
    async commentNotice(){
      let message = "A9wadv::NEW动态:"+this.user.userName+"评论了你的动态.";
         this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.spaceProp.publishQQ,message:message}));
          await  this.$axios.post("/api/addOneNotice",{sendUserQQ:this.user.userQQ,receiveUserQQ:this.spaceProp.publishQQ,noticeType:0,remarks:this.user.userName+"评论了你的动态.",noticeTime:Date.now()}).then(response=>{
        console.log("已添加动态:",response.data);
        },error=>{
             console.log(error.message);
        }); 
    },





  },
  mounted(){ 
    // 关闭showpeople组件
    this.$bus.$on('showPeopleDisAppear',(data)=>{
      this.peopleProps = data;
    }),
    // reply 刷新
    // eslint-disable-next-line no-unused-vars
    this.$bus.$on('refshReply',(data)=>{
            // 闪现刷新,获取最新的comment数据
            this.commentRflesh = false;
            setTimeout(() => {
            this.commentRflesh = true;
            }, 100);
    });
    // 将发表的内容插入到item内,就有样式了
    this.$refs.content.innerHTML = this.space.spaceContent;
    // 获取最新的备注名
    this.getRemakeName(this.user.userQQ,this.space.publishQQ);
    // sharePeople控制退出
    this.$bus.$on('sharePeopleDisAppear',()=>{
      this.isSharePeopleShow = false;
    })
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

.showpeopleT-enter-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.showpeopleT-leave-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}
.sharepeopleT-enter-active{
    animation: swing-in-right-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.sharepeopleT-leave-active{
    animation: swing-in-right-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
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
@keyframes swing-in-left-fwd {
  0% {
    -webkit-transform: rotateY(100deg);
            transform: rotateY(100deg);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 1;
  }
}
@keyframes swing-in-right-fwd {
  0% {
    -webkit-transform: rotateY(-100deg);
            transform: rotateY(-100deg);
    -webkit-transform-origin: right;
            transform-origin: right;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    -webkit-transform-origin: right;
            transform-origin: right;
    opacity: 1;
  }
}




</style>