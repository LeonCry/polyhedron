// 个人界面
<template>
<transition name="selfboxT">
  <div class="selfbox">
      <!-- 背景 -->
      <div class="myback">
          <img src="../assets/background.jpg" alt="背景">
      </div>
      <!-- 头像网名 -->
      <div class="myhead">
          <img src="../assets/touxiang.jpg" alt="头像">
          <br>
          <!-- 网名 -->
          <span>LeonCry</span>
      </div>
      <!-- 个签 -->
      <div class="mysign">
          <span>''风在不住地吹，稍微转到东北方去，他知道这就是说风不会减退了。老头儿朝前面望了一望，但他看不见帆，看不见船，也看不见船上冒出的烟。只有飞鱼从船头那边飞出来，向两边仓皇地飞走，还有一簇簇黄色的马尾藻。''</span>
      </div>
      <!-- 个人空间 -->
      <button @click="enterMySpace">我的空间</button>
  </div>
  </transition>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'self',
    data(){
        return{
            // 该组件是否显示
            isShow:false,
        }
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
    transition: 30s;
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
    top: -30px;
}
/* 个签 */
.mysign{
    position: relative;
    width: 90%;
    left: 5%;
    top: 30px;
    line-height: 25px;
    height: 125px;
    font-size: 1.5vh;
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

</style>