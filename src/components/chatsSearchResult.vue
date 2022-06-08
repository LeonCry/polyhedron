<template>
  <div class="chatSearchResultBox">
      <!-- 头像 -->
      <div class="heads">
           <img v-if="resultProps.userHead" :src="require(`../assets/Heads/${resultProps.userHead}`)" alt="头像">
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
mounted(){
    setTimeout(() => {
        // 全部替换
        this.$refs.content.innerHTML = this.resultProps.chatContent;
        let newResult = this.$refs.content.innerHTML.replaceAll(this.resultProps.searchContent,'<b style = "color:lightgreen;display:inline">'+this.resultProps.searchContent+'</b>')
        this.$refs.content.innerHTML = newResult;
    }, 100);
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
    cursor: pointer;
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
</style>