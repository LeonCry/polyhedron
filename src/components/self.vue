// 个人界面
<template>
<transition name="selfboxT">
  <div class="selfbox">
      <!-- 背景 -->
      <div class="myback">
          <img v-if="this.user.userBack" :src="(`${publicPath}/HeadsAndBacks/Backs/${this.user.userBack}`)" alt="背景">
      </div>
      <!-- 头像网名 -->
      <div class="myhead">
          <img v-if="this.user.userHead" :src="(`${publicPath}/HeadsAndBacks/Heads/${this.user.userHead}`)" alt="头像">
          <br>
          <!-- 网名 -->
          <span>[ {{user.userName}} ]</span>
      </div>
      <!-- 个签 -->
      <div class="mysign">
          <span>'' {{user.userSign}} ''</span>
      </div>
      <!-- 个人空间 -->
      <button @click="enterMySpace">我的空间</button>
  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'self',
    data(){
        return{
            // 该组件是否显示
            isShow:false,
            ifShow:false,
             publicPath: process.env.BASE_URL,
        }
    },
    computed:{
        ...mapState('userInfo',['user','userSetting']),
    },
    methods:{
        // 进入我的空间
        enterMySpace(){
            // 向starspace组件发送数据,进行开关
            this.$bus.$emit('spaceappear',true,true);
        }
    },
    mounted(){
        // 接收friends组件数据,进行页面切换效果
        this.$bus.$on('functionchange',(data1,data2,data3)=>{
            this.isShow = data3;
        });
    }
}
</script>

<style scoped>
/* 整个画布 */
.selfbox{
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    overflow-x:hidden;
    overflow-y: auto;
    width: 100%;
    height: 430px;
    margin-top: 10px;
}
/* 背景 */
.myback{
    position: relative;
    width: 100%;
    height: 130px;
}
/* 背景图片 */
.myback > img{
    width: 100%;
    height: 100%;
    transition: 0.55s;
}
.myback:hover img{
    transform: scale(1.05);
}
/* 头像 */
.myhead{
    position: relative;
    width: 100%;
    height: 50px;
    border-radius: 50px;
    text-align: center;
}
/* 头像图片 */
.myhead > img{
    position: relative;
    height: 50px;
    border-radius: 50px;
    top: -30px;
    border: 10px solid #1A191B;
}
/* 网名 */
.myhead span{
    position: relative;
    color: pink;
    font-weight: bolder;
    top: -30px;
}
/* 个签 */
.mysign{
    position: relative;
    text-align: center;
    width: 90%;
    left: 5%;
    top: 50px;
    min-height: 100px;
    max-height: 140px;
    overflow-y: auto;
    line-height: 25px;
    font-size: 1.5vh;
}
.mysign span{
    position: relative;
    text-align: center;
    padding: 10px;
    font-style: italic;
}
/* button */
button{
    position: relative;
    width: 50%;
    top: 65px;
    left: 25%;
    height: 40px;
    font-size: 1.8vh;
    border: 0;
    transition: 0.55s;
    border-radius: 20px;
    cursor: pointer;
}
button:hover{
    background-color: rgba(30, 39, 46,1.0);
    color: white;
}
/* 个人界面进入退出动画 */
.selfboxT-enter-active{
    animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.selfboxT-leave-active{
    animation: swing-in-top-fwd 0s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}
/* 好友个体进入退出动画 */
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


@media only screen and (orientation: portrait) {
    .selfbox{
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    overflow-x:hidden;
    overflow-y: auto;
    width: 100%;
    height: 180%;
    margin-top: 10px;
}
    /* 背景 */
.myback{
    position: relative;
    width: 100%;
    height: 30%;
}
}

</style>