/* eslint-disable vue/use-v-on-exact */
// 聊天组件
<template>
<!-- 聊天盒子 -->
<transition name="chatboxT">
  <div v-show="isShow" class="chatbox" :style="ChatLocation" @mousedown="changeIndex">
      <!-- 抬头 -->
      <div class="toper" @mousedown="moveBegin">
          <!-- 名字 -->
          <span>{{friend.user.userName}} <span v-show="friend.friendRemarkName!=''"> ({{friend.friendRemarkName}})</span></span>
          <!-- 退出按钮 -->
      </div>
      <!-- 退出按钮 -->
                <div class="exit">
              <img src="../assets/exit.svg" alt="退出" @click="exitChat">
          </div>
      <!-- 内容 -->
      <div class="content">
          <!-- 左侧聊天栏  包含了所有的人的聊天内容 -->
          <div ref="chatters" class="chatter" >
              <chat-loading></chat-loading>
              <rightchater :friendProp="friend" :chatProp="chat" v-for="chat of receiveChatsSum" :key="chat.chatId"></rightchater>
          </div>
          <!-- 右侧更多栏 -->
          <div class="morer" :style="morerStyle">
            <morer></morer>
          </div>
      </div>
<transition name=emojiT>
      <!-- 表情栏 -->
      <emoji v-show="isEmojiShow" class="emojicomponents"></emoji>
</transition>
      <!-- 输入栏 -->
      <div class="inputbox">
          <!-- 表情栏 -->
          <div class="expression">
              <!-- 表情图标 -->
              <div>
                  <img src="../assets/exsmile.svg" alt="表情" @click="emojiShow">
                  <img src="../assets/picture.svg" alt="图片">
                  <img src="../assets/video.svg" alt="字体">
                  <img src="../assets/wind.svg" alt="吹一吹">
              </div>
              <!-- 收起侧边栏 -->
              <div>
                  <img src="../assets/nrror.svg" @click="morerAppear" :style="morerButtonStyle"  alt="收起">
              </div>
          </div>
          <!-- 键入文字栏 -->
          <div  contenteditable ref="typetext" :class="{typetextactive:SendActice,typetext:!SendActice}"  @focus="emojiDisappear" @keydown.enter.prevent="sendMessage" @keydown.shift.enter="iskeyEnter = true"> 
              
          </div>
        <button @click="sendMessage" :class="{sendMessageActive:SendActice,sendMessage:!SendActice}">发送/Enter</button>
      </div>

  </div>
</transition>
</template>

<script>
import morer from './morer.vue'
import emoji from './emoji.vue';
import { mapState } from 'vuex';
import rightchater from './rightchater.vue';
import ChatLoading from './chatLoading.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chats",
  components:{morer,emoji,rightchater, ChatLoading},
  data(){
      return{
        //   是否展示该组件--聊天窗口
          isShow:false,
        //   控制侧边栏长度大小 0为关闭 以及透明度 和 模糊
          moreFlex:0,
          moreOpaticty:0,
          moreBlur:40,
        //   控制更多按钮的转向
          nrrorRotateZ:180 + 'deg',
        //   控制morer组件每个item的显示
          itemIsShow:false,
        //   窗口移动要用到到的x坐标
          pox:400+'px',
        //   窗口移动要用到到的y坐标
          poy:500+'px',
        //   判断是否鼠标按下的判定flag
          isMove:false,
      // 此组件Z轴高度 6 - 7
      zIndex:6,
    //   表情栏是否展示
    isEmojiShow:false,
    // 收到的emoji
    receiveEmoji:'',
    // 收到的friend数据
    friend:{user:{userName:''},friendRemarkName:''},

    // 键入的消息
    message:'',
    // 是否为换行
    iskeyEnter:false,

    // 发送程序已激活
    SendActice:false,

    // 数据请求到的聊天json list sum
    receiveChatsSum:[],
    // 仅一次请求获得的聊天json list sum
    receiveChats:[],
      }
  },
  computed:{
      ...mapState('userInfo',['user','socket']),
      //   控制侧边栏的样式
      morerStyle(){
          return{'flex':this.moreFlex,'opacity': this.moreOpaticty,'filter:':' blur('+this.moreBlur+'px)'};
      },
      //   控制控制侧边栏按钮的样式
      morerButtonStyle(){
          return{'transform':'rotateZ('+this.nrrorRotateZ+')'};
      },
      //改变聊天窗口的位置   
      ChatLocation(){
          return{top:this.poy-30+'px',left:this.pox-300+'px',zIndex:this.zIndex};
      },
  },
  watch:{
    //   监视接收到的emoji,并添加到输入框中
      receiveEmoji(val){
          this.$refs.typetext.innerHTML = this.$refs.typetext.innerHTML + val;
          this.receiveEmoji = '';
      }
  },
  methods:{
    //   控制侧边栏的开关
      morerAppear(){
          //   控制侧边栏长度大小按钮转向
          if (!this.moreFlex){
            this.moreFlex = 2;
            this.nrrorRotateZ = 720 + 'deg';
            this.moreOpaticty = 1;
            this.moreBlur = 0;
          }
          else{
              this.moreFlex = 0;
              this.nrrorRotateZ = 180 + 'deg';
              this.moreOpaticty = 0;
              this.moreBlur = 40;
          }
        //   向morer发送数据,控制每个item的显示
        this.itemIsShow = !this.itemIsShow;
        this.$bus.$emit('itemisshow',this.itemIsShow);

      },
    //   鼠标按下,开始移动
        moveBegin(e){
            // 获得按下的x坐标
            this.pox = e.clientX;
            // 获得按下的y坐标
            this.poy = e.clientY;
            // 判定在按下
            this.isMove = true;
        },
        // 退出按钮
        exitChat(){
            this.isShow = false;
        },
        // 当前窗口鼠标点击改变index
        changeIndex(){
      // 聚焦,改变高度,同时降低其他两个窗口的高度
      // 从左往右分别为 空间\聊天\设置
      this.$bus.$emit('changeZindex',6,7,6);
        },
        // 出现表情栏
        emojiShow(){
            this.isEmojiShow = !this.isEmojiShow;
        },
        // 当输入框focus时,取消表情栏显示
        emojiDisappear(){
            this.isEmojiShow = false;
        },
        // 发送消息
        sendMessage(){
            // 如果为空
            if(this.$refs.typetext.innerHTML == ''){
                console.log("空");
            }
            else{
                // this.sendWSPush("socket测试...");
             // 清除键入的内容
            setTimeout(() => {
            if(!this.iskeyEnter){
            this.SendActice = true;
            this.message = this.$refs.typetext.innerHTML;
            // socket发送消息
            this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.friend.friendQQ,message:this.message}));
            this.strRplace();
            this.receiveChatsSum.push({chatContent:this.message,chatTime:Date.now()});
            this.sendMessageRequest();
            setTimeout(() => {
               this.$refs.typetext.innerHTML = ''; 
               this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
            }, 10);
            }
            else{
                this.iskeyEnter = false; 
            }
            }, 100);

            setTimeout(() => {
               this.SendActice = false; 
            }, 350);

            }
           
        },




        // 特殊字符替换
        strRplace(){
            // str.replace(/需要替换的字符串/g，"新字符串") 一种方法
            // split . join另一种方法,但是只能在中间
            // this.message.split("&nbsp;").join(" ");
            // this.message.replaceAll("&nbsp;"," ");    
            this.message = this.message.replace("<img","<img style='max-width:400px;max-height:400px'");
            // this.message = this.message.replace("<img","<div><img");
        },
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
                this.$axios.post('/api/selectChats',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,pageStart:start,pageEnd:end}).then(response=>{
                console.log(response.data);
                this.$bus.$emit('receiveChat',response.data);
                // 停止加载
                this.$bus.$emit('chatLoading',false,"加载聊天记录中..");
                // 如果已经没有数据了
                if(response.data==''){
                    this.$bus.$emit('chatLoading',true,"___________________________已经到头啦____________________________");
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

        // 发送消息向数据库发送请求
        sendMessageRequest(){
            this.$axios.post('/api/addOneChat',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,chatContent:this.message,chatTime:Date.now()}).then(response=>{
                console.log("添加成功",response.data);
                
            },error=>{
                console.log(error.message);
                
            });
            
        },

        // 接收通过socket返回的消息
        receiveBySocket(data){
            console.log("接收到的socket信息:",data);
        },
        // 去除粘贴样式
        removePasteStyle(event){
        var e = event || window.event
        // 阻止默认粘贴
        if(e.clipboardData.getData('text/plain')==''){
            return 0; 
        }    
        e.preventDefault();
        // 粘贴事件有一个clipboardData的属性，提供了对剪贴板的访问
        // clipboardData的getData(fomat) 从剪贴板获取指定格式的数据
        var text =  (e.originalEvent || e).clipboardData.getData('text/plain');
        //清除回车
        text = text.replace(/\[\d+\]|\n|\r/ig,"")
        // 插入
        console.log("阻止默认粘贴");
        this.$refs.typetext.innerHTML = this.$refs.typetext.innerHTML + text;
        }


        
  },
  mounted(){
    //   实时监听鼠标移动,更改位置数据
        window.addEventListener('mousemove',(e)=>{
            if(this.isMove){
            this.pox = e.clientX;
            // 获得按下的y坐标
            this.poy = e.clientY;
            }
        }),
    //   实时监听--鼠标停止按下,则不再进行移动功能
        window.addEventListener('mouseup',()=>{
            this.isMove = false;
            }),
    //  监听 输入框的粘贴动作,去除粘贴样式
        this.$refs.typetext.addEventListener('paste',(e)=>{
            this.removePasteStyle(e);
        })
            
            
            
            
            // 接收来自friendrecentitem和friendlistitem组件的数据
            // 进行展示与否
        this.$bus.$on('chatboxappear',(data1)=>{
                this.isShow = data1;
                setTimeout(() => {
                    this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
                }, 50);
            });
                    // 接收来自其他窗口的数据,进行高度改变
        this.$bus.$on('changeZindex',(spaceZ,chatsZ)=>{
          this.zIndex = chatsZ;
        });
        // 接收emoji组件的emoji信息,进行添加到输入框
        this.$bus.$on('chatemoji',(emojitext)=>{
            this.receiveEmoji = emojitext;
        })
        // 接收点击事件触发对象的数据传送
        this.$bus.$on('toChatBox',(data)=>{
            this.friend = data;
            
        })
        this.$bus.$on('receiveChat',(data)=>{
            this.receiveChats = [];
            this.receiveChats = data;
            this.receiveChats.forEach(chat => {
               this.receiveChatsSum.unshift(chat); 
            });
            
        })

        // 滚动条滚动到顶部的触发函数
        this.$refs.chatters.addEventListener('scroll',this.isScrollTop);

        // 接收来自socket的消息
        this.$bus.$on('getSocketMessage',(data)=>{
            console.log(data);
            // 如果当前聊天对象发送给我的消息,则直接展示,否则存入数据库(存入数据库已做)
            if(data.from==this.friend.friendQQ && data.to==this.user.userQQ){
                // 构建合法的Json
                var receive = {sendUserQQ:this.friend.friendQQ,receiveUserQQ:this.user.userQQ,chatContent:data.text,chatTime:Date.now()};
                this.receiveChatsSum.push(receive);
                setTimeout(() => {
                this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;     
                }, 10);
            }
            
        })

      },
      beforeDestroy(){
           this.$bus.$off('chatboxappear');
           this.$bus.$off('changeZindex');
           this.$bus.$off('chatemoji');
      }
};
</script>

<style scoped>
/* 聊天界面box */
.chatbox{
    position:absolute;
    width: 1000px;
    height: 650px;
    top: 12%;
    left: 25%;
    z-index: 6;
    background-color: #1A191B;
    border-radius: 15px;
    box-shadow: 0 0 25px 5px black;
    display: flex;
    flex-flow: column nowrap;
    font-size: 2vh;
    color: white;
}
.chatbox:hover{
    border-radius: 25px;
    box-shadow: 0 0 30px 10px black;
}
/* 抬头 */
.toper{
    position: relative;
        width: 1000px;
        height: 55px;
        border-radius: 25px 25px 0 0;
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

/* 退出按钮 */
.exit{
    position: absolute;
    right:0;
    z-index: 11;
    padding-right: 20px;
    line-height: 65px;
    cursor: pointer;
}
.exit img{
    transition: 0.8s;
}
.exit img:hover{
    transform: rotateZ(720deg) scale(1.33);
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
    overflow-y: auto;
    height: 100%;
    flex: 10;
}

/* 右边选项框 */
.morer{
    position: relative;
    height: 100%;
    flex: 0;
    transition: 0.55s;
    background-color: rgba(45, 52, 54,0.1);
    opacity: 0;
}
/* 表情栏 */
.expression{
    position: relative;
    width: 100%;
    padding-top: 5px;
    height: 35px;
    display: flex;
    flex-flow: row nowrap;
    background-color: rgba(47, 53, 66,0.25);
}
/* 表情svg栏 */
.expression > div{
    position: relative;
    flex: 15;
    line-height: 10px;
}
.expression > div img{
    position: relative;
    margin-left: 20px;
    margin-right: 10px;
    transition: 0.55s;
    cursor: pointer;
}
.expression > div img:hover{
    transform: translateY(-5.55px);
}
/* 侧边栏按钮 */
.expression > div:nth-child(2){
    position: relative;
    transition: 0.55s;
    flex: 1;
}
.expression > div:nth-child(2):hover{
    transform: translateY(-5.55px);
}
.expression > div:nth-child(2) img{
    position: relative;
    transition: 0.55s;
    right: 0;
     cursor: pointer;
}
/* 表情栏 */
.emojicomponents{
    top: 180px;
}
/* 发送消息按钮 */
.sendMessage{
position: absolute;
right: 5px;
bottom: 8px;
transition: 0.3s;
outline: 0;
border-radius: 10px;
border: 1px solid rgba(255, 255, 255, 0.2);
background-color: rgba(0, 0, 0, 0);
color: darkgray;
padding: 5px;
}
.sendMessage:hover{
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid black;
    background-color: white;
    color: black;
}

/* 发送消息按钮激活 */
.sendMessageActive{
position: absolute;
right: 5px;
bottom: 8px;
transition: 0.3s;
outline: 0;
border-radius: 5px;
border: 1px solid black;
background-color: white;
color: black;
padding: 5px;
}

/* 输入框 */
.typetext{
    position: relative;
    width: 95%;
    height: 85px;
    font-size: 1.8vh;
    font-weight: bold;
    color: white;
    transition: 0.55s;
    border-radius: 0 0 15px 15px;
    background-color: rgba(47, 53, 66,0.25);
    padding-left: 2.5%;
    padding-right: 2.5%;
    line-height: 25px;
    overflow-y: auto;
    outline: 0;
}
.typetext:focus{
    outline: 0.5px solid rgba(0, 0, 0, 0);
}
.typetextactive{
    position: relative;
    width: 95%;
    height: 85px;
    font-size: 1.8vh;
    font-weight: bold;
    color: white;
    transition: 0.2s;
    border-radius: 0 0 15px 15px;
    background-color: rgba(47, 53, 66,0.25);
    padding-left: 2.5%;
    padding-right: 2.5%;
    line-height: 25px;
    overflow-y: auto;
    box-shadow: 0 0 8px white;
    outline: 0.1px solid white;
}




/* 该组件--聊天框进入退出动画 */
.chatboxT-enter-active{
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.chatboxT-leave-active{
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}
/* 表情栏动画 */
.emojiT-enter-active{
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.emojiT-leave-active{
    animation: swing-in-top-fwd 0.35s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}

    /* 进入的动画 */
    .chaterboxT-enter-active{
         animation: slide-in-blurred-right 0.55s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
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

@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: bottom;
            transform-origin: bottom;
    opacity: 1;
  }
}

</style>