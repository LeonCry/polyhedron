// 右侧的聊天者
<template>
<transition name="chaterboxT">
  <!-- 右侧聊天 -->
  <div  v-if="chat.sendUserQQ==friend.friendQQ" class="rightchaterbox" :class="{highLightShow:isHighLightShow}">
    <!-- 发送时间 -->
    <span> {{new Date(parseInt(chat.chatTime))
                .toLocaleString()
                .slice(5)}}</span>
    <!-- 消息box -->
    <div>
    <div ref="chatcontent" class="chatcontent">
        <div class="shareBox" v-if="isShare">
          <div>
            <img v-if="spaceData.user.userHead" :src="require(`../../../assets/Heads/${spaceData.user.userHead}`)" alt="头像">
            <div class="cc">
            <span>
              <p></p>
            </span>
            <span>
              <p></p>
            </span>
            <span>
              <p></p>
            </span>
            </div>
          </div>
      <!-- <div class="but">
        <button @click="sendShare">查看分享</button>
      </div> -->
          <span class="wz">我向你分享了一些有趣的东西,分享的内容来自于<b style="color:pink">[{{spaceData.user.userName}}]</b>的动态,快来看看吧~</span>
        </div>
    </div></div>
    <!-- 头像 -->
    <img  v-if="friend.user.userHead" :src="require(`../../../assets/Heads/${friend.user.userHead}`)" alt="头像">
  </div>
  
  <!-- 左侧聊天 -->
    <div v-if="chat.sendUserQQ!=friend.friendQQ" class="leftchaterbox" :class="{highLightShow:isHighLightShow}">
      <!-- 头像 -->
      <img class="leftimg"  v-if="this.user.userHead" :src="require(`../../../assets/Heads/${this.user.userHead}`)" alt="头像">
      <!-- 消息box -->
    <div>
    <div ref="chatcontent" class="chatcontent">
                <div class="shareBox" v-if="isShare">
          <div>
            <img v-if="spaceData.user.userHead" :src="require(`../../../assets/Heads/${spaceData.user.userHead}`)" alt="头像">
            <div class="cc">
            <span>
              <p></p>
            </span>
            <span>
              <p></p>
            </span>
            <span>
              <p></p>
            </span>
            </div>
          </div>
      <!-- <div class="but">
        <button @click="sendShare">查看分享</button>
      </div> -->
          <span class="wz">我向你分享了一些有趣的东西,分享的内容来自于<b style="color:pink">[{{spaceData.user.userName}}]</b>的动态,快来看看吧~</span>
        </div>
    </div>
    </div>
      <!-- 发送时间 -->
      <span>
          {{new Date(parseInt(chat.chatTime))
                .toLocaleString()
                .slice(5)}}
      </span>
  </div>
</transition>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chatserItem",
       props:['friendProp','chatProp','baseUserProp'],
     data(){
         return{
             friend:this.friendProp,
             chat:this.chatProp,
             isHighLightShow:false,
             isShare:false,
             spaceData:'',
             shareShow:false,
             user:this.baseUserProp,
         }
     },
     methods:{
      // 消息初始化
      messageInit(){
        // 如果是分享
        if(this.chatProp.chatContent.substring(0,26)=="我向你分享了[分享],点击查看详情........."){
          this.isShare = true;
          this.spaceData = JSON.parse(this.chatProp.chatContent.substring(26));
          console.log("this.spaceData",this.spaceData);
        }
        else{
          this.$refs.chatcontent.innerHTML = this.chatProp.chatContent;
        }
      },
      // 发送分享内容
      sendShare(){
        this.$bus.$emit("sendShare",!this.shareShow,this.spaceData);
      }
     },
     mounted(){
       // 消息初始化
       this.messageInit();

      //  信息高亮
      this.$bus.$on('highLightShowBack',(id)=>{
        if(this.chat.chatId==id){
          this.isHighLightShow = true;
          setTimeout(() => {
            this.isHighLightShow = false;
          }, 2500);
        }
      })
     }
};
</script>

<style scoped>
.rightchaterbox {
  position: relative;
  max-width: 70%;
  display: flex;
  flex-flow: row nowrap;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  align-self: flex-end;
}
.shareBox{
  position: relative;
  width: 350px;
  border-radius: 10px;
  height: 200px;
  max-height: 400px;
  background-color:  rgb(31, 32, 31);
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  padding-bottom: 5px;

}
.shareBox:hover > div:nth-of-type(1){
  background-color: seashell;
  margin-top: 7px;
  border: 3px solid black;
  box-shadow: 0 0 15px seashell;
}
.shareBox > div:nth-of-type(1)>img{
  border: rgba(255, 255, 255, 0.2) 2px solid;
  margin-top: 10px;
  transition: 0.55s;
}
.shareBox > div:nth-of-type(1){
  margin-top: 10px;
  background-color: seagreen;
  position: relative;
  width: 90%;
  flex: 2;
  border-radius:15px;
  transition: 0.55s;
  box-shadow: 0 0 15px seagreen;
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
}
.cc{
  position: relative;
  border: none;
  display: flex;
  flex-flow: column nowrap;

}
.cc > span:nth-of-type(1){
  width: 165px;
  margin: 5px;
  height: 15px;
  background-color: gray;
  border: 1px solid rgba(0, 0, 0, 0.33);
  overflow: hidden;
}
.cc > span:nth-of-type(2){
  width: 65px;
  margin: 5px;
  background-color: gray;
  height: 15px;
  border: 1px solid rgba(0, 0, 0, 0.33);
  overflow: hidden;
}
.cc > span:nth-of-type(3){
  width: 200px;
  margin: 5px;
  background-color: gray;
  height: 15px;
  border: 1px solid rgba(0, 0, 0, 0.33);
  overflow: hidden;
}
p{
  position: relative;
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  transform: rotateZ(125deg);
  box-shadow: 0 0 20px whitesmoke;
  animation: span-move 5s ease-in-out infinite;
}
.wz{
  background-color: seagreen;
  box-shadow: 0 0 10px seagreen;
  border-radius: 15px;
  padding: 5px;
  width: 80%;
  text-align: center;
  font-size: 1.5vh;
  color:whitesmoke;
}
.shareBox:hover span{
  border: 1px solid rgba(0, 0, 0, 0.33);
}
.shareBox:hover img{
  border: black 2px dashed;
  transform: rotate(360deg);
  margin-top: 10px;
}
.shareBox:hover button{
  box-shadow: 0px 0px 25px green;
  border: 2px solid black;
  background-color: white;
  color: black;
}
.shareBox div:nth-of-type(2){
    position: relative;
    width: 100%;
    flex: 1;
}
.but {
  max-width: 100%;
  height: 25px;
  margin-top: -20px;
  margin-bottom: 5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
}
.but button {
  position: relative;
  width: 80px;
  height: 50px;
  cursor: pointer;
  background-color: seagreen;
  color: white;
  border-radius: 15px;
  transition: 0.55s;
  border: 2px solid seagreen;
}

.but button:nth-of-type(1):hover {
  box-shadow: 0px 0px 25px green;
  border: 2px solid white;
  background-color: seagreen;
  color: white;
}



/* 头像 */
.rightchaterbox img {
  position: relative;
  height: 45px;
  border-radius: 45px;
  padding: 2px;
  border: 2px solid #d2edf6;
}
/* 消息box */
.rightchaterbox > div {
  position: relative;
  max-width: 75%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: #d2edf6;
  border-radius: 15px;
  margin-right: 15px;
}
/* 消息 */
.chatcontent{
  color: black;
  font-size: 1.8vh;
  font-weight: bold;
  padding: 15px;
}
/* 发送时间 */
.rightchaterbox > span {
  position: relative;
  align-self: flex-end;
  width: 100px;
  height: 20px;
  font-size: 1vh;
  color: darkgrey;
  text-align: center;
}
 .highLightShow{
   animation:hight-light 2.5s both;
   border-radius: 50px;
 }


    /* 进入的动画 */
    .chaterboxT-enter-active{
         animation: slide-in-blurred-right 0.55s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }

@keyframes span-move {
  0%{
    width: 0;
    left: 0;
    transform: rotateZ(0);
  }
  20%{
    width: 100%;
    left: 0;
    transform: rotateZ(0);
  }
  40%{
    width: 100%;
    left: 100%;
    transform: rotateZ(0);
  }
  42%{
    width: 0;
    left: 100%;
    transform: rotateZ(125deg);
  }
  45%{
    width: 0;
    left: -100%;
    transform: rotateZ(125deg);
  }
  50%{
    width: 50%;
    left: -100%;
    transform: rotateZ(125deg);
  }
  50.01%{
    width: 50%;
    left: -100%;
    transform: rotateZ(125deg);
  }
  70%{
    width: 50%;
    left: 100%;
    transform: rotateZ(125deg);
  }
  70.01%{
    width: 0;
    left: -100%;
    transform: rotateZ(125deg);
  }
  70.02%{
  width: 50%;
  left: -100%;
  transform: rotateZ(125deg);
  }
  90%{
    width: 50%;
    left: 100%;
    transform: rotateZ(125deg);
  }
  90.01%{
    width: 0;
    left: -100%;
    transform: rotateZ(125deg);
  }
  90.02%{
  width: 50%;
  left: -100%;
  transform: rotateZ(125deg);
  }
  99%{
    width: 50%;
    left: 100%;
    transform: rotateZ(125deg);
  }
  99.01%{
    width: 0;
    left: -100%;
    transform: rotateZ(125deg);
  }
  99.02%{
  width: 50%;
  left: -100%;
  transform: rotateZ(125deg);
  }
100%{
    width: 0;
    left: 0;
    transform: rotateZ(0);
}
  
}

    @keyframes hight-light {
      0%{
        background-color: #409EFF;
        box-shadow: 0 0 15px #409EFF;
      }
      25%{
        background-color: rgba(0, 0, 0, 0);
        box-shadow: none;
      }
      50%{
        background-color: #409EFF;
        box-shadow: 0 0 15px #409EFF;
      }
      75%{
        background-color: rgba(0, 0, 0, 0);
        box-shadow: none;
      }
      100%{
        background-color: #409EFF;
        box-shadow: 0 0 15px #409EFF;
      }
    }

  @keyframes slide-in-blurred-right {
  0% {
    -webkit-transform: translateX(300px) scaleX(2.5) scaleY(0.2);
            transform: translateX(300px) scaleX(2.5) scaleY(0.2);
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



    .leftchaterbox{
        position: relative;
        max-width: 70%;
        display: flex;
        flex-flow: row nowrap;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    /* 头像 */
    .leftchaterbox img{
  position: relative;
  height: 45px;
  border-radius: 45px;
  padding: 2px;
  border: 2px solid pink;
    }
    /* 消息box */
    .leftchaterbox > div{
        position: relative;
        max-width: 75%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: #EDDFF1;
        border-radius: 15px;
        margin-left: 15px;
    }
    /* 消息 */
    .leftchaterbox > div > span{
        width: 100%;
        color: black;
        font-size: 1.6vh;
        font-weight: bold;
        padding: 15px;
    }
    /* 发送时间 */
    .leftchaterbox > span{
        position: relative;
        align-self:flex-end;
        width: 100px;
        height: 20px;
        font-size: 1vh;
        color: darkgrey;
        text-align: center;
    }

</style>