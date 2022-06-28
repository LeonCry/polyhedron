<template>
  <div class="rightPicsBox">
    <br>
      <el-tabs v-model="activeName" >


    <el-tab-pane label="照片信息" name="first" class="tab" >

              <el-button type="success" @click="createPic">上传新照片</el-button>
              <br>
            <transition name="creatT">
            <div class="inputs" ref="inputs" v-show="createDivShow">
             <el-form :label-position="labelPosition" label-width="150px" :model="picInfo" inline >
            <el-form-item label="照片地址">
                <el-input v-model="picInfo.picScr"></el-input>
            </el-form-item>
            <el-form-item label="照片名称">
              <el-input v-model="picInfo.picName"></el-input>
            </el-form-item>
            <el-form-item label="拍摄设备">
              <el-input v-model="picInfo.cameraName"></el-input>
            </el-form-item>
            <el-form-item label="镜头信息">
              <el-input v-model="picInfo.cameraInfo"></el-input>
            </el-form-item>
            <el-form-item label="拍摄参数">
              <el-input v-model="picInfo.cameraSetting"></el-input>
            </el-form-item>
             <el-form-item label="拍摄地点">
              <el-input v-model="picInfo.location"></el-input>
            </el-form-item>
             <el-form-item label="拍摄天气">
              <el-input v-model="picInfo.weather"></el-input>
            </el-form-item>
             <!-- <el-form-item label="拍摄日期">
              <el-input v-model="picInfo.picTime" placeholder="yyyy/mm/dd hh:mm:ss"></el-input>
            </el-form-item> -->
            <el-form-item label="拍摄日期">
                <el-date-picker
      v-model="picInfo.picTime"
       :append-to-body="false"
      type="datetime"
      value-format="timestamp"
      placeholder="选择日期时间">
    </el-date-picker>
            </el-form-item>
            <div style="text-align:center">
             <el-form-item label="">
               <el-button type="success" @click="confirmCreatePic">确定</el-button>
            </el-form-item>
            <el-form-item label="">
               <el-button type="warning" @click="cancelCreatePic">取消</el-button>
            </el-form-item>
            </div>
        </el-form>
            </div>
            </transition>
        <br>
      
         <el-table
    :data="tableData"
    style="width: 100%"
    max-height="600">

        <el-table-column
      fixed
      align="center"
      label="操作"
      width="150"
      >
      <template slot-scope="scope">
        <el-button
          @click="editPic(scope.row)"
          type="success"
          style="margin-right:5px"
          size="small">
          编辑
        </el-button>
<el-popconfirm
  confirm-button-text='是'
  confirm-button-type='danger'
  cancel-button-text='否'
  cancel-button-type='warning'
  @confirm='delPic(scope.row.picId)'
  icon="el-icon-info"
  icon-color="red"
  title="确定要删除这张照片吗？"
>
  <el-button type="danger"
          size="small" slot="reference">删除</el-button>
</el-popconfirm>
      </template>
    </el-table-column>

    <el-table-column
      fixed
      align="center"
      prop="picPic"
      label="照片缩略"
      width="150">
      <template slot-scope="scope">
      <el-image lazy :preview-src-list='[scope.row.picScr]' :src="scope.row.picScr" ></el-image>
        </template>
    </el-table-column>
    
    <el-table-column
      prop="picName"
      label="照片名称"
      align="center"
      width="200">
    </el-table-column>
        <el-table-column
      prop="picScr"
      label="照片地址"
      align="center"
      width="100">
      <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-link" circle @click="copySrc(scope.row.picScr)"></el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="cameraName"
      label="拍摄设备"
      align="center"
      width="250">
    </el-table-column>
    <el-table-column
      prop="cameraInfo"
      label="镜头信息"
      align="center"
      width="250">
    </el-table-column>
    <el-table-column
      prop="cameraSetting"
      label="拍摄参数"
      align="center"
      width="250">
    </el-table-column>
    <el-table-column
      prop="location"
      label="拍摄地点"
      align="center"
      width="200">
    </el-table-column>
    <el-table-column
      prop="weather"
      label="拍摄天气"
      align="center"
      sortable
      width="150">
    </el-table-column>
    <el-table-column
      prop="goodNumbers"
      label="点赞人数"
      align="center"
      sortable
      width="150">
    </el-table-column>
    <el-table-column
      prop="collectionNumbers"
      label="收藏人数"
      align="center"
      sortable
      width="150">
    </el-table-column>
    <el-table-column
      prop="picTime"
      label="拍摄日期"
      align="center"
      sortable
      width="200">
      <template slot-scope="scope">
      <span> {{new Date(parseInt(scope.row.picTime))
      .toLocaleString()
      }}</span>
      </template>
    </el-table-column>
  </el-table>



    
  <el-pagination
  background
  class="page"
  layout="prev, pager, next"
  @current-change="pageChange"
  @prev-click="pagePre"
  @next-click="pageNext"
  :page-size="10"
  :total="allDataLength">
</el-pagination>

<el-drawer
  title="照片信息重新编辑"
  append-to-body
  size="30%"
  :visible.sync="rightLabelShow"
  direction="rtl"
  >
             <div  ref="inputs">
              <br>
             <el-form :label-position="labelPosition" label-width="80px" :model="picEditInfo" >
            <el-form-item label="照片地址">
                <el-input v-model="picEditInfo.picScr"></el-input>
            </el-form-item>
            <el-form-item label="照片名称">
              <el-input v-model="picEditInfo.picName"></el-input>
            </el-form-item>
            <el-form-item label="拍摄设备">
              <el-input v-model="picEditInfo.cameraName"></el-input>
            </el-form-item>
            <el-form-item label="镜头信息">
              <el-input v-model="picEditInfo.cameraInfo"></el-input>
            </el-form-item>
            <el-form-item label="拍摄参数">
              <el-input v-model="picEditInfo.cameraSetting"></el-input>
            </el-form-item>
             <el-form-item label="拍摄地点">
              <el-input v-model="picEditInfo.location"></el-input>
            </el-form-item>
             <el-form-item label="拍摄天气">
              <el-input v-model="picEditInfo.weather"></el-input>
            </el-form-item>
             <!-- <el-form-item label="拍摄日期">
              <el-input v-model="picInfo.picTime" placeholder="yyyy/mm/dd hh:mm:ss"></el-input>
            </el-form-item> -->
            <el-form-item label="拍摄日期">
                <el-date-picker
      v-model="picEditInfo.picTime"
       :append-to-body="false"
      type="datetime"
      :currentPage.sync="currentPage"
      value-format="timestamp"
      placeholder="选择日期时间">
    </el-date-picker>
            </el-form-item>
            <div style="text-align:center">
             <el-form-item label="">
               <el-button type="success" @click="confirmChangePic">确定更改照片信息</el-button>
            </el-form-item>

            </div>
        </el-form>
            </div>
</el-drawer>
    
    </el-tab-pane>
    
    
    <el-tab-pane label="点赞收藏" name="second" class="tab">
          <el-table
    :data="allOperations"
    stripe
    style="width: 100%"
    height="600">
    <el-table-column
      fixed
      :header-align="center"
      prop="picWithId"
      label="ID"
      width="300">
    </el-table-column>
    <el-table-column
      prop="picWithQQ"
      label="用户名"
      sortable
      :header-align="center"
      width="400">
    </el-table-column>
    <el-table-column
      prop="picCollections"
      label="收藏照片ID"
      :header-align="center"
      width="400">
    </el-table-column>
    <el-table-column
      prop="picGoods"
      label="点赞照片ID"
      :header-align="center"
      width="400">
    </el-table-column>
  </el-table>

        
        </el-tab-pane>
    <el-tab-pane label="用户评论" name="third" class="tab">
                  <el-table
    :data="allComments"
    stripe
    style="width: 100%"
    height="600">
    <el-table-column
      fixed
      :header-align="center"
      prop="picCommentId"
      label="ID"
      width="200">
    </el-table-column>
    <el-table-column
      prop="picCommentPicId"
      label="评论照片ID"
      sortable
      :header-align="center"
      width="300">
    </el-table-column>
    <el-table-column
      prop="picCommentQQ"
      label="评论者"
      sortable
      :header-align="center"
      width="300">
    </el-table-column>
    <el-table-column
      prop="picCommentContent"
      label="评论内容"
      :header-align="center"
      width="400">
    </el-table-column>
    <el-table-column
      prop="picCommentTime"
      label="评论时间"
      sortable
      :header-align="center"
      width="300">
      <template slot-scope="scope">
      <span> {{new Date(parseInt(scope.row.picCommentTime))
      .toLocaleString()
      }}</span>
      </template>
    </el-table-column>
  </el-table>

        
        </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
name:'rightPics',
data(){
    return{
        activeName:'first',
        labelPosition: 'right',
        pageSize:10,
        currentPage:1,
        tableData:[],
        allDataLength:0,
        createDivShow:false,
        rightLabelShow:false,
        picInfo: {
          picScr:'',
          picName: '',
          cameraName: '',
          cameraInfo: '',
          cameraSetting:'',
          location:'',
          weather:'',
          picTime:'',
        },
        picEditInfo: {
          picScr:'',
          picName: '',
          cameraName: '',
          cameraInfo: '',
          cameraSetting:'',
          location:'',
          weather:'',
          picTime:'',
        },
        allComments:[],
        allOperations:[],
        
    }
},
methods:{
  createPic(){
    this.createDivShow = !this.createDivShow;
  },
  confirmCreatePic(){
    if(this.picInfo.picScr==''||this.picInfo.picName==''||this.picInfo.cameraName==''||this.picInfo.cameraInfo==''||this.picInfo.location==''||this.picInfo.weather==''||this.picInfo.picTime==''){
       this.$bus.$emit('backNotice',false,"您有未填项哦~");
    }
    else{
      // eslint-disable-next-line no-unused-vars
      this.$axios.post('/api/InsertPic',this.picInfo).then(response=>{
        this.resetPicInfo();
        this.$bus.$emit('backNotice',true,"新添加一张图片成功!");
        this.pageChange(this.currentPage);
      },error=>{
        console.log(error.message);
      });

    }
  } , 
  cancelCreatePic(){
    this.resetPicInfo();
    this.createDivShow = false;
  },
  // 使输入框清除
  resetPicInfo(){
    this.picInfo.picScr = '';
    this.picInfo.picName = '';
    this.picInfo.cameraName = '';
    this.picInfo.cameraInfo = '';
    this.picInfo.location = '';
    this.picInfo.weather = '';
    this.picInfo.picTime = '';
  },
  copySrc(src){
	let oInput = document.createElement("input");
	oInput.value = src;
	document.body.appendChild(oInput);
	oInput.select();
	document.execCommand("Copy");
	oInput.remove();
  this.$bus.$emit('backNotice',true,"照片地址已复制!");
  },
  
  // 列出所有照片数据根据页数
  returnAllPicData(start,end){
    this.tableData = [];
    this.$axios.post('/api/returnPics',{picId:0,pageStart:start,pageEnd:end}).then(response=>{
      this.tableData = response.data;
    },error=>{
      console.log(error.message);
    });
  },
  // 初始化列出数据
    returnAllPicDataCreated(){
    this.$axios.post('/api/returnPics',{picId:0,pageStart:0,pageEnd:99999}).then(response=>{
       this.allDataLength = response.data.length;
    },error=>{
      console.log(error.message);
    });
  },
// 删除照片
delPic(id){
  // eslint-disable-next-line no-unused-vars
  this.$axios.post('/api/delPic',{picId:id}).then(response=>{
    this.$bus.$emit('backNotice',true,"已删除!");
    this.pageChange(this.currentPage);
  },error=>{
    console.log(error.message);
  });
},

// 右侧抽屉展开
  editPic(data){
    this.rightLabelShow = true;
    this.picEditInfo = data;
  },
// 改变照片信息
  confirmChangePic(){
        if(this.picEditInfo.picScr==''||this.picEditInfo.picName==''||this.picEditInfo.cameraName==''||this.picEditInfo.cameraInfo==''||this.picEditInfo.location==''||this.picEditInfo.weather==''||this.picEditInfo.picTime==''){
       this.$bus.$emit('backNotice',false,"您有未填项哦~");
    }
    else{
      // eslint-disable-next-line no-unused-vars
       this.$axios.post('/api/updatePic',this.picEditInfo).then(response=>{
        this.resetPicInfo();
        this.$bus.$emit('backNotice',true,"更新照片信息成功!");
         this.rightLabelShow = false;
        this.pageChange(this.currentPage);
      },error=>{
        console.log(error.message);
      });
    }
},


  // 改变页数
  pageChange(val){
    this.currentPage = val;
    this.returnAllPicData((this.currentPage-1)*this.pageSize,this.pageSize);
  },
  // 上一页
  pagePre(val){
    this.currentPage = val;
    this.returnAllPicData((this.currentPage-1)*this.pageSize,this.currentPage);
  },
  // 下一页
  pageNext(val){
    this.currentPage = val;
    this.returnAllPicData((this.currentPage-1)*this.pageSize,this.currentPage);
  },
  operationsCreated(){
    this.$axios.post('/api/returnAllPicWith').then(response=>{
      this.allOperations = response.data;
    },error=>{
      console.log(error.message);
    });
  },
  commentCreated(){
    this.$axios.post('/api/returnAllPicComment').then(response=>{
      this.allComments = response.data;
    },error=>{
      console.log(error.message);
    });
  }
},
mounted(){
},
created(){
   this.returnAllPicDataCreated();
   this.returnAllPicData(0,10);
   setTimeout(() => {
   this.operationsCreated();
   this.commentCreated();
   }, 250);


}
}
</script>

<style scoped>
.rightPicsBox{
  width: 100%;
  height: 750px;
  display: flex;
  flex-flow: column nowrap;
}
.tab{
  height: 700px;
}
.title{
    color: rgb(29, 29, 32);
    font-size: 2vh;
}
.page{
    width: 100%;
    text-align: center;
}
.inputs{
    position: absolute;
    z-index: 100;
    width:97%;
    background-color: whitesmoke;
    padding: 20px;
    border-radius: 15px;
}
.creatT-enter-active{
animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.creatT-leave-active{
animation: swing-in-top-fwd 0.25s cubic-bezier(0.175, 0.885, 0.320, 1.275) both reverse;
}


@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
}

</style>
<style lang="css"> .el-tooltip__popper{ max-width:50% } </style>