// 添加好友时,出现的单个好友item
<template>
    <transition name="frienditemT" appear>
        <div>
  <div v-show="isShow" class="frienditem">
      <!-- 头像 -->
      <img :src="require(`../assets/Heads/${getUser.userHead}`)" alt="">
      <!-- 网名,个签内容物 -->
      <div class="content">
          <!-- 名字和签名 -->
          <div class="nameandsign">
              <!-- 名字 -->
              <div class="username">
                  <!-- 用户名 -->
                  <span>{{getUser.userName}}</span>
              </div>
              <!-- 个性签名 -->
              <div class="signs">
                  <span>{{getUser.userSign}}</span>
              </div>
          </div>
          <!-- 个人空间 -->
          <div class="starspace">
              <img src="../assets/space.svg" alt="空间" @click="enterHerSpace">
               <img src="../assets/add.svg" alt="添加" @click="showAddMessage">
          </div>
      </div>
  </div>
      <!-- 添加附言 -->
       <transition name="writeremarksT">
      <div v-show="isAddMessageShow" class="addMessagebox">
          <input type="text"  placeholder="添加留言.." v-model="addMessage">
          <button @click="sendAddRequest">发送</button>
      </div>
       </transition>
  </div>
  </transition>
</template>


<script>
import { mapState } from 'vuex';
export default {
    props:['userProp'],
    // eslint-disable-next-line vue/multi-word-component-names
    name:'addfrienditem',
    data(){
        return{
            isShow:true,
            // 空间展示
            isSpaceShow:false,
            // 用户
            getUser:this.userProp,
            // 添加留言内容
            addMessage:'',
            // 是否添加留言展示
            isAddMessageShow:false,
        }
    },
    computed:{
        ...mapState('userInfo',['user']),

    },
    methods:{
        // 进入她的空间
        enterHerSpace(){
            // 向starspace组件发送数据,显示聊天框
            this.$bus.$emit('spaceappear',true,false);
        },
        // 发送好友请求
        sendAddRequest(){
            this.isAddMessageShow = false;
            // 如果是自己给自己发送请求
            if(this.user.userQQ==this.getUser.userQQ){
                this.$bus.$emit('friendNotice',false,"不可以向自己发送好友请求");
                this.addMessage = '';
                return 0;
            }
            // loading 加载
            this.$bus.$emit('searchAddLoading',true,"发送好友请求中..");
            // 向服务器发送添加好友请求
            var data = {"sendUserQQ":this.user.userQQ,"receiveUserQQ":this.getUser.userQQ,"noticeType":1,"remarks":this.addMessage,"noticeTime":Date.now()};
            this.addMessage = '';
            this.$axios.post('api/addOneNotice',data).then(
                response=>{
                    // 已发送过请求
                    this.$bus.$emit('searchAddLoading',false,"发送好友请求中..");
                    if(response.data==-1){
                        this.$bus.$emit('friendNotice',false,"您已向TA发送过好友请求了");
                    }
                    else if(response.data==-2){
                        this.$bus.$emit('friendNotice',false,"对方已向你发送好友请求了");
                    }
                    else if(response.data==-3){
                        this.$bus.$emit('friendNotice',false,"你们已经成为好友啦");
                    }
                    else{
                        console.log("添加好友:",response.data);
                        this.$bus.$emit('friendNotice',true,"已向TA发送好友请求~");
                    }
                },
                error=>{
                    console.log(error.Message);
                    this.$bus.$emit('searchAddLoading',false,"发送好友请求中..");
                    this.$bus.$emit('friendNotice',false,error.Message);
                    
                });
            





        },
        // 展示addmessage框
        showAddMessage(){
            this.isAddMessageShow = !this.isAddMessageShow;
        }
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

/* 个人空间 */
.starspace{
    position: relative;
    flex: 0;
    opacity: 0;
    height: 20px;
    transition: 0.55s;
    margin-top: 25px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}
/* 个人空间hover时img的变化 */
.starspace > img:nth-of-type(1){
    position: relative;
    cursor: pointer;
    transition: 1s;
    right: 20px;

}
.starspace > img:nth-of-type(2){
    position: relative;
    cursor: pointer;
    transition: 1.5s;
    right: 5px;
    
}
.starspace:hover > img:nth-of-type(1){
    transform: rotateZ(720deg);
    border-radius: 50%;
    background-color: darkgoldenrod;
    box-shadow: 0 0 15px yellow;
    animation: color-breath 3s both infinite ease;
}
.starspace:hover > img:nth-of-type(2){
    transform: rotateZ(-720deg);
}
/* 更改字体滑过时鼠标 */
span{
    cursor: default;
}

/* 发送留言样式 */
.addMessagebox{
    position: relative;
    right: 0;
    width: 100%;
    flex-flow: row nowrap;
    height: 35px;
    transition: 0.55s;
    border-radius: 20px;
    background-color: #1A191B;
    box-shadow: -8px 0 25px rgba(0, 0, 0, 0.7);
}   
/* 输入框 */
.addMessagebox input{
  border: 0;
  outline: 0;
  padding: 10px;
  padding-left: 30px;
  transition: 0.5s;
  background-color: rgba(0, 0, 0, 0);
  font-size: 1.6vh;
  color: white;
}
.addMessagebox input:focus {
  font-size: 1.7vh;
  color: greenyellow;
}
.addMessagebox button{
  position: absolute;
  align-self: center;
  width: 50px;
  height: 100%;
  left: 125px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 1.6vh;
  font-weight: normal;
  cursor: pointer;
  color: white;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
  margin-left: 38%;
}
.addMessagebox button:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.5);
  background-color: rgba(99, 110, 114, 0.33);
}

/* 写附言进入退出动画 */
.writeremarksT-enter-active{
    animation: slide-in-blurred-left 0.45s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}
.writeremarksT-leave-active{
    animation: slide-in-blurred-right 0.35s cubic-bezier(0.230, 1.000, 0.320, 1.000) both reverse;
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
 @keyframes color-breath {
      0%{
          box-shadow: 0 0 5px yellow;
          background-color: rgba(184, 134, 11,0);
      }
      5%{
          box-shadow: 0 0 6.5px yellow;
          background-color: rgba(184, 134, 11,0.15);
      }
      10%{
          box-shadow: 0 0 7.5px yellow;
          background-color: rgba(184, 134, 11,0.25);
      }
      15%{
          box-shadow: 0 0 8.5px yellow;
          background-color: rgba(184, 134, 11,0.35);
      }
      20%{
          box-shadow: 0 0 9px yellow;
          background-color: rgba(184, 134, 11,0.4);
      }
      25%{
          box-shadow: 0 0 10px yellow;
          background-color: rgba(184, 134, 11,0.5);
      }
      30%{
          box-shadow: 0 0 11.5px yellow;
          background-color: rgba(184, 134, 11,0.65);
      }
      35%{
          box-shadow: 0 0 12.5px yellow;
          background-color: rgba(184, 134, 11,0.75);
      }
      40%{
          box-shadow: 0 0 13.5px yellow;
          background-color: rgba(184, 134, 11,0.85);
      }
      45%{
          box-shadow: 0 0 14.5px yellow;
          background-color: rgba(184, 134, 11,0.9);
      }
      50%{
          box-shadow: 0 0 15px yellow;
          background-color: darkgoldenrod;
      }
      55%{
          box-shadow: 0 0 14.5px yellow;
          background-color: rgba(184, 134, 11,0.9);
      }
      60%{
          box-shadow: 0 0 13.5px yellow;
          background-color: rgba(184, 134, 11,0.85);
      }
      65%{
          box-shadow: 0 0 12.5px yellow;
          background-color: rgba(184, 134, 11,0.75);
      }
      70%{
          box-shadow: 0 0 11.5px yellow;
          background-color: rgba(184, 134, 11,0.65);
      }
      75%{
          box-shadow: 0 0 10px yellow;
          background-color: rgba(184, 134, 11,0.5);
      }
      80%{
          box-shadow: 0 0 9px yellow;
          background-color: rgba(184, 134, 11,0.4);
      }
      85%{
          box-shadow: 0 0 8.5px yellow;
          background-color: rgba(184, 134, 11,0.35);
      }
      90%{
          box-shadow: 0 0 7.5px yellow;
          background-color: rgba(184, 134, 11,0.25);
      }
      95%{
          box-shadow: 0 0 6.5px yellow;
          background-color: rgba(184, 134, 11,0.15);
      }
      100%{
          box-shadow: 0 0 5px yellow;
          background-color: rgba(184, 134, 11,0);
      }






  }
@keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-200px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-200px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
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