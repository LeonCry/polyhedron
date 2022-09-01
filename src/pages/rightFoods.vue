<template>
  <div class="rightfiles">
    <div class="upload radius">
      <br /><br />
      <el-button type="primary" @click="drawer = true">新增菜品</el-button>
    </div>
    <div class="hasuploaded radius">
      <br />
      <span>已有的菜品:</span>
      <br /><br />

      <el-table
        class="radius"
        :data="fileData"
        style="width: 100%"
        max-height="600"
      >
        <el-table-column fixed prop="foodId" label="食物Id" width="100" >
        </el-table-column>
        <el-table-column fixed prop="foodName" label="食物名称" width="200">
        </el-table-column>
        <el-table-column prop="foodPic" label="食物图片" width="100">
          <template slot-scope="scope">
        <el-image lazy :preview-src-list='[scope.row.foodPic]' :src="scope.row.foodPic" ></el-image>
        </template>
        </el-table-column>
        <el-table-column prop="foodType" label="食物类型" width="200" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="foodCopy" label="人均份数" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="foodMaterial" label="食物原料" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="foodMadeTimes" label="需要时间" width="100" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="foodMadeNums" label="已做次数" width="100" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="foodPrice" label="食物价格" width="100" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="foodDetails" label="食物详情" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="foodDoingWay" label="食物做法" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-popconfirm
  confirm-button-text='是'
  confirm-button-type='danger'
  cancel-button-text='否'
  cancel-button-type='warning'
  @confirm='delFile(scope.row.foodId)'
  icon="el-icon-info"
  icon-color="red"
  title="确定要删除该食物信息？"
>
  <el-button type="danger"
          size="small" slot="reference">删除</el-button>
</el-popconfirm>
            <el-button style="margin-left:5px" type="primary" size="small" @click="changeFile(scope.row)"> 修改 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 抽屉 -->
    <el-drawer
      title="食物"
      :visible.sync="drawer"
      :direction="'rtl'"
      :before-close="handleClose"
      append-to-body
    >
      <div ref="inputs">
        <br />
        <el-form
          :label-position="'right'"
          label-width="80px"
          :model="creatFiles"
        >
          <el-form-item label="食物名称">
            <el-input v-model="creatFiles.foodName"></el-input>
          </el-form-item>
          <el-form-item label="食物图片">
            <el-input v-model="creatFiles.foodPic"></el-input>
          </el-form-item>
          <el-form-item label="食物类型">
            <el-input v-model="creatFiles.foodType"></el-input>
          </el-form-item>
          <el-form-item label="人均份数">
            <el-input v-model="creatFiles.foodCopy"></el-input>
          </el-form-item>
          <el-form-item label="食物原料">
            <el-input v-model="creatFiles.foodMaterial" placeholder="逗号分割"></el-input>
          </el-form-item>
          <el-form-item label="需要时间">
            <el-input v-model="creatFiles.foodMadeTimes"></el-input>
          </el-form-item>
          <el-form-item label="已做次数">
            <el-input v-model="creatFiles.foodMadeNums"></el-input>
          </el-form-item>
          <el-form-item label="食物价格">
            <el-input v-model="creatFiles.foodPrice"></el-input>
          </el-form-item>
          <el-form-item label="食物详情">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="creatFiles.foodDetails"></el-input>
          </el-form-item>
          <el-form-item label="食物做法">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}"  v-model="creatFiles.foodDoingWay"></el-input>
          </el-form-item>

          <div style="text-align: center">
            <el-form-item label="">
              <el-button type="success" @click="confirmUploadFile">确定上传</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "rightFoods",
  data() {
    return {
      fileData:[],
      drawer: false,
      creatFiles : {
        foodName:'',
        foodPic:'',
        foodType:'',
        foodCopy:'',
        foodMaterial:'',
        foodMadeTimes:'',
        foodMadeNums:'',
        foodPrice:'',
        foodDetails:'',
        foodDoingWay:'',
      },
      isEdit:false,
    };
  },
  methods: {

    confirmCheck(){
        if(this.creatFiles.foodName==''||this.creatFiles.foodPic==''||this.creatFiles.foodType==''||this.creatFiles.foodCopy==''||this.creatFiles.foodMaterial==''||this.creatFiles.foodMadeTimes==''||this.foodMadeNums==''||this.foodPrice==''||this.foodDetails==''||this.foodDoingWay==''){
            this.$message.error('您有未填项!');
            return false;
        }
        return true;

    },
          handleClose(done){
        this.clearInputs();
         done();

      },
    // 上传
   async confirmUploadFile() {
        var checkResult = this.confirmCheck();
        if(checkResult){
            // 说明是修改
            if(this.isEdit){
                this.isEdit = false;
                // eslint-disable-next-line no-unused-vars
                this.$axios.post('/api/updateFoods',{foodId:this.creatFiles.foodId,foodName:this.creatFiles.foodName,foodPic:this.creatFiles.foodPic ,foodType: this.creatFiles.foodType,foodCopy: this.creatFiles.foodCopy,foodMadeTimes: this.creatFiles.foodMadeTimes,foodMaterial:this.creatFiles.foodMaterial ,foodMadeNums:this.creatFiles.foodMadeNums,foodPrice:this.creatFiles.foodPrice,foodDetails:this.creatFiles.foodDetails,foodDoingWay:this.creatFiles.foodDoingWay}).then(response=>{
                this.clearInputs();
                this.$bus.$emit('backNotice',true,"更新成功!");
                this.fileCreatedFun();
            },error=>{
                console.log(error.message);
            });
            }
            // 说明是新建
            else{
              // eslint-disable-next-line no-unused-vars
                this.$axios.post('/api/insertFoods',{foodName:this.creatFiles.foodName,foodPic:this.creatFiles.foodPic ,foodType: this.creatFiles.foodType,foodCopy: this.creatFiles.foodCopy,foodMadeTimes: this.creatFiles.foodMadeTimes,foodMaterial:this.creatFiles.foodMaterial ,foodMadeNums:this.creatFiles.foodMadeNums,foodPrice:this.creatFiles.foodPrice,foodDetails:this.creatFiles.foodDetails,foodDoingWay:this.creatFiles.foodDoingWay}).then(response=>{
                this.clearInputs();
                this.$bus.$emit('backNotice',true,"上传成功!");
                this.fileCreatedFun();
            },error=>{
                console.log(error.message);
            });
            }
            this.drawer = false;

        }
    },

    // 将输入框清空
    clearInputs(){
        this.creatFiles = {
        foodName:'',
        foodPic:'',
        foodType:'',
        foodCopy:'',
        foodMaterial:'',
        foodMadeTimes:'',
        foodMadeNums:'',
        foodPrice:'',
        foodDetails:'',
        foodDoingWay:'',
      };
    },

    // 初始化
    fileCreatedFun(){
        this.$axios.post('/api/selectAllFoods',).then(response=>{
            this.fileData = response.data;
        },error=>{
            console.log(error.message);
        });
    },

    // 删除文件
    delFile(id){
      // eslint-disable-next-line no-unused-vars
        this.$axios.post('/api/deleteFoods',{foodId:id}).then(response=>{
            this.$bus.$emit('backNotice',true,"该食物信息已删除!");
             this.fileCreatedFun();
        },error=>{
            console.log(error.message);
        });
    },
    changeFile(fileData){
        this.creatFiles = fileData;
        this.drawer = true;
        this.isEdit = true;
    }


  },
  created(){
    this.fileCreatedFun();
  }
};
</script>

<style scoped>
.rightfiles {
  width: 100%;
  height: 98%;
  display: flex;
  flex-flow: column nowrap;
}
.radius {
  border-radius: 10px;
}
.upload {
  width: 100%;
  flex: 3;
  text-align: center;
}
.hasuploaded {
  width: 100%;
  flex: 21;
}
.hasuploaded span {
  text-align: center;
  font-size: 2.2vh;
  font-weight: bold;
}
.inputs {
  position: absolute;
  z-index: 100;
  width: 97%;
  background-color: whitesmoke;
  padding: 20px;
  border-radius: 15px;
}
</style>