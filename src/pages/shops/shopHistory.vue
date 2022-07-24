<template>
  <div class="shopHistory">
    <div class="block">
  <el-timeline :reverse="true">
    <el-timeline-item v-for="data of allReceiveData" :key="data.pxId" :timestamp="new Date(parseInt(data.pxTime)).toLocaleString().split(' ')[0]" placement="top" size="large" :type="data.pxOr==0 ? 'danger':'success'">
      <el-card class="radius">
        <h4 style="font-weight:500">{{data.pxType}} <i class="el-icon-caret-right"></i> <span style="color:#F56C6C" v-if="data.pxOr==0">支出: <i class="el-icon-coin"></i>P{{data.pxPrice}}</span><span style="color:#67C23A" v-if="data.pxOr==1"> 收入: <i class="el-icon-coin"></i>P{{data.pxPrice}}</span></h4>
        <br>
        <p>{{data.pxInfo}}</p>
        <br>
        <span style="position: relative;right:0;width:100%;border-bottom:1px dotted black">{{new Date(parseInt(data.pxTime)).toLocaleString()}}</span>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name:'shopHistory',
computed:{
    ...mapState('userInfo',['user']),
},
data(){
  return{
    allReceiveData:[],
  }
},

created(){
  this.$axios.post('/api/returnDetailsByName',{pxUser:this.user.userQQ}).then(response=>{
    this.allReceiveData = response.data;
  },error=>{
    console.log(error.message);
  });
}

}
</script>

<style scoped>
.shopHistory{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
}
.block{
  position: relative;
  width: 60%;
  left: 20%;
}
.radius{
  border-radius: 25px;
}

</style>