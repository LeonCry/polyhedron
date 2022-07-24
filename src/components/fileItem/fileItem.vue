<template>
  <div class="fileBox" ref="fileBox">
    <div ref="down" class="downs" :class="{downspiter:downTrue}"></div>
    <div class="icon">
        <br>
        <div class="ii">
            <i v-if="typeNum!=-1" style="font-size:10vh" :class="fileTypeIcon[typeNum]"></i>
            <br>
            <span>{{this.fileProp.fileType}}</span>
        </div>
        <br><br>
        <span class="name">{{this.fileProp.fileName}}</span>
    </div>
    <div class="timeAndNums" ref="timeAndNums">
        <span class="intro">{{this.fileProp.fileIntro}}</span>
        <br>
        <span class="down">下载次数:{{downloadNums}} <br>文件大小:{{fileProp.fileShow}}MB<br> 更新时间:{{new Date(parseInt(this.fileProp.uploadTime)).toLocaleString().split(" ")[0]}}</span>
        <br><br><br>
        <el-button class="downbut" @click="downLoad"><span v-if="!isDownloading">{{write}}</span><span v-if="isDownloading" id="downPercent" ref="downPercent">下载进度:{{percent}}%</span><i class="el-icon-upload downicon" :class="{iShark:LdownTrue}"></i></el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import contentType from "../../common/contentType.js";
export default {
    name:'fileItem',
    props:['fileProp'],
    computed:{
        ...mapState('userInfo',['user']),
    },
    data(){
        return{
            typeNum:-1,
            // 分别icon为:[Word文件/PDF文件/Excel文件],[压缩文件],[exe文件],[多媒体文件],[其他文件]
            fileTypeIcon:['el-icon-document','el-icon-folder','el-icon-mobile','el-icon-film','el-icon-tickets'],
            downTrue:false,
            write:'点击此处下载',
            // 用于定位的id
            id:'file'+this.fileProp.fileId,
            color:['seagreen','maroon','darkcyan','darkgoldenrod','darksalmon','darkslateblue','darkslategray'],
            colorRand:0,
            downloadNums:this.fileProp.downloadNums,
            percent:0.1,
            LdownTrue:false,
            isDownloading:false,
            showPercent:0.1,
            percentTimerId:'',
            isD:false,
        }
    },
    methods:{
        downLoad(){
            if(this.isD){
                this.$message.error("已经在下载了...");
                return 0;
            }
            this.isD = true;
            this.downTimeAdd();
            this.write = '正在准备下载中..';  
            // 通知title特效准备
            this.$bus.$emit('AnimationActions',this.id,this.color[this.colorRand]);
            setTimeout(() => {
            this.downTrue = true;  
            this.LdownTrue = true;
            }, 1000);
            // 下载奖励
            this.$addPxDetail(this.user.userQQ,1,'下载文件',50,this.fileProp.fileName,"在文件夹中下载 '"+this.fileProp.fileName+"' 的文件,获得奖励PX+50");
            setTimeout(() => {
                this.downTrue = false;
                this.realDownLoad();
                this.isDownloading = true;
                this.$refs.fileBox.style.borderRadius = 0;
                this.$refs.fileBox.style.height = '90%';
                this.$refs.timeAndNums.style.opacity = 1;
                this.$refs.timeAndNums.style.flex = 14;
                this.$refs.fileBox.style.boxShadow = '0 0 15px white';
            }, 3000);
        },
        // 下载次数加1,添加下载成员
        downTimeAdd(){
            var newMember = this.fileProp.downLoadP + this.user.userQQ+",";

            // eslint-disable-next-line no-unused-vars
            this.$axios.post('/api/updateFile',{fileId:this.fileProp.fileId,downloadNums:this.fileProp.downloadNums+1,downLoadP:newMember}).then(response=>{
                this.downloadNums++;
            },error=>{
                console.log(error.message);
            });
        },
        // 下载地方要好好看一看+++
        realDownLoad(){
            let _this = this;
            this.$axios.post('/api/downLoadFiles',{filePath:this.fileProp.filePath,fileName:this.fileProp.fileName},
            {onDownloadProgress:function (progress) {
                _this.percent = parseInt(100 * (progress.loaded / progress.total));
                _this.$refs.down.style.height = _this.percent + '%';
                // this.$refs.down.style.height = this.percent + '%';
                console.log(_this.percent);
                }}
                // eslint-disable-next-line no-unused-vars
                ).then(response=>{
                    setTimeout(() => {
                        _this.$refs.timeAndNums.style.opacity = 0;
                        _this.$refs.fileBox.style.height = '50%';
                        _this.percent = 0;
                        _this.write = '点击此处下载';
                        _this.$bus.$emit('finishDownLoading');
                        _this.isDownloading = false;
                        _this.isD = false;
                        _this.$refs.fileBox.style.boxShadow = '0 0 15px black';
                        _this.$refs.fileBox.style.borderRadius = '0 0 200px 200px';
                        _this.$refs.timeAndNums.style.flex = 0;
                        _this.$refs.down.style.height = 0;
                    }, 1000);
                    // var type = this.fileProp.filePath.split('.')[1];
                    // var blob = new Blob([response], {type: contentType.get('.'+type)});
                    // let file = new window.File([blob], this.fileProp.fileName, contentType.get('.'+type));
                    // console.log(file);
            },error=>{
                console.log(error.message);
            });

            this.$axios.post('/api/downLoadFiles',{filePath:this.fileProp.filePath,fileName:this.fileProp.fileName},
            {responseType: 'blob'},
                ).then(response=>{
                // eslint-disable-next-line no-unused-vars
                const { data, headers } = response;
        // const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1');
        var type = this.fileProp.filePath.split('.')[1];
        const fileName = this.fileProp.fileName;
        // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
        //const blob = new Blob([JSON.stringify(data)], ...)
        const blob = new Blob([data], {type: contentType.get('.'+type)})
        let dom = document.createElement('a')
        let url = window.URL.createObjectURL(blob)
        dom.href = url
        dom.download = decodeURI(fileName)
        dom.style.display = 'none'
        document.body.appendChild(dom)
        dom.click()
        dom.parentNode.removeChild(dom)
        window.URL.revokeObjectURL(url)
            },error=>{
                console.log(error.message);
            });
        },
    },

    mounted(){
        this.$bus.$on('checkNeedDownLoad',()=>{
            if(this.isD){
                this.$bus.$emit('thereNeedDownLoad',this.id,this.color[this.colorRand]);
            }
        })
    },

    created(){
        this.colorRand = Math.floor(Math.random()*7);  
        setTimeout(() => {
        this.$refs.fileBox.style.backgroundColor = this.color[this.colorRand];
        }, 100);

        setTimeout(() => {
            switch(this.fileProp.fileType){
                case("Word文件"):
                    this.typeNum = 0;
                    break;
                case("PDF文件"):
                    this.typeNum = 0;
                    break;    
                case("Excel文件"):
                    this.typeNum = 0;
                    break;
                case("压缩文件"):
                    this.typeNum = 1;
                    break;        
                case("exe文件"):
                    this.typeNum = 2;
                    break;  
                case("多媒体文件"):
                    this.typeNum = 3;
                    break;  
                default:
                    this.typeNum = 4;
            }
        }, 100);
    }

}
</script>

<style scoped>
.fileBox{
    position: relative;
    float: left;
    width: 250px;
    height: 50%;
    margin-left: 10px;
    transition: 0.55s;
    margin-right: 10px;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0 0 200px 200px;
    box-shadow: 0 0 20px 2px black;
}
.downspiter{
    animation: trans 2s both linear infinite;
}
.downs{
    position: absolute;
    width: 250px;
    height: 0;
    box-shadow: 0 0 15px royalblue;
    background-color: royalblue;
    box-shadow: 0 0 15px royalblue;
    transition: 0.1s;
    filter: blur(2px);
    animation: white-frace 3s linear infinite both;
}


.fileBox:hover{
    height: 90% !important;
    box-shadow: 0 0 20px 2px white !important;
}
.fileBox:hover > div:nth-of-type(3){
    flex: 14 !important;
    opacity: 1 !important;
}
.icon{
    position: relative;
    flex: 10;
    width: 100%;
}
.name{
    position: absolute;
    width: 200px;
    left: 18px;
    max-height: 40px;
    color: black;
    font-weight: bold;
    text-align: center;
    background-color: white;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
}
.intro{
    position: absolute;
    width: 210px;
    left: 13px;
    max-height: 100px;
    overflow-y: auto;
    color: black;
    font-weight: bold;
    text-align: center;
    background-color: white;
    border-radius: 15px;
    border: 2px solid black;
    padding: 5px;
    padding-bottom: 10px;
}
.down{
    position: absolute;
    margin-top: 110px;
    width: 160px;
    left: 33px;
    max-height: 80px;
    overflow-y: auto;
    color: black;
    font-weight: bold;
    text-align: center;
    border: 2px solid black;
    background-color: white;
    border-radius: 10px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
.downbut{
    position: absolute;
    margin-top: 135px;
    width: 200px;
    left: 23px;
    height: 50px;
    transition: 0.55s;
    border: 2px solid black;
    overflow: hidden;
    color: black;
    font-weight: bold;
    font-size: 1.5vh;
    border-radius: 10px;
    text-align: center;
    background-color: white;
}
.downbut:hover{
    border: 2px solid white;
    color: white;
    background-color: black;
}
.downicon{
    position: absolute;
    transition: 0.25s;
    transform: rotate(180deg);
    font-size: 3.5vh;
    top: 8px;
}
.iShark{
    animation: i-sharks 1s both infinite;
}

.timeAndNums{
    transition: 0.35s;
    width: 100%;
    opacity: 0;
}
.ii{
    position: relative;
    width: 50%;
    height: 110px;
    text-align: center;
    left: 23%;
    border: 5px dotted white;
}

@keyframes trans {
    0%{
        height: 1%;
        border-radius: 0;
    }
    20%{
        height: 20%;
        border-radius: 0;
    }
    40%{
        height: 40%;
        border-radius: 0;
    }
    60%{
        height: 60%;
        border-radius: 0;
    }
    80%{
        height: 80%;
        border-radius: 0 0 100px 100px;
    }
    95%{
        height: 100%;
        border-radius: 0 0 200px 200px;
    }
    100%{
        height: 100%;
        border-radius: 0 0 200px 200px;
    }

    
}

@keyframes i-sharks {
    0%{
        color: white;
    }
    50%{
        color:black;
    }
    100%{
        color: white;
    }
}
@keyframes white-frace {
    0%{
        background-color: royalblue;
    }
    80%{
        background-color: royalblue;
    }
    85%{
        background-color: rgba(255, 255, 255, 0.5);
    }
    90%{
        background-color: rgba(255, 255, 255, 0.88);
    }
    95%{
        background-color: rgba(255, 255, 255, 0.5);
    }
    100%{
        background-color: royalblue;
    }

}
</style>