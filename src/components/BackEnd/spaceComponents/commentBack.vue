// 评论组件
<template>
  <div class="commentsbox">
    <!-- 头像名字评论时间回复按钮 -->
    <div class="myhead">
      <img v-if="comment" :src="require(`../../../assets/Heads/${comment.user.userHead}`)" alt="头像" />
      <!-- 网名和发表时间 -->
      <div class="usernametime">
        <span>{{comment.user.userName}}<span>#{{comment.commentFloor}}楼</span></span>
        <span>{{new Date(parseInt(comment.commentTime))
                .toLocaleString()
                .slice(5)}}</span>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="content">
      {{comment.commentContent}}
    </div>
      <!-- 回复者 -->
      <reply-back v-for="replys of allReply" :key="replys.replyId" :replyProps="replys" :commentProps="comment"></reply-back>
  </div>
</template>

<script>
import ReplyBack from './replyBack.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "commentBack",
  components:{ ReplyBack },
  props:['commentProps','spaceProps'],
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
  this.$axios.post('/api/selectReplyBySpaceIdAndTargetQQ',{replySpaceId:this.comment.commentSpaceId,replyCommentFloor:this.comment.commentFloor,pageStart:0,pageEnd:9999}).then(response=>{
  this.allReply = response.data;
  console.log(response.data);
},error=>{
console.log(error.message);
});
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
    border-left: #409EFF 1px dashed;
  
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
  height: 40px;
  border-radius: 50px;
}
/* 网名和时间 */
.usernametime {
  display: flex;
  max-width: 550px;
  height: 30px;
  flex-flow: column nowrap;
  justify-content: center;
  align-self: flex-start;
  
}
/* 网名 */
.usernametime span {
  margin-left: 10px;
  margin-top: 5px;
  color: #409EFF;
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
  margin-top: 10px;
  border-bottom: #409EFF 1px dashed;
  
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
</style>