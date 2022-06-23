<template>
  <div class="rightPicsBox">
    <br>
      <el-tabs v-model="activeName">
        <br>

    <el-tab-pane label="照片信息" name="first">


        
              <el-button type="success">上传新照片</el-button>
            <br><br>
            <div class="inputs">
        <el-form :label-position="labelPosition" label-width="150px" :model="picInfo" inline>
            <el-form-item label="照片地址">
                <el-input v-model="picInfo.src"></el-input>
            </el-form-item>
            <el-form-item label="照片名称">
              <el-input v-model="picInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="拍摄设备">
              <el-input v-model="picInfo.camera"></el-input>
            </el-form-item>
            <el-form-item label="镜头信息">
              <el-input v-model="picInfo.cameraInfo"></el-input>
            </el-form-item>
             <el-form-item label="拍摄地点">
              <el-input v-model="picInfo.location"></el-input>
            </el-form-item>
             <el-form-item label="拍摄天气">
              <el-input v-model="picInfo.weather"></el-input>
            </el-form-item>
             <el-form-item label="拍摄日期">
              <el-input v-model="picInfo.time"></el-input>
            </el-form-item>
             <el-form-item label="  ">
               <el-button type="success">确定</el-button>
            </el-form-item>
            <el-form-item label="">
               <el-button type="warning">取消</el-button>
            </el-form-item>

        </el-form>
            </div>
        <br>
      
         <el-table
    :data="tableData"
    style="width: 100%"
    max-height="500">
    <el-table-column
      fixed
      prop="picId"
      label="发布ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="picScr"
      label="照片地址"
      width="150">
    </el-table-column>
    <el-table-column
      prop="picPic"
      label="照片缩略"
      width="150">
    </el-table-column>
    <el-table-column
      prop="picName"
      label="照片名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="cameraName"
      label="拍摄设备"
      width="250">
    </el-table-column>
    <el-table-column
      prop="cameraInfo"
      label="镜头信息"
      width="250">
    </el-table-column>
    <el-table-column
      prop="location"
      label="拍摄地点"
      width="200">
    </el-table-column>
    <el-table-column
      prop="weather"
      label="拍摄天气"
      width="150">
    </el-table-column>
    <el-table-column
      prop="goodNumbers"
      label="点赞人数"
      width="150">
    </el-table-column>
    <el-table-column
      prop="collectionNumbers"
      label="收藏人数"
      width="150">
    </el-table-column>
    <el-table-column
      prop="picTime"
      label="拍摄日期"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          type="success"
          size="small">
          编辑
        </el-button>
        <el-button
          type="danger"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>



    
    
    
    </el-tab-pane>
    <el-pagination
  background
  class="page"
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
    
    
    <el-tab-pane label="用户互动" name="second">
        

        
        </el-tab-pane>
    <el-tab-pane label="用户评论" name="third">
        

        
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
        picInfo: {
          src:'',
          name: '',
          camera: '',
          cameraInfo: '',
          location:'',
          weather:'',
          time:'',
        },
    }
},
methods:{}
}
</script>

<style scoped>
.rightPicsBox{
  width: 100%;
  height: 750px;
  display: flex;
  flex-flow: column nowrap;
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
    width:95%;
    background-color: whitesmoke;
    padding: 20px;
    border-radius: 15px;
}

</style>