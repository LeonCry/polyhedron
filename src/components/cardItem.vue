<template>
  <transition name="cardT">
  <div class="cardBox" @mouseenter="changeBack" @mousemove="mousehover" @mouseleave="optozero" ref="cardBox" v-show="isShow">
    <span class="light" ref="light">

    </span>
    <div class="bigFont" >
      {{cardContent.oneFont}}
    </div>
    <div class="title">
      {{cardContent.title}}
    </div>
     <div class="info" >
      {{cardContent.info}}
     </div>
     <div class="jumpto" ref="cen">
      <span class="abs" @click="routerTo(cardContent.to)">
        Click Enter
      </span>
          <button class="but">
      Hover Here
    </button>
     </div>
  </div>
  </transition>
</template>

<script>
export default {
name:'cardItem',
props:['cardContent'],
data(){
  return{
    isShow:true,
    pox:0,
    poy:0,
    }
},
methods:{
    // 路由跳转
    routerTo(routerTo){
      this.$bus.$emit("cardShow",false,this.cardContent.to);


      setTimeout(() => {
            this.$bus.$emit("menuShow",false);
            // this.$bus.$emit("backShow",false);
            this.$bus.$emit("Approuter",routerTo);
      }, 2200);
    },
    changeBack(){
      this.$bus.$emit('changeBack',this.cardContent.bacsrc);
    },
    mousehover(e){
      this.$refs.light.style.opacity = 1;
      this.pox = e.clientX;
      // 获得按下的y坐标
      this.poy = e.clientY;
      let divx = this.$refs.cardBox.offsetLeft;
      let divy = this.$refs.cardBox.offsetTop;
      this.$refs.light.style.left = this.pox-150-divx + 'px';
      this.$refs.light.style.top = this.poy-150-divy + 'px';
      // let angle = this.getAngle(this.pox-50-divx,this.poy-50-divy);
      let angle = this.getAngle(this.pox-divx, this.poy-divy);
      if(angle>0){
        this.$refs.cardBox.style.transform = "rotateX("+angle*2+"deg) rotateY("+angle*2+"deg)";
      }
      else{
        this.$refs.cardBox.style.transform = "rotateX("+-angle*2+"deg) rotateY("+angle*2+"deg)";
      }
    },
    optozero(){
      this.$refs.light.style.opacity = 0;
      this.$refs.cardBox.style.transform = "rotateX(0) rotateY(0)";
    },
    // 获得角度
    getAngle(xx,yy){
       let divx = this.$refs.cen.offsetLeft;
       let divy = this.$refs.cen.offsetTop;
       let cen = [divx,divy];
       let first = [divx-100,divy-100];
       let second = [xx,yy];
       var f_c_x = first[0] - cen[0],
        f_c_y = cen[1] - first[1],
        s_c_x = second[0] - cen[0],
        s_c_y = cen[1] - second[1];
        var c = Math.sqrt(f_c_x * f_c_x + f_c_y * f_c_y) * Math.sqrt(s_c_x * s_c_x + s_c_y * s_c_y);
        if (c == 0) return -1;
        var angle = Math.acos((f_c_x * s_c_x + f_c_y * s_c_y) / c);
        // 第一象限
        if (cen[0] - second[0] < 0 && cen[1] - second[1] < 0) {
        return  (2 * Math.PI - angle)
        // 第二象限
        } else if (cen[0] - second[0] < 0 && cen[1] - second[1] > 0) {
        return  (2 * Math.PI - angle)
        // 第三象限
        } else if (cen[0] - second[0] > 0 && cen[1] - second[1] < 0) {
        return -(2 * Math.PI - angle)
        // 第四象限
        } else if (cen[0] - second[0] > 0 && cen[1] - second[1] > 0) {
        return -(2 * Math.PI - angle)
    }
    },
//     getAngles(end){
//     let divx = this.$refs.cardBox.offsetLeft;
//     let divy = this.$refs.cardBox.offsetTop;
//     var start = [divx,divy];
//     var diff_x = end[0] - start[0],
//         diff_y = end[1] - start[1];
//     //返回角度,不是弧度
//     return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
// },
},

mounted(){
  this.$bus.$on("cardShow",(data,to)=>{
    if(to==this.cardContent.to){
      setTimeout(() => {
         this.isShow = data;
      }, 500);
    }
    else{
       this.isShow = data;
    }
    setTimeout(() => {
      this.isShow = !data;
    }, 3500);
  });
}



}
</script>

<style scoped>
.cardBox{
  position: relative;
  width: 280px;
  z-index: 2;
  height: 370px;
  background-color: rgba(255, 254, 255, 0.1);
  border-radius: 15px;
  box-shadow: 20px 20px 50px black;
  transform-style: preserve-3d;
  overflow: hidden;
}
.light{
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(80px);
  border-radius: 10%;
  box-shadow: 0 0 15px 10px rgba(255, 255, 255, 0.4);
  /* border: 300px solid rgba(255, 255, 255, 0); */
  background-color:  rgba(255, 255, 255, 0.4);
  opacity: 0;
}

.cardBox:hover{
  background-color: rgba(255, 254, 255, 0.15);
}
.cardBox:hover div:nth-of-type(1){
  right: 10px;
  color: rgba(255, 255, 255, 0.5);
  filter: blur(5px);
  opacity: 1;
}
.cardBox:hover div:nth-of-type(2){
  top: 13vh;
}
.cardBox:hover div:nth-of-type(3){
  top: 15vh;
  opacity: 1;
  filter: blur(0);
  transition-delay: 0.15s;
}
.cardBox:hover div:nth-of-type(4){
  top: 18vh;
  opacity: 1;
    transition-delay: 0.25s;
  filter: blur(0);
}



.bigFont{
  position: absolute;
  font-size: 16vh;
  transition: 1s;
  color: white;
  right: -50px;
  filter: blur(20px);
  opacity: 0;
}
.title{
  position: relative;
  text-align: center;
  top: 18vh;
  transition: 0.3s;
  font-size: 2.6vh;
  font-weight: bolder;
  color: white;
}
.info{
  position: relative;
  text-align: center;
  width: 80%;
  left: 10%;
  top:25vh;
  transition: 0.55s;
  font-size: 1.6vh;
  font-weight: normal;
  color: white;
  opacity: 0;
  filter: blur(10px);
}
.jumpto{
  width: 100px;
  left: 32%;
  position: relative;
  text-align: center;
  top: 28vh;
  transition-delay: 0.3s;
  transition: 0.65s;
  opacity: 0;
  filter: blur(10px);
}
.but{
  width: 100px;
  transition: 0.35s;
  height: 40px;
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
}
.abs{
  position: absolute;
  transition: 0.35s;
  height: 40px;
  width: 3px;
  border-right: none;
  background-color: white;
  color: rgba(0, 0, 0, 0);
  overflow: hidden;
  line-height: 300%;
  font-weight: bolder;
  text-align: center;
  cursor: pointer;
}
.jumpto:hover span{
  width: 100px;
  /* border-right: 3px solid black; */
  /* color: black; */
   animation: bounce-in-left 1.1s both;
}
.jumpto:hover button{
  background-color: black;
}


.cardT-leave-active{
 animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
}

@keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.33);
            transform: scale(1.33);
    -webkit-filter: blur(20px);
            filter: blur(20px);
    opacity: 0;
  }
}







@keyframes bounce-in-left {
  0% {
    width: 3px;
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  38% {
    width: 100px;
    border-right: 3px solid black;
    /* color: black; */
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  55% {
    width: 90px;
        border-right: 3px solid black;
    color: black;
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    width: 100px;
        border-right: 3px solid black;
    color: black;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    width: 96px;
        border-right: 3px solid black;
    color: black;
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    width: 100px;  
        border-right: 3px solid black;
    color: black;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    width: 99px; 
        border-right: 3px solid black;
    color: black;
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
width: 100px; 
    border-right: 3px solid black;
    color: black;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
</style>