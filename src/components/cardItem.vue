<template>
  <div class="cardBox" @mouseenter="changeBack" @mouseleave="defaultBack">
    <div class="bigFont">
      {{cardContent.oneFont}}
    </div>
    <div class="title">
      {{cardContent.title}}
    </div>
     <div class="info">
      {{cardContent.info}}
     </div>
     <div class="jumpto">
      <span class="abs" @click="routerTo(cardContent.to)">
        Click Enter
      </span>
          <button class="but">
      Hover Here
    </button>
     </div>
  </div>
</template>

<script>
export default {
name:'cardItem',
props:['cardContent'],
methods:{
    // 路由跳转
    routerTo(routerTo){
        this.$router.push({
            name:routerTo,
        })
    },
    changeBack(){
      this.$bus.$emit('changeBack',this.cardContent.bacsrc);
    },
    defaultBack(){
      this.$bus.$emit('defaultBack');
    }
},
}
</script>

<style scoped>
.cardBox{
  position: relative;
  width: 280px;
  z-index: 2;
  height: 370px;
  background-color: rgba(255, 254, 255, 0.1);
  transition: 0.55s;
  border-radius: 15px;
  box-shadow: 20px 20px 50px black;
  overflow: hidden;
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