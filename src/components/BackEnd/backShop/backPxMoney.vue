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
      prop="date"
      label="收支ID"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="name"
      align="center"
      label="用户名称"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="province"
      sortable
      align="center"
      label="收入or支出"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="province"
      sortable
      align="center"
      label="收支类型"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="city"
      sortable
      align="center"
      label="收支金额"
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="收支项目"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="详细信息"
      show-overflow-tooltip
      align="center"
      width="250">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="收支时间"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="180">
      <template slot-scope="scope">
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
        receiveData:'',
    }
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