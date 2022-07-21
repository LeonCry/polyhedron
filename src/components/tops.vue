<template> 
<transition appear name="iconsT">
  <div :class="{siderbar:isTen,roundbar:!isTen}" >
    <div class="back" v-show="backShow">
      
    </div>
    <div class="mieedd">
      <span v-if="spanShow"></span><span v-if="spanShow"></span><span v-if="spanShow"></span><span v-if="spanShow"></span><span v-if="spanShow"></span>
      <span v-if="spanShow" class="indx">{{cont1}}</span>
      <span v-if="spanShow" class="runs">{{cont2}}</span>
    </div>
    <!-- 菜单 -->
    <div class="droop" @click="isShow = !isShow">
      <span class="linear" v-show="isShow"></span>
      <img src="../assets/menu.svg" alt="菜单"/>
      <!-- 下拉菜单 -->
      <transition name="dropT">
        <span v-show="isShow" class="dropdown">
          <a href="http://www.leonblogs.cn/Assay.php?pageinput=45" target="_blank">指南</a>
          <a href="http://www.leonblogs.cn/" target="_blank">博客</a>
          <a href="https://github.com/LeonCry" target="_blank">GitHub</a>
          <a href="javascript:void(0)" @click="adminLogin">后台</a>
          <!-- 鲁ICP备2021023307号-2 -->
        </span>
      </transition>
    </div>

    <!-- 天气 -->
    <!-- <div>
      <img id="rain" src="../assets/rain.svg" alt="天气" />
    </div> -->
  </div>
</transition>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "tops",
  data() {
    return {
      isTen:true,
      isShow: false,
      backShow:false,
      dialogVisible: false,
      spanShow:true,
      cont1:'PolyhedronX网站指南来啦!',
      cont2:' ▶   ▶   ▶  ',
    };
  },
  methods:{
    adminLogin(){
      this.isShow = false;
      // 向adminlogin组件传达数据,展示管理员登录界面
      this.$bus.$emit('tologin',true);
    },
    toBlogZN(){
      // 前5秒 -- 一直白色展示
      setTimeout(() => {
        this.spanShow = false;
      }, 5000);
      setTimeout(() => {
        this.isTen = false;
      }, 5500);
    },
  },
  mounted(){
      setTimeout(() => {
              if(this.$route.path=='/'){
        this.$bus.$emit('backShow',false);
      }
            else{
        this.$bus.$emit('backShow',true);
      }
      }, 100);

     // eslint-disable-next-line no-unused-vars
     this.$bus.$on('backShow',(data)=>{
      this.backShow = false;
     });
  },

  created(){
    this.toBlogZN();
    setTimeout(() => {
      this.isShow = true;
    }, 6000);
    setTimeout(() => {
      this.isShow = false;
    }, 9500);
  },
};
</script>

<style scoped>
/* 上方sidebar的样式 */
.siderbar {
  width: 100%;
  position: fixed;
  height: 40px;
  display: flex;
  transition: 0.5s;
  z-index: 90;
  right: 0;
  flex-flow: row nowrap;
  background-color: rgba(0, 0, 0, 0);
}
.roundbar{
  width: 60px;
  position: fixed;
  top: 10px;
  height: 45px;
  display: flex;
  transition: 0.5s;
  z-index: 90;
  right: 15px;
  border-radius:10px;
  text-align: center;
  flex-flow: row nowrap;
  background-color: rgba(0, 0, 0, 0);
}
.siderbar:hover{
  background-color: white;
}
.linear{
  position: absolute;
  transition: 0.2s;
  width: 60px;
  height: 2px;
  right: 50px;
  top: 12.5px;
  background-color: black;
}
.linear::after{
  content: '▼';
  transition: 0.2s;
  position: absolute;
  font-size: 1.6vh;
  color: black;
  top: -1px;
  right: 48px;
}

.siderbar div {
  width: 52px;
  margin-top: 10px;
  height: 27px;
  text-align: center;
  align-items: center;
  cursor: pointer;
  transition: 1.5s;
  animation: bk 6.5s both;
}
.siderbar div:nth-of-type(3){
  z-index: 3;
}
.siderbar:hover div:nth-of-type(3){
  transition: 0.33s;
  transition: 1.5s;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.siderbar div:nth-of-type(3):hover{
  background-color: white;
  border-radius: 10px;
}

.roundbar div {
  position: absolute;
  width: 50px;
  margin-top: 10px;
  height: 25px;
  text-align: center;
  align-items: center;
  cursor: pointer;
  transition: 1.5s;
  animation: bk 6.5s both;
}
.roundbar div:nth-of-type(3){
  border: 1px solid rgba(255, 255, 255, 0.35);
  background-color: rgba(0, 0, 0, 0.25);
  /* animation: 4s bac-black linear  infinite; */
  left: 5px;
  z-index: 3;
  transition: 0.33s;
}
.roundbar:hover div:nth-of-type(3){
  transition: 0.33s;
  background-color: rgba(0, 0, 0, 0.44);
  border-radius: 5px;
}
.roundbar div:nth-of-type(3):hover{
  border: 1px solid white;
  background-color: black;
  border-radius: 10px;
}
/* 菜单下拉框 */
.dropdown {
  z-index: 2;
  right: 55px;
  width: 100px;
  display: flex;
  position: absolute;
  background-color: black;
  border-radius: 10px;
  flex-direction: column;
  border: 2px solid white;
  animation: wobble-hor-top 2s both infinite;
}
.dropdown a {
  color: white;
  text-decoration:none;
  outline:none;
  position: relative;
  margin-bottom: 10px;
  transition: 0.33s;
   z-index: 1001;
  margin-top: 5px;
}
.dropdown a:hover {
  color: deepskyblue;
  right: 5px;
  border-right: 5px dotted deepskyblue;
  cursor: pointer;
}
.mieedd{
  flex: 20;
  opacity: 1;
  text-align: right;
  display: flex;
  flex-flow: row nowrap;
  cursor: default;
}

.mieedd span{
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  text-align: right;
  /* text-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 1);   */
  color: white;
  /* background-color: black; */
}
.indx{
  z-index: 2;
}
.runs{
  left: -100px;
  animation: tx 2s ease-in-out infinite;
}
.droop{
  flex: 2;
  
}
.back{
  flex: 2;
}
.backbut{
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2vh;
  font-weight: bolder;
  cursor: pointer;
  color: white;
}
/* 下拉框动画 */
.dropT-enter,
.dropT-leave-to {
  height: 0;
  opacity: 0;
}
.dropT-enter-active,
.dropT-leave-active {
  transition: 0.5s;
}
.dropT-enter-to,
.dropT-leave {
  height: 150px;
  opacity: 1;
}
/* sidebar动画 */

.iconsT-enter-active{
        animation: wt 10s both;
    }

@keyframes wt {
  0%{
            background-color: rgba(0, 0, 0, 0);
    }
  10%,90% {
            background-color: white;
  }
  100% {
            background-color: rgba(0, 0, 0, 0);
  }
}

@keyframes bk {
  0%{
            background-color: rgba(0, 0, 0, 0);
            border-radius: 0px;
    }
  10%,90% {
            background-color: black;
            border-radius: 0px;
  }
  100% {
            border-radius: 5px;
  }
}
@keyframes tx {
  0%{
    left:-10%;
    }

  100% {
    left:15%;
  }
}

@keyframes bac-black {
  0%{
    background-color: rgba(0, 0, 0, 0);
  }
  100%{
    background-color: black;
  }
}
@keyframes wobble-hor-top {
  0%,100%{
    -webkit-transform:  rotate(0);
            transform:  rotate(0);
    -webkit-transform-origin: top;
            transform-origin: top;
  }
  10% {
    -webkit-transform:  rotate(5deg);
            transform: rotate(5deg);
  }
  20% {
    -webkit-transform:  rotate(-5deg);
            transform: rotate(-5deg);
  }
  30% {
    -webkit-transform:  rotate(3.2deg);
            transform: rotate(3.2deg);
  }
  40% {
    -webkit-transform:  rotate(-3.2deg);
            transform: rotate(-3.2deg);
  }
  50% {
    -webkit-transform:  rotate(1.5deg);
            transform:  rotate(1.5deg);
  }
  60%{
        -webkit-transform:  rotate(-1.5deg);
            transform:  rotate(-1.5deg);
  }
}

</style>