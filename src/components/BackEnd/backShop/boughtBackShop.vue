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
      prop="orderId"
      align="center"
      label="购买ID"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      sortable
      prop="buyShopName"
      align="center"
      label="购买商品"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="buyUser"
      sortable
      align="center"
      label="购买者"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="buyNum"
      align="center"
      label="购买个数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyPrice"
      label="购买价格"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="receiveName"
      align="center"
      label="收件人"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="receivePhone"
      label="收件电话"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="receiveAddress"
      label="收件地址"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="receiveRemarks"
      label="购买备注"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="buyTime"
      label="购买时间"
      align="center"
      show-overflow-tooltip
      width="150">
      <template slot-scope="scope">
            <span>
              {{
                new Date(parseInt(scope.row.buyTime)).toLocaleString()
              }}</span
            >
          </template>
    </el-table-column>
    <el-table-column
      prop="buyParamName1"
      label="参数名-1"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyParamValue1"
      label="参数值-1"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyParamName2"
      label="参数名-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyParamValue2"
      label="参数值-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyParamName3"
      label="参数名-3"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyParamValue3"
      label="参数值-3"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyParamName4"
      label="参数名-4"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="buyParamValue4"
      label="参数值-4"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="orderTrain"
      label="是否隐藏"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="trainNumber"
      label="快递单号"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="orderStatus"
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
        @click="editOrder(scope.row)"
          type="primary"
          size="small">
          更新订单
        </el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-drawer
        :title="title"
        append-to-body
        size="40%"
        :visible.sync="isEdit"
        direction="rtl"
        >
            <el-form label-position="right" label-width="80px" :model="creatData"  class="inputs">
                <br><br>
                <el-form-item label="快递单号">
                <el-input v-model="creatData.trainNumber" placeholder="快递单号.."></el-input>
                </el-form-item>
                <br><br>
                <el-form-item label="订单状态">
                <el-input v-model="creatData.orderStatus" placeholder="[已下单] [正在运输] [收件人已签收]"></el-input>
                </el-form-item>
                <br><br><br><br>
                <el-button type="success" style="margin-left:40%" @click="updateOrder">更新订单</el-button>
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
        receiveData:[],
        isEdit:false,
        creatData:'',
        title:'',
    }
},
methods:{
  // 初始化收集所有订单信息
  getOrderData(){
    this.$axios.post('/api/returnAllShopOrder').then(response=>{
      this.receiveData = response.data;
    },error=>{
      console.log(error.message);
    });
  },
  // 更新订单
  editOrder(data){
    this.title = "为 '"+data.buyShopName+"' 更新订单信息:"
    this.isEdit = true;
    this.creatData = data;
  },
  // 确认更新订单
  updateOrder(){
    // eslint-disable-next-line no-unused-vars
    this.$axios.post('/api/updateAShopOrder',this.creatData).then(response=>{
      this.$message({
          message: '操作成功!',
          type: 'success'
        });
      setTimeout(() => {
        this.isEdit = false;
      }, 500);
    },error=>{
      console.log(error.message);
    });
  },
},
created(){
  this.getOrderData();
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