<template>
  <div class="backShopBox">
    <br><br>
           <!-- 表格 -->
      <el-table
    :data="receiveData"
    style="width: 100%"
    height="600">
    <el-table-column
      fixed
      prop="browseId"
      label="浏览ID"
      align="center"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="browseUser"
      align="center"
      label="用户名称"
      show-overflow-tooltip
      width="250">
    </el-table-column>
    <el-table-column
      prop="browseShop"
      sortable
      align="center"
      label="浏览商品"
      show-overflow-tooltip
      width="200">
    </el-table-column>
    <el-table-column
      prop="browseShopId"
      sortable
      align="center"
      label="浏览商品ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="browseNums"
      label="浏览次数"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="browseTimes"
      label="浏览时间"
      sortable
      align="center"
      show-overflow-tooltip
      width="300">
      <template slot-scope="scope">
            <span>
              {{
                new Date(parseInt(scope.row.browseTimes)).toLocaleString()
              }}</span
            >
          </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="200">
      <template>
        <el-button
          type="danger"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
name:'historyBackShop',
data(){
  return{
    receiveData:[],
  }
},


created(){
  this.$axios.post('/api/returnAllBrowseHistory',).then(response=>{
    this.receiveData = response.data;
  },error=>{
    console.log(error.message);
  });
}

}
</script>

<style scoped>
.backShopBox{
    position: relative;
    width: 100%;
    height: 700px;
    overflow-y: auto;
}
</style>