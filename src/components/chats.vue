/* eslint-disable vue/use-v-on-exact */
// 聊天组件
<template>
<!-- 聊天盒子 -->
<transition name="chatboxT">
  <div v-show="isShow" class="chatbox" :class="{windowFlyClass:windowFlys,addWidth:isAddWidth}" :style="ChatLocation" @mousedown="changeIndex">
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
              <rightchater :friendProp="friend" :chatProp="chat" v-for="chat of receiveChatsSum" :key="chat.chatId" :id="chat.chatId"></rightchater>
          </div>
          <!-- 右侧更多栏 -->
          <transition name="rightT">
          <div v-show="moreappears" class="morer">
            <morer></morer>
          </div>
          </transition>
          <transition name="rightT">
          <!-- 搜索聊天记录栏 -->
          <div v-show="searchAppears" class="chatsSearch">
            <search-chats :friendProps="friend"></search-chats>
          </div>
          </transition>
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
                  <input class="upload" ref="upload"  @change="uploadPics" type="file" accept="image/png,image/jpeg" name="file">
                  <img ref="upimg" id="upimg" src="../assets/picture.svg" alt="图片" @click="pictureShow">
                  <img ref="video" src="../assets/video.svg" alt="视频" @click="videoShow">
                  <img ref="wind" src="../assets/wind.svg" alt="吹一吹" @click="windShow">
              </div>
              <!-- 收起侧边栏 -->
              <div>
                  <img src="../assets/nrror.svg" @click="morerAppear" :style="morerButtonStyle"  alt="收起">
              </div>
          </div>
          <!-- 键入文字栏 -->
          <div  contenteditable ref="typetext" :class="{typetextactive:SendActice,typetext:!SendActice}"  @focus="emojiDisappear" @keydown.enter="sendMessage" @keydown.shift.enter="iskeyEnter = true"> 
              
          </div>
        <button @click="sendMessage" :class="{sendMessageActive:SendActice,sendMessage:!SendActice}">发送/Enter</button>
      </div>
    <video-chat-fake></video-chat-fake>
    <chat-notice></chat-notice>
    <tips></tips>
    <del-tips></del-tips>
    <space-share-in-chat></space-share-in-chat>
     <audio ref="audios" src="../assets/audio/water.mp3" style="display:none"></audio>
  </div>
</transition>
</template>

<script>
import morer from './morer.vue'
import emoji from './emoji.vue';
import { mapState } from 'vuex';
import rightchater from './rightchater.vue';
import ChatLoading from './chatLoading.vue';
import VideoChatFake from './videoChatFake.vue';
import ChatNotice from './chatNotice.vue';
import Tips from './tips.vue';
import DelTips from './delTips.vue';
import SearchChats from './searchChats.vue';
import SpaceShareInChat from './spaceShareInChat.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chats",
  components:{morer,emoji,rightchater, ChatLoading, VideoChatFake, ChatNotice, Tips, DelTips, SearchChats, SpaceShareInChat},
  data(){
      return{
        //   是否展示该组件--聊天窗口
          isShow:false,
        //   控制侧边栏长度大小 0为关闭 以及透明度 和 模糊
          moreFlex:0,
        //   是否正在吹一吹
        isWinding:false,
        // 是否触发了吹飞窗口
        windowFlys:false,
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
          moreappears:false,
      // 此组件Z轴高度 6 - 7
      zIndex:106,
    //   表情栏是否展示
    isEmojiShow:false,
    // 收到的emoji
    receiveEmoji:'',
    // 搜索框是否出现
    searchAppears:false,
    // 收到的friend数据
    friend:{user:{userName:''},friendRemarkName:''},

    // 键入的消息
    message:'',
    // 是否为换行
    iskeyEnter:false,
    searchFlex:0,
    // 发送程序已激活
    SendActice:false,
    // 是否变宽
    isAddWidth:false,
    // 数据请求到的聊天json list sum
    receiveChatsSum:[],
    // 仅一次请求获得的聊天json list sum
    receiveChats:[],
    // 上传
    file:'',
    // 图片信息
    picData:'',
      }
  },
  computed:{
      ...mapState('userInfo',['user','socket','allusers']),
      //   控制侧边栏的样式
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
            this.moreBlur = 0;
          }
          else{
              this.moreFlex = 0;
              this.nrrorRotateZ = 180 + 'deg';
              this.moreBlur = 40;
              this.isAddWidth = false;
              this.searchAppears = false;
          }

        //   向morer发送数据,控制每个item的显示
        this.itemIsShow = !this.itemIsShow;
        this.$bus.$emit('itemisshow',this.itemIsShow);
        this.moreappears = !this.moreappears;

      },
    //   鼠标按下,开始移动
        moveBegin(e){
            if(window.innerWidth<window.innerHeight){
        return 0;
      }
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
            this.receiveChatsSum = [];
            this.$bus.$emit('returnIsChatting',{friendQQ:this.friend.user.userQQ,userQQ:this.user.userQQ,isChatting:false});
            if(this.moreappears){
                this.morerAppear();
            }
        },
        // 显示窗口
        showBox(data1){
             this.exitChat();
                this.isShow = data1;
                // 初次出现,置顶
                this.zIndex = 108;
                this.receiveChatsSum = [];
                setTimeout(() => {
                    this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
                }, 50);
        },
           // 图片提示
    pictureShow(){
    this.$refs.upload.value = '';
    // var event = new Event('click');
    this.$refs.upload.click();
    },
    // 上传图片
    uploadPics(e){
        // 获得文件名和文件
      this.file = e.target.files[0];
      // 限制大小 < 2m
      if(this.file.size/1024/1024>2){
      this.$bus.$emit('chatNotice',false,"头像文件大小限制在2MB以内  ");
      }
      else{
        // 可以进行图片回显和图片转二进制
        const img = document.createElement('img');
        // const img = document.getElementById('imgs');
        var windowURL = window.URL || window.webkitURL;
        var loadImg = windowURL.createObjectURL(this.file);
        img.setAttribute('src',loadImg);
        // let blob = new Blob([this.file], { type: "image/png" });
        setTimeout(() => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0,  canvas.width,  canvas.height)
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        // return canvas.toDataURL('image/png') 
        this.picData = canvas.toDataURL('image/'+ext);
        // img.setAttribute('src',this.picData);
        this.$refs.typetext.innerHTML = this.$refs.typetext.innerHTML + "<div><img src='"+this.picData+"'</div>";
        }, 100);

      }
    },
    // 视频通话
    videoShow(){
      this.$bus.$emit('videoChatFake',{friendQQ:this.friend.friendQQ,userQQ:this.user.userQQ});
    },
    // 如果是点击到了吹一吹
    windShow(){
        // 已经正在吹一吹了
        if(this.isWinding){
         this.$bus.$emit('chatNotice',false,"您正在向对方发送 🌪  中...");    
        }
        else{
        this.isWinding = true;
        // 首先socket发送信息
        let msg = "A9wadv=吹一吹";
        this.$bus.$emit('chatNotice',true,"您向对方发送了一道龙卷风 🌪 ");
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.friend.friendQQ,message:msg}));
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.friend.friendQQ,message:"[吹了一口 🌪 🌪 ]"}));
        this.receiveChatsSum.push({chatContent:"[吹了一口 🌪 🌪 ]",chatTime:Date.now()});
        this.sendMessageRequest("[吹了一口 🌪 🌪 ]");
        setTimeout(() => {
            this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
        }, 20);
        setTimeout(() => {
            this.isWinding = false;
        }, 5500);
        }

    },
        // 当前窗口鼠标点击改变index
        changeIndex(){
       if(window.innerWidth<window.innerHeight){
        return 0;
      }     
      // 聚焦,改变高度,同时降低其他两个窗口的高度
      // 从左往右分别为 空间\聊天\设置
      this.$bus.$emit('changeZindex',106,107,106);
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
           setTimeout(() => {    
            // 如果为空
            if(this.$refs.typetext.innerHTML == '' || this.$refs.typetext.innerHTML=='<div><br></div><div><br></div>'){
                this.$refs.typetext.innerHTML = '';
            }
            else if (this.iskeyEnter){
                setTimeout(() => {
                    this.iskeyEnter = false;
                }, 20);
            }
            else{
             // 清除键入的内容
            setTimeout(() => {
            if(!this.iskeyEnter){
            this.SendActice = true;
            this.message = this.$refs.typetext.innerHTML;
            this.strRplace();
            // 将我发送的消息传给recent组件,也进行显示
            this.$bus.$emit('mySendMessageOnRecent',{receiveUserQQ:this.friend.friendQQ,userQQ:this.user.userQQ,message:this.message});
            // 当我从friendlist列表中发送消息的时候,也在recentlist显示
            this.$bus.$emit('RecentChats',{sendUserQQ:this.friend.friendQQ,receiveUserQQ:this.user.userQQ,chatContent:this.message,chatTime:Date.now()})
            this.$refs.audios.play();
            this.receiveChatsSum.push({chatContent:this.message,chatTime:Date.now()});
            // socket发送消息
            this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.friend.friendQQ,message:this.message}));
            this.sendMessageRequest(this.message);
            setTimeout(() => {
               this.$refs.typetext.innerHTML = ''; 
               this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
            }, 20);
            }
            }, 100);

            setTimeout(() => {
               this.SendActice = false; 
            }, 350);




            }
           }, 5); 
        },

        // 特殊字符替换
        strRplace(){
            // str.replace(/需要替换的字符串/g，"新字符串") 一种方法
            // split . join另一种方法,但是只能在中间
            // this.message.split("&nbsp;").join(" ");
            // this.message.replaceAll("&nbsp;"," ");    
            this.message = this.message.replaceAll("<img","<img style='position: relative;;max-width:100%;max-height:100%;cursor: pointer;'");
            // 去掉enter造成的换行出现
            if(this.message.lastIndexOf("<br>")!=-1){
            let pre = this.message.substring(0,this.message.lastIndexOf("<br>"));
            let last = this.message.substring(this.message.lastIndexOf("<br>")+4);
            this.message = pre + last;
            }
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
        // 加载聊天记录
       async loadingChats(){
            var start = this.receiveChatsSum.length;
            var end =  20;
              await  this.$axios.post('/api/selectChats',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,pageStart:start,pageEnd:end}).then(response=>{
                    this.$bus.$emit('receiveChat',response.data);
                }),
                error=>{
                    console.log(error.message);
                }
        },
        // 发送消息向数据库发送请求
       async sendMessageRequest(message){
           // eslint-disable-next-line no-unused-vars
           await this.$axios.post('/api/addOneChat',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,chatContent:message,chatTime:Date.now()}).then(response=>{
                this.mailNotice(this.friend.friendQQ,"聊天消息",message,this.friend.user.userEmail);
            },error=>{
                console.log(error.message);
            });
        },
        // 邮件通知
       async mailNotice(toQQ,messageType,msg,sendMail){
        let isOnline = false;
        let isNotice = false;
        let isInFive = false;
            // 先查看对方是否在线
            for (let index = 0; index < this.allusers.length; index++) {
                const uuser = this.allusers[index];
                if(uuser.username==toQQ){
                    isOnline = true;
                    
                }
            }
            if(!isOnline){
            // 查询对方的设置,是否允许通知
            await this.$axios.post('/api/getUserSetting',{userQQ:toQQ}).then(response=>{
                if(response.data.messageNotice==1){
                    isNotice=true;
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
                }
                else if(response.data.noticeTime-Date.now()>=300000){
                    isInFive = true;
                }
             },error=>{
                console.log(error.message); 
             });
            }
            // 如果在5分钟内,则邮件发送,同时新增sysnotice一条消息
            if(isInFive){
             // eslint-disable-next-line no-unused-vars
             await this.$axios.post('/api/mailSender',{publishQQ:toQQ,publishTime:new Date(parseInt(Date.now())).toLocaleString().slice(5),collector:messageType,sharer:this.user.userName,gooder:msg,noGooder:sendMail},).then(response=>{
             },error=>{
                console.log(error.message);
             });
             // eslint-disable-next-line no-unused-vars
             await this.$axios.post('api/addOneNotice',{sendUserQQ:this.user.userQQ,receiveUserQQ:toQQ,noticeType:3,remarks:"邮件发送相关",noticeTime:Date.now()}).then(response=>{
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
        this.$refs.typetext.innerHTML = this.$refs.typetext.innerHTML + text;
        },
        // 接收来自videoFake的消息,存储到数据库中1
        videoMessage(message){
            // 如果是正在拨打中...此条消息不参与发送
            if(message=="A9wadv正在拨打..."){
                this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.friend.friendQQ,message:message}));
            }
            else{
            let msg = '  📞  ' + message;
            // 先socket发送消息
            this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.friend.friendQQ,message:msg}));
            this.receiveChatsSum.push({chatContent:msg,chatTime:Date.now()});
            // 再向数据库中添加消息
            // eslint-disable-next-line no-unused-vars
            this.$axios.post('/api/addOneChat',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,chatContent:msg,chatTime:Date.now()}).then(response=>{
            },error=>{
                console.log(error.message);
            });
            setTimeout(() => {
               this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
            }, 20);
            }

        },
        // 接收来自videoFake的消息,存储到数据库中2
        saveVideoMessage(data){
            let msg = '  📞  ' + data.message;
            this.receiveChatsSum.push({chatContent:msg,chatTime:Date.now()});
            // 再向数据库中添加消息
            this.sendMessageRequest(msg);
            setTimeout(() => {
               this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;
            }, 20);
        },
        // 吹一吹触发的窗口飞了的函数
        windowFly(){
            this.windowFlys = true;
            setTimeout(() => {
            this.windowFlys = false;
            }, 5500);
        },
        // 查询聊天记录并定位
       async findOneChatst(id){
           let length = this.receiveChatsSum.length;
           let dda = 0;
            for (let index = 0; index < length; index++) {
                const chat = this.receiveChatsSum[index+dda];
                if(chat.chatId==id){
                    if(dda<0){
                        this.$bus.$emit('clickAgain');
                    }
                    // 让该条信息高亮显示
                    this.$bus.$emit('highLightShow',id);
                    break;
                }
                else if(index==this.receiveChatsSum.length-1){
                    var start = this.receiveChatsSum.length;
                    var end =  length;
                    length = length + length;
                    dda = dda - length;
                    await this.$axios.post('/api/selectChats',{sendUserQQ:this.user.userQQ,receiveUserQQ:this.friend.friendQQ,pageStart:start,pageEnd:end}).then(
                        response=>{
                        this.$bus.$emit('receiveChat',response.data);
                })
                }
            }
        },

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
            // 接收来自videoFake的消息,存储到数据库中
            this.$bus.$on('videoMessage',(message)=>{
                this.videoMessage(message);
            })
            this.$bus.$on('saveVideoMessage',(data)=>{
                this.saveVideoMessage(data);
            })
            
            
            // 接收来自friendrecentitem和friendlistitem组件的数据
            // 进行展示与否
        this.$bus.$on('chatboxappear',(data1)=>{
               this.showBox(data1);
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
            // 向morer组件传送该friend数据
            this.$bus.$emit('friendToMorer',this.friend);              
            
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
            // 如果当前聊天对象发送给我的消息,则直接展示,否则存入数据库(存入数据库已做)
            if(data.from==this.friend.friendQQ && data.to==this.user.userQQ){
                // 如果是我接收到的正在拨打的语音消息
                if(data.text=="A9wadv正在拨打..."){
                    // 则唤醒拨打电话的div
                    this.$bus.$emit('receiveVideo',{friendQQ:this.friend.friendQQ,userQQ:this.user.userQQ});
                }
                // 如果接收到的是吹一吹,则触发吹一吹函数
                else if(data.text=="A9wadv=吹一吹"){
                    this.windowFly();
                }
                else if(data.text.substring(0,6)=="A9wadv"){
                    console.log("A"); 
                }
                else{
                // 构建合法的Json
                var receive = {sendUserQQ:this.friend.friendQQ,receiveUserQQ:this.user.userQQ,chatContent:data.text,chatTime:Date.now()};

                // 向目前聊天界面中添加数据,以保证实时
                this.receiveChatsSum.push(receive);
                setTimeout(() => {
                this.$refs.chatters.scrollTop =  this.$refs.chatters.scrollHeight;     
                }, 10);
                }

            }
            
        })
        // 检查是否正在聊天
        this.$bus.$on('isChatting',(data)=>{
            if(data.friendQQ==this.friend.friendQQ && data.userQQ==this.user.userQQ){         
                // 返回数据-表示是否正在聊天
                if(this.isShow){
                    this.$bus.$emit('returnIsChatting',{friendQQ:this.friend.user.userQQ,userQQ:this.user.userQQ,isChatting:true});
                }
            }
        })
        // 接收来自searchChats的信息,显示搜索组件
        this.$bus.$on('searchShowToChat',()=>{
            this.isAddWidth = !this.isAddWidth;
            this.searchAppears = !this.searchAppears;
        });
        // 查询聊天记录并定位
        this.$bus.$on('findOneChats',(id)=>{
            this.findOneChatst(id);
        })
      },
      beforeDestroy(){
           this.$bus.$off('chatboxappear');
           this.$bus.$off('changeZindex');
           this.$bus.$off('chatemoji');
      },

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
    z-index: 106;
    background-color: #1A191B;
    box-shadow: 0 0 25px 5px black;
    display: flex;
    flex-flow: column nowrap;
    font-size: 2vh;
    color: white;
    border-radius: 25px;
}
.addWidth{
    width: 1350px;
}

/* 抬头 */
.toper{
    position: relative;
        width: 100%;
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
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    flex: 10;
}
/* 右边选项框 */
.morer{
    position: relative;
    height: 100%;
    flex: 2;
    transition: 0.1s;
    background-color: rgba(45, 52, 54,0.1);
    border-left:2.5px solid rgba(255, 255, 255, 0.1);
}
/* 聊天搜索框 */
.chatsSearch{
    position: relative;
    height: 465px;
    flex: 4;
    transition: 0.55s;
    border-left:2.5px solid rgba(255, 255, 255, 0.1);
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
.upload{
  cursor: pointer;
  position: absolute;
  left: 8.5%;
  width: 2.5%;
  opacity: 0;
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
/* 吹飞的样式 */
.windowFlyClass{
    animation: roll-out-blurred-right 2s cubic-bezier(0.755, 0.050, 0.855, 0.060) 1s 2 alternate both;
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
.rightT-enter-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.rightT-leave-active{
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
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
@keyframes roll-out-blurred-right {
  0% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
  50% {
    -webkit-transform: translateX(1000px) rotate(720deg);
            transform: translateX(1000px) rotate(720deg);
    -webkit-filter: blur(50px);
            filter: blur(50px);
    opacity: 0;
  }
  100%{
    -webkit-transform: translateX(1000px) rotate(720deg);
            transform: translateX(1000px) rotate(720deg);
    -webkit-filter: blur(50px);
            filter: blur(50px);
    opacity: 0;
  }
}
@keyframes swing-in-left-fwd {
  0% {
    -webkit-transform: rotateY(100deg);
            transform: rotateY(100deg);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 1;
  }
}

@media only screen and (orientation: portrait) {
    .chatbox{
    position:absolute;
    width: 100%;
    height: 170%;
    top: 0;
    left: 0;
    z-index: 106;
    background-color: #1A191B;
    box-shadow:0;
    display: flex;
    flex-flow: column nowrap;
    font-size: 2vh;
    color: white;
    border-radius: 0;
}
.addWidth{
    width: 100%;
}

/* 抬头 */
.toper{
    position: relative;
        width: 100%;
        height: 55px;
        border-radius: 0;
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
    height: 45%;
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
/* 右边选项框 */
.morer{
    position: relative;
    height: 100%;
    flex: 6;
    transition: 0.1s;
    background-color: rgba(45, 52, 54,0.1);
    border-left:2.5px solid rgba(255, 255, 255, 0.1);
}
/* 聊天搜索框 */
.chatsSearch{
    position: relative;
    height: 100%;
    flex: 24;
    transition: 0.55s;
    border-left:2.5px solid rgba(255, 255, 255, 0.1);
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
    top: 28%;
}
/* 发送消息按钮 */
.sendMessage{
position: relative;
width: 10%;
height: 100%;
left: 90%;
bottom: 135%;
transition: 0.3s;
z-index: 5;
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
position: relative;
width: 10%;
height: 100%;
left: 90%;
bottom: 135%;
transition: 0.3s;
z-index: 5;
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
    height: 135%;
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

}
</style>