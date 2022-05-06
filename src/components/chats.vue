// 聊天组件
<template>
<!-- 聊天盒子 -->
<transition name="chatboxT">
  <div v-show="isShow" class="chatbox" :style="ChatLocation">
      <!-- 抬头 -->
      <div class="toper" @mousedown="moveBegin">
          <!-- 名字 -->
          <span>你的名字</span>
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
      <!-- 输入栏 -->
      <div class="inputbox">
          <!-- 表情栏 -->
          <div class="expression">
              <!-- 表情图标 -->
              <div>
                  <img src="../assets/exsmile.svg" alt="表情">
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
          <div class="typetext" contenteditable>

          </div>

      </div>

  </div>
</transition>
</template>

<script>
import morer from './morer.vue'
import leftchater from './leftchater.vue'
import rightchater from './rightchater.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "chats",
  components:{morer,leftchater,rightchater},
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
          return{top:this.poy-30+'px',left:this.pox-300+'px'};
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
            })
      },
      beforeDestroy(){
           this.$bus.$off('chatboxappear');
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
    z-index: 5;
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
        flex-flow: row nowrap;
        background-color: rgba(47, 53, 66,0.25);
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