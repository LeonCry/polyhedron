// 搜索好友 @change后界面
<template>
      <!-- 包裹div -->
      <div class="mainbody">
          <button class="quitbutton" @click="quitSearchAddPage">
              <img src="../assets/rightnrror.svg" alt="">
          </button>
          <br>
          <span>查找到以下用户:</span>
          <hr class="hr">
          <searchfrienditem v-for="friend of searchFriends" :key="friend.friendId" :friendProps="friend"></searchfrienditem>
      </div>
</template>

<script>
import searchfrienditem from './searchfrienditem.vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'searchpage',
    components:{searchfrienditem},
    data(){
        return{
            searchFriends:[],
        }
    },
    methods:{
        // 退出该搜索页面
        quitSearchAddPage(){
            this.$bus.$emit('quitSearchPage',false,false);
        }
    },
    mounted(){
        // 接收搜索界面发送来的搜索结果
        this.$bus.$on('friendSearchResult',(data)=>{
            this.searchFriends = data;
        });
    },
}
</script>

<style scoped>
.mainbody{
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    overflow-x:hidden;
    overflow-y: auto;
    width: 100%;
    background-color: rgba(61, 61, 61,0.9);
    top: 30px;
    border-radius: 15px;
    height: 565px;
    color: pink;
    margin-top: 10px;
    z-index: 6;
}
.hr{
    margin-top: 10px;
    margin-bottom: 10px;
    border: rgba(255, 192, 203,0.5) 0.1px solid;
}
.quitbutton{
  position: relative;
  width: 100%;
  height: 30px;
  cursor: pointer;
  text-align: center;
  background-color: darkgray;
  color: pink;
  transition: 0.55s;
  margin-top: 1px;
  border: 0;
}
.quitbutton:hover{
    background-color: rgba(61, 61, 61,1);
    color: white;
}
.quitbutton img{
    transform: rotate(-90deg);
}
</style>