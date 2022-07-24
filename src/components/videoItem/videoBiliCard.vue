<template>
  <div v-if="bilibiliData"  class="vvdeoBox" :class="{scal:isScal}">
    <!-- get请求图片出现403 防盗链解决方式 no-referrer -->
    <!-- http请求头中有一个referrer字段，用来表示发起http请求的源地址信息 服务器端在拿到这个referrer值后判断请求是否来自本站 -->
    <!-- 在前端可以通过meta来设置referrer policy(来源策略)，referrer设置成no-referrer，发送请求不会带上referrer信息，对方服务器也就无法拦截了   -->
    <meta name="referrer" content="no-referrer" />

    <div class="pic">
        <img v-if="bilibiliData" :src="bilibiliData.data.pic" alt="图片">
    </div>
    <div class="mid">

    </div>
    <div class="info">
      <br>
      <span style="width:100%;text-align:center;font-size:2.2vh">{{bilibiliData.data.title}}</span>
      <br>
      <div class="baseInfo">
        <!-- <span>发表时间:{{new Date(parseInt(bilibiliData.data.pubdata))
                .toLocaleString()}}</span> -->
        <span>播放量:{{bilibiliData.data.stat.view}}</span>
        <span>觉得赞:{{bilibiliData.data.stat.like}}</span>
        <span>收藏数:{{bilibiliData.data.stat.favorite}}</span>
        <span>分享数:{{bilibiliData.data.stat.share}}</span>
        <span>评论数:{{bilibiliData.data.stat.reply}}</span>
        <span>获得硬币:{{bilibiliData.data.stat.coin}}</span>
      </div>
      <br>

        <span>- 类型:{{bilibiliData.data.tname}}</span>

        <br>
        <br>
        <a @click="watchVideo" :href="'https://www.bilibili.com/video/'+BVno" target="_blank">观看 -> bilibili </a>
        <br>


    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'videoBiliCard',
props:['BVno','scavel'],
computed:{
  ...mapState('userInfo',['user']),
},
data(){
    return{
        bilibiliData:'',
        realPic:'',
        isScal:false,
    }
},
methods:{
 watchVideo(){
  this.$addPxDetail(this.user.userQQ,1,'视频观看',25,this.bilibiliData.data.title,"在视频集中观看 '"+this.bilibiliData.data.title+"' 的视频,获得PX币+50");
 }
},

mounted(){
  this.$bus.$on('videoChange',(data)=>{
    if(data==this.BVno){
      this.isScal = true;
    }
    else{
      this.isScal = false;
    }
  })
},

created(){
  setTimeout(() => {
    this.$axios.get('/bilibili/x/web-interface/view?bvid='+this.BVno).then(response=>{
      this.bilibiliData = response.data;
    },error=>{
      console.log(error.message);
    });
  }, 100);
// 判断是否是自己要放大
  setTimeout(() => {
    if(this.scavel==this.BVno){
      this.isScal = true;
    }
  }, 200);



}
}
</script>

<style scoped> 
.vvdeoBox{
  position: relative;
  width: 85%;
  height: 250px;
  display: flex;
  flex-flow: row nowrap;
  border: 4px double white;
  border-radius: 25px;
  /* background-color: royalblue; */
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
  transition: 0.55s;
  transform: scale(0.9);
  filter: blur(4px);
}
.scal{
  transform: scale(1.2);
  filter: blur(0);
  z-index: 2;
}
.pic{
  position: relative;
  flex: 6;
  
}
.pic img{
  position: relative;
  height: 250px;
  border-radius: 25px 0 0 25px;
  
}
.mid{
  flex: 2;
  border-left: 4px double white;
}
.info{
  position: relative;
  flex: 16;
  display: flex;
  flex-flow: column nowrap;
}
.baseInfo{
  display: flex;
  flex-flow: row wrap;
}
.baseInfo span{
  margin: 5px;
}
a{
  color:white;
  text-decoration:none;
  outline:none;
  text-align: center;
  width: 45%;
  margin-left: 20%;
  padding: 10px;
  transition: 0.25s;
  font-size: 1.6vh;
  font-weight: bold;
  border-radius: 15px;
  background-color: rosybrown;
}
a:hover{
  color: black;
  background-color: white;
}

</style>