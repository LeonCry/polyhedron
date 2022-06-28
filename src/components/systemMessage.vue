// 系统提示[例如:添加好友通知,动态通知]
<template>
    <transition name="frienditemT" appear>
  <div v-show="isShow" class="frienditem" @dblclick="systemPageShow">
      <!-- 头像 -->
      <img src="../assets/systemHead.svg" alt="">
      <!-- 网名,个签内容物 -->
      <div class="content">
          <!-- 名字和签名 -->
          <div class="nameandsign">
              <!-- 名字 -->
              <div class="username">
                  <!-- 用户名 -->
                  <span>系统通知</span>
                  <!-- 互粉信息 -->
                  <img :class="{react:NoticeNumber!=0}" src="../assets/systemmessage.svg" alt="铃声">
              </div>
              <!-- 个性签名 -->
              <div class="signs">
                  <span>{{noticeMessage}}</span>
              </div>
          </div>
          <!-- 个人空间 -->
          <div class="starspace">
              <span v-show="NoticeNumber!=0">{{NoticeNumber}}</span>
          </div>
      </div>
  </div>
  </transition>
</template>


<script>
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'systemMessage',
    data(){
        return{
            isShow:false,
            // 空间展示
            isSpaceShow:false,
            NoticeNumber:0,
            noticeMessage:'暂无新消息.',
            // 是否摇晃
            isReact:false,
        }
    },
    computed:{
        ...mapState('userInfo',['user']),
    },
    methods:{
        // 显示聊天框
        systemPageShow(){
            // 向chats组件发送数据,显示聊天框
            this.$bus.$emit('systemPageShow',true);
             // 总消息数-
            let totalMessageNum = Number(localStorage.getItem(":totalMessage:" + this.user.userQQ));
             localStorage.setItem(":totalMessage:" + this.user.userQQ,totalMessageNum - this.NoticeNumber);
             this.$bus.$emit('messageNotice');
            // SYS消息数清零
            this.NoticeNumber = 0;
            localStorage.removeItem("sysNotices::" + this.user.userQQ);
            localStorage.removeItem("sysNoticesContent::" + this.user.userQQ);
            this.noticeMessage = "暂无新消息.";

        },
        // 初始化系统消息通知数
        NoticeMessageInit(){
            setTimeout(() => {
            if(localStorage.getItem("sysNoticesContent::" + this.user.userQQ)!=null){
                this.noticeMessage = localStorage.getItem("sysNoticesContent::" + this.user.userQQ);
            }  
            let oriNumber = 0;
            if(localStorage.getItem("sysNotices::" + this.user.userQQ)!=null){
                oriNumber = Number(localStorage.getItem("sysNotices::" + this.user.userQQ));
            }
            this.NoticeNumber = oriNumber;
            }, 100);

        },
    },
    mounted(){
        // this.NoticeMessageInit();
        // 接收friends组件数据,进行页面切换效果
        this.$bus.$on('functionchange',(data1,data2)=>{
            this.isShow = data2;
        })
        // 接收消息,添加系统通知消息数
        this.$bus.$on('sysNoticeMessage',(num,text)=>{
            this.noticeMessage = text;
            localStorage.setItem("sysNoticesContent::" + this.user.userName,this.noticeMessage);
            // 总信息数
            if(localStorage.getItem(":totalMessage:" + this.user.userQQ)==null){
                localStorage.setItem(":totalMessage:" + this.user.userQQ,1);
            }
            else if(localStorage.getItem(":totalMessage:" + this.user.userQQ)!=null){
                let totalMessageNum = Number(localStorage.getItem(":totalMessage:" + this.user.userQQ));
                 localStorage.setItem(":totalMessage:" + this.user.userQQ,totalMessageNum + 1);
            }
            // 局部信息数
            if(localStorage.getItem("sysNotices::" + this.user.userQQ)==null){
                localStorage.setItem("sysNotices::" + this.user.userQQ,1);
                this.NoticeNumber = 1;
            }
            else if((localStorage.getItem("sysNotices::" + this.user.userQQ)!=null)){
                localStorage.setItem("sysNotices::" + this.user.userQQ,this.NoticeNumber + num);
                this.NoticeNumber = Number(localStorage.getItem("sysNotices::" + this.user.userQQ));
            }
            this.$bus.$emit('messageNotice');
        })
    },
    created(){
        this.NoticeMessageInit();
    },
    
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
    color: rgba(255, 255, 255, 0.7);
    border-radius: 50px 0 0 50px;
    background-color: rgba(255, 172, 247, 0.1);
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
.react{
    animation: wobble-hor-top 2s both infinite;
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
    transition: 0.25s;
    display: flex;
    height: 20px;
    overflow: hidden;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.signs:hover{
    background-color: white;
    color: black;
    border-radius: 5px;
    height: 100px;
    overflow-y: auto;
}

/* 消息通知 */
.starspace{
    position: relative;
    flex: 0;
    height: 20px;
    transition: 0.55s;
    margin-top: 25px;
    display: flex;
    flex: 1;
    opacity: 1;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

/* 更改字体滑过时鼠标 */
span{
    cursor: default;
}
.starspace span{
    background-color: rgba(242, 63, 63, 0.885);
    border-radius: 25px;
    max-width: 30px;
    min-width: 20px;
    text-align: center;
    height: 20px;
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
@keyframes wobble-hor-top {
  0%,100%{
    -webkit-transform:  rotate(0);
            transform:  rotate(0);
    -webkit-transform-origin: top;
            transform-origin: top;
  }
  10% {
    -webkit-transform:  rotate(20deg);
            transform: rotate(20deg);
  }
  20% {
    -webkit-transform:  rotate(-20deg);
            transform: rotate(-20deg);
  }
  30% {
    -webkit-transform:  rotate(12deg);
            transform: rotate(12deg);
  }
  40% {
    -webkit-transform:  rotate(-12deg);
            transform: rotate(-12deg);
  }
  50% {
    -webkit-transform:  rotate(5deg);
            transform:  rotate(5deg);
  }
  60%{
        -webkit-transform:  rotate(-5deg);
            transform:  rotate(-5deg);
  }
}

</style>