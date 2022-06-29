<template>
  <div class="rightUserInfoBox radius">
    <br>
    <b class="title">用户信息</b>
    <br>
    <div class="users">
    <el-table class="radius hovers"
    :data="userInfos" 
    style="width: 100%"
    height="300">
    <el-table-column
      fixed
      prop="userId"
      show-overflow-tooltip
      label="用户ID"
      width="100">
    </el-table-column>
        <el-table-column
    show-overflow-tooltip
    fixed
      prop="userQQ"
      label="登录名"
      width="150">
    </el-table-column>
     <el-table-column
      prop="userHead"
      label="头像"
      width="80">
      <template slot-scope="scope">
      <el-image lazy :preview-src-list='[require(`../../../HeadsAndBacks/Heads/${scope.row.userHead}`)]' :src="require(`../../../HeadsAndBacks/Heads/${scope.row.userHead}`)" ></el-image>
        </template>
    </el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="userBack"
      label="背景"
      width="150">
      <template slot-scope="scope">
      <el-image lazy :preview-src-list='[require(`../../../HeadsAndBacks/Backs/${scope.row.userBack}`)]' :src="require(`../../../HeadsAndBacks/Backs/${scope.row.userBack}`)" ></el-image>
        </template>
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="userName"
      label="昵称"
      width="150">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="userPassword"
      label="密码"
      width="150">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="userEmail"
      label="邮箱"
      width="150">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="userSign"
      label="个性签名"
      width="200">
    </el-table-column>
        <el-table-column
        show-overflow-tooltip
        sortable
      prop="isOnline"
      label="限制登录"
      width="100">
    </el-table-column>
     <el-table-column
     show-overflow-tooltip
      sortable
      prop="state"
      label="在线状态"
      width="100">
      <template slot-scope="scope">
        <span style="color:seagreen" v-if="scope.row.state==1">在线</span>
        <span style="color:darkgray" v-if="scope.row.state==0">离线</span>
         </template>
    </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
          type="danger"
          size="small">
          限制登录
        </el-button>
      </template>
    </el-table-column>
  </el-table>


    </div>
    <br>
    <div class="row">
        <div class="users2 ">
             <b class="title">用户关系</b>
    <div >
         <br> 
          <el-table class="radius hovers"
    :data="friendData"
    style="width: 100%"
    height="300">
    <el-table-column
      fixed
      prop="friendId"
      label="朋友关系ID"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="userQQ"
      label="用户名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="friendQQ"
      label="朋友-用户名"
      width="250">
    </el-table-column>
    <el-table-column
      prop="friendName"
      label="朋友-昵称"
      width="250">
    </el-table-column>
    <el-table-column
      prop="friendRemarkName"
      label="朋友-备注"
      width="250">
    </el-table-column>
    <el-table-column
      sortable
      prop="beFriendTime"
      label="成为好友时间"
      width="300">
      <template slot-scope="scope">
          <span> {{new Date(parseInt(scope.row.beFriendTime))
                .toLocaleString()
                }}</span>
      </template>
    </el-table-column>
            </el-table>


    </div>
        </div>
        <div class="users3">
             <b class="title">用户设置</b>
    <div >
        <br> 
          <el-table  class=" radius hovers"
    :data="userSetting"
    style="width: 100%"
    height="300">
    <el-table-column
      fixed
      prop="settingId"
      label="设置ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="userQQ"
      label="用户名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="voiceNotice"
      label="避难所通知"
      width="100">
    </el-table-column>
    <el-table-column
      prop="messageNotice"
      label="消息通知"
      width="100">
    </el-table-column>
    <el-table-column
      prop="spaceNotice"
      label="动态通知"
      width="100">
    </el-table-column>
    <el-table-column
      prop="loginNotice"
      label="登录通知"
      width="100">
    </el-table-column>
  </el-table>


    </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'rightUserInfoBox',
data(){
  return{
    userInfos:[],
    friendData:[],
    userSetting:[],
  }
},
computed:{
  ...mapState('userInfo',['allusers']),
},
created(){
  // 用户信息
  this.$axios.post('/api/findUsers',{userQQ:''}).then(response=>{
    this.userInfos = response.data;
    
    for (let index = 0; index < this.userInfos.length; index++) {
      this.userInfos[index]['state'] = 0;
      const userr = this.userInfos[index];
      for (let index2 = 0; index2 < this.allusers.length; index2++) {
        const uuser = this.allusers[index2];
        if(userr.userQQ==uuser.username){
           this.userInfos[index]['state'] = 1;
           break;
        }
      }
    }

  },error=>{
    console.log(error.message);
  });
  // 朋友关系
  this.$axios.post('/api/returnAllFriendList').then(response=>{
    this.friendData = response.data;
  },error=>{
    console.log(error.message);
  });
    // 设置
  this.$axios.post('/api/returnAllSetting').then(response=>{
    this.userSetting = response.data;
  },error=>{
    console.log(error.message);
  });
}
}
</script>

<style scoped>
.rightUserInfoBox{
    width: 100%;
    height: 750px;
    display: flex;
    flex-flow: column nowrap;
}
.radius{
    border-radius: 15px;
}
.title{
    color: rgb(29, 29, 32);
    font-size: 2vh;
}
.users{
    position: relative;
    width: 100%;
    background-color: white;
    height: 300px;
}
.users2{
    width: 49%;
    margin-right: 1%;
    height: 300px;
}
.users3{
    width: 49%;
    margin-left: 1%;
    height: 300px;
}
.row{
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 300px;
}
.hovers{
    transition: 0.33s;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
.hovers:hover{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}
.head{
  width: 35px;
  height: 35px;
}
</style>