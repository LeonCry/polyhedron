// 最近聊天界面
<template>
      <!-- 包裹div -->
      <div class="mainbody">
          <friendrecentitem></friendrecentitem>
          <friendrecentitem></friendrecentitem>
          <friendrecentitem></friendrecentitem>
      </div>
</template>

<script>
import friendrecentitem from './friendrecentitem.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friendrecent',
    components:{friendrecentitem},
}
</script>

<style scoped>
.mainbody{
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    overflow-x:hidden;
    overflow-y: auto;
    width: 100%;
    height: 430px;
    margin-top: 10px;
}
</style>