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
      align="center"
      label="购买ID"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="name"
      align="center"
      label="购买商品"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="province"
      sortable
      align="center"
      label="购买者"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="city"
      align="center"
      label="购买个数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="购买价格"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      align="center"
      label="收件人"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="收件电话"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="收件地址"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="购买备注"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="购买时间"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数名-1"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数值-1"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数名-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数值-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数名-3"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数值-3"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数名-4"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="参数值-4"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="订单编号"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="发货快递"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="快递单号"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="订单状态"
      align="center"
      sortable
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="180">
      <template slot-scope="scope">
        <el-button
        @click="isEdit = true"
          type="text"
          size="small">
          更新订单
        </el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-drawer
        title="更新订单"
        append-to-body
        size="40%"
        :visible.sync="isEdit"
        direction="rtl"
        >
            <el-form label-position="right" label-width="80px" :model="creatData"  class="inputs">
                <br><br>
                <el-form-item label="发货快递">
                <el-input v-model="creatData.name" placeholder="发货快递..."></el-input>
                </el-form-item>
                <br><br>
                <el-form-item label="快递单号">
                <el-input v-model="creatData.region" placeholder="快递单号.."></el-input>
                </el-form-item>
                <br><br>
                <el-form-item label="订单状态">
                <el-input v-model="creatData.type" placeholder="订单状态.."></el-input>
                </el-form-item>
                <br><br><br><br>
                <el-button type="success" style="margin-left:40%">更新订单</el-button>
                <br><br><br><br>

                
            </el-form>

    </el-drawer>



  </div>
</template>

<script>
export default {
name:'boughtBackShop',
data(){
    return{
        receiveData:'',
        isEdit:false,
        creatData:'',
    }
},
}
</script>

<style scoped>
.backShopBox{
    position: relative;
    width: 100%;
    height: 700px;
    overflow-y: auto;
}

.inputs{
    position: relative;
    width: 100%;
    height: 100%;
    /* display: flex;
    flex-flow: row wrap; */
}
.el-input{
    width: 90%;
    margin-right: 10px;
}
</style>