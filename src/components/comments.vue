// 评论组件
<template>
  <div class="commentsbox">
    <!-- 头像名字评论时间回复按钮 -->
    <div class="myhead">
      <img v-if="comment" :src="require(`../assets/Heads/${comment.user.userHead}`)" alt="头像" />
      <!-- 网名和发表时间 -->
      <div class="usernametime">
        <span><span v-show="remakeName">({{remakeName}}) </span>{{comment.user.userName}}<span>#{{comment.commentFloor}}楼</span></span>
        <span>{{new Date(parseInt(comment.commentTime))
                .toLocaleString()
                .slice(5)}}</span>
        <img src="../assets/reply22.svg" alt="回复" @click="commentAppear"/>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="content">
      {{comment.commentContent}}
    </div>
    <transition name="writecommentT">
        <!-- 评论input模块 -->
    <div v-show="isCommentShow" class="writecomment">
      <input type="text" v-model="replyCommentContent" placeholder="写回复.." />
      <button @click="reply">回复</button>
    </div>
    </transition>
      <!-- 回复者 -->
      <reply v-for="replys of allReply" :key="replys.replyId" :replyProps="replys" :commentProps="comment"></reply>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import reply from './reply.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "comments",
  components:{ reply },
  props:['commentProps','spaceProps'],
  computed:{
    ...mapState('userInfo',['user','socket','allusers']),
  },
  data() {
    return {
        // 评论input的出现
        isCommentShow:false,
        // 评论按钮的出现
        isButtonShow:false,
        // 单个comment对象
        comment:this.commentProps,
        // 评论内容---回复的是评论
        replyCommentContent:'',
        // 回复闪现刷新
        replyReflsh:true,
        // 所有评论
        allReply:[],
        remakeName:'',
    };
  },
  created(){
  this.$bus.$emit('spaceLoading',true,"评论加载中..");
  this.$axios.post('/api/selectReplyBySpaceIdAndTargetQQ',{replySpaceId:this.comment.commentSpaceId,replyCommentFloor:this.comment.commentFloor,pageStart:0,pageEnd:9999}).then(response=>{
  this.allReply = response.data;
  this.$bus.$emit('spaceLoading',false,"评论加载中..");
},error=>{
console.log(error.message);
});
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
  async reply(){
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
      if(this.replyCommentContent==''){this.$bus.$emit('spaceNotice',false,"回复内容不可为空!")}
      else{
        let data = {replySpaceId:this.comment.commentSpaceId,replyQQ:this.user.userQQ,replyContent:this.replyCommentContent,
                    replyTargetQQ:this.comment.commentQQ,replyCommentFloor:this.comment.commentFloor,replyTargetFloor:this.comment.commentFloor,isReplyComment:1,myFloor:layer+1,replyTime:Date.now()}
        this.replyCommentContent='';            
      // eslint-disable-next-line no-unused-vars
      await  this.$axios.post('/api/insertReply',data).then(response=>{
          this.$bus.$emit('spaceNotice',true,"回复成功!");
          // 发送消息
          this.replyNotice();
          // 刷新
          this.$bus.$emit('refshReply',true);
        },error=>{
          console.log(error.message);
        });
      }
    },
    
        // 回复时,发送通知到sysnotice
    async replyNotice(){
      let message = "A9wadv::NEW动态:"+this.user.userName+"回复了你的评论.";
         this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.commentProps.commentQQ,message:message}));
        // eslint-disable-next-line no-unused-vars
        await  this.$axios.post("/api/addOneNotice",{sendUserQQ:this.user.userQQ,receiveUserQQ:this.commentProps.commentQQ,noticeType:0,remarks:"回复了你的评论."+"Q-v4jvy-Q"+JSON.stringify(this.spaceProps),noticeTime:Date.now()}).then(response=>{
        this.mailNotice(this.commentProps.commentQQ,"[动态消息]",this.user.userName+"回复了你的评论.",this.commentProps.user.userEmail);
        },error=>{
             console.log(error.message);
        });
        
    },
                  // 邮件通知
       async mailNotice(toQQ,messageType,msg,sendMail){
        let isOnline = false;
        let isNotice = false;
        let isInFive = false;
            // 先查看对方是否在线
            for (let index = 0; index < this.allusers.length; index++) {
                const uuser = this.allusers[index];
                if(uuser.username==toQQ){
                    isOnline = true;
                }
            }
            if(!isOnline){
            // 查询对方的设置,是否允许通知
            await this.$axios.post('/api/getUserSetting',{userQQ:toQQ}).then(response=>{
                if(response.data.spaceNotice==1){
                    isNotice=true;
                    }
            },error=>{
                console.log(error.message); 
            });
            }
            // 如果设置允许,查看是否在5分钟内
            if(isNotice){
             await this.$axios.post('/api/mailInFiveMs',{sendUserQQ:this.user.userQQ,receiveUserQQ:toQQ,noticeType:3}).then(response=>{
                if(response.data==null){
                    isInFive = true;
                }
                else if(response.data.noticeTime-Date.now()>=300000){
                    isInFive = true;
                }
             },error=>{
                console.log(error.message); 
             });
            }
            // 如果在5分钟内,则邮件发送,同时新增sysnotice一条消息
            if(isInFive){
             // eslint-disable-next-line no-unused-vars
             await this.$axios.post('/api/mailSender',{publishQQ:toQQ,publishTime:new Date(parseInt(Date.now())).toLocaleString().slice(5),collector:messageType,sharer:"SYSTEM",gooder:msg,noGooder:sendMail},).then(response=>{
             },error=>{
                console.log(error.message);
             });
             await this.$axios.post('api/addOneNotice',{sendUserQQ:this.user.userQQ,receiveUserQQ:toQQ,noticeType:3,remarks:"邮件发送相关",noticeTime:Date.now()}).then(response=>{
             },error=>{console.log(error.message);});
             
                
            }
        },

  },
  mounted(){
    // 每次开始获取备注名
    this.getRemakeName(this.userQQ,this.comment.commentQQ); 
  },
};
</script>

<style scoped>
.commentsbox {
  position: relative;
  width: 95%;
  transition: 0.55s;
  margin-top: 10px;
  font-size: 1.6vh;
}
.commentsbox:hover div:nth-of-type(1) img{
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
  border: 3px solid royalblue;
  padding: 3px;
  height: 35px;
  border-radius: 50px;
}
/* 网名和时间 */
.usernametime {
  display: flex;
  width: 300px;
  flex-flow: column nowrap;
  justify-content: center;
  align-self: flex-start;
}
/* 网名 */
.usernametime span {
  margin-left: 10px;
  margin-top: 5px;
  color: pink;
}
/* 发表时间 */
.usernametime span:nth-of-type(2) {
  font-size: 1.2vh;
  color: darkgray;
}
.usernametime img {
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: 0.55s;
  opacity: 0;
}
.usernametime img:hover{
    transform: translateY(-5px);
}
/* 评论内容 */
.content {
  position: relative;
  width: 90%;
  padding: 10px;
  margin-top: 40px;
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