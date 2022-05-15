// 好友列表界面
<template>
      <!-- 包裹div -->
      <div class="mainbody">
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
          <friendlistitem></friendlistitem>
      </div>
</template>

<script>
import friendlistitem from './friendlistitem.vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friendlist',
    components:{friendlistitem},
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