<template>
      <transition name="DetailT">
    <div v-show="isDetail" ref="detail" class="detail">
      <transition name="DetailT-1">
      <div v-show="isDetail" class="detailBox">
      <!-- 退出按钮 -->
      <div class="exit">
        <img src="../../assets/exit2.svg" alt="退出" @click="exitDetail" />
      </div>
    <div class="detailimgs">
        <img :src="foodProp.foodPic" alt="">
    </div>
    <div class="introduces">
      <transition name="DetailT-2">
        <span v-show="isDetail" class="detailTitle">{{foodProp.foodName}}</span>
      </transition>
      <br><br><br>
      <transition-group name="DetailT-3">
      <span v-show="isDetail" key="1">份量: {{foodProp.foodCopy}}人份 时间: 约{{foodProp.foodMadeTimes}}分钟 已做: {{foodProp.foodMadeNums}}份 </span>
      <br key="3"><br key="4">
      <span v-show="isDetail" key="2" style="color: rgb(0, 145, 255);font-size:2.2vh;"><i class="el-icon-lollipop"></i> X {{foodProp.foodPrice}} </span>
      <br key="5"><br key="6">
      </transition-group>
      <transition name="DetailT-4">
        <div class="tagdiv" v-show="isDetail">
        <span style="color:aliceblue" class="tags">{{foodProp.foodCopy}}人份</span>
         <span style="color:aliceblue" class="tags" v-for="mater of material" :key="mater.index">{{mater}}</span>
        </div>
        </transition>
      <transition name="DetailT-5">
      <div v-show="isDetail" class="more" >
         详情:
         <br>
         {{foodProp.foodDetails}}
         <br><br>
         步骤:
         <br>
            <div>{{foodProp.foodDoingWay}}</div>
         <br><br>
      </div>
      </transition>
    </div>
      </div>
      </transition>
    </div>
    </transition>
</template>

<script>
export default {
name:'foodDetails',
data(){
    return{
        isDetail:false,
        foodProp:'',
        material:'',
    }
},
methods:{
exitDetail(){
  this.isDetail = false;
},
},
mounted(){
  // detail出现
  this.$bus.$on('showDetail',(foodProp,material)=>{
    this.isDetail = true;
    this.foodProp = foodProp;
    this.material = material;
  });
},
created(){
  // 获得屏幕长
  setTimeout(() => {
    this.$refs.detail.style.height = window.screen.height + 'px';
  }, 100);
}
}
</script>

<style scoped>
.detail{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.55);
}
.detailBox{
  position: relative;
  width: 95%;
  left: 2.5%;
  top: 7.5%;
  height: 85%;
  background-color: #303133;
  border-radius: 15px;
}
.detailimgs{
    position: relative;
    background-color: rgba(255, 255, 255,0.33);
    height: 250px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    border-radius: 15px;
}
.detailimgs img{
    position: relative;
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
}
.introduces{
  position: relative;
  width: 100%;
  border-radius: 15px;
  top: -30px;
  font-size: 1.6vh;
  color: aliceblue;
  height: 400px;
  background-color: #303133;
}
.detailTitle{
  position: relative;
  font-size: 2vh;
  color: aliceblue;
  width: 100%;
  padding: 15px;
  background-color: #303133;
  border-radius: 15px;
}
.more{
  position: relative;
  width: 90%;
  left: 4%;
  max-height: 180px;
  overflow: auto;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 1.65vh;
  color: aliceblue;
  padding: 5px;
  border-radius: 15px;
  letter-spacing: 2px;
  line-height: 150%;
}
.tagdiv{
  position: relative;
  width: 95%;
  left: 2%;
  height: auto;
  padding: 15px;
  display: flex;
  flex-flow: row wrap;
}
.sp{
  position: relative;
  height: 30px;
  width: 90%;
}
.tags{
  position: relative;
  width: auto;
  height: 10px;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 10px;
  margin: 2px;
  font-size: 1.4vh;
  border-radius: 10px;
  font-weight: 100;
  color: #2b2c34;
  background-color: rgba(128, 128, 128, 0.3);
}

/* 动画效果 */
    .DetailT-enter-active{
        animation: slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-leave-active{
        animation: slide-top 0.4s 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-1-enter-active{
        animation: tilt-in-right-1 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-1-leave-active{
        animation: tilt-in-right-1 0.4s 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-2-enter-active{
        animation: slide-top 0.4s 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-2-leave-active{
        animation: slide-top 0.2s 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-3-enter-active{
        animation: slide-top 0.4s 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-3-leave-active{
        animation: slide-top 0.2s 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-4-enter-active{
        animation: slide-top 0.4s 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-4-leave-active{
        animation: slide-top 0.2s 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
    .DetailT-5-enter-active{
        animation: slide-top 0.4s 1.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    .DetailT-5-leave-active{
        animation: slide-top 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
    }
/* 退出按钮 */
.exit {
  position: absolute;
  right: 0;
  z-index: 999;
  padding-right: 20px;
  line-height: 65px;
  cursor: pointer;
}
.exit img {
  transition: 0.8s;
}
.exit img:hover {
  transform: rotateZ(720deg) scale(1.33);
}


@keyframes slide-top {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes tilt-in-right-1 {
  0% {
    transform: rotateX(-30deg) translateX(300px) skewX(30deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg) translateX(0) skewX(0deg);
    opacity: 1;
  }
}
@keyframes round2{
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}





@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  33.3%{
    transform: scale3d(1, 1, 1);
  }
  43% {
    transform: scale3d(1.25, 0.75, 1);
  }
  46.2% {
    transform: scale3d(0.75, 1.25, 1);
  }
  49.5% {
    transform: scale3d(1.15, 0.85, 1);
  }
  54.45% {
    transform: scale3d(0.95, 1.05, 1);
  }
  57.75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  66.6%{
    transform: scale3d(1, 1, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes round {
  0%{
    transform: rotateY(0) scale(0);
  }
  5%{
    transform: rotateY(5deg) scale(1);
  }
  90%{
    transform: rotateY(45deg) scale(1);
  }
  95%{
    transform: rotateY(45deg) scale(0);
  }
  100%{
    transform: rotateY(0) scale(0);
  }
}

</style>