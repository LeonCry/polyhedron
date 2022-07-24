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
      prop="pxId"
      label="收支ID"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="pxUser"
      align="center"
      label="用户名称"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="pxOr"
      sortable
      align="center"
      label="收入or支出"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="pxType"
      sortable
      align="center"
      label="收支类型"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="pxPrice"
      sortable
      align="center"
      label="收支金额"
      width="150">
    </el-table-column>
     <el-table-column
      prop="pxInfo"
      label="详细信息"
      show-overflow-tooltip
      align="center"
      width="350">
    </el-table-column>
     <el-table-column
      prop="pxTime"
      label="收支时间"
      align="center"
      show-overflow-tooltip
      width="200">
      <template slot-scope="scope">
            <span>
              {{
                new Date(parseInt(scope.row.pxTime)).toLocaleString()
              }}</span
            >
          </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="180">
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
name:'backPxMoney',
data(){
    return{
        receiveData:[],
    }
},
created(){
    this.$axios.post('/api/returnAllDetails').then(response=>{
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