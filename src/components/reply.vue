// 回复组件
<template>
  <div class="replybox">
    <!-- 头像名字评论时间回复按钮 -->
    <div class="myhead">
      <img v-if="replys.user.userHead" :src="(`${publicPath}/HeadsAndBacks/Heads/${replys.user.userHead}`)" alt="头像" />
      <!-- 网名和发表时间 -->
      <div class="usernametime">
        <span style="color:yellowgreen"><span v-show="remakeName">({{remakeName}}) </span>{{replys.user.userName}}<span style="color:yellowgreen">#{{replys.myFloor}}层</span></span>
        <span>{{new Date(parseInt(replys.replyTime))
                .toLocaleString()
                .slice(5)}}</span>
        <img src="../assets/reply20.svg" alt="回复" @click="commentAppear" />
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="content">
      <span style="color:pink">回复 @{{replys.targetUser.userName}}#{{replys.replyTargetFloor}}{{floorOrLayer}}: </span>{{replys.replyContent}}
    </div>
    <transition name="writecommentT">
        <!-- 评论input模块 -->
    <div v-show="isCommentShow" class="writecomment">
      <input type="text" v-model="replyReplyContent" placeholder="写回复.." />
      <button @click="replyReply">回复</button>
    </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'reply',
props:['replyProps','commentProps'],
data() {
    return {
        isCommentShow:false,
        replys:this.replyProps,
        // 回复的是层还是楼
        floorOrLayer:'层',
        // 回复的回复的内容
        replyReplyContent:'',
        // 评论对象
        comment:this.commentProps,
        remakeName:'',
        publicPath: process.env.BASE_URL,
    }
  },
  computed:{
    ...mapState('userInfo',['user']),
  },
  created(){
    if (this.replys.isReplyComment) {
      this.floorOrLayer = '楼';
    }
  },
  methods: {
    //   评论input的出现
    commentAppear() {
        this.isCommentShow = !this.isCommentShow;
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
    // 回复的回复
  async replyReply(){
   // 先发送请求返回该评论下的回复,查看自己是第几层
   let layer = 0;
        this.$bus.$emit('spaceLoading',true,"发表回复中..");
        await this.$axios.post('/api/selectReplyBySpaceIdAndTargetQQ',{replySpaceId:this.comment.commentSpaceId,replyCommentFloor:this.comment.commentFloor,pageStart:0,pageEnd:9999}).then(response=>{
        if(response.data.length!=0){
            layer = response.data[0]['myFloor'];
        }
          this.$bus.$emit('spaceLoading',false,"发表回复中..");
        },error=>{
console.log(error.message);
          });
      if(this.replyReplyContent==''){this.$bus.$emit('spaceNotice',false,"回复内容不可为空!")}
      else{
        let data = {replySpaceId:this.comment.commentSpaceId,replyQQ:this.user.userQQ,replyContent:this.replyReplyContent,
                    replyTargetQQ:this.replys.replyQQ,replyCommentFloor:this.comment.commentFloor,replyTargetFloor:this.replys.myFloor,isReplyComment:0,myFloor:layer+1,replyTime:Date.now()}
        this.replyReplyContent='';            
      // eslint-disable-next-line no-unused-vars
      await  this.$axios.post('/api/insertReply',data).then(response=>{
          this.$bus.$emit('spaceNotice',true,"回复成功!");
          // 刷新
          this.$bus.$emit('refshReply',true);
        },error=>{
          console.log(error.message);
        });
      }
    },







  },
  mounted(){
    this.getRemakeName(this.user.userQQ,this.replys.replyQQ);
  }
}
</script>

<style scoped>
.replybox {
  position: relative;
  width: 80%;
  left: 10%;
  transition: 0.55s;
  margin-top: 10px;
  font-size: 1.6vh;
}
.replybox:hover div:nth-of-type(1) img{
    opacity: 1;
}
/* 头像名字评论时间回复按钮*/
/* 头像 */
.myhead {
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
/* 头像图片 */
.myhead > img {
  position: relative;
  border: 3px solid teal;
  padding: 2px;
  height: 30px;
  border-radius: 50px;
}
/* 网名和时间 */
.usernametime {
  display: flex;
  width: 250px;
  flex-flow: column nowrap;
  justify-content: center;
  align-self: flex-start;
}
/* 网名 */
.usernametime span {
  margin-left: 10px;
  font-size: 1.6vh;
  color: pink;
  margin-top: 5px;
}
/* 发表时间 */
.usernametime span:nth-of-type(2) {
  font-size: 1vh;
  color: darkgray;
}
.usernametime img {
  position: absolute;
  right: 0;
  cursor: pointer;
  opacity: 0;
  transition: 0.55s;
}
.usernametime img:hover{
    transform: translateY(-5px);
}
/* 评论内容 */
.content {
  position: relative;
  width: 90%;
  font-size: 1.5vh;
  padding: 10px;
  margin-top: 30px;
}
/* 写评论 */
.writecomment {
  position: relative;
  width: 90%;
  margin-top: 10px;
  display: flex;
  z-index: 12;
  transition: 0.55s;
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
.writecomment button {
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
/* 写回复进入退出动画 */
.writecommentT-enter-active{
    animation: slide-in-blurred-left 0.45s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.writecommentT-leave-active{
    animation: slide-in-blurred-left 0.35s cubic-bezier(0.230, 1.000, 0.320, 1.000) both reverse;
}
@keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-200px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-200px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
</style>