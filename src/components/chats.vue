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
          <!-- 左侧聊天栏 -->
          <div class="chatter">
              <leftchater></leftchater>
              <rightchater></rightchater>
              <leftchater></leftchater>
              <rightchater></rightchater>
              <leftchater></leftchater>
              <rightchater></rightchater>
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
          <div class="typetext" contenteditable ref="typetext" @focus="emojiDisappear"> 
          </div>

      </div>

  </div>
</transition>
</template>

<script>
import morer from './morer.vue'
import leftchater from './leftchater.vue'
import rightchater from './rightchater.vue'
import emoji from './emoji.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chats",
  components:{morer,leftchater,rightchater,emoji},
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
      }
  },
  computed:{
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
            // 接收来自friendrecentitem和friendlistitem组件的数据
            // 进行展示与否
            this.$bus.$on('chatboxappear',(data1)=>{
                this.isShow = data1;
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


/* 输入框 */
.typetext{
    position: relative;
    width: 95%;
    height: 85px;
    font-size: 2vh;
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