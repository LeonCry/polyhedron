// 在最近聊天中的每个好友
<template>
<transition name="frienditemT" appear>
  <div v-show="isShow" class="frienditem"  @dblclick="chatboxAppear">
      <!-- 头像 -->
      <img v-if="userInfos.userHead" :src="require(`../assets/Heads/${userInfos.userHead}`)" alt="头像">
      <!-- 网名,个签内容物 -->
      <div class="content">
          <!-- 名字和签名 -->
          <div class="nameandsign">
              <!-- 名字 -->
              <div class="username">
                  <!-- 用户名 -->
                  <span style="overflow:hidden">{{userInfos.userName}}</span>
                  <!-- 最后消息时间 -->
                  <span style="overflow:hidden">{{new Date(parseInt(chatTimes))
                .toLocaleString()
                .slice(5)}}</span>
                  <!-- 消息数目 -->
                 <span v-show="messageNums!=0" class="messagenum">{{messageNums}}</span>
              </div>
              <!-- 聊天内容 -->
              <div class="chats">
                  <span style="overflow:hidden" ref="chatContents"></span>
              </div>

          </div>
          <!-- 个人空间 -->
          <div class="starspace">
              <img src="../assets/delete.svg" alt="删除" @click="deleteThis">
          </div>
      </div>
  </div>
</transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friendrecentitem',
    props:['recentProps'],
    data(){
        return{
            isShow:true,
            recentInfo:this.recentProps,
            // 用户信息
            userInfos:'',
            // 聊天内容
            chatMessage:this.recentProps.chatContent,
            // 聊天时间
            chatTimes:Date.now(),
            // 聊天未读
            messageNums:0,
            // friend
            friend:'',
        }
    },
    computed:{
        ...mapState('userInfo',['user']),
    },
    methods:{
        // 显示聊天框
        chatboxAppear(){
            // 向chats组件发送数据,显示聊天框
            this.$bus.$emit('chatboxappear',true);
            this.$bus.$emit('toChatBox',this.friend);
            console.log("this.friendrecent",this.friend);
            this.returnChats();
 
            this.messageNums = 0;
            // 本地存储,设置为0
            localStorage.setItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ,0);
            // 当此处的聊天数改变了的时候,最近聊天处也会改变
            this.$bus.$emit('chatMessageChange1',{friendQQ:this.userInfos.userQQ,userQQ:this.user.userQQ});
        },
        // 删除最近聊天
        deleteThis(){
            // 删除最近聊天
        },
        // 诞生-查询其用户信息
        requestForUserInfo(friendUserQQ){
            this.$axios.post('/api/getUser',{userQQ:friendUserQQ}).then(response=>{
                this.userInfos = response.data;
                this.$axios.post('/api/getOneFriends',{userQQ:this.user.userQQ,friendQQ:this.userInfos.userQQ}).then(response=>{
                this.friend = response.data;
                console.log(response.data);
            },error=>{
                console.log(error.message);
            });
            
            },error=>{
                console.log(error.message);
            });
            
        },
         // 发送请求,返回聊天记录
        returnChats(){
            this.$axios.post('/api/selectChats',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.userInfos.userQQ,pageStart:0,pageEnd:20}).then(response=>{
                console.log(response.data);
                this.$bus.$emit('receiveChat',response.data);
            },error=>{
                console.log(error.message);
                
            });

        },
        // 初始化判断聊天未读消息数
        NotReadMessageNumCreated(){
            setTimeout(() => {
            if(localStorage.getItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ)==null){
            this.messageNums=0;
                 }
            else{
            this.messageNums = localStorage.getItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ);
                }                
            }, 10);
        },

// 展示未读消息
        showMessageNum(data){
            // 如果发送方是目前组件对应的用户,接收方是我本人,则添加一条未读消息
            if(data.sendUserQQ==this.userInfos.userQQ && data.receiveUserQQ == this.user.userQQ){
                this.messageNums++;
                // 本地存储,就不存到数据库上了
                localStorage.setItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ,this.messageNums);
            }
        },

    },
    mounted(){
        // 初始化
        this.$refs.chatContents.innerHTML = this.recentProps.chatContent;
        // 接收friends组件数据,进行页面切换效果
        this.$bus.$on('functionchange',(data1)=>{
            this.isShow = data1;
        })
        // 接收socket消息
        this.$bus.$on('getSocketMessage',(data)=>{
            // 文本截取,防止溢出
            this.$refs.chatContents.innerHTML = data.text;
            // if(this.$refs.chatContents.innerHTML.length>=11){
            //     this.$refs.chatContents.innerHTML = this.$refs.chatContents.innerHTML.substring(0,10)+'...';
            // }
      //  如果是给我的消息
      if(data.to==this.user.userQQ && data.from==this.userInfos.userQQ){
          this.chatMessage = data.text;
          this.chatTimes = Date.now();
         }})


        // 接收APP组件消息,以展示未读消息
        this.$bus.$on('MessageNums',(data)=>{
            if(data.sendUserQQ==this.userInfos.userQQ){
            this.showMessageNum(data);
            }
        })
        // 最近聊天和好友列表互相通信
        this.$bus.$on('chatMessageChange2',(data)=>{
            if(data.friendQQ==this.userInfos.userQQ && data.userQQ==this.user.userQQ)
            this.messageNums = 0;
            // 本地存储,设置为0
            localStorage.setItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ,0);
        })
    },
    created(){
        // 在诞生的时候就进行一个数据库请求,查询其用户信息
        this.requestForUserInfo(this.recentInfo.sendUserQQ);
        
    // 初始化判断
     this.NotReadMessageNumCreated();
    }
}
</script>

<style scoped>
/* 单个好友 */
.frienditem{
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    margin-top: 5px;
    margin-bottom: 10px;
    transition: 0.55s;
    height: 60px;
    font-size: 1.6vh;
    color: rgba(255, 255, 255, 0.7)
}
.frienditem:hover{
    background-color: rgba(61, 61, 61,1.0);
    border-radius: 50px 0 0 50px;
    box-shadow: -8px 0 25px rgba(61, 61, 61, 1);
    color:white;
}
/* 头像 */
.frienditem > img{
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 50px;
    margin-left:2.5px;
    border: 5px solid rgba(61, 61, 61, 1);
}
/* 网名,个签内容物 */
.content{
    position: relative;
    width:220px;
    display: flex;
    flex-flow: row nowrap;
    height: 55px;
}
/* 更改名字和签名的长度 */
.content:hover .nameandsign{
    flex: 4;
}
/* 更改个人空间 */
.content:hover .starspace{
    cursor: pointer;
    flex: 1;
    opacity: 1;
}
/* 名字和签名 */
.nameandsign{
    position: relative;
    flex: 4;
    display: flex;
    flex-flow: column nowrap;
    transition: 0.55s;
    margin-left: 10px;
    height: 55px;
}
/* 用户名字 */
.username{
    margin-top: 5px;
    position: relative;
    display: flex;
    height: 20px;
    flex-flow: row nowrap;
    justify-content: space-between;
}
/* 个性签名 */
.chats{
    position: relative;
    margin-top: 10px;
    display: flex;
    height: 20px;
    flex-flow: row nowrap;
    justify-content: space-between;
}
/* 消息个数样式 */
.messagenum{
    position: absolute;
    background-color: rgba(242, 63, 63, 0.885);
    left: -25px;
    border-radius: 25px;
    max-width: 30px;
    min-width: 20px;
    font-weight: bold;
    text-align: center;
    height: 20px;
}

/* 个人空间 */
.starspace{
    position: relative;
    flex: 0;
    opacity: 0;
    height: 20px;
    transition: 0.55s;
    margin-top: 25px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border-left: 2px solid white;
}
/* 个人空间hover时img的变化 */
.starspace > img{
    transition: 1s;
}
.starspace:hover > img{
  border-radius: 50%;
  background-color: rgb(255, 192, 203,0.45);
  box-shadow: 0 0 20px pink;
}
/* 更改字体滑过时鼠标 */
span{
    cursor: default;
}
/* 好友个体进入退出动画 */
.frienditemT-enter-active{
    animation: slide-in-blurred-right 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.frienditemT-leave-active{
    animation: slide-in-blurred-right 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000) both reverse; 
}
/* 好友个体进入退出动画 */
@keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(200px) scaleX(2.5) scaleY(0.2);
            transform: translateX(200px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
</style>