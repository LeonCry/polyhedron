<template>
  <div class="fileBox">
    <div :class="{downspiter:downTrue}"></div>
    <div class="icon">
        <br>
        <div class="ii">
            <i style="font-size:10vh" class="el-icon-document"></i>
            <br>
            <span>exe文件</span>
        </div>
        <br><br>
        <span class="name">暴风音乐</span>
    </div>
    <div class="timeAndNums">
        <span class="intro">在线高清，极速启动 采用全新架构，1M宽带秒播720P高清视频，配合各功能调度优化，启动速度提升3倍，升级硬解播放核心，打开高清电影速度大幅提升!在线高清，极速启动 采用全新架构，1M宽带秒播720P高清视频，配合各功能调度优化，启动速度提升3倍，升级硬解播放核心，打开高清电影速度大幅提升!</span>
        <br>
        <span class="down">下载次数:88 <br> 更新时间:2022.5.15</span>
        <br><br><br>
        <el-button class="downbut" @click="downLoad">{{write}}<i class="el-icon-upload downicon" :class="{iShark:downTrue}"></i></el-button>
    </div>
  </div>
</template>

<script>
export default {
    name:'fileItem',
    data(){
        return{
            // 分别icon为:[word/pdf/excel],[压缩文件],[exe文件],[多媒体文件],[其他文件]
            fileTypeIcon:['el-icon-document','el-icon-folder','el-icon-mobile','el-icon-film','el-icon-tickets'],
            downTrue:false,
            write:'点击此处下载',
            // 用于定位的id
            id:'xxx',
            color:'seagreen',
        }
    },
    methods:{
        downLoad(){
            this.write = '正在准备下载中..';  
            // 通知title特效准备
            this.$bus.$emit('AnimationActions',this.id,this.color);
            setTimeout(() => {
            this.downTrue = true;  
            }, 1000);
            setTimeout(() => {
                this.downTrue = false;
                this.write = '若未开始,请点此处..';
            }, 7000);
        }
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
    background-color: seagreen;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0 0 200px 200px;
    box-shadow: 0 0 20px 2px black;
}
.downspiter{
    position: absolute;
    width: 100%;
    height: 100px;
    box-shadow: 0 0 15px royalblue;
    background-color: royalblue;
    animation: trans 2s both linear infinite;
}
.fileBox:hover{
    height: 90%;
    box-shadow: 0 0 20px 2px white;
}
.fileBox:hover > div:nth-of-type(3){
    flex: 14;
    opacity: 1;
}
.icon{
    position: relative;
    flex: 10;
    width: 100%;
}
.name{
    position: absolute;
    width: 200px;
    left: 15px;
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
    width: 220px;
    left: 10px;
    max-height: 120px;
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
    margin-top: 130px;
    width: 160px;
    left: 35px;
    max-height: 50px;
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
    left: 25px;
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
</style>