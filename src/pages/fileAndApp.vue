<template>
  <div class="otherBox">
    <back-button :roots="'/'"></back-button>
    <div class="title">
      <i ref="computer" class="el-icon-monitor computer" ><br><i class="el-icon-document-copy" :class="{iAnimation:isAntimation}"></i></i>
      <el-button @click="toLeft" class="butsl" type="primary"><i style="font-size:3vh" class="el-icon-d-arrow-left"></i></el-button>
      <span>Files And Apps</span>
      <el-button @click="toRight" class="butsr" type="primary"><i style="font-size:3vh" class="el-icon-d-arrow-right"></i></el-button>
    </div>
    <div class="files" ref="files">
      <file-item class="file" v-for="file of fileData" :key="file.fileId" :fileProp="file" :id="'file'+file.fileId"></file-item>
    </div>

  </div>
</template>

<script>
import fileItem from '@/components/fileItem/fileItem.vue'
import BackButton from '@/components/backButton.vue';
export default {
  components: { fileItem, BackButton },
// eslint-disable-next-line vue/multi-word-component-names
name:'fileAndApp',
data(){
  return{
    left:0,
    // 根据文件的个数断定能点击的次数
    leftClicks:0,
    rightClicks:0,
    clicksR:1,
    clicksL:0,
    isAntimation:false,
    fileData:[],
  }
},
methods:{
  toLeft(){
    if(this.leftClicks<this.clicksL){
      this.left = this.left + 260;
      this.$refs.files.style.left = this.left + 'px';
      this.leftClicks++;
      this.rightClicks--;
    }
    else{
      console.log("到头了..");
    }
  },
  toRight(){
    if(this.rightClicks<this.clicksR){
    this.left = this.left - 260;
    this.$refs.files.style.left = this.left + 'px';
    this.rightClicks++;
    this.clicksL++;

    }
    else{
      console.log("到头了.");
    }
  },
// 初始化获得所有files
getAllFiles(){
  this.$axios.post('/api/selectAllFiles',).then(response=>{
    this.fileData = response.data;
  },error=>{
    console.log(error.message);
  });
  }

},
mounted(){
  this.$bus.$on('AnimationActions',(id,color)=>{
    var ele = document.getElementById(id).getBoundingClientRect();
    var left = ele.left;
    this.$refs.computer.style.left = left + 80 + 'px';
    this.$refs.computer.style.opacity = 1;
    setTimeout(() => {
    this.$refs.computer.style.height = '100%';
    this.$refs.computer.style.backgroundColor = color;
    this.isAntimation = true;
    }, 1500);
  })

  this.$bus.$on('thereNeedDownLoad',(id,color)=>{
    var ele = document.getElementById(id).getBoundingClientRect();
    var left = ele.left;
    this.$refs.computer.style.left = left + 80 + 'px';
    this.$refs.computer.style.opacity = 1;
    setTimeout(() => {
    this.$refs.computer.style.height = '100%';
    this.$refs.computer.style.backgroundColor = color;
    this.isAntimation = true;
    }, 1500);
  })

    this.$bus.$on('finishDownLoading',()=>{
      setTimeout(() => {
      this.$refs.computer.style.opacity = 0;
      this.$refs.computer.style.height = '10%';
      this.$refs.computer.style.backgroundColor = 'royalblue';
      this.isAntimation = false;
      }, 100);
    });


},


created(){
  this.getAllFiles();

  // 每隔3秒查看是否还有正在下载的任务
  setInterval(() => {
    if(this.$refs.computer.style.opacity==0){
      this.$bus.$emit('checkNeedDownLoad');
    }
  }, 3000);
}




}
</script>

<style scoped>
.otherBox{
    position: relative;
    background-color: #2f3542d1;
    width: 100%;
    height: 100%;
    z-index: 80;
    overflow: hidden;
    color: white;
    display: flex;
    flex-flow: column nowrap;
}
.butsl{
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.butsr{
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.title{
  position: relative;
  background-color: royalblue;
  width: 100%;
  z-index: 2;
  text-align: center;
  font-size: 10vh;
  overflow: hidden;
  font-weight: bolder;
  font-family: 'Courier New', Courier, monospace;
  color: royalblue;
  text-shadow: 0 0 25px black;
  box-shadow:  0 0 15px black;
  animation: create-frames 1s linear both;
}
.files{
  position: relative;
  width: 500%;
  transition: 0.33s;
  flex: 18;
  left: 0;
  background-color: #2f3542d1;
  overflow-x: scroll;
}
.computer{
  position: absolute;
  width: 80px;
  height: 20%;
  transition: 1s;
  background-color: royalblue;
  color: white;
  font-size: 3vh;
  font-weight: bolder;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 15px white;
  left: 0;
  top: 0;
  opacity: 0;
}
.iAnimation{
  position: relative;
  width: 90px;
  height: 50px;
  border-radius: 15px;
  text-align: center;
  line-height: 200%;
  right: 5px;
  background-color: royalblue;
  box-shadow: 0 0 20px royalblue;
  animation: i-Animation 3s both ease-in-out infinite;
}

@keyframes create-frames {
  0%{
    flex:99;
    line-height: 1000%;
    background-color: seagreen;
  }
  100%{
    flex:6;
    line-height: 250%;
    background-color: royalblue;
  }
}

@keyframes i-Animation {
  0%{
    top: 0;
    opacity: 0;
  }
  5%{
    top: 0;
    opacity: 0;
  }
  10%{
    top: 10%;
    opacity: 1;
  }
  50%{
    top: 65%;
    opacity: 1;
  }
  80%{
    top: 100%;
    opacity: 1;
  }
  99%{
    top: 100%;
    opacity: 0;
  }
  100%{
    top: 100%;
    opacity: 0;
  }
}

</style>