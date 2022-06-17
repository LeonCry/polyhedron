// 单个动态组件
<template>
  <div class="spaceitembox" v-show="isShow">
          <!-- 抬头 -->
      <div class="toper">
          <!-- 名字 -->
          <span>动态详情</span>
      </div>
      <div class="box">
    <!-- 头像网名 -->
    <div class="myhead">
      <img v-if="space.user.userHead" :src="require('../../../assets/Heads/'+space.user.userHead)" alt="头像"/>
      <!-- 网名和发表时间 -->
      <div class="usernametime">
        <span>{{space.user.userName}}</span>
        <span>{{new Date(parseInt(space.publishTime))
                .toLocaleString()
                .slice(5)}}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content" ref="content">
        
    </div>

    <!-- 谁谁谁觉得很赞 -->
    <span class="whothinkgood">
      <span @click="showPeople('gooder')">{{likePeople}}人觉得很赞</span>
      <span @click="showPeople('sharer')">{{sharePeople}}人分享了动态</span>
      <span @click="showPeople('collector')">{{collectionPeople}}人收藏了动态</span>
      </span>

    <!-- 评论列表 -->
    <comment-box-back v-if="commentRflesh" :spaceProps="space"></comment-box-back>
  </div>
  <transition name="showpeopleT">
    <show-people-back :peopleProps="peopleProps" :whichState="whichState"  v-if="peopleProps"></show-people-back>
</transition>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import CommentBoxBack from './commentBoxBack.vue';
import ShowPeopleBack from './showPeopleBack.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "spaceBox",
  components:{CommentBoxBack, ShowPeopleBack},
  data(){
      return{
          // 喜欢该动态的人数
          isShow:false,
          likePeople:0,
          // 不喜欢该动态的人数
          noLikePeople:0,
          spaceProp:'',
          // 收藏该动态的人数
          collectionPeople:0,
          // 分享该动态的人数
          sharePeople:0,
          // 已经分享过了吗
          hasShared:false,
          // 接收到的space信息
          space:'',
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
    ...mapState('userInfo',['user','spaceWith','socket','allusers']),

  },

  methods:{

    ...mapMutations('userInfo',['UPDATESPACEWITH','DELETESPACEWITH']),

    creatinit(){
         // 初始化点赞\收藏操作,是否active
    if(this.space.collector!=''){
      this.collectionPeople = this.space.collector.split(',').length;
    }
    if(this.space.gooder!=''){
      this.likePeople = this.space.gooder.split(',').length;
    }
    if(this.space.noGooder!=''){
      this.noLikePeople = this.space.noGooder.split(',').length;
    }
    if(this.space.sharer!=''){
      this.sharePeople = this.space.sharer.split(',').length;
    }
    },

      // 展示觉得赞\分享\收藏的人
      showPeople(state){
        if(state=='gooder'){
          this.peopleProps = this.space.gooder;
          this.whichState = '觉得赞!';
          if(!this.peopleProps){
             this.$notify.info({
          title: '消息',
          message: '暂时没有人觉得赞哦~'
        });
          }
        }
        else if(state=='collector'){
          this.peopleProps = this.space.collector;
          this.whichState = '收藏家们';
          if(!this.peopleProps){
                         this.$notify.info({
          title: '消息',
          message: '暂时没有人收藏哦~'
        });

          }
        }
        else{
          this.peopleProps = this.space.sharer;
          this.whichState = '分享者们';
          if(!this.peopleProps){
                         this.$notify.info({
          title: '消息',
          message: '暂时没有人分享哦~'
        });
          
          }
        }
      },

  },
  mounted(){ 
    // 接收动态详情
    this.$bus.$on('showSpaceContent',(space)=>{
      this.isShow = true;  
      this.spaceProp = space;
      this.commentRflesh = false;
      this.space = space;
      setTimeout(() => {
      this.$refs.content.innerHTML = space.spaceContent;
      this.commentRflesh = true;
      this.creatinit();
      }, 100);
    });
  this.$bus.$on('exitShowPeopleBack',()=>{
    this.peopleProps = '';
  });


  }



};
</script>

<style scoped>
.spaceitembox {
    position:relative;
    width: 100%;
    height: 650px;
    display: flex;
    flex-flow: column nowrap;
    font-size: 2vh;
    color: black;
    overflow-y: auto;
    background-color:rgba(0, 0, 0, 0);
    border-radius: 15px;
}
/* 头像 */
.myhead {
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
/* 头像图片 */
.myhead > img {
  position: relative;
  height: 45px;
  padding: 2px;
  border-radius: 50px;
  border: 1px solid gray;
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
  margin-top: 30px;
  position: relative;
  text-align: center;
  max-height: 600px;
  overflow: auto;
  width: 90%;
  padding: 10px;
  margin-bottom: 30px;
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
    color: seagreen;
}
.whothinkgood span{
  padding: 5px;
  cursor: pointer;
  transition: 0.55s;
}
.whothinkgood span:hover{
  color: white;
  border-radius: 5px;
  background-color: seagreen;
  box-shadow: 0 0 15px seagreen;
}


.showpeopleT-enter-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.showpeopleT-leave-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}

@keyframes swing-in-left-fwd {
  0% {
    -webkit-transform: rotateZ(64deg);
            transform: rotateZ(64deg);
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

/* 抬头 */
.toper{
    position: relative;
        width: 100%;
        height: 55px;
        border-radius: 15px 15px 0 0;
        display: flex;
        transition: 0.55s;
        flex-flow: row nowrap;
        background-color: rgba(47, 53, 66,0.25);
}   
.toper:hover{
  background-color: rgba(99, 110, 114, 0.2);
}
/* 用户名字 */
.toper > span{
    line-height: 55px;
    flex: 1;
    text-align: center;
}
.box{
    overflow-y: auto;
    height: 600px;
}
</style>