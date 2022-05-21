// 写动态组件
<template>
  <div class="writespacebox">
    <!-- 写的内容 -->
    <div contenteditable ref="typetext" @focus="emojiDisappear"></div>
    <!-- 表情图片 -->
    <div>
      <img src="../assets/exsmile.svg" alt="表情" @click="emojiShow" />
      <img src="../assets/picture.svg" alt="图片" />
    </div>
    <transition name="emojiT">
      <emojispace v-show="isEmojiShow"></emojispace>
    </transition>
    <br />
    <button @click="publish">发表</button>
    <img
      v-show="isLoading"
      class="loading"
      src="../assets/loading.svg"
      alt="加载"
    />
    <br />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import emojispace from "./emojispace.vue";
export default {
  components: { emojispace },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "writespace",
  data() {
    return {
      // 是否加载
      isLoading: false,
      // 是否显示emoji
      isEmojiShow: false,
      // 收到的emoji
      receiveEmoji: "",
      publishContent:'',
    };
  },
  computed:{
    ...mapState('userInfo',['user']),
  },
  watch: {
    //   监视接收到的emoji,并添加到输入框中
    receiveEmoji(val) {
      this.$refs.typetext.innerHTML = this.$refs.typetext.innerHTML + val;
      this.receiveEmoji = "";
    },
  },
  methods: {
    emojiShow() {
      this.isEmojiShow = !this.isEmojiShow;
    },
    // 当输入框focus时,取消表情栏显示
    emojiDisappear() {
      this.isEmojiShow = false;
    },
    // 发表,进行存数据库
    publish(){
      // loading加载
      this.$bus.$emit('spaceLoading',true,"发表中..!");
      this.publishContent = this.$refs.typetext.innerHTML;
      this.$refs.typetext.innerHTML = '';
      let data = {publishQQ:this.user.userQQ,spaceContent:this.publishContent,publishTime:Date.now()};
      this.$axios.post('/api/addOneSpace',data).then(response=>{
        console.log(response.data);
        this.$bus.$emit('spaceNotice',true,"发表成功!");
        this.$bus.$emit('spaceLoading',false,"发表中..!");
        this.publishContent = '';
        // 发表成功之后应该再请求一次服务器,或者直接将发表的内容传回给starspace,以用来新增一个space
      },error=>{
        this.$bus.$emit('spaceNotice',false,error.message);
        this.$bus.$emit('spaceLoading',false,"发表中..!");
        this.publishContent = '';
      });
      
    },
  },
  mounted() {
    // 接收emoji组件的emoji信息,进行添加到输入框
    this.$bus.$on("spaceemoji", (emojitext) => {
      this.receiveEmoji = emojitext;
    });
  },
  beforeDestroy() {
    this.$bus.$off("spaceemoji");
  },
};
</script>

<style scoped>
.writespacebox {
  position: relative;
  width: 100%;
  height: 420px;
  margin-top: 25px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-bottom: 2px solid rgba(47, 53, 66, 0.5);
}
/* 写动态div */
.writespacebox > div {
  position: relative;
  width: 80%;
  height: 90px;
  padding: 20px;
  border-radius: 15px 15px 0 0;
  transition: 0.55s;
  background-color: rgba(47, 53, 66, 0.25);
  overflow-y: auto;
  outline: 0;
}
.writespacebox > div:focus {
  outline: 0.5px solid rgba(0, 0, 0, 0);
}
/* 表情栏 */
.writespacebox div:nth-child(2) {
  height: 10px;
  transition: 0.55s;
  padding-top: 0;
  overflow-y: hidden;
  border-radius: 0 0 15px 15px;
  background-color: rgba(47, 53, 66, 0.25);
}
.writespacebox div:nth-child(2) img {
  margin-right: 20px;
  cursor: pointer;
}
/* 发表按钮 */
button {
  position: relative;
  align-self: center;
  width: 100px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(99, 110, 114, 0.2);
  color: pink;
  font-size: 1.8vh;
  border-radius: 15px;
  transition: 0.55s;
  border: 0;
}
button:hover {
  box-shadow: 0px 0px 25px rgba(99, 110, 114, 0.8);
  background-color: rgba(99, 110, 114, 0.6);
}
/* loading */
.loading {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 表情栏动画 */
.emojiT-enter-active {
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.emojiT-leave-active {
  animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both
    reverse;
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