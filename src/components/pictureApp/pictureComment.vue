// 评论组件
<template>
  <div class="commentsbox">
    <!-- 头像名字评论时间回复按钮 -->
    <div class="myhead">
      <img v-if="comment" :src="require(`../../assets/Heads/${comment.user.userHead}`)" alt="头像" />
      <!-- 网名和发表时间 -->
      <div class="usernametime">
        <span><span v-show="remakeName">({{remakeName}}) </span>{{comment.user.userName}}</span>
        <span>{{new Date(parseInt(comment.picCommentTime))
                .toLocaleString()
                .slice(5)}}</span>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="content">
      {{comment.picCommentContent}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "pictureComment",
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
},
  methods: {
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

  },
  mounted(){
    // 每次开始获取备注名
    this.getRemakeName(this.userQQ,this.comment.picCommentQQ); 
  },
};
</script>

<style scoped>
.commentsbox {
  position: relative;
  width: 90%;
  left: 5%;
  border-radius: 15px;
  transition: 0.55s;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 15px;
  font-size: 1.6vh;
  background-color: royalblue;
  box-shadow: 0 0 5px royalblue;
}
.commentsbox:hover{
    background-color: rgb(72, 118, 255);
    box-shadow: 0 0 10px rgb(72, 118, 255);
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
  border: 3px solid salmon;
  left: 5px;
  padding: 3px;
  height: 35px;
  border-radius: 50px;
}
/* 网名和时间 */
.usernametime {
  display: flex;
  width: 200px;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
/* 网名 */
.usernametime span {
  margin-left: 10px;
  margin-top: 5px;
  color: gold;
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
  width: 80%;
  left: 5%;
  text-align: start;
  padding: 5px;
  padding-left: 25px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: wheat;
}

</style>