// 展示喜欢\分享\收藏动态的人\
<template>
  <div class="sharePeopleBox">
    <div class="exit">
      <img src="../assets/exit2.svg" alt="退出" @click="exitShowPeople" />
    </div>
      <span>分享给好友</span>
      <share-people-item :userProp="friend" v-for="friend of friends" :key="friend.userId" ></share-people-item>
    <div class="but">
        <button @click="confirm">分享</button>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import sharePeopleItem from './sharePeopleItem.vue';
export default {
  components: { sharePeopleItem },
  props:['spaceProps'],
name:'sharePeople',
data(){
    return{
        friends:[],
        shareToFriend:[],
        spaceItem:'',
    }
},
computed:{
    ...mapState('userInfo',['user','socket']),
},

mounted(){
    this.getFriendInit();
    // 获得被选中的friend
    this.$bus.$on('sharePeople',(selectFriend,isSelect)=>{
        // 若为添加
        if(isSelect){
            this.shareToFriend.push(selectFriend);
        }
        else{
             for (let index = 0; index < this.shareToFriend.length; index++) {
                const shares = this.shareToFriend[index];
                if(shares==selectFriend){
                    this.shareToFriend.splice(index,1);
                    break;
                }
             }
        }     
    })
},
methods:{
       // 退出按钮
    exitShowPeople() {
      this.$bus.$emit('sharePeopleDisAppear','');
    },
    // 初始化
    getFriendInit(){
        this.$axios.post('/api/getAllFriends',{userQQ:this.user.userQQ}).then(response=>{
        this.friends = response.data;
    },error=>{
        console.log(error.message);
    });
    
    },
  async confirm(){
        // 展示分享中
        this.$bus.$emit("spaceLoading",true,"分享中");
        // 首先遍历选中的朋友们,然后上传至数据库,socket发送消息
        for (let index = 0; index < this.shareToFriend.length; index++) {
            const f = this.shareToFriend[index];
          await this.sendMessageRequest("我向你分享了[分享],点击查看详情........." +JSON.stringify(this.spaceProps),f.friendQQ);
        }
        this.$bus.$emit("spaceLoading",false,"分享中");
        this.$bus.$emit('sharePeopleDisAppear','');
        this.thinkNotice("分享了一篇动态!");
        this.$bus.$emit('spaceNotice',true,"分享啦~");

    },
        // 发送消息向数据库发送请求
    async sendMessageRequest(message,friendQQ){
       // eslint-disable-next-line no-unused-vars
       await this.$axios.post('/api/addOneChat',{sendUserQQ:this.user.userQQ,receiveUserQQ:friendQQ,chatContent:message,chatTime:Date.now()}).then(response=>{
        this.socket.send(JSON.stringify({from:this.user.userQQ,to:friendQQ,message:"我向你分享了[分享],点击查看详情........." +JSON.stringify(this.spaceProps)}));
        },error=>{
            console.log(error.message);
        });  
        },

     async thinkNotice(msg){
      let message = "A9wadv::NEW动态:"+this.user.userName+msg;
         this.socket.send(JSON.stringify({from:this.user.userQQ,to:this.spaceProps.publishQQ,message:message}));
          await  this.$axios.post("/api/addOneNotice",{sendUserQQ:this.user.userQQ,receiveUserQQ:this.spaceProps.publishQQ,noticeType:0,remarks:msg+"Q-v4jvy-Q"+JSON.stringify(this.spaceProps),noticeTime:Date.now()}).then(response=>{
        console.log("已添加动态:",response.data);
        },error=>{
             console.log(error.message);
        });
      },   
}
}
</script>

<style scoped>
.sharePeopleBox{
    position: absolute;
    width: 95%;
    z-index: 99;
    left: 5%;
    padding-left: 20px;
    border-radius: 20px;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
    min-height: 250px;
    max-height: 500px;
    border: 1.5px solid white;
    box-shadow: 0 0 3px white;
    background-color: black;
}
.sharePeopleBox span{
    text-align: center;
    color: pink;
    font-size: 2vh;
    padding-top: 15px;
    padding-bottom: 15px;

}
/* 退出按钮 */
.exit {
  position: absolute;
  right: 0;
  z-index: 11;
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

.but {
  max-width: 100%;
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
}
.but button {
  position: relative;
  width: 80px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: white;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
}

.but button:nth-of-type(1):hover {
  box-shadow: 0px 0px 25px green;
  background-color: green;
}

</style>