// 写动态组件
<template>
  <div class="writespacebox">
    <!-- 写的内容 -->
    <div contenteditable ref="typetext" @focus="emojiDisappear"></div>
    <!-- 表情图片 -->
    <div>
      <img src="../assets/exsmile.svg" alt="表情" @click="emojiShow" />
        <img src="../assets/picture.svg" alt="图片" @click="pictureShow"/>
    </div>
    <transition name="emojiT">
      <emojispace v-show="isEmojiShow"></emojispace>
    </transition>
    <br />
    <button @click="publish">发表</button>
    <img
      v-show="isLoading"
      class="loading"
      src="../assets/loading.svg"
      alt="加载"
    />
    <br />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import emojispace from "./emojispace.vue";
export default {
  components: { emojispace },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "writespace",
  data() {
    return {
      // 是否加载
      isLoading: false,
      // 是否显示emoji
      isEmojiShow: false,
      // 收到的emoji
      receiveEmoji: "",
      publishContent:'',
      pictureFile : '',
    };
  },
  computed:{
    ...mapState('userInfo',['user','socket','allusers']),
  },
  watch: {
    //   监视接收到的emoji,并添加到输入框中
    receiveEmoji(val) {
      this.$refs.typetext.innerHTML = this.$refs.typetext.innerHTML + val;
      this.receiveEmoji = "";
    },
  },
  methods: {
    emojiShow() {
      this.isEmojiShow = !this.isEmojiShow;
    },
    // 当输入框focus时,取消表情栏显示
    emojiDisappear() {
      this.isEmojiShow = false;
    },
    // 发表,进行存数据库
   async publish(){
      this.$bus.$emit('spaceLoading',true,"发表中..!");
      this.publishContent = this.$refs.typetext.innerHTML.replaceAll("<img","<img style='max-width:350px;max-height:600px'");
      this.$refs.typetext.innerHTML = '';
      let data = {publishQQ:this.user.userQQ,spaceContent:this.publishContent,publishTime:Date.now()};
     await this.$axios.post('/api/addOneSpace',data).then(response=>{
        console.log(response.data);
        this.$bus.$emit('spaceNotice',true,"发表成功!");
        this.$bus.$emit('spaceLoading',false,"发表中..!");
        this.publishContent = '';
        // 发表成功之后应该再请求一次服务器,或者直接将发表的内容传回给starspace,以用来新增一个space
        this.$bus.$emit('spaceappear',true,true);
        // 发表时,发送通知到sysnotice
        this.publishNotice();
      },error=>{
        this.$bus.$emit('spaceNotice',false,error.message);
        this.$bus.$emit('spaceLoading',false,"发表中..!");
        this.publishContent = '';
      });
      
    },

    // 发表时,发送通知到sysnotice
    async publishNotice(){
      let friendList = [];
      let message = "A9wadv::NEW动态:"+this.user.userName+"发布了一条动态.";
      // 首先查询该用户的所有好友列表
     await this.$axios.post('/api/getAllFriends',{userQQ:this.user.userQQ}).then(response=>{
        friendList = response.data;
        console.log("friendList:",friendList);

     }
      ,error=>{
        console.log(error.message);
      });
      for (let index = 0; index < friendList.length; index++) {
        const friend = friendList[index];
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:friend.friendQQ,message:message}));
        await  this.$axios.post("/api/addOneNotice",{sendUserQQ:this.user.userQQ,receiveUserQQ:friend.friendQQ,noticeType:0,remarks:"发布了一条动态."+"Q-v4jvy-Q"+JSON.stringify({spaceUserQQ:this.user.userQQ,user:this.user}),noticeTime:Date.now()}).then(response=>{
        console.log("已添加动态:",response.data);
        },error=>{
             console.log(error.message);
        });
        this.mailNotice(friend.friendQQ,"动态消息",this.user.userName+"发布了一条动态.",friend.user.userEmail);
      }
    },
                  // 邮件通知
       async mailNotice(toQQ,messageType,msg,sendMail){
        console.log("发送邮件函数启动..");
        
        let isOnline = false;
        let isNotice = false;
        let isInFive = false;
            // 先查看对方是否在线
            for (let index = 0; index < this.allusers.length; index++) {
                const uuser = this.allusers[index];
                if(uuser.username==toQQ){
                    isOnline = true;
                    console.log("对方在线,不发送邮件");
                }
            }
            if(!isOnline){
            // 查询对方的设置,是否允许通知
            await this.$axios.post('/api/getUserSetting',{userQQ:toQQ}).then(response=>{
                if(response.data.spaceNotice==1){
                    isNotice=true;
                    console.log("设置:允许通知!");
                    }
            },error=>{
                console.log(error.message); 
            });
            }
            // 如果设置允许,查看是否在5分钟内
            if(isNotice){
             await this.$axios.post('/api/mailInFiveMs',{sendUserQQ:this.user.userQQ,receiveUserQQ:toQQ,noticeType:3}).then(response=>{
                if(response.data==null){
                    isInFive = true;
                    console.log("time:5分钟内!");
                }
                else if(response.data.noticeTime-Date.now()>=300000){
                    isInFive = true;
                    console.log("5分钟相差:",response.data.noticeTime-Date.now());
                    console.log("5分钟内!");
                }
             },error=>{
                console.log(error.message); 
             });
            }
            // 如果在5分钟内,则邮件发送,同时新增sysnotice一条消息
            if(isInFive){
             await this.$axios.post('/api/mailSender',{publishQQ:toQQ,publishTime:new Date(parseInt(Date.now())).toLocaleString().slice(5),collector:messageType,sharer:"SYSTEM",gooder:msg,noGooder:sendMail},).then(response=>{
                console.log("发送返回状态码:",response.data);
             },error=>{
                console.log(error.message);
             });
             await this.$axios.post('api/addOneNotice',{sendUserQQ:this.user.userQQ,receiveUserQQ:toQQ,noticeType:3,remarks:"邮件发送相关",noticeTime:Date.now()}).then(response=>{
                console.log("addOneNotice添加成功!:",response.data);
             },error=>{console.log(error.message);});
             
                
            }
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
        },
   // 图片提示
    pictureShow(){
      this.$bus.$emit('spaceNotice',false,"目前仅支持截屏-粘贴到输入框的形式插入图片.");
    },

  },
  mounted() {
    // 接收emoji组件的emoji信息,进行添加到输入框
    this.$bus.$on("spaceemoji", (emojitext) => {
      this.receiveEmoji = emojitext;
    });
        //  监听 输入框的粘贴动作,去除粘贴样式
        this.$refs.typetext.addEventListener('paste',(e)=>{
            this.removePasteStyle(e);
        })
  },
  beforeDestroy() {
    this.$bus.$off("spaceemoji");
  },
};
</script>

<style scoped>
.writespacebox {
  position: relative;
  width: 100%;
  height: 420px;
  margin-top: 25px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-bottom: 2px solid rgba(47, 53, 66, 0.5);
}
/* 写动态div */
.writespacebox > div {
  position: relative;
  width: 80%;
  height: 90px;
  padding: 20px;
  border-radius: 15px 15px 0 0;
  transition: 0.55s;
  background-color: rgba(47, 53, 66, 0.25);
  overflow-y: auto;
  outline: 0;
}
.writespacebox > div:focus {
  outline: 0.5px solid rgba(0, 0, 0, 0);
}
/* 表情栏 */
.writespacebox div:nth-child(2) {
  height: 10px;
  transition: 0.55s;
  padding-top: 0;
  overflow-y: hidden;
  border-radius: 0 0 15px 15px;
  background-color: rgba(47, 53, 66, 0.25);
}
.writespacebox div:nth-child(2) img {
  margin-right: 20px;
  cursor: pointer;
}

.upload{
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 50px;
  z-index: 1;
  opacity: 0;
}
.upload~img{
  position: absolute;
  cursor: pointer;
  
}

/* 发表按钮 */
button {
  position: relative;
  align-self: center;
  width: 100px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: pink;
  font-size: 1.8vh;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
}
button:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}
/* loading */
.loading {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 表情栏动画 */
.emojiT-enter-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.emojiT-leave-active {
  animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both
    reverse;
}

@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
    transform: rotateX(-100deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: top;
    transform-origin: top;
    opacity: 1;
  }
}
</style>