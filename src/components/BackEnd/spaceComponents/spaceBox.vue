// 单个动态组件
<template>
  <div class="spaceitembox">
          <!-- 抬头 -->
      <div class="toper">
          <!-- 名字 -->
          <span>动态详情</span>>
      </div>
    <!-- 头像网名 -->
    <div class="myhead">
      <!-- <img v-if="space.user.userHead" :src="require('../../../assets/Heads/'+space.user.userHead)" alt="头像"/> -->
      <!-- 网名和发表时间 -->
      <!-- <div class="usernametime">
        <span>你好asdasdasdasd</span>
        <span>{{new Date(parseInt(space.publishTime))
                .toLocaleString()
                .slice(5)}}</span>
      </div> -->
<transition name="showpeopleT">
    <show-people :peopleProps="peopleProps" :whichState="whichState"  v-if="peopleProps" ></show-people>
</transition>

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
    <commentbox v-if="commentRflesh" :spaceProps="space"></commentbox>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import commentbox from '../../commentbox.vue';
import ShowPeople from '../../showPeople.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "spaceBox",
  components:{commentbox, ShowPeople},
  props:['spaceProp'],
  data(){
      return{
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
    ...mapState('userInfo',['user','spaceWith','socket','allusers']),

  },
  created(){

  },

  methods:{

    ...mapMutations('userInfo',['UPDATESPACEWITH','DELETESPACEWITH']),

      // 将发表的内容插入到item内,就有样式了
      contentInsert(){
        this.$refs.content.innerHTML = this.space.spaceContent;
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

  },
  mounted(){ 
    this.$refs.content.innerHTML = this.space.spaceContent;
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
    background-color:rgba(0, 0, 0, 0);
    border-radius: 15px;
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


.showpeopleT-enter-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.showpeopleT-leave-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
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
</style>