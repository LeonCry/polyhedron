<template>
  <div class="rightUserInfoBox radius">
    <b class="title">动态信息</b>
    <div class="users">
    <el-table class="radius hovers"
    :data="spaceInfos" 
    style="width: 99%"
    height="300">
    <el-table-column
      fixed
      prop="publishId"
      label="动态ID"
      width="100">
    </el-table-column>
     <el-table-column
      fixed
      prop="publishQQ"
      label="发表者用户名"
      width="150">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="spaceContent"
      label="动态内容"
      width="250">
    </el-table-column>
    <el-table-column
      prop="publishTime"
      label="发表时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="collector"
      label="收藏用户"
      width="150">
    </el-table-column>
    <el-table-column
      prop="gooder"
      label="点赞用户"
      width="150">
    </el-table-column>
    <el-table-column
      prop="noGooder"
      label="点踩用户"
      width="150">
    </el-table-column>
    <el-table-column
      prop="sharer"
      label="分享用户"
      width="150">
    </el-table-column>
  </el-table>


    </div>
    <br>
    <div class="row">
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态与用户" name="first">
  <div class="users2 ">
    <div>
    <el-table class="radius hovers"
    :data="spaceWiths"
    style="width: 99%"
    height="280">
    <el-table-column
      fixed
      prop="spaceWithId"
      label="动态关系Id"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="userQQ"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="collections"
      label="收藏的动态ID"
      width="250">
    </el-table-column>
    <el-table-column
      prop="goods"
      label="点赞的动态ID"
      width="250">
    </el-table-column>
    <el-table-column
      prop="noGoods"
      label="点踩的动态ID"
      width="250">
    </el-table-column>
    <el-table-column
      prop="shares"
      label="分享的动态ID"
      width="250">
    </el-table-column>
     </el-table>
 </div> </div>
    </el-tab-pane>
    <el-tab-pane label="评论内容" name="second">
                <div class="users3">
            <div >
          <el-table  class=" radius hovers"
    :data="comments"
    style="width: 100%"
    height="280">
    <el-table-column
      fixed
      prop="commentId"
      label="评论ID"
      width="200">
    </el-table-column>
    <el-table-column
      fixed
      prop="commentSpaceId"
      label="评论动态ID"
      width="200">
    </el-table-column>
    <el-table-column
     fixed
      prop="commentQQ"
      label="评论者用户名"
      width="200">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="commentContent"
      label="评论内容"
      width="250">
    </el-table-column>
    <el-table-column
      prop="commentTime"
      label="评论时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="commentFloor"
      label="评论楼数"
      width="200">
    </el-table-column>
  </el-table>


    </div>
                </div>
    </el-tab-pane>
    <el-tab-pane label="回复内容" name="third">
                        <div class="users2">
            <div >
          <el-table  class=" radius hovers"
    :data="replys"
    style="width: 98%"
    height="280">
    <el-table-column
      fixed
      prop="replyId"
      label="回复ID"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="replySpaceId"
      label="回复动态ID"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="replyQQ"
      label="回复者用户名"
      width="200">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="replyContent"
      label="回复内容"
      width="250">
    </el-table-column>
    <el-table-column
      prop="replyTargetQQ"
      label="回复对象"
      width="200">
    </el-table-column>
    <el-table-column
      prop="replyCommentFloor"
      label="回复楼数-评论"
      width="150">
    </el-table-column>
        <el-table-column
      prop="replyTargetFloor"
      label="回复楼数-回复"
      width="150">
    </el-table-column>
            <el-table-column
      prop="isReplyComment"
      label="是否回复的评论"
      width="150">
    </el-table-column>
                <el-table-column
      prop="myFloor"
      label="回复者楼层数"
      width="150">
    </el-table-column>
                    <el-table-column
      prop="replyTime"
      label="回复时间"
      width="200">
    </el-table-column>
  </el-table>


    </div>
                </div>
    </el-tab-pane>
    <el-tab-pane label="系统通知" name="fourth">
                        <div class="users3">
            <div >
          <el-table  class=" radius hovers"
    :data="sysnotices"
    style="width: 100%"
    height="280">
    <el-table-column
      fixed
      prop="sysNoticeId"
      label="系统通知ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="sendUserQQ"
      label="发送用户"
      width="200">
    </el-table-column>
    <el-table-column
      prop="receiveUserQQ"
      label="接收用户"
      width="200">
    </el-table-column>
    <el-table-column
      prop="noticeType"
      label="通知类型"
      width="100">
    </el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="remarks"
      label="备注"
      width="200">
    </el-table-column>
    <el-table-column
      prop="isAccept"
      label="是否接受"
      width="100">
    </el-table-column>
    <el-table-column
      prop="isDelete"
      label="是否删除"
      width="100">
    </el-table-column>
        <el-table-column
      prop="noticeTime"
      label="通知时间"
      width="200">
    </el-table-column>
  </el-table>


    </div>
                </div>
    </el-tab-pane>
    </el-tabs>

    </div>
  </div>
</template>

<script>
export default {
name:'spaceDataBox',
data(){
    return{
        activeName:'first',
        spaceInfos:[],
        spaceWiths:[],
        comments:[],
        replys:[],
        sysnotices:[],
    }
},
methods:{
   async creatInit(){
    this.$bus.$emit('backRightLoading',true,"加载中");
    // spaceInfos
  await  this.$axios.post('/api/returnAllSpace',).then(response=>{
        this.spaceInfos = response.data;
    },error=>{
        console.log(error.message);
    });
    // spaceWiths
   await this.$axios.post('/api/returnAllSpaceWith',).then(response=>{
        this.spaceWiths = response.data;
    },error=>{
        console.log(error.message);
    });
        // comments
   await this.$axios.post('/api/returnAllComment',).then(response=>{
        this.comments = response.data;
    },error=>{
        console.log(error.message);
    });
        // replys
   await this.$axios.post('/api/returnAllReply',).then(response=>{
        this.replys = response.data;
    },error=>{
        console.log(error.message);
    });
        // sysnotices
   await this.$axios.post('/api/returnAllNotice',).then(response=>{
        this.sysnotices = response.data;
    },error=>{
        console.log(error.message);
    });
    this.$bus.$emit('backRightLoading',false,"加载中");


    }
},
created(){
    this.creatInit();
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
    height: 300px;
}
.users2{
    width: 95%;
    height: 280px;
}
.users3{
    width: 98%;
    height: 280px;
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
}
.hovers:hover{
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
</style>