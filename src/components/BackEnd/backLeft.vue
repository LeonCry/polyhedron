<template>
  <div class="backLeftBox">
 <el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="0"
      class="el-tot"
      background-color="rgba(0,0,0,0)"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0" @click="routerTo('overView')">
        <i class="el-icon-menu"></i>
        <span slot="title">总览</span>
      </el-menu-item>
      <br><br>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="routerTo('userInfo')">
            <i class="el-icon-s-help"></i>
            <span>用户信息</span>
            </el-menu-item>
          <el-menu-item index="1-2" @click="routerTo('userChats')">
            <i class="el-icon-s-comment"></i>
            <span>聊天内容</span>
            </el-menu-item>
          <el-menu-item index="1-3" @click="routerTo('userSpaces')">
            <i class="el-icon-s-opportunity"></i>
            <span>空间动态</span>
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <br>
      <el-menu-item index="2">
        <i class="el-icon-s-goods"></i>
        <span slot="title">兑换品</span>
      </el-menu-item>
      <br>
      <el-menu-item index="3">
        <i class="el-icon-camera-solid"></i>
        <span slot="title">相册集</span>
      </el-menu-item>
      <br>
      <el-menu-item index="4">
        <i class="el-icon-upload"></i>
        <span slot="title">文件夹</span>
      </el-menu-item>
      <br>
      <el-menu-item index="5">
        <i class="el-icon-s-home"></i>
        <span slot="title">避难所</span>
      </el-menu-item>
      <br>
       <el-menu-item index="6">
        <i class="el-icon-s-tools"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
name:'backLeft',

created(){
  this.routerTo('overView');
},

methods:{
    // 路由跳转
    routerTo(routerTo){
        this.$router.push({
            name:routerTo,
        })
    }
},
}
</script>

<style scoped>
.backLeftBox{
    position: relative;
    top: 20px;
    color: whitesmoke;
}
.el-tot{
    position: relative;
    width: 200%;
    height: 720px;
}


</style>