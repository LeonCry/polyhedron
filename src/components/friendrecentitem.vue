// 在最近聊天中的每个好友
<template>
<transition name="frienditemT" appear>
  <div v-if="isShow" class="frienditem"  @dblclick="chatboxAppear">
      <!-- 头像 -->
      <img v-if="userInfos.userHead" :src="require(`../assets/Heads/${userInfos.userHead}`)" alt="头像" :class="{online:isOnline,offline:!isOnline}">
      <!-- 网名,个签内容物 -->
      <div class="content">
          <!-- 名字和签名 -->
          <div class="nameandsign">
              <!-- 名字 -->
              <div class="username">
                  <!-- 用户名 -->
                  <span style="overflow:hidden">{{userInfos.userName}}<span v-show="remakeName"> ({{remakeName}})</span></span>
                  <!-- 最后消息时间 -->
                  <span style="overflow:hidden">{{new Date(parseInt(chatTimes))
                .toLocaleString()
                .slice(5)}}</span>
                  <!-- 消息数目 -->
                 <span v-show="messageNums!=0" class="messagenum">{{messageNums}}</span>
              </div>
              <!-- 聊天内容 -->
              <div class="chats">
                  <span style="overflow:hidden" ref="chatContents">{{chatMessage}}</span>
              </div>

          </div>
          <!-- 个人空间 -->
          <div class="starspace">
              <img src="../assets/delete.svg" alt="删除" @click="deleteThis" ref="del">
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
            chatMessage:'',
            // 聊天时间
            chatTimes:Date.now(),
            // 聊天未读
            messageNums:0,
            // friend
            friend:'',
            datas:{},
            // 备注名
            remakeName:'',
            isOnline:false,
        }
    },
    computed:{
        ...mapState('userInfo',['user','allusers']),
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
            console.log("has deleted");
            this.isShow = false;     
            // 本地化存储
            let localSave =  JSON.parse(localStorage.getItem(':allRecent:'+this.user.userQQ));
            for (let index = 0; index < localSave.length; index++) {
                const save = localSave[index];
                if(save.sendUserQQ==this.userInfos.userQQ){
                    localSave.splice(index,1);
                    break;
                }
            }
            localStorage.setItem(':allRecent:'+this.user.userQQ,JSON.stringify(localSave));
            // 改变本地化存储该通知信息条数
            let localMessageNum = Number(localStorage.getItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ));
            let totalMessageNum = Number(localStorage.getItem(':totalMessage:'+this.user.userQQ));
            // 局部消息改变
            localStorage.setItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ,0);
            // 局部消息数变为0
            this.$bus.$emit('messagetozero',{friendQQ:this.userInfos.userQQ,userQQ:this.user.userQQ});
            // 全局消息数改变
            localStorage.setItem(':totalMessage:'+this.user.userQQ,totalMessageNum-localMessageNum);
            // 显示全局消息数
            this.$bus.$emit('messageNotice');
            // 删除最近聊天
            this.$bus.$emit('deleteRencent',{friendQQ:this.userInfos.userQQ});
        },
        // 诞生-查询其用户信息
        requestForUserInfo(friendUserQQ){
            this.$axios.post('/api/getUser',{userQQ:friendUserQQ}).then(response=>{
                this.userInfos = response.data;
                this.$axios.post('/api/getOneFriends',{userQQ:this.user.userQQ,friendQQ:this.userInfos.userQQ}).then(response=>{
                this.friend = response.data;
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
                console.log("发送请求,返回聊天记录:",response.data);
                this.$bus.$emit('receiveChat',response.data);
            },error=>{
                console.log(error.message);
                
            });

        },
        
        //获取备注名
        getRemakeName(userQQ,friendQQ){
            this.$axios.post('/api/getOneFriends',{userQQ:userQQ,friendQQ:friendQQ}).then(response=>{
                if(response.data!=null){
                    this.remakeName = response.data.friendRemarkName;
                }
                else{
                    this.remakeName = '';
                }
            },error=>{
                console.log(error.message);
            });
            
        } ,

        // 组件初始化
        CommentCreated(){
        // 在诞生的时候就进行一个数据库请求,查询其用户信息
        this.requestForUserInfo(this.recentInfo.sendUserQQ); 
        this.getRemakeName(this.user.userQQ,this.recentProps.sendUserQQ);
        // 初始化显示聊天文字   
        setTimeout(() => {
            let message = JSON.parse(localStorage.getItem(":allRecent:"+this.user.userQQ));
            message.forEach(msg => {
                if(msg.sendUserQQ==this.recentInfo.sendUserQQ){
                    this.chatMessage = msg.chatContent;
                    this.$refs.chatContents.innerHTML = msg.chatContent;   
                }
            });
        }, 1000); 
        },
        // 在线确认
        onlineCheck(data){
            data.forEach(userf => {
                if(userf.username==this.recentProps.sendUserQQ){
                    console.log("userf",userf);
                    this.isOnline = true;
                }
                else{
                    this.isOnline = false;
                }
            });
        }

    },
    mounted(){
        // 初始化
        // this.$refs.chatContents.innerHTML = this.recentProps.chatContent;
        // 接收friends组件数据,进行页面切换效果
        this.$bus.$on('functionchange',(data1)=>{
            this.isShow = data1;
        })
        // 接收socket消息
        this.$bus.$on('getSocketMessage',(data)=>{
      //  如果是给我的消息
      if(data.to==this.user.userQQ && data.from==this.recentInfo.sendUserQQ){
          if(data.text.substring(0,11)!="A9wadv::NEW"){            
           this.isShow = true;
           console.log("its error!!!");
            // 文本截取,防止溢出
            setTimeout(() => {
          this.$refs.chatContents.innerHTML = data.text;
          this.chatMessage =  data.text;
          this.chatTimes = Date.now();
            }, 100);
         }

         else{
             this.isShow = false;
            //  如果是删除消息
             if(data.text=="A9wadv::NEW" + data.from + "已与你解除好友关系."){
                //  好友列表消失
                 this.$bus.$emit("refreshLists",false);
                //  // 最近聊天-消失
                this.$bus.$emit("deleteChats",{userQQ:this.user.userQQ,friendQQ:this.friend.friendQQ});
                // 对话框消失
                this.$bus.$emit("chatboxappear",false);
             }

         }
          }
})
        // 接收我发送的消息进行recent显示
        this.$bus.$on('mySendMessageOnRecent',(data)=>{     
            if(data.receiveUserQQ==this.recentInfo.sendUserQQ && data.userQQ==this.user.userQQ){
                if(data.message.substring(0,11)!="A9wadv::NEW"){
            setTimeout(() => {
               this.$refs.chatContents.innerHTML = data.message; 
            }, 100);
             this.chatMessage = data.message;
            }            
                }
        })
        // 最近聊天和好友列表互相通信
        this.$bus.$on('chatMessageChange2',(data)=>{
            if(data.friendQQ==this.userInfos.userQQ && data.userQQ==this.user.userQQ){
            this.messageNums = 0;
            // 本地存储,设置为0
            localStorage.setItem(':friend:'+this.userInfos.userQQ+':user:'+this.user.userQQ,0);
            }
        })
        //接收来自隔壁的未读消息数据的传递
        this.$bus.$on("friendToRecent",(data)=>{
            // {friendQQ:this.friend.user.userQQ,userQQ:this.user.userQQ,messageNums:this.messageNums}
            if(data.friendQQ==this.userInfos.userQQ && data.userQQ==this.user.userQQ){
                this.messageNums = data.messageNums;
                console.log("recentmessageNums:",this.messageNums);
                
            }
        });    
        // 转换时将新消息重新显示
        this.$bus.$on("messageOnload",()=>{
            setTimeout(() => {
           this.$refs.chatContents.innerHTML = this.chatMessage;     
            }, 100);
        })
        // 刷新备注名
        this.$bus.$on('remakeNameChange',(data)=>{
            if(data.friendQQ==this.recentInfo.sendUserQQ && data.userQQ==this.user.userQQ){
                this.getRemakeName(this.user.userQQ,this.recentInfo.sendUserQQ);
            }
        })
        // 初始化在线状态
        setTimeout(() => {
            this.onlineCheck(this.allusers);
        }, 1000);
        // 在线确认
        this.$bus.$on('refreshUsers',(data)=>{
            this.onlineCheck(data);
        })
        // 删除最近聊天
        this.$bus.$on('deleteChats',(data)=>{
            if(data.userQQ==this.recentProps.receiveUserQQ && data.friendQQ==this.recentProps.sendUserQQ){
                this.deleteThis(); 
            }
        })
   },
    created(){
    this.CommentCreated(); 
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
.offline{
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 50px;
    margin-left:2.5px;
    border: 4px solid rgba(61, 61, 61, 1);
}
.online{
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 50px;
    margin-left:2.5px;
    border: 4px solid lightgreen;
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