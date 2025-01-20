<template>
  <div class="rightOverviewBox">
    <br />
    <el-row :gutter="20">
      <el-col :span="6">
        <el-container class="radius test" direction="vertical">
          <el-main class="item radius hoverbox">
            <el-row :gutter="20">
              <el-col :span="24"><b class="fons-title">总用户数</b></el-col>
              <hr />
            </el-row>
            <br />
            <div class="flex-row">
              <b class="fons"><i class="el-icon-user-solid"> </i> {{ totalUsers }}</b>
            </div>
            <div class="flex-row"><b class="days">较昨日</b><b class="days">较上周</b></div>
            <div class="flex-row"><b style="color: green">▲:12.5% </b> <b style="color: red">▼:12.5%</b></div>
          </el-main>
          <el-main class="item radius hoverbox">
            <el-row :gutter="20">
              <el-col :span="24"><b class="fons-title">当前在线</b></el-col>
              <hr />
            </el-row>
            <br />
            <div class="flex-row">
              <b class="fons"><i class="el-icon-monitor"></i> {{ allusers.length }}</b>
            </div>
            <div class="flex-row"><b class="days">较昨日</b><b class="days">较上周</b></div>
            <div class="flex-row"><b style="color: green">▲:12.5% </b> <b style="color: red">▼:12.5%</b></div>
          </el-main>
          <el-main class="item radius hoverbox">
            <el-row :gutter="20">
              <el-col :span="24"><b class="fons-title">总登录数</b></el-col>
              <hr />
            </el-row>
            <br />
            <div class="flex-row">
              <b class="fons"><i class="el-icon-s-data"></i> {{ 100 }}</b>
            </div>
            <div class="flex-row"><b class="days">较昨日</b><b class="days">较上周</b></div>
            <div class="flex-row"><b style="color: green">▲:12.5% </b> <b style="color: red">▼:12.5%</b></div>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="18">
        <el-container class="radius test" direction="vertical">
          <el-main class="item radius hoverbox">
            <b class="fons-title">避难所:正在进行的活动:</b>
            <hr />
            <el-table :data="tableData" style="width: 100%" height="400">
              <el-table-column fixed prop="gameId" label="活动ID" width="120"> </el-table-column>
              <el-table-column sortable prop="timeBegin" label="开始时间" width="150"> </el-table-column>
              <el-table-column prop="timeEnd" label="预计结束时间" width="150"> </el-table-column>
              <el-table-column prop="gameUsers" label="活动中的角色" width="200"> </el-table-column>
              <el-table-column prop="gameMap" label="使用的地图" width="120"> </el-table-column>
              <el-table-column prop="UserMoney" label="角色带入总资金" width="150"> </el-table-column>
              <el-table-column prop="gameMapMoney" label="活动总资金" width="120"> </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="20">
      <el-container class="radius bott" direction="vertical">
        <el-main class="item radius hoverbox">
          <b class="fons-title">管理员账号管理:</b>
          <hr />
          <el-table :data="AdmainData" style="width: 100%">
            <el-table-column label="管理员ID" prop="admainId"> </el-table-column>
            <el-table-column label="管理员账号" prop="admainLogin"> </el-table-column>
            <el-table-column label="管理员密码" prop="admainPassword"> </el-table-column>
            <el-table-column label="限制权限" prop="admainPass"> </el-table-column>
            <el-table-column label="用户绑定" prop="admainToUser"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template>
                <el-button type="danger" size="small"> 限制登录 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'rightOverview',
  data() {
    return {
      tableData: [
        {
          gameId: '001',
          timeBegin: '6/4 15:56:20',
          timeEnd: '6/4 16:56:20',
          gameUsers: '小李,小王,小华,小红,小黑',
          gameMap: '珠穆朗玛峰',
          UserMoney: '$' + 200333,
          gameMapMoney: '$' + 285000,
        },
        {
          gameId: '001',
          timeBegin: '6/4 15:56:20',
          timeEnd: '6/4 16:56:20',
          gameUsers: '小李,小王,小华,小红,小黑',
          gameMap: '珠穆朗玛峰',
          UserMoney: '$' + 200333,
          gameMapMoney: '$' + 285000,
        },
        {
          gameId: '001',
          timeBegin: '6/4 15:56:20',
          timeEnd: '6/4 16:56:20',
          gameUsers: '小李,小王,小华,小红,小黑',
          gameMap: '珠穆朗玛峰',
          UserMoney: '$' + 200333,
          gameMapMoney: '$' + 285000,
        },
        {
          gameId: '001',
          timeBegin: '6/4 15:56:20',
          timeEnd: '6/4 16:56:20',
          gameUsers: '小李,小王,小华,小红,小黑',
          gameMap: '珠穆朗玛峰',
          UserMoney: '$' + 200333,
          gameMapMoney: '$' + 285000,
        },
        {
          gameId: '001',
          timeBegin: '6/4 15:56:20',
          timeEnd: '6/4 16:56:20',
          gameUsers: '小李,小王,小华,小红,小黑',
          gameMap: '珠穆朗玛峰',
          UserMoney: '$' + 200333,
          gameMapMoney: '$' + 285000,
        },
        {
          gameId: '001',
          timeBegin: '6/4 15:56:20',
          timeEnd: '6/4 16:56:20',
          gameUsers: '小李,小王,小华,小红,小黑',
          gameMap: '珠穆朗玛峰',
          UserMoney: '$' + 200333,
          gameMapMoney: '$' + 285000,
        },
        {
          gameId: '001',
          timeBegin: '6/4 15:56:20',
          timeEnd: '6/4 16:56:20',
          gameUsers: '小李,小王,小华,小红,小黑',
          gameMap: '珠穆朗玛峰',
          UserMoney: '$' + 200333,
          gameMapMoney: '$' + 285000,
        },
      ],
      AdmainData: [
        {
          admainId: '001',
          admainLogin: 'Admain',
          admainPassword: 'A9wadv4jvy0328',
          admainPass: '允许登录',
          admainToUser: 'lbh',
        },
      ],
      totalUsers: 0,
      onlineUser: 0,
    }
  },
  computed: {
    ...mapState('userInfo', ['user', 'allusers']),
  },
  created() {
    // 获取所有用户数
    this.$axios.post('/api/findUsers', { userQQ: '' }).then(
      (response) => {
        this.totalUsers = response.data.length
      },
      (error) => {
        console.log(error.message)
      }
    )
  },
}
</script>

<style scoped>
.test {
  width: 100%;
  height: 500px;
}
.rightOverviewBox {
  color: black;
  font-size: 1.6vh;
}
.radius {
  border-radius: 10px;
}
.item {
  background-color: white;
  margin: 10px;
  margin-left: 15px;
  margin-right: 15px;
  border: 2px rgba(0, 0, 0, 0.1) solid;
  overflow: hidden;
}
.fons-title {
  font-size: 2vh;
  color: #343a40;
}
.days {
  font-size: 1.6vh;
  color: gray;
}
.bott {
  height: 200px;
}
.fons {
  color: palevioletred;
  font-size: 2.2vh;
}
.scaled {
  position: relative;
  transform: scale(1.25);
  color: rgba(255, 255, 255, 0.25);
}
.flex-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.hoverbox {
  transition: 0.33s;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
.hoverbox:hover {
  background-color: whitesmoke;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}
</style>
