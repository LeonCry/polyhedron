// 表情插件
<template>
  <div class="emojibox">
      <!-- 每一个表情 -->
      <div class="emoji" v-for="(item,index) in emoji" :key="index" @click="sendEmoji(item)">
        {{item}}
      </div>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name:'emoji',
data(){
    return{
        // 1123-1218
        emoji:Object.values(this.emoji.emoji).slice(1123,1219),
    }
},
methods:{
    // 发送表情
    sendEmoji(emoji){
        // 向聊天组件发送数据
        emoji = ' '+ emoji + ' ';
        this.$bus.$emit('chatemoji',emoji);
    }
}
}
</script>

<style scoped>

.emojibox{
    position: absolute;
    width: 422px;
    height: 300px;
    padding-right: 15px;
    padding-top: 5px;
    padding-left: 5px;
    padding-bottom: 25px;
    background-color: rgba(47, 53, 66,0.6);
    display: flex;
    border-radius: 25px;
    flex-flow: row wrap;
    font-size: 3vh;
}
.emoji{
    width: 15px;
    height: 15px;
    margin: 10px;
    transition: 0.15s;
}
.emoji:hover{
    transform: scale(1.2);
    cursor: pointer;
}

</style>