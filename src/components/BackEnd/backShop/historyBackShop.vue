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
      label="浏览ID"
      align="center"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="name"
      align="center"
      label="用户名称"
      show-overflow-tooltip
      width="250">
    </el-table-column>
    <el-table-column
      prop="province"
      sortable
      align="center"
      label="浏览商品"
      show-overflow-tooltip
      width="200">
    </el-table-column>
    <el-table-column
      prop="city"
      sortable
      align="center"
      label="浏览商品ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="浏览次数"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="浏览时间"
      sortable
      align="center"
      show-overflow-tooltip
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="200">
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
name:'historyBackShop',
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