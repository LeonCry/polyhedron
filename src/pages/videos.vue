<template>
  <div class="videoBox">
  <meta name="referrer" content="no-referrer" />
    <div class="left">
      <div class="head">
        <img :src="myData.data.face" alt="">
      </div>
      <br>
      <span>{{myData.data.name}} -  Lv<span>{{myData.data.level}}</span></span>
      <br>
      <span style="font-size:1.4vh">{{myData.data.sign}}</span>
      <br>
      <span>关注数: <span>{{myFansData.data.following}}</span></span>
      <br>
      <span>粉丝数: <span>{{myFansData.data.follower}}</span></span>
      <br>
      <span>获赞数: <span>{{myLikeData.data.likes}}</span></span>
      <br>
      <span>播放数: <span>{{myLikeData.data.archive.view}}</span></span>
      <br>
      <span>阅读数: <span>{{myLikeData.data.article.view}}</span></span>
      <br>
      <span>视频数: 9</span>
      <br>
      <a :href="myData.data.live_room.url" style="color:seagreen;text-decoration:none;outline:none" target="_blank">
        进入我的直播间
         <span v-if="myData.data.live_room.liveStatus">(正在开播!)</span>
         <span v-if="!myData.data.live_room.liveStatus">(暂未开播)</span>
        </a>
      <br>
      <el-button type="success" style="background:pink;color:smoke" @click="toBilibili"> 关注我  <i class="el-icon-finished"></i> Bilibili</el-button>
      <a href="https://space.bilibili.com/241196314" target="_blank" style="display:none" ref="toBilibili"></a>
    </div>


    <div class="middle">
      <el-button class="pageUp" @click="pageUp"><i class="el-icon-caret-top"></i></el-button>
      <el-button class="pageDown" @click="pageDown"><i class="el-icon-caret-bottom"></i></el-button> 
    </div>

    <div class="right" ref="right">
            <videoBiliCard :BVno="bv" v-for="bv of videoBVs" :key="bv" :scavel="videoBVs[scavel]"></videoBiliCard>
    </div>
    <div class="rrght">

    </div>


  <el-button round class="backs" @click="routerTo('#')"><i class="el-icon-caret-left"></i> 返回</el-button>
  </div>

</template>

<script>
import videoBiliCard from '../components/videoItem/videoBiliCard.vue'
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'videos',
components:{videoBiliCard},
data(){
  return{
    // myData:{},
    myData:{"code":0,"message":"0","ttl":1,"data":{"mid":241196314,"name":"吧唧吧唧不哩不哩","sex":"保密","face":"http://i1.hdslb.com/bfs/face/979e308ebb035d64a2850267101f259fe346c09c.jpg","face_nft":0,"face_nft_type":0,"sign":"风在不住地吹，稍微转到东北方去，他知道这就是说风不会减退了。老头儿朝前面望了一望，但他看不见帆，也看不见船。","rank":10000,"level":5,"jointime":0,"moral":0,"silence":0,"coins":1039.1,"fans_badge":false,"fans_medal":{"show":true,"wear":false,"medal":null},"official":{"role":0,"title":"","desc":"","type":-1},"vip":{"type":1,"status":0,"due_date":1636992000000,"vip_pay_type":0,"theme_type":0,"label":{"path":"","text":"","label_theme":"","text_color":"","bg_style":0,"bg_color":"","border_color":"","use_img_label":true,"img_label_uri_hans":"","img_label_uri_hant":"","img_label_uri_hans_static":"https://i0.hdslb.com/bfs/vip/d7b702ef65a976b20ed854cbd04cb9e27341bb79.png","img_label_uri_hant_static":"https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/KJunwh19T5.png"},"avatar_subscript":0,"nickname_color":"","role":0,"avatar_subscript_url":"","tv_vip_status":0,"tv_vip_pay_type":0},"pendant":{"pid":0,"name":"","image":"","expire":0,"image_enhance":"","image_enhance_frame":""},"nameplate":{"nid":0,"name":"","image":"","image_small":"","level":"","condition":""},"user_honour_info":{"mid":0,"colour":null,"tags":[]},"is_followed":false,"top_photo":"http://i1.hdslb.com/bfs/space/8cd85a382756ab938df23a856017abccd187188e.png","theme":{},"sys_notice":{},"live_room":{"roomStatus":1,"liveStatus":0,"url":"https://live.bilibili.com/22825738?broadcast_type=0\u0026is_room_feed=1","title":"开逃开逃","cover":"http://i0.hdslb.com/bfs/live/new_room_cover/d1f484ba279e5f7fe6d270b6c1cefc8d2ea44aa0.jpg","roomid":22825738,"roundStatus":0,"broadcast_type":0,"watched_show":{"switch":true,"num":1,"text_small":"1","text_large":"1人看过","icon":"https://i0.hdslb.com/bfs/live/a725a9e61242ef44d764ac911691a7ce07f36c1d.png","icon_location":"","icon_web":"https://i0.hdslb.com/bfs/live/8d9d0f33ef8bf6f308742752d13dd0df731df19c.png"}},"birthday":"01-24","school":{"name":"东华大学"},"profession":{"name":"","department":"","title":"","is_show":0},"tags":null,"series":{"user_upgrade_status":3,"show_upgrade_window":false},"is_senior_member":0,"mcn_info":null}},
    myLikeData:{"code":0,"message":"0","ttl":1,"data":{"archive":{"view":1528},"article":{"view":0},"likes":60}},
    myFansData:{"code":0,"message":"0","ttl":1,"data":{"mid":241196314,"following":212,"whisper":0,"black":0,"follower":10}},
    videoBVs:['BV1y34y1S75c','BV14T4y1R7iv','BV1oR4y1x7wx','BV1cQ4y1Y7U4','BV1gg411A7VW','BV1Ra411B745','BV1jr4y1W7TC','BV1NT4y1r798','BV1fv4y1N7C6'],
    scavel:4,
    rightTop:0,
  }
},
methods:{
    routerTo(rout){
this.$router.push({
            name:rout,
        })
},
toBilibili(){
  this.$refs.toBilibili.click();
},

// 上一页
pageUp(){
  this.scavel--;
  if(this.scavel<0){
    this.scavel = 0;
    this.rightTop = this.rightTop - 260;
  }
  this.rightTop = this.rightTop + 260;
  this.$refs.right.style.top = this.rightTop + 'px';
  this.$bus.$emit('videoChange',this.videoBVs[this.scavel]);
},
// 下一页
pageDown(){
  this.scavel++;
  if(this.scavel>this.videoBVs.length-1){
    this.scavel = this.videoBVs.length-1;
    this.rightTop = this.rightTop + 260;
  }
  this.rightTop = this.rightTop - 260;
  this.$refs.right.style.top = this.rightTop + 'px';
  this.$bus.$emit('videoChange',this.videoBVs[this.scavel]);
},



},
created(){
//   setTimeout(() => {
//      this.$axios.get('/bilibili/x/space/acc/info?mid=241196314&jsonp=jsonp').then(response=>{
//       this.myData = response.data;
//   },error=>{
//     console.log(error.message);
//   }); 
//   }, 1000);

//  setTimeout(() => {
//     this.$axios.get('/bilibili/x/space/upstat?mid=241196314&jsonp=jsonp',).then(response=>{
//       this.myLikeData = response.data;
//       console.log(this.myLikeData);
//     },error=>{
//       console.log(error.message);
//     });
//  }, 1500);



}
}
</script>

<style scoped>
.videoBox{
    position: relative;;
    background-color: #2f3542;
    width: 100%;
    height: 100%;
    z-index: 80;
    font-size: 1.65vh;
    overflow: hidden;
    color: white;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}
.left{
  height: 70%;
  flex: 6;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 25px;
  color: white;
  font-size: 1.8vh;
}
.left span{
  transition: 0.33s;
  width: 100%;
  text-align: center;
  padding: 5px;
  border-radius: 20px;
}
.left a{
  transition: 0.33s;
  width: 100%;
  text-align: center;
  padding: 5px;
  border-radius: 20px;
}
.left span:hover{
  background-color: white;
  color: black;
}
.left a:hover{
  background-color: white;
  color: black;
}
.middle{
  height: 90%;
  flex: 2;
  border-left: 10px dotted darkgray;
  display: flex;
  flex-flow: column nowrap;
}
.right{
  position: relative;
  flex: 15;
  display: flex;
  transition: 0.33s;
  flex-flow: column nowrap;
}
.rrght{
  flex: 1;
}
.pageUp{
  position: absolute;
  margin-left: 10px;
  background-color: #252a34;
  color: white;
  font-size: 3vh;
  height: 50px;
  transition: 3s;
}
.pageUp:hover{
  background-color: white;
  color: black;
  height: 200px;
  transition: 0.55s;
}


.pageDown{
  position: absolute;
  bottom: 40px;
  background-color: #252a34;
  color: white;
  height: 50px;
  font-size: 3vh;
  transition: 3s;
}
.pageDown:hover{
  background-color: white;
  color: black;
  font-size: 3.5vh;
  height: 200px;
  transition: 0.55s;
}



.head img{
  position: relative;
  width: 70px;
  height: 70px;
  padding: 3px;
  border-radius: 100%;
  border: 3px solid #d2edf6;
}


.backs{
    position: absolute;
    z-index: 3;
    left: 25px;
    top: 25px;
    opacity: 0.5;
    transition: 0.55s;
    color: white;
    background-color: #2f3542;
}
.backs:hover{
    opacity: 1;
    background-color: #252a34;
}
@media only screen and (orientation: portrait) {
  .videoBox{
    position: relative;;
    background-color: #2f3542;
    width: 100%;
    height: 100%;
    z-index: 80;
    font-size: 1.65vh;
    overflow: auto;
    color: white;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}
.left{
  height: 70%;
  flex: 6;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 25px;
  color: white;
  font-size: 1.8vh;
}
.left span{
  transition: 0.33s;
  width: 100%;
  text-align: center;
  padding: 5px;
  border-radius: 20px;
}
.left a{
  transition: 0.33s;
  width: 100%;
  text-align: center;
  padding: 5px;
  border-radius: 20px;
}
.left span:hover{
  background-color: white;
  color: black;
}
.left a:hover{
  background-color: white;
  color: black;
}
.middle{
  position: absolute;
  height: 100%;
  flex: 2;
  border-left: none;
  display: flex;
    display: none;
  flex-flow: column nowrap;
}
.right{
  position: relative;
  height: 1600px;
  flex: 15;
  top: 50px;
  display: flex;
  transition: 0.33s;
  flex-flow: column nowrap;
}
.rrght{
  flex: 1;
}
.pageUp{
  position: sticky;
  top: 0;
  margin-left: 10px;
  background-color: #252a34;
  color: white;
  font-size: 3vh;
  height: 50px;
  transition: 3s;
}
.pageUp:hover{
  background-color: white;
  color: black;
  height: 50px;
  transition: 0.55s;
}


.pageDown{
  position: sticky;
  bottom: 0;
  background-color: #252a34;
  color: white;
  height: 50px;
  font-size: 3vh;
  transition: 3s;
}
.pageDown:hover{
  background-color: white;
  color: black;
  font-size: 3.5vh;
  height: 50px;
  transition: 0.55s;
}



.head img{
  position: relative;
  width: 70px;
  height: 70px;
  padding: 3px;
  border-radius: 100%;
  border: 3px solid #d2edf6;
}


}


</style>