// 添加好友时,出现的单个好友item
<template>
    <transition name="frienditemT" appear>
        <div>
  <div v-show="isShow" class="frienditem">
      <!-- 头像 -->
      <img v-if="getUser.user.userHead" :src="require(`../../../HeadsAndBacks/Heads/${getUser.user.userHead}`)" alt="">
      <!-- 网名,个签内容物 -->
      <div class="content">
          <!-- 名字和签名 -->
          <div class="nameandsign">
              <!-- 名字 -->
              <div class="username">
                  <!-- 用户名 -->
                  <span>{{getUser.user.userName}}<span v-show="getUser.friendRemarkName">({{getUser.friendRemarkName}})</span></span>
              </div>
              <!-- 个性签名 -->
              <div class="signs">
                  <span>{{getUser.user.userSign}}</span>
              </div>
          </div>
      </div>
      <div>
        <input class="chekbox" type="checkbox" v-model="isSelect" @change="sendState">
      </div>
  </div>
  </div>
  </transition>
</template>


<script>
import { mapState } from 'vuex';
export default {
    props:['userProp'],
    // eslint-disable-next-line vue/multi-word-component-names
    name:'sharePeopleItem',
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
            isSelect:false,
        }
    },
    computed:{
        ...mapState('userInfo',['user','socket']),

    },
    methods:{
        // 当复选框变化时,发送消息给分享端,进行收集
        sendState(){
            // 若被选中
            if(this.isSelect){
                // true表示添加,false表示去除
                this.$bus.$emit('sharePeople',this.getUser,true);
            }
            else{
                // true表示添加,false表示去除
                this.$bus.$emit('sharePeople',this.getUser,false);
            }
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
    background-color: rgba(0, 0, 0, 1);
    border-radius: 50px 0 0 50px;
    box-shadow: -8px 0 25px rgba(0, 0, 0, 1);
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
.chekbox{
    position: relative;
    top: 20px;
    transform: scale(1.22);
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
    overflow: hidden;
    transition: 0.25s;
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
.username > span{
    transition: 0.25s;
}
.username > span:hover{
    background-color: white;
    color: black;
    border-radius: 5px;
    overflow-y: auto;
}
.signs:hover{
    background-color: white;
    color: black;
    border-radius: 5px;
    height: 100px;
    overflow-y: auto;
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