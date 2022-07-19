<template>
  <div class="rightfiles">
    <div class="upload radius">
      <br /><br />
      <el-button type="primary" @click="drawer = true">上传新文件</el-button>
    </div>
    <div class="hasuploaded radius">
      <br />
      <span>已上传了的文件:</span>
      <br /><br />

      <el-table
        class="radius"
        :data="fileData"
        style="width: 100%"
        max-height="600"
        show-overflow-tooltip
      >
        <el-table-column fixed prop="fileId" label="文件ID" width="100">
        </el-table-column>
        <el-table-column fixed prop="fileName" label="文件名" width="200">
        </el-table-column>
        <el-table-column prop="fileType" label="文件类型" width="100">
        </el-table-column>
        <el-table-column prop="fileIntro" label="文件介绍" width="200">
        </el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" width="150">
      <template slot-scope="scope">
      <span style="font-size:1.4vh">{{new Date(parseInt(scope.row.uploadTime))
      .toLocaleString()
      }}</span>
      </template>
        </el-table-column>
        <el-table-column prop="downloadNums" label="下载次数" width="100">
        </el-table-column>
        <el-table-column prop="filePath" label="文件地址" width="150">
        </el-table-column>
        <el-table-column prop="fileShow" label="文件展示" width="100">
        </el-table-column>
        <el-table-column prop="downLoadP" label="下载人员" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-popconfirm
  confirm-button-text='是'
  confirm-button-type='danger'
  cancel-button-text='否'
  cancel-button-type='warning'
  @confirm='delFile(scope.row.fileId)'
  icon="el-icon-info"
  icon-color="red"
  title="确定要删除该文件？"
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
      title="文件"
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
          <el-form-item label="文件名称">
            <el-input v-model="creatFiles.fileName"></el-input>
          </el-form-item>
          <el-form-item label="文件类型">
            <el-input v-model="creatFiles.fileType"></el-input>
          </el-form-item>
          <el-form-item label="文件介绍">
            <el-input v-model="creatFiles.fileIntro"></el-input>
          </el-form-item>
          <el-form-item label="下载人数">
            <el-input v-model="creatFiles.downloadNums"></el-input>
          </el-form-item>
          <el-form-item label="文件展示">
            <el-input v-model="creatFiles.fileShow"></el-input>
          </el-form-item>
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="creatFiles.uploadTime"
              :append-to-body="false"
              type="datetime"
              :currentPage.sync="currentPage"
              value-format="timestamp"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="文件上传">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/api/filesAppsUpLoads"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList"
              :limit=1
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                上传文件大小不可超过100M
              </div>
            </el-upload>
          </el-form-item>
          <div style="text-align: center">
            <el-form-item label="">
              <el-button type="success" @click="confirmUploadFile">{{butText}}</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "rightFiles",
  data() {
    return {
      filePath:'',
      fileData:[],
      drawer: false,
      creatFiles: {
        fileName:'',
        fileType:'',
        fileIntro:'',
        downloadNums:'',
        fileShow:'',
        uploadTime:'',
      },
      currentPage: 1,
      fileList:[],
      butText:'确定上传文件',
    };
  },
  methods: {

    handleChange(file){
            this.filePath = file.response;
	},

    confirmCheck(){
        if(this.creatFiles.name==''||this.creatFiles.fileType==''||this.creatFiles.fileIntro==''||this.creatFiles.downloadNums==''||this.creatFiles.fileShow==''||this.creatFiles.uploadTime==''||this.filePath==''){
            this.$message.error('您有未填项!');
            return false;
        }
        return true;

    },
    // 上传
   async confirmUploadFile() {
        if(this.creatFiles.filePath!=null){

            this.filePath = this.creatFiles.filePath;
        }
        var checkResult = this.confirmCheck();
        console.log(checkResult);
        if(checkResult){
            // 说明是修改
            if(this.creatFiles.filePath!=null){

                this.$axios.post('/api/updateFile',{fileId:this.creatFiles.fileId,fileName:this.creatFiles.fileName,fileType:this.creatFiles.fileType ,fileIntro: this.creatFiles.fileIntro,uploadTime: this.creatFiles.uploadTime,downloadNums: this.creatFiles.downloadNums,filePath:this.filePath ,fileShow:this.creatFiles.fileShow,}).then(response=>{
                this.clearInputs();
                this.$bus.$emit('backNotice',true,"文件修改成功!");
                this.fileCreatedFun();
                console.log(response.data);
            },error=>{
                console.log(error.message);
            });
            }
            // 说明是新建
            else{
                this.$axios.post('/api/insertFile',{fileName:this.creatFiles.fileName,fileType:this.creatFiles.fileType ,fileIntro: this.creatFiles.fileIntro,uploadTime: this.creatFiles.uploadTime,downloadNums: this.creatFiles.downloadNums,filePath:this.filePath ,fileShow:this.creatFiles.fileShow,}).then(response=>{
                this.clearInputs();
                this.$bus.$emit('backNotice',true,"文件上传成功!");
                this.fileCreatedFun();
                console.log(response.data);
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
        fileName:'',
        fileType:'',
        fileIntro:'',
        downloadNums:'',
        fileShow:'',
        uploadTime:'',
      };
      this.fileList = [];
      this.filePath = '';
    },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleClose(done){
        this.clearInputs();
         done();

      },
    // 初始化
    fileCreatedFun(){
        this.$axios.post('/api/selectAllFiles',).then(response=>{
            this.fileData = response.data;
        },error=>{
            console.log(error.message);
        });
    },

    // 删除文件
    delFile(id){
        this.$axios.post('/api/deleteFile',{fileId:id}).then(response=>{
            console.log(response.data);
            this.$bus.$emit('backNotice',true,"文件已删除!");
             this.fileCreatedFun();
        },error=>{
            console.log(error.message);
        });
    },
    changeFile(fileData){
        this.creatFiles = fileData;
        this.drawer = true;
        console.log(this.creatFiles);
        this.fileList = [{name:this.creatFiles.filePath,status:'success'}];

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