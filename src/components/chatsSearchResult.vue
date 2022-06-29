<template>
  <div class="chatSearchResultBox">
      <!-- 头像 -->
      <div class="heads">
           <img v-if="resultProps.userHead" :src="require(`../../../HeadsAndBacks/Heads/${resultProps.userHead}`)" alt="头像">
      </div>
    <!-- 名称\时间与聊天记录 -->
    <div class="rightMore">
        <div class="nameAndTime">
            <span>{{resultProps.userName}} <span v-show="resultProps.remakeName!=''"> ({{resultProps.remakeName}})</span></span>
            <span> {{new Date(parseInt(resultProps.chatTime))
                .toLocaleString()
                .slice(5)}}</span>
        </div>
        <div class="Chats">
            <span ref="content"></span>
        </div>
    </div>
    <a ref="cli" class="as" :href="'#'+this.resultProps.chatId" @click="findOneChatss(resultProps.chatId)"><b>[查看上下文]</b></a>
  </div>
</template>

<script>
export default {
name:'chatSearchResult',
props:['resultProps'],
data(){
    return{

    }
},
methods:{
    // 查找该条id的聊天记录
    findOneChatss(id){
        this.$bus.$emit('findOneChats',id);
    },
},
mounted(){
    setTimeout(() => {
        // 全部替换
        // 太长
        let content = this.resultProps.chatContent;
        if (content.length>25){
            let v = content.indexOf(this.resultProps.searchContent);
            if(v>=25){
                content = '...'+content.substring(v-8,v+7)+'...';
            }
            else{
                content = content.substring(0,20)+'...';
            }
            }
        // this.$refs.content.innerHTML = this.resultProps.chatContent;
        let newResult = content.replaceAll(this.resultProps.searchContent,'<b style = "color:lightgreen;display:inline">'+this.resultProps.searchContent+'</b>')
        this.$refs.content.innerHTML = newResult;
    }, 100);
    
    this.$bus.$on('clickAgain',()=>{
        this.$refs.cli.click();
    })
},
}
</script>

<style scoped>

.chatSearchResultBox{
    position: relative;
    width: 100%;
    height: 60px;
    transition: 0.55s;
    border-radius: 50px;
    margin-top: 10px;
    display: flex;
    flex-flow: row nowrap;
    background-color: rgba(79, 65, 46, 0.3);
    box-shadow: 0 0 15px rgba(79, 65, 46, 0.5);
}
.chatSearchResultBox:hover{
    color: black;
    background-color: rgba(255, 255, 255,0.66);
}
.heads{
    border-radius: 50%;
    height: 80%;
    align-self: center;
    transition: 0.8s;
    overflow: hidden;
    flex: 1;
}
.heads img{
    width: 100%;
    height: 100%;
}
.rightMore{
    flex: 5;
    padding-left: 10px;
    font-size: 1.4vh;
}
.nameAndTime{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: relative;
    padding-top: 5px;
}
.nameAndTime span:nth-of-type(2){
    padding-right: 20px;
}
.Chats{
    padding-top: 15px;
    overflow: hidden;
}
.Chats span{
    overflow-y: hidden;
}
.chatSearchResultBox:hover  .as{
    opacity: 1;
    top:  25%;
    filter: blur(0);
}
.as {
    position: absolute;
    display: block;
    top: 50%;
    width: 50%;
    height: 50%;
    left: 25%;
    transition: 0.55s;
    font-size: 1.5vh;
    text-align: center;
    filter: blur(10px);
    background-color: rgba(255, 255, 255, 1);
    border: 2px solid black;
    line-height: 200%;
    text-decoration: none;
    color: black;
    opacity: 0;
}


</style>