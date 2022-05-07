// 评论box组件
<template>
  <div class="commentbox">
      <!-- 评论者 -->
      <comments></comments>
      <!-- 回复者 -->
      <reply></reply>
      <reply></reply>
      <reply></reply>
      <reply></reply>
      <!-- 评论者 -->
      <comments></comments>
      <!-- 回复者 -->
      <reply></reply>
      <reply></reply>
      <reply></reply>
      <reply></reply>
  </div>
</template>

<script>
import comments from './comments.vue'
import Reply from './reply.vue'
export default {
  components: { comments, Reply },
// eslint-disable-next-line vue/multi-word-component-names
name:'commentbox',
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