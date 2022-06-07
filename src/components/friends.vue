<template>
<transition name="friendsT">
  <div v-show="isShow">
      <!-- 整个friend界面 -->
      <div class="friend">
      <!-- friend界面顶端仿手机栏 -->
      <div class="friend-topui">
          <!-- 添加好友 -->
          <div class="add" @click="friendAdd">
              <img src="../assets/add.svg" alt="">
          </div>
          <!-- 空div占位置 -->
          <div></div>
          <!-- 搜索 -->
          <div class="search" @click="friendSeach">
              <img src="../assets/search.svg" alt="">
          </div>
          
          <!-- 模仿摄像头 空div-->
          <div class="camera">
            <!-- 最小化窗口 -->
          <div class="minimize" @click="minimizeBox">
              <img src="../assets/exit2.svg" alt="">
          </div>
          </div>
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
            <transition-group name="searchpageT">
            <!-- 搜索好友界面 -->
            <searchpage key="1" v-show="isSearchPageShow"></searchpage>
            <!-- 搜索好友添加界面 -->
            <searchaddpage key="2" v-show="isAddPageShow"></searchaddpage>
            </transition-group>
        
        
        
        </div>
    <friend-notice></friend-notice>
    <friend-loading></friend-loading>
    </div>
    <transition name="searchT" appear>
      <!-- 好友搜索框 -->
      <div v-show="isSearch" class="searchbox">
          <input type="text"  placeholder="好友搜索..."  @focus="searchFriend" @input="searchFriendRequest" v-model="searchContent">
      </div>
      </transition>

    <transition name="searchT" appear>
      <!-- 好友添加搜索 -->
      <div v-show="isAdd" class="searchbox">
          <input type="text"  placeholder="输入好友用户名或昵称..." required v-model="searchContent">
          <button @click="searchAddFriend">搜索</button>
      </div>
      </transition>
  </div>

  </transition>
</template>

<script>
import friendrecent from './friendrecent.vue';
import friendlist from './friendlist.vue';
import self from './self.vue';
import searchpage from './searchpage.vue';
import searchaddpage from './searchaddpage.vue';
import FriendNotice from './friendNotice.vue';
import { mapState } from 'vuex';
import FriendLoading from './friendLoading.vue';


export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friends',
    components:{friendrecent,friendlist,self, searchpage,searchaddpage, FriendNotice, FriendLoading},
    data(){
        return{
            isShow:false,
            // 最近会话button的flex及背景色
            historyChatFlex:1,
            historyChatBack:'#2f3542',
            // 好友列表button的flex及背景色
            friendListFlex:1,
            friendListBack:'#2f3542',
            // 个人button的flex及背景色
            selfFlex:2,
            selfBack:'#a4b0be',
            // 搜索状态
            isSearch:false,
            // 添加好友状态
            isAdd:false,
            // 是否切换到最近会话界面
            isRecent:false,
            // 是否切换到好友列表界面
            isList:false,
            // 是否切换到个人界面
            isSelf:true,
            // 搜索好友界面是否展示
            isSearchPageShow:false,
            // 搜索添加好友是否展示
            isAddPageShow:false,
            // 搜索内容
            searchContent:'',
        }
    },
    computed:{
        ...mapState('userInfo',['user']),
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
            // 最新消息重新显示
            this.$bus.$emit('messageOnload');
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
            // 发送请求
            this.getFriendList();
             // 传送数据组件界面切换
            this.$bus.$emit('functionchange',this.isRecent,this.isList,this.isSelf);
        },

        // 请求,获得所有好友列表
        getFriendList(){
            this.$axios.post('/api/getAllFriends',{userQQ:this.user.userQQ}).then(response=>{
                console.log("获得了所有的好友信息",response.data);
                this.$bus.$emit('getAllFriends',response.data);
            },error=>{
                console.log(error.message);
                
            });
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
            this.isSearchPageShow = false;
            this.isAddPageShow = false;
            this.isAdd = false;
            this.searchContent = '';
        },
        // 好友添加搜索按钮
        friendAdd(){
            this.isAdd = !this.isAdd;
            this.isAddPageShow = false;
            this.isSearchPageShow = false;
            this.isSearch = false;
            this.searchContent = '';
        },
        // 最小化该组件界面
        minimizeBox(){
            this.isShow = false;
            // 最小化后将该状态再传回去
            this.$bus.$emit('chatshow2',this.isShow);
        },
        // 添加好友搜索框中的搜索按钮
        searchAddFriend(){
            if(this.searchContent==''){
                this.$bus.$emit("friendNotice",false,"不能搜索为空的用户哦~");
            }
            else{
                this.isAddPageShow = true;
                this.$bus.$emit('friendLoading',true,'查找中..');
                // 发送请求-查询数据库
                this.$axios.post("/api/findUsers",{"userQQ":this.searchContent}).then(response=>{
                    console.log(response.data);
                    // 向searchaddpage发送数据库查找到的数据
                    this.$bus.$emit('findUsers',response.data,this.searchContent);
                    this.$bus.$emit('friendLoading',false,'查找中..');
                },error=>{
                    console.log(error.message);
                    this.$bus.$emit('friendLoading',false,'查找中..');
                });
                
            }

        },
        // 搜索好友搜索框中@foccus
        searchFriend(){
            setTimeout(() => {
               this.isSearchPageShow = true; 
            }, 500);
        },
        // 搜索好友发送请求,
        searchFriendRequest(){
            let searchResult1 = [];
            let searchResult2 = [];
            if(this.searchContent == ''){
                 this.$bus.$emit('friendSearchResult',[]);
            }
            else{
            this.$axios.post('/api/selectFriendsByRemakeName',{userQQ:this.user.userQQ,friendRemarkName:this.searchContent}).then(response=>{
                searchResult1 = response.data;
            this.$axios.post('/api/selectFriendsByName',{userQQ:this.user.userQQ,friendName:this.searchContent}).then(response=>{
                searchResult2 = response.data;
                // 将搜索出来的两类,进行合并
                for (let index = 0; index < searchResult1.length; index++) {
                    const element1 = searchResult1[index];
                    for (let index2 = 0; index2 < searchResult2.length; index++) {
                        const element2 = searchResult2[index2];
                        if(element1==element2){
                            searchResult2.splice(index2,1);
                        }
                        
                    }
                }
                searchResult2.forEach(element => {
                    searchResult1.push(element)
                });
                this.$bus.$emit('friendSearchResult',searchResult1);
            },error=>{
                console.log(error.message);
            });
            },error=>{
                console.log(error.message);
            });            
            }

           
        }




    },
    mounted(){
        // 接收来自user组件进行开关展示
        this.$bus.$on('chatshow',data1=>{
            this.isShow = data1;
        });
        // 接收来自searchaddpage组件数据,进行那个组件的开关
        this.$bus.$on('quitSearchAddPage',(show,searchshow)=>{
            this.isAddPageShow = show;
            this.isAdd = searchshow;
        });
        // 接收来自searchpage组件数据,进行那个组件的开关
        this.$bus.$on('quitSearchPage',(show,searchshow)=>{
            this.isSearchPageShow = show;
            this.isSearch = searchshow;
        });

    },
    beforeDestroy(){
         this.$bus.$off('chatshow');
         this.$bus.$off('quitSearchAddPage');
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
    flex-flow: row nowrap;
    height: 35px;
    transition: 0.55s;
    border-radius: 20px;
    background-color: #1A191B;
    top: 120px;
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
.searchbox button{
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
.searchbox button:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.5);
  background-color: rgba(99, 110, 114, 0.33);
}

/* friend样式 */
.friend{
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    width: 280px;
    height: 600px;
    border: 10px solid black;
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
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
}
/* friend整个界面hover时带动search搜索框 */
/* friend整个界面hover时带动好友添加框 */
.friend:hover~div{
        transition-delay:0.2s;
        right: 20px;
        top: 100px;
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
.minimize{
    position: absolute;
    cursor: pointer;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    top: 2px;
    left: 21px;
}
.friend:hover > div:nth-of-type(1) > div:nth-of-type(4) > div{
    opacity: 1;
    transform: rotate(360deg);
}
.minimize img{
    transition: 1s ease-in-out;
}
.minimize:hover img{
    transform: rotate(720deg);

}
/* 添加好友框 */
.add{
    transform: scale(0.88); 
    transition: 0.55s;
}
.add:hover{
    transform: scale(1.15);
    cursor: pointer;
}

/* 搜索框 */
.search:hover{
    transform: scale(1.4);
    cursor: pointer;
}
/* 模仿摄像头 */
.camera{
    position: relative;
    width: 85px;
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
/* 搜索出来的页面动画 */
.searchpageT-enter-active{
animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.searchpageT-leave-active{
animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) reverse both;
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