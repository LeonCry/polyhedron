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
      prop="date"
      label="商品ID"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名称"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="province"
      align="center"
      label="商品描述"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="city"
      align="center"
      label="商品价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="优惠价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="优惠信息"
      align="center"
      show-overflow-tooltip
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      align="center"
      label="限制购买"
      width="100">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="商品个数"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="图片-1"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="图片-2"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      align="center"
      label="图片-3"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="图片-4"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      align="center"
      label="图片-5"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="图片-6"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="商品来源"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="售卖店铺"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      align="center"
      label="售卖名称"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="商品网址"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      label="支持快递"
      align="center"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      align="center"
      label="发货地区"
      show-overflow-tooltip
      width="120">
    </el-table-column>
     <el-table-column
      prop="zip"
      align="center"
      label="本站销量"
      width="100">
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
      align="center"
      label="参数值-1"
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
      align="center"
      label="参数名-4"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      align="center"
      label="参数值-4"
      show-overflow-tooltip
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
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
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
          type="danger"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>





    <el-drawer
        title="添加新的商品"
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
                <el-input v-model="creatData.name" placeholder="缩略商品名称.."></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                <el-input v-model="creatData.region" placeholder="商品的简单介绍.."></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                <el-input v-model="creatData.type" placeholder="商品的最初价格.."></el-input>
                </el-form-item>
                <el-form-item label="优惠价格">
                <el-input v-model="creatData.type" placeholder="商品的优惠价格.."></el-input>
                </el-form-item>
                <el-form-item label="优惠信息">
                <el-input v-model="creatData.type" placeholder="商品的优惠信息,也可以写备注.."></el-input>
                </el-form-item>
                <el-form-item label="限制购买">
                <el-input v-model="creatData.type" placeholder="商品最多购买个数.."></el-input>
                </el-form-item>
                <el-form-item label="商品个数">
                <el-input v-model="creatData.type" placeholder="商品的所有数目.."></el-input>
                </el-form-item>
                <span class="prem">商品图片地址:</span>
                <br><br><hr><br><br>
                <el-form-item label="图片-1">
                <el-input v-model="creatData.type" placeholder="第一张将作为缩略展示.."></el-input>
                </el-form-item>
                <el-form-item label="图片-2">
                <el-input v-model="creatData.type" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-3">
                <el-input v-model="creatData.type" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-4">
                <el-input v-model="creatData.type" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-5">
                <el-input v-model="creatData.type" placeholder="图片网址.."></el-input>
                </el-form-item>
                <el-form-item label="图片-6">
                <el-input v-model="creatData.type" placeholder="图片网址.."></el-input>
                </el-form-item>
                <span class="prem">具体商品信息:</span>
                <br><br><hr><br><br>
                <el-form-item label="商品来源">
                <el-input v-model="creatData.type" placeholder="商品的来源-淘宝?京东.."></el-input>
                </el-form-item>
                <el-form-item label="售卖店铺">
                <el-input v-model="creatData.type" placeholder="卖商品的店铺名称.."></el-input>
                </el-form-item>
                <el-form-item label="售卖名称">
                <el-input v-model="creatData.type" placeholder="商品在店铺的真实名称.."></el-input>
                </el-form-item>
                <el-form-item label="商品网址">
                <el-input v-model="creatData.type" placeholder="商品网址.."></el-input>
                </el-form-item>
                <el-form-item label="支持快递">
                <el-input v-model="creatData.type" placeholder="包邮的快递/收费快递.."></el-input>
                </el-form-item>
                <el-form-item label="发货地区">
                <el-input v-model="creatData.type" placeholder="发货地.."></el-input>
                </el-form-item>
                <span class="prem">商品参数设置:</span>
                <br><br><hr><br><br>
                <el-form-item label="参数名-1">
                <el-input v-model="creatData.type" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-1">
                <div>
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags1"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,dynamicTags1)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible1"
                    v-model="inputValue1"
                    ref="saveTagInput1"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(dynamicTags1,inputValue1,inputVisible1)"
                    @blur="handleInputConfirm(dynamicTags1,inputValue1,inputVisible1)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible1')">+新参数</el-button>
                </div>
                </el-form-item>
                <el-form-item label="参数名-2">
                <el-input v-model="creatData.type" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-2">
                <div>
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags2"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,dynamicTags2)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible2"
                    v-model="inputValue2"
                    ref="saveTagInput1"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(dynamicTags2,inputValue2,inputVisible2)"
                    @blur="handleInputConfirm(dynamicTags2,inputValue2,inputVisible2)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible2')">+新参数</el-button>
                </div>
                </el-form-item>
                <el-form-item label="参数名-3">
                <el-input v-model="creatData.type" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-3">
               <div>
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags3"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,dynamicTags3)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible3"
                    v-model="inputValue3"
                    ref="saveTagInput3"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(dynamicTags3,inputValue3,inputVisible3)"
                    @blur="handleInputConfirm(dynamicTags3,inputValue3,inputVisible3)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible3')">+新参数</el-button>
                </div>
                </el-form-item>
                <el-form-item label="参数名-4">
                <el-input v-model="creatData.type" placeholder="输入参数名称.."></el-input>
                </el-form-item>
                <el-form-item label="参数值-4">
                <div>
                <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags4"
                    closable
                    :disable-transitions="false"
                    @close="handleReduce(tag,dynamicTags4)">
                    {{tag}}
                    </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible4"
                    v-model="inputValue4"
                    ref="saveTagInput4"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(dynamicTags4,inputValue4,inputVisible4)"
                    @blur="handleInputConfirm(dynamicTags4,inputValue4,inputVisible4)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput('inputVisible4')">+新参数</el-button>
                </div>
                </el-form-item>
                <span class="prem">详细信息网址及其他不可变更选项:</span>
                <br><br><hr><br><br>
                <el-form-item label="详细信息">
                <el-input v-model="creatData.type" placeholder="详细信息图片形式.."></el-input>
                </el-form-item>
                <el-form-item label="本站销量">
                <el-input v-model="creatData.type" placeholder="一般不作手动更改.."></el-input>
                </el-form-item>
                <br><br><br><br>
                <el-button type="success" style="margin-left:40%">上传商品</el-button>
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
        creatData:'',
        dynamicTags1: [],
        dynamicTags2: [],
        dynamicTags3: [],
        dynamicTags4: [],
        inputVisible1:false,
        inputValue1: '',
        inputVisible2:false,
        inputValue2: '',
        inputVisible3:false,
        inputValue3: '',
        inputVisible4:false,
        inputValue4: '',
        receiveData:'',
    }
},
methods: {
    // 关闭窗口
      handleClose(done) {
        this.$confirm('关闭将不会保存任何信息,确认关闭?')
          .then(()=> {
            done();
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