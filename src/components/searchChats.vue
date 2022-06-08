<template>
  <div class="searchChatsBox">

    <div class="writecomment">
    <input ref="searchInput" type="text" v-model="searchContent" placeholder="搜索聊天内容..">
    <button @click="searchIt">搜索</button>
    </div>

    <div class="searchResult">
        <chats-search-result v-for="result of searchResult" :key="result.chatId" :resultProps="result"></chats-search-result>
        <img class="empty" v-show="isEmpty" src="../assets/empty.svg" alt="空的">
    </div>

    <search-chats-loading></search-chats-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import chatsSearchResult from './chatsSearchResult.vue'
import SearchChatsLoading from './searchChatsLoading.vue'
export default {
  components: { chatsSearchResult, SearchChatsLoading },
name:'searchChats',
props:['friendProps'],
data(){
    return{
        friend:'',
        searchContent:'',
        searchResult:[],
        isEmpty:false,
    }
},
computed:{
    ...mapState('userInfo',['user']),
},
methods:{
    // 进行搜索
  async searchIt(){
        let result = {};
        let finish = false;
        let middResult = [];
        this.searchResult = [];
        if(this.searchContent==''){
            this.$bus.$emit('chatNotice',false,"搜索内容不可为空!")
        }
        else{
            this.$bus.$emit('searchChatsLoading',true,"搜索中..");
                await this.$axios.post('/api/selectChatsByContent',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,chatContent:this.searchContent}).then(
        response=>{
            if(response.data.length==0){
                this.$bus.$emit('searchChatsLoading',false,"搜索中..");
                this.isEmpty = true;
            }
            else{
                this.isEmpty = false;
                for (let index = 0; index < response.data.length; index++) {
                result = {};
                const chat = response.data[index];
                if(chat.sendUserQQ==this.friendProps.friendQQ){
                    result['chatId'] = chat.chatId;
                    result['chatContent'] = chat.chatContent;
                    result['sendUserQQ'] = chat.sendUserQQ;
                    result['chatTime'] = chat.chatTime;
                    result['searchContent'] = this.searchContent;
                    result['userHead'] = this.friendProps.user.userHead;
                    result['userName'] = this.friendProps.friendName;
                    result['remakeName'] = this.friendProps.friendRemarkName;
                }
                // 如果搜索到的发送方是我自己
                else if(chat.sendUserQQ==this.user.userQQ){
                    result['chatId'] = chat.chatId;
                    result['chatContent'] = chat.chatContent;
                    result['sendUserQQ'] = chat.sendUserQQ;
                    result['chatTime'] = chat.chatTime;
                    result['searchContent'] = this.searchContent;
                    result['userHead'] = this.user.userHead;
                    result['userName'] = this.user.userName;
                    result['remakeName'] = '';
                }
                middResult.unshift(result);
                // 判断是否完成
                if(response.data.length==middResult.length){
                    finish = true;
                }
            }       
            if(finish==true){
                this.searchResult = middResult;
                this.$bus.$emit('searchChatsLoading',false,"搜索中..");
            }
            }
        },error=>{
            console.log(error.message);
        });
        }
        
    },
},

mounted(){
    // 搜索按钮后展示
    this.$bus.$on('showSearchChats',(data)=>{
        this.friend = data;
        this.searchContent = '';
        this.searchResult = [];
        this.$nextTick(()=>{
           this.$refs.searchInput.focus(); 
        })
    })
}
}





</script>

<style scoped>

.searchChatsBox{
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    background-color: rgba(45, 52, 54,0.2);
}
/* 写评论 */
.writecomment{
    width: 85%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    align-self: center;
}
.writecomment input {
  position: relative;
  width: 75%;
  height: 30px;
  border: 0;
  outline: 0;
  margin-top: 20px;
  padding-left: 20px;
  transition: 0.55s;
  border-radius: 25px 0 0 25px;
  background-color: rgba(99, 110, 114, 0.2);
  font-size: 1.5vh;
  color: pink;
}
.writecomment input:focus {
  font-size: 1.6vh;
  background-color: rgba(99, 110, 114, 0.6);
  color: greenyellow;
}
/* 发表评论按钮 */
.writecomment button{
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
.searchResult{
    width: 90%;
    margin-top: 5%;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    height: 82%;
    align-self: center;
}
.empty{
  width: 50%;
  height: 50%;
  position: relative;
  left: 25%;
}
</style>