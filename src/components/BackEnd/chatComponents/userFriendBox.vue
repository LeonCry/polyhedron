// 添加好友时,出现的单个好友item
<template>
    <transition name="frienditemT" appear>
        <div>
  <div v-show="isShow" class="frienditem" @click="selectMe" :class="{select:isSelect}"> 
      <!-- 头像 -->
      <img v-if="friendProp.user.userHead" :src="(`${publicPath}/HeadsAndBacks/Heads/${friendProp.user.userHead}`)" alt="">
      <!-- 网名,个签内容物 -->
      <div class="content">
          <!-- 名字和签名 -->
          <div class="nameandsign">
              <!-- 名字 -->
              <div class="username">
                  <!-- 用户名 -->
                  <span>{{friendProp.friendName}} <span v-show="friendProp.friendRemarkName"> ({{friendProp.friendRemarkName}})</span> </span>
              </div>
              <!-- 个性签名 -->
              <div class="signs">
                  <span>{{friendProp.user.userSign}}</span>
              </div>
          </div>
      </div>
  </div>
  </div>
  </transition>
</template>


<script>
import { mapState } from 'vuex';
export default {
    props:['friendProp','baseUserProp'],
    // eslint-disable-next-line vue/multi-word-component-names
    name:'userFriendBox',
    data(){
        return{
            isShow:true,
            // 空间展示
            isSpaceShow:false,
            // 用户
            getUser:this.friendProp,
            // 添加留言内容
            addMessage:'',
            // 是否添加留言展示
            isAddMessageShow:false,
            isSelect:false,
            publicPath: process.env.BASE_URL,
        }
    },
    computed:{
        ...mapState('userInfo',['user','socket']),

    },
    methods:{
        selectMe(){
            this.$bus.$emit('isSelectFriend',this.friendProp.friendId);
            this.$bus.$emit('showChats',this.baseUserProp,this.friendProp);
        }
    },
    mounted(){
        // 是否选中的是我
        this.$bus.$on('isSelectFriend',(id)=>{
            // 说明是我
            if(this.friendProp.friendId==id){
                this.isSelect = true;
            }
            else{
                this.isSelect = false;
            }
        })
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
    background-color:  whitesmoke;
    border-radius: 15px;
    font-size: 1.6vh;
    overflow: hidden;
    color: black;
    cursor: pointer;
}
.frienditem:hover{
    background-color: seashell;
}

.select{
    background-color: pink;
}
.select:hover{
    background-color: pink;
}
/* 头像 */
.frienditem > img{
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    margin-top: 8px;
    margin-left:2.5px;
    padding: 2px;
    border: 2px solid gray;
}
/* 网名,个签内容物 */
.content{
    position: relative;
    width:220px;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
}
/* 名字和签名 */
.nameandsign{
    position: relative;
    flex: 4;
    display: flex;
    flex-flow: column nowrap;
    transition: 0.55s;
    margin-left: 10px;
    height: 100%;
}
/* 用户名字 */
.username{
    margin-top: 10px;
    position: relative;
    display: flex;
    height: 20px;
    flex-flow: row nowrap;
    justify-content: space-between;
}
/* 个性签名 */
.signs{
    position: relative;
    margin-top: 8px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
/* 更改字体滑过时鼠标 */
span{
    cursor: default;
}
.signs span{
    overflow: hidden;
    height: 2vh;
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

</style>