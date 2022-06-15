<template>
  <div class="rightChatBox radius">
     <br>
    <b class="title">用户聊天信息</b>
    <hr>
    <br>
    <div class="Maincontent radius">
        <div class="user radius">
            <br>
            <el-tabs v-model="activeName" @tab-click="handleClick" >
         <el-tab-pane ><span slot="label" class="tabfull"><i class="el-icon-s-custom"></i> 用户列表</span>
            <el-input
            placeholder="输入用户名/昵称."
            v-model="input"
            prefix-icon="el-icon-search"
            class="searchInput"
            clearable>
            </el-input>
            <div class="allusers">
                <user-box :userProp="this.user"></user-box>
            </div>
            </el-tab-pane>
            </el-tabs>
        </div>
        <div class="chats radius">
            <chats-box></chats-box>
        </div>
        <div class="user radius">
            <br>
            <el-tabs v-model="activeName" @tab-click="handleClick">
         <el-tab-pane ><span class="eltab" slot="label"><i class="el-icon-lollipop"></i>朋友列表</span>
         <el-input
            placeholder="输入用户名/昵称/备注."
            v-model="input"
            class="searchInput"
            prefix-icon="el-icon-search"
            clearable>
        </el-input>
         <div class="allusers">
            <user-box :userProp="this.user"></user-box>
            </div>
         </el-tab-pane>
         <el-tab-pane><span class="eltab" slot="label"><i class="el-icon-postcard"></i>聊天记录</span>
  <div class="block">
    <el-date-picker
      v-model="value1"
      class="block"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
   <div class="allusers">
            <user-box :userProp="this.user"></user-box>
            </div>
            </el-tab-pane>
</el-tabs>
            <hr><br>
        </div>
    </div>

  </div>
</template>

<script>
import userBox from '@/components/BackEnd/chatComponents/userBox.vue'
import { mapState } from 'vuex'
import ChatsBox from '@/components/BackEnd/chatComponents/chatsBox.vue'
export default {
  components: { userBox, ChatsBox },
name:'rightChat',
computed:{
    ...mapState('userInfo',['user']),
}

}
</script>

<style scoped>
.rightChatBox{
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
    margin-bottom: 5px;
    margin-left: 10px;
    font-size: 2vh;
}
.Maincontent{
    width: 100%;
    height: 680px;
    display: flex;
    flex-flow: row nowrap;
}
.user{
    width: 20%;
    margin: 10px;
    display: flex;
    flex-flow: column nowrap;
    background-color: white;
}
.chats{
    width: 55%;
    margin: 10px;
    background-color: white;
}
.searchInput{
    width: 80%;
    left: 10%;
}
.allusers{
    position: relative;
    top: 10px;
    width: 90%;
    left: 5%;
    height: 520px;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
}
.block{
    width: 100%;
}
.eltab{
    margin-left: 20px;
    margin-right: 10px;
}
.tabfull{
    padding-left: 100px;
    padding-right: 100px;
    color: black;
}
</style>