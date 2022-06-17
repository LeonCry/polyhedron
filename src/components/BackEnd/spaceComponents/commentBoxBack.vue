// 评论box组件
<template>
  <div class="commentbox">
      <!-- 评论者 -->
      <comment-back v-for="comment of allComments" :key="comment.commentId" :commentProps="comment" :spaceProps="spaceProps"></comment-back>
  </div>
</template>

<script>
import CommentBack from './commentBack.vue';
export default {
  components: {CommentBack},
// eslint-disable-next-line vue/multi-word-component-names
name:'commentBoxBack',
props:['spaceProps'],
data(){
  return{
    // 当前动态
    space:this.spaceProps,
    // comment对象
    allComments:[],
  }
},

created(){
this.$axios.post('/api/selectCommentBySpaceId',{commentSpaceId:this.space.publishId,pageStart:0,pageEnd:9999}).then(response=>{
  this.allComments = response.data;
},error=>{
console.log(error.message);
});
},

}
</script>

<style scoped>
.commentbox{
    position: relative;
    width: 90%;
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    left: 10%;
    margin-top: 15px;
    margin-bottom: 10px;
}

</style>