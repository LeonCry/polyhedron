// 在好友列表中的每个好友
<template>
    <transition name="frienditemT" appear>
  <div v-show="isShow" class="frienditem" @dblclick="chatboxAppear">
      <!-- 头像 -->
      <img :src="require(`../assets/Heads/${friend.user.userHead}`)" alt="头像">
      <!-- 网名,个签内容物 -->
      <div class="content">
          <!-- 名字和签名 -->
          <div class="nameandsign">
              <!-- 名字 -->
              <div class="username">
                  <!-- 用户名 -->
                  <span>{{friend.user.userName}} <span v-show="friend.friendRemarkName!=''"> ({{friend.friendRemarkName}})</span></span>
                  <!-- 消息数目 -->
                 <span class="messagenum">9</span>
              </div>
              <!-- 个性签名 -->
              <div class="signs">
                  <span>{{friend.user.userSign}}</span>
              </div>
          </div>
          <!-- 个人空间 -->
          <div class="starspace">
              <img src="../assets/space.svg" alt="空间" @click="enterHerSpace">
          </div>
      </div>
  </div>
  </transition>
</template>


<script>
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friendlistitem',
    props:['friendProp'],
    data(){
        return{
            isShow:false,
            // 空间展示
            isSpaceShow:false,
            // 好友item
            friend:this.friendProp,
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
            this.returnChats();
        },
        // 发送请求,返回聊天记录
        returnChats(){
            this.$axios.post('/api/selectChats',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,pageStart:0,pageEnd:20}).then(response=>{
                console.log(response.data);
                this.$bus.$emit('receiveChat',response.data);
            },error=>{
                console.log(error.message);
                
            });
            

        },

        // 进入她的空间
        enterHerSpace(){
            // 向starspace组件发送数据,显示聊天框
            this.$bus.$emit('spaceappear',true,false);
        },

    },
    mounted(){
        // 接收friends组件数据,进行页面切换效果
        this.$bus.$on('functionchange',(data1,data2)=>{
            this.isShow = data2;
        })
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
.signs{
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
    border-radius: 25px;
    max-width: 30px;
    left: -25px;
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
    transform: rotateZ(720deg);
    border-radius: 50%;
    background-color: darkgoldenrod;
    box-shadow: 0 0 15px yellow;
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