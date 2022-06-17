/* eslint-disable vue/use-v-on-exact */
// 聊天组件
<template>
<!-- 聊天盒子 -->
<transition name="chatboxT">
  <div class="chatbox">
      <!-- 抬头 -->
      <div class="toper">
          <!-- 名字 -->
          <span v-show="chatUserName2">
            <span v-show="chatUserName1">{{chatUserName1}}</span>
            与
            <span v-show="chatUserName2">{{chatUserName2}}</span>
            的聊天记录
          </span>
          <!-- 退出按钮 -->
      </div>
      <!-- 内容 -->
      <div class="content">
          <!-- 聊天栏  包含了所有的人的聊天内容 -->
          <div ref="chatters" class="chatter" >
              <chat-loading></chat-loading>
              <chatser-item :friendProp="friend" :chatProp="chat" :baseUserProp="baseUser" v-for="chat of receiveChatsSum" :key="chat.chatId" :id="chat.chatId"></chatser-item>
          </div>
      </div>
  </div>
</transition>
</template>

<script>
import ChatLoading from '@/components/chatLoading.vue';
import { mapState } from 'vuex';
import ChatserItem from './chatserItem.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chatsBox",
  components:{ChatserItem, ChatLoading},
  data(){
      return{
    // 数据请求到的聊天json list sum
    receiveChatsSum:[],
    // 仅一次请求获得的聊天json list sum
    receiveChats:[],
    chatUserName1:'',
    chatUserName2:'',
    sendUserQQ:'',
    receiveUserQQ:'',
    friend:'',
    baseUser:'',
      }
  },
  computed:{
      ...mapState('userInfo',['user','socket','allusers']),
  },
  methods:{

        // 判断滚动条是否滑动到了顶部
        isScrollTop(){
            if(this.$refs.chatters.scrollTop==0){
                // 开启加载
                this.$bus.$emit('chatLoading',true,"加载聊天记录中..");
                // 先移除事件监听
                this.$refs.chatters.removeEventListener('scroll',this.isScrollTop);
                // 记录下未发请求前的scroll高度
                var scrollHighBefore = this.$refs.chatters.scrollHeight;
                // 请求聊天记录--一次请求20条聊天记录
                var start = this.receiveChatsSum.length;
                var end =  20;
                this.$axios.post('/api/selectChats',{sendUserQQ:this.sendUserQQ,receiveUserQQ:this.receiveUserQQ,pageStart:start,pageEnd:end}).then(response=>{
                console.log(response.data);
                this.$bus.$emit('receiveChatBack',response.data);
                // 停止加载
                this.$bus.$emit('backRightLoading',false,"加载聊天记录中..");
                // 如果已经没有数据了
                if(response.data==''){
                    this.$message.error('已经到头啦');
                    setTimeout(() => {
                        this.$bus.$emit('chatLoading',false,"已经到头啦");
                    }, 2500);
                }

                //再添加事件监听
                setTimeout(() => {
                // 在记录下当前已发送请求后的高度
                var scrollHighAfter = this.$refs.chatters.scrollHeight;
                // 则当前高度为两者之差
                this.$refs.chatters.scrollTop = scrollHighAfter - scrollHighBefore;
                   this.$refs.chatters.addEventListener('scroll',this.isScrollTop); 
                }, 10);
            },error=>{
                console.log(error.message);
                
            });    

            }
            
        },
        // 加载聊天记录
       async loadingChats(){
            var start = this.receiveChatsSum.length;
            var end =  20;
                this.$bus.$emit("backRightLoading", true, "加载中");
              await  this.$axios.post('/api/selectChats',{sendUserQQ:this.sendUserQQ,receiveUserQQ:this.receiveUserQQ,pageStart:start,pageEnd:end}).then(response=>{
                    console.log(response.data);
                    this.$bus.$emit('receiveChatBack',response.data);
                    console.log("loading chats.....",this.receiveChatsSum.length);
                }),
                error=>{
                    console.log(error.message);
                }
                    this.$bus.$emit("backRightLoading", false, "加载中");
        },
        // 查询聊天记录并定位
       async findOneChatst(id){
           console.log("id:",id);
           let length = this.receiveChatsSum.length;
           let dda = 0;
            for (let index = 0; index < length; index++) {
                const chat = this.receiveChatsSum[index+dda];
                console.log("正在搜索: 第",index,"个,chatId为",chat.chatId,"长度为:",length);              
                if(chat.chatId==id){
                    console.log("finded!");
                    if(dda<0){
                        this.$bus.$emit('clickAgainBack');
                    }
                    // 让该条信息高亮显示
                    this.$bus.$emit('highLightShowBack',id);
                    break;
                }
                else if(index==this.receiveChatsSum.length-1){
                    var start = this.receiveChatsSum.length;
                    var end =  length;
                    length = length + length;
                    dda = dda - length;
                    await this.$axios.post('/api/selectChats',{sendUserQQ:this.baseUser.userQQ,receiveUserQQ:this.friend.friendQQ,pageStart:start,pageEnd:end}).then(
                        response=>{
                        this.$bus.$emit('receiveChatBack',response.data);
                        console.log("loading chats.....",length);
                })
                }
            }
        },

  },
  mounted(){
        // 滚动条滚动到顶部的触发函数
        this.$refs.chatters.addEventListener('scroll',this.isScrollTop);

        // 接收响应显示聊天
        this.$bus.$on('showChats',(theUser,friend)=>{
            this.chatUserName1 = theUser.userName;
            this.chatUserName2 = friend.friendName;
            this.sendUserQQ = theUser.userQQ;
            this.receiveUserQQ = friend.friendQQ;
            this.baseUser = theUser;
            this.friend = friend;
            this.receiveChatsSum = [];
                setTimeout(() => {
                    this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
                }, 50);
            this.loadingChats();

        }),

        // 接收聊天记录
        this.$bus.$on('receiveChatBack',(data)=>{
            this.receiveChats = [];
            this.receiveChats = data;
            this.receiveChats.forEach(chat => {
               this.receiveChatsSum.unshift(chat); 
            });
            
        })

        // 查询聊天记录并定位
        this.$bus.$on('findOneChatsBack',(id)=>{
            this.findOneChatst(id);
        })
      },


      beforeDestroy(){
      }
};
</script>

<style scoped>
/* 聊天界面box */
.chatbox{
    position:relative;
    width: 100%;
    height: 650px;
    display: flex;
    flex-flow: column nowrap;
    font-size: 2vh;
    color: black;
    background-color:rgba(0, 0, 0, 0);
    border-radius: 15px;
}
/* 抬头 */
.toper{
    position: relative;
        width: 100%;
        height: 55px;
        border-radius: 15px 15px 0 0;
        display: flex;
        transition: 0.55s;
        flex-flow: row nowrap;
        background-color: rgba(47, 53, 66,0.25);
}   
.toper:hover{
  background-color: rgba(99, 110, 114, 0.2);
}
/* 用户名字 */
.toper > span{
    line-height: 55px;
    flex: 1;
    text-align: center;
}

/* 中间聊天框+选项框 */
.content{
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 465px;
}
/* 左边聊天框 */
.chatter{
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: left;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    flex: 10;
}
/* 聊天搜索框 */
.chatsSearch{
    position: relative;
    height: 465px;
    flex: 4;
    transition: 0.55s;
    border-left:2.5px solid rgba(255, 255, 255, 0.1);
}

</style>