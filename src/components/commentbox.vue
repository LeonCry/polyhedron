// 评论box组件
<template>
  <div class="commentbox">
      <!-- 评论者 -->
      <comments v-for="comment of allComments" :key="comment.commentId" :commentProps="comment" :spaceProps="spaceProps"></comments>
  </div>
</template>

<script>
import comments from './comments.vue'
export default {
  components: { comments},
// eslint-disable-next-line vue/multi-word-component-names
name:'commentbox',
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
  this.$bus.$emit('spaceLoading',true,"评论加载中..");
this.$axios.post('/api/selectCommentBySpaceId',{commentSpaceId:this.space.publishId,pageStart:0,pageEnd:9999}).then(response=>{
  this.allComments = response.data;
  this.$bus.$emit('spaceLoading',false,"评论加载中..");
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
    align-items: center;
    margin-top: 15px;
    margin-bottom: 10px;
}

</style>