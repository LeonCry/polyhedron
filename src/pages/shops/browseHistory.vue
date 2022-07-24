<template>
  <div class="browseHistory">
    <history-item v-for="borwse of receiveData" :key="borwse.browseId" :browseProp="borwse"></history-item>
    <div v-if="receiveData.length" class="static">
      <el-button type="danger" round @click="clearBrowse">清除所有浏览历史</el-button>
    </div>
  </div>
</template>

<script>
import historyItem from "@/components/shopper/historyItem.vue"
import { mapState } from 'vuex'

export default {
components: { historyItem },
name:'browseHistory',
computed:{
    ...mapState('userInfo',['user']),
},
data(){
  return{
    receiveData:[],
  }
},
methods:{
  getAllData(){
    this.$axios.post('/api/returnBrowseHistoryByName',{browseUser:this.user.userQQ}).then(response=>{
      this.receiveData = response.data;
    },error=>{
      console.log(error.messge);
    })
  },
  clearBrowse(){
    this.$axios.post('/api/delABrowseHistory',{browseUser:this.user.userQQ}).then(response=>{
          this.$message({
          message: '清除成功!',
          type: 'success'
        });
        this.receiveData = [];
    },error=>{
      console.log(error.message);
    });
  }
},
created(){
  this.getAllData();
}
}
</script>

<style scoped>
.browseHistory{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
}
.static{
  position: sticky;
  bottom: 0;
  width: 100%;
  text-align: center;
}

</style>