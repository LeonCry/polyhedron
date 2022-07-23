<template>
  <div class="backShopBox">
    <br>
    <el-button @click="drawer = !drawer" type="primary">新增商品</el-button>
    <br><br>
    <!-- 表格 -->
      <el-table
    :data="receiveData"
    style="width: 100%"
    height="550">
    <el-table-column
      fixed
      prop="shopId"
      label="商品ID"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="shopName"
      label="商品名称"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="shopIntro"
      align="center"
      label="商品描述"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="shopPrice"
      align="center"
      label="商品价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="discountPrice"
      align="center"
      label="优惠价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="discountInfo"
      label="优惠信息"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="buyLimit"
      align="center"
      label="限制购买"
      width="100">
    </el-table-column>
    <el-table-column
      prop="shopNums"
      label="商品个数"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="picSrc1"
      label="图片-1"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="picSrc2"
      label="图片-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="picSrc3"
      align="center"
      label="图片-3"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="picSrc4"
      label="图片-4"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="picSrc5"
      align="center"
      label="图片-5"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="picSrc6"
      label="图片-6"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="shopFrom"
      label="商品来源"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="shoper"
      label="售卖店铺"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="shoperName"
      align="center"
      label="售卖名称"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="shoperWebsite"
      label="商品网址"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="supportTrain"
      label="支持快递"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="expressRegion"
      align="center"
      label="发货地区"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="allSales"
      align="center"
      label="本站销量"
      width="100">
    </el-table-column>
     <el-table-column
      prop="paramName1"
      label="参数名-1"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="paramValue1"
      align="center"
      label="参数值-1"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="paramName2"
      label="参数名-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="paramValue2"
      label="参数值-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="paramName3"
      label="参数名-3"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="paramValue3"
      label="参数值-3"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="paramName4"
      align="center"
      label="参数名-4"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="paramValue4"
      align="center"
      label="参数值-4"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="detailInfo"
      align="center"
      label="详细信息"
      show-overflow-tooltip
      width="120">
    </el-table-column>

    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="small"
          @click="editData(scope.row)"
          >
          修改
        </el-button>

        <el-button
          type="danger"
          size="small"
           @click="delData(scope.row.shopId)"
          >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>





    <el-drawer
        :title="title"
        append-to-body
        size="40%"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose">

            <el-form label-position="right" label-width="80px" :model="creatData"  class="inputs">
                <!-- 基本信息 -->
                <span class="prem">缩略基本信息:</span>
                <br><br><hr><br><br>
                <el-form-item label="商品名称">
                <el-input v-model="creatData.shopName" placeholder="缩略商品名称.."></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                <el-input v-model="creatData.shopIntro" placeholder="商品的简单介绍.."></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                <el-input v-model="creatData.shopPrice" placeholder="商品的最初价格.."></el-input>
                </el-form-item>
                <el-form-item label="优惠价格">
                <el-input v-model="creatData.discountPrice" placeholder="若无优惠,请填入原价格.."></el-input>
                </el-form-item>
                <el-form-item label="优惠信息">
                <el-input v-model="creatData.discountInfo" placeholder="(非必填)商品的优惠信息,也可以写备注.."></el-input>
                </el-form-item>
                <el-form-item label="限制购买">
                <el-input v-model="creatData.buyLimit" placeholder="商品最多购买个数.."></el-input>
                </el-form-item>
                <el-form-item label="商品个数">
                <el-input v-model="creatData.shopNums" placeholder="商品的所有数目.."></el-input>
                </el-form-item>
                <span class="prem">商品图片地址:</span>
                <br><br><hr><br><br>
                <el-form-item label="图片-1">
                <el-input v-model="creatData.picSrc1" placeholder="第一张将作为缩略展示.."></el-input>
                </el-form-item>
                <el-form-item label="图片-2">
                <el-input v-model="creatData.picSrc2" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-3">
                <el-input v-model="creatData.picSrc3" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-4">
                <el-input v-model="creatData.picSrc4" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-5">
                <el-input v-model="creatData.picSrc5" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-6">
                <el-input v-model="creatData.picSrc6" placeholder="图片网址.."></el-input>
                </el-form-item>
                <span class="prem">具体商品信息:</span>
                <br><br><hr><br><br>
                <el-form-item label="商品来源">
                <el-input v-model="creatData.shopFrom" placeholder="商品的来源-淘宝?京东.."></el-input>
                </el-form-item>
                <el-form-item label="售卖店铺">
                <el-input v-model="creatData.shoper" placeholder="卖商品的店铺名称.."></el-input>
                </el-form-item>
                <el-form-item label="售卖名称">
                <el-input v-model="creatData.shoperName" placeholder="商品在店铺的真实名称.."></el-input>
                </el-form-item>
                <el-form-item label="商品网址">
                <el-input v-model="creatData.shoperWebsite" placeholder="商品网址.."></el-input>
                </el-form-item>
                <el-form-item label="支持快递">
                <el-input v-model="creatData.supportTrain" placeholder="包邮的快递/收费快递.."></el-input>
                </el-form-item>
                <el-form-item label="发货地区">
                <el-input v-model="creatData.expressRegion" placeholder="发货地.."></el-input>
                </el-form-item>
                <span class="prem">商品参数设置:</span>
                <br><br><hr><br><br>
                <el-form-item label="参数名-1">
                <el-input v-model="creatData.paramName1" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-1">
                <div>
                <el-tag
                    :key="tag"
                    v-for="tag in creatData.paramValue1"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,creatData.paramValue1)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible1"
                    v-model="inputValue1"
                    ref="saveTagInput1"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(creatData.paramValue1,inputValue1,inputVisible1)"
                    @blur="handleInputConfirm(creatData.paramValue1,inputValue1,inputVisible1)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible1')">+新参数</el-button>
                </div>
                </el-form-item>
                <el-form-item label="参数名-2">
                <el-input v-model="creatData.paramName2" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-2">
                <div>
                <el-tag
                    :key="tag"
                    v-for="tag in creatData.paramValue2"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,creatData.paramValue2)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible2"
                    v-model="inputValue2"
                    ref="saveTagInput1"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(creatData.paramValue2,inputValue2,inputVisible2)"
                    @blur="handleInputConfirm(creatData.paramValue2,inputValue2,inputVisible2)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible2')">+新参数</el-button>
                </div>
                </el-form-item>
                <el-form-item label="参数名-3">
                <el-input v-model="creatData.paramName3" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-3">
               <div>
                <el-tag
                    :key="tag"
                    v-for="tag in creatData.paramValue3"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,creatData.paramValue3)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible3"
                    v-model="inputValue3"
                    ref="saveTagInput3"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(creatData.paramValue3,inputValue3,inputVisible3)"
                    @blur="handleInputConfirm(creatData.paramValue3,inputValue3,inputVisible3)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible3')">+新参数</el-button>
                </div>
                </el-form-item>
                <el-form-item label="参数名-4">
                <el-input v-model="creatData.paramName4" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-4">
                <div>
                <el-tag
                    :key="tag"
                    v-for="tag in creatData.paramValue4"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,creatData.paramValue4)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible4"
                    v-model="inputValue4"
                    ref="saveTagInput4"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(creatData.paramValue4,inputValue4,inputVisible4)"
                    @blur="handleInputConfirm(creatData.paramValue4,inputValue4,inputVisible4)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible4')">+新参数</el-button>
                </div>
                </el-form-item>
                <span class="prem">详细信息网址及其他不可变更选项:</span>
                <br><br><hr><br><br>
                <el-form-item label="详细信息">
                <el-input v-model="creatData.detailInfo" placeholder="详细信息图片形式.."></el-input>
                </el-form-item>
                <el-form-item label="本站销量">
                <el-input v-model="creatData.allSales" placeholder="一般不作手动更改.."></el-input>
                </el-form-item>
                <br><br><br><br>
                <el-button @click="uploadShop" type="success" style="margin-left:40%">上传商品</el-button>
                <br><br><br><br>

                
            </el-form>

    </el-drawer>



  </div>
</template>

<script>
export default {
name:'allBackShop',
data(){
    return{
        drawer:false,
        creatData:{
          shopName:'',
          shopIntro:'',
          shopPrice:'',
          discountPrice:'',
          discountInfo:'',
          buyLimit:'',
          shopNums:'',
          picSrc1:'',
          picSrc2:'',
          picSrc3:'',
          picSrc4:'',
          picSrc5:'',
          picSrc6:'',
          shopFrom:'',
          shoper:'',
          shoperName:'',
          shoperWebsite:'',
          supportTrain:'',
          expressRegion:'',
          allSales:'',
          paramName1:'',
          paramValue1:[],
          paramName2:'',
          paramValue2:[],
          paramName3:'',
          paramValue3:[],
          paramName4:'',
          paramValue4:[],
          shopNdetailInfoame:'',
        },
        inputVisible1:false,
        inputValue1: '',
        inputVisible2:false,
        inputValue2: '',
        inputVisible3:false,
        inputValue3: '',
        inputVisible4:false,
        inputValue4: '',
        receiveData:[],
        title:"新增产品",
        isEdit:false,
    }
},
methods: {

  // 上传商品
  uploadShop(){
    // 转字符串
    this.creatData.paramValue1 = this.creatData.paramValue1.toString();
    this.creatData.paramValue2 = this.creatData.paramValue2.toString();
    this.creatData.paramValue3 = this.creatData.paramValue3.toString();
    this.creatData.paramValue4 = this.creatData.paramValue4.toString();
    var url = '';
    // 判断
    if(this.isEdit){
      url = '/api/updateAShopping';
    }
    else{
      url = '/api/addAShopping';
    }
    // 上传
    this.$axios.post(url,this.creatData).then(response=>{
      console.log("url",url,response.data);
      this.clearCreateData();
      this.getData();
      this.$message({
          message: '操作成功!',
          type: 'success'
        });
      this.title = "新增产品";
      this.isEdit = false;
      this.drawer = false;

    },error=>{
      console.log(error.message);
    });
  },
  // 删除商品
  delData(Id){
    this.$axios.post('/api/delAShopping',{shopId:Id}).then(response=>{
      console.log(response.data);
      this.getData();
      this.$message({
          message: '操作成功!',
          type: 'success'
        });
    },error=>{
      console.log(error.message);
    });
  },

  // 修改产品
  editData(data){
    this.isEdit = true;
    this.drawer = true;
    this.title = "编辑产品";
    this.creatData = data;
    if(this.creatData.paramValue1!=''){
      this.creatData.paramValue1 = this.creatData.paramValue1.split(',');
    }
    if(this.creatData.paramValue2!=''){
      this.creatData.paramValue2 = this.creatData.paramValue2.split(',');
    }
    if(this.creatData.paramValue3!=''){
      this.creatData.paramValue3 = this.creatData.paramValue3.split(',');
    }
    if(this.creatData.paramValue4!=''){
      this.creatData.paramValue4 = this.creatData.paramValue4.split(',');
    }
  },



// 初始化接收参数
  getData(){
    this.$axios.post('/api/returnAllShopping').then(response=>{
      this.receiveData = response.data;
      console.log(response.data);
    },error=>{
      console.log(error.message);
    });
  },

  // createData 清除
  clearCreateData(){
    this.creatData = {
          shopName:'',
          shopIntro:'',
          shopPrice:'',
          discountPrice:'',
          discountInfo:'',
          buyLimit:'',
          shopNums:'',
          picSrc1:'',
          picSrc2:'',
          picSrc3:'',
          picSrc4:'',
          picSrc5:'',
          picSrc6:'',
          shopFrom:'',
          shoper:'',
          shoperName:'',
          shoperWebsite:'',
          supportTrain:'',
          expressRegion:'',
          allSales:'',
          paramName1:'',
          paramValue1:[],
          paramName2:'',
          paramValue2:[],
          paramName3:'',
          paramValue3:[],
          paramName4:'',
          paramValue4:[],
          shopNdetailInfoame:'',
        };
  },




    // 关闭窗口
      handleClose(done) {
        this.$confirm('关闭将不会保存任何信息,确认关闭?')
          .then(()=> {
            done();
             this.title = "新增产品";
             this.isEdit = false;
             this.clearCreateData();
          })
          .catch(()=> {});
      },
    // 标签减少
      handleReduce(tag,dynamicTags) {
        dynamicTags.splice(dynamicTags.indexOf(tag), 1);
      },
    //   展示新输入
      showInput(inputVisible) {
        switch(inputVisible){
            case('inputVisible1'):
                this.inputVisible1 = true;
                this.$nextTick(()=> {
                    this.$refs.saveTagInput1.$refs.input.focus();
                });
                break;
            case('inputVisible2'):
                this.inputVisible2 = true;
                this.$nextTick(()=> {
                    this.$refs.saveTagInput2.$refs.input.focus();
                });
                break;
            case('inputVisible3'):
                this.inputVisible3 = true;
                this.$nextTick(()=> {
                    this.$refs.saveTagInput3.$refs.input.focus();
                });
                break;
            case('inputVisible4'):
                this.inputVisible4 = true;
                this.$nextTick(()=> {
                    this.$refs.saveTagInput4.$refs.input.focus();
                });
                break;            
        }
      },
    //   新增确定
       handleInputConfirm(dynamicTags,inputValue1) {
        let inputValue = inputValue1;
        if (inputValue) {
          dynamicTags.push(inputValue);
        }
        this.inputVisible1 = false;
        this.inputVisible2 = false;
        this.inputVisible3 = false;
        this.inputVisible4 = false;
        this.inputValue1 = '';
        this.inputValue2 = '';
        this.inputValue3 = '';
        this.inputValue4 = '';
      }
    },
    created(){
      // 初始化接收参数
      this.getData();
    }





}
</script>

<style scoped>
.backShopBox{
    position: relative;
    width: 100%;
    height: 700px;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
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
.prem{
    position: relative;
    width: 100%;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>