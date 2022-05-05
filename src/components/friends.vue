<template>
<transition name="friendsT">
  <div v-show="isShow">
      <!-- 整个friend界面 -->
      <div class="friend">
      <!-- friend界面顶端仿手机栏 -->
      <div class="friend-topui">
          <!-- 最小化窗口 -->
          <div class="minimize" @click="minimizeBox">
              <img src="../assets/minimize.svg" alt="">
          </div>
          <!-- 空div占位置 -->
          <div></div>
          <!-- 搜索 -->
          <div class="search" @click="friendSeach">
              <img src="../assets/search.svg" alt="">
          </div>
          
          <!-- 模仿摄像头 空div-->
          <div class="camera"></div>
          <!-- 信号 -->
          <div>
              <img src="../assets/singnal.svg" alt="">
          </div>
          <!-- wifi -->
          <div>
              <img src="../assets/wifi.svg" alt="">
          </div>
          <!-- 电池 -->
          <div>
              <img src="../assets/power.svg" alt="">
          </div>
      </div>
      <!-- friend界面的三个功能转换按钮 -->
        <div class="friend-three">
            <!-- 最近会话 -->
            <div @click="selectHistoryChat" :style="historyChatStyle">
                <img src="../assets/historychat.svg" alt="最近会话">
            </div>
            <!-- 好友列表 -->
            <div @click="selectFriendList" :style="friendListStyle">
                <img src="../assets/friendlist.svg" alt="好友列表">
            </div>
            <!-- 个人空间 -->
            <div @click="selectSelf" :style="selfStyle">
                <img src="../assets/self.svg" alt="个人空间">
            </div>
        </div>
        <!-- friend界面的组件界面 -->
        <div class="friend-compont">
                <!-- 最近会话界面 -->
            <friendrecent v-show="isRecent"></friendrecent>
                <!-- 好友列表界面 -->
            <friendlist v-show="isList"></friendlist>
                <!-- 个人界面 -->
            <self v-show="isSelf"></self>

        </div>
    </div>
    <transition name="searchT" appear>
      <!-- 好友搜索框 -->
      <div v-show="isSearch" class="searchbox">
          <input type="text" name="" id="" placeholder="好友搜索...">
      </div>
      </transition>
  </div>
  </transition>
</template>

<script>
import friendrecent from './friendrecent.vue';
import friendlist from './friendlist.vue';
import self from './self.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friends',
    components:{friendrecent,friendlist,self},
    data(){
        return{
            isShow:false,
            // 最近会话button的flex及背景色
            historyChatFlex:2,
            historyChatBack:'#a4b0be',
            // 好友列表button的flex及背景色
            friendListFlex:1,
            friendListBack:'#2f3542',
            // 个人button的flex及背景色
            selfFlex:1,
            selfBack:'#2f3542',
            // 搜索状态
            isSearch:false,
            // 是否切换到最近会话界面
            isRecent:true,
            // 是否切换到好友列表界面
            isList:false,
            // 是否切换到个人界面
            isSelf:false,
        }
    },
    computed:{
        // 控制最近会话的样式
        historyChatStyle(){
            return {'flex':this.historyChatFlex,'background-color':this.historyChatBack};
        },
        // 控制好友列表的样式
        friendListStyle(){
            return {'flex':this.friendListFlex,'background-color':this.friendListBack};
        },
        // 控制个人的样式
        selfStyle(){
            return {'flex':this.selfFlex,'background-color':this.selfBack};
        },

    },
    methods:{
        // 最近会话-功能
        selectHistoryChat(){
            // 控制flex长度以及背景颜色 选中:#a4b0be 未选中:#2f3542
            this.historyChatFlex = 2;
            this.friendListFlex = 1;
            this.selfFlex = 1;
            this.historyChatBack = '#a4b0be';
            this.friendListBack = '#2f3542';
            this.selfBack = '#2f3542';
            // 控制界面切换
            this.isRecent = true;
            this.isList = false;
            this.isSelf = false;
            // 传送数据组件界面切换
            this.$bus.$emit('functionchange',this.isRecent,this.isList,this.isSelf);
        },
        // 好友列表-功能
        selectFriendList(){
            // 控制flex长度以及背景颜色
            this.historyChatFlex = 1;
            this.friendListFlex = 2;
            this.selfFlex = 1;
            this.historyChatBack = '#2f3542';
            this.friendListBack = '#a4b0be';
            this.selfBack = '#2f3542';
            // 控制界面切换
            this.isRecent = false;
            this.isList = true;
            this.isSelf = false;
             // 传送数据组件界面切换
            this.$bus.$emit('functionchange',this.isRecent,this.isList,this.isSelf);
        },
        // 个人-功能
        selectSelf(){
            // 控制flex长度以及背景颜色
            this.historyChatFlex = 1;
            this.friendListFlex = 1;
            this.selfFlex = 2;
            this.historyChatBack = '#2f3542';
            this.friendListBack = '#2f3542';
            this.selfBack = '#a4b0be';
            // 控制界面切换
            this.isRecent = false;
            this.isList = false;
            this.isSelf = true;
            // 传送数据组件界面切换
            this.$bus.$emit('functionchange',this.isRecent,this.isList,this.isSelf);
        },
        // 好友搜索按钮
        friendSeach(){
            this.isSearch = !this.isSearch;
        },
        // 最小化该组件界面
        minimizeBox(){
            this.isShow = false;
            // 最小化后将该状态再传回去
            this.$bus.$emit('chatshow2',this.isShow);
        }
    },
    mounted(){
        // 接收来自user组件进行开关展示
        this.$bus.$on('chatshow',data1=>{
            this.isShow = data1;
        })
    }
}
</script>

<style scoped>
*{
    color: white;
    font-size: 1.8vh;
    white-space: 5px;
    font-weight: bold;
}
/* 搜索div样式 */
.searchbox{
    position: absolute;
    right: 0;
    width: 280px;
    height: 35px;
    transition: 0.75s;
    border-radius: 20px;
    background-color: #1A191B;
    z-index: 10;
    top: 210px;
    box-shadow: -8px 0 25px rgba(0, 0, 0, 0.7);
}   
/* 输入框 */
.searchbox input{
  border: 0;
  outline: 0;
  padding: 10px;
  padding-left: 30px;
  transition: 0.5s;
  background-color: rgba(0, 0, 0, 0);
  font-size: 1.8vh;
  color: white;
}
.searchbox input:focus {
  font-size: 2vh;
  color: greenyellow;
}
/* friend样式 */
.friend{
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    width: 280px;
    height: 530px;
    border-radius: 15px 0 0 15px;
    background-color: #1A191B;
    transition: 0.55s;
    right: 0;
    bottom: 85px;
    box-shadow: -8px 0 25px rgba(0, 0, 0, 0.7);
}
.friend:hover{
        transition-delay:0.1s;
        border-radius: 30px;
        right: 20px;
        bottom: 100px;
        box-shadow: -10px -10px 25px rgba(0, 0, 0, 0.8);
}
/* friend整个界面hover时带动search搜索框 */
.friend:hover+div{
        transition-delay:0.2s;
        right: 20px;
        top: 200px;
        box-shadow: -10px -10px 25px rgba(0, 0, 0, 0.8);
}
/* 仿手机栏 */
.friend-topui{
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-radius: 30px 30px 0 0;
}
.friend-topui div{
    margin-left: 10px;

    transition: 0.55s;
}
/* 最小化按钮 */
.minimize:hover{
    transform: rotatez(810deg);
    cursor: pointer;
}
/* 搜索框 */
.search:hover{
    transform: scale(1.55);
    cursor: pointer;
}
/* 模仿摄像头 */
.camera{
    position: relative;
    width: 100px;
    height: 100%;
    border-radius: 0 0 20px 20px;
    background-color: black;
}
/* friend界面的三个功能转换按钮 */
.friend-three{
    position: relative;
    width: 100%;
    height: 35px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 10px;
    padding: 0;
    justify-content: space-around;
}
/* 每个功能按钮样式 */
.friend-three div{
    background-color: #2f3542;
    height: 35px;
    transition: 0.55s;
    flex: 1;
    text-align: center;
    margin-left: 2px;
    margin-right: 2px;
    border-radius: 15px;
    cursor: pointer;
}
.friend-three div:hover{
    flex: 2;
}
.friend-three div img{
    margin-top: 5px;
}
/* 搜索框进入退出动画 */
.searchT-enter-active{
    animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.searchT-leave-active{
    animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}
/* 整个组件的进入退出动画 */
.friendsT-enter-active,.friendsT-leave-active{
    transition: 0.55s;
}
.friendsT-enter,.friendsT-leave-to{
   opacity: 0;
}
.friendsT-leave,.friendsT-enter-to{
   opacity: 1;
}

/* 搜索框进入退出动画 */
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
     -webkit-filter: blur(40px);
             filter: blur(40px);           
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
</style>