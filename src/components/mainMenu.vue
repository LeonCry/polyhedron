<template>
  <transition name="menuT">
    <div class="mainMenuBox" ref="back" v-show="isShow">
      <el-button class="back" @click="isShow = !isShow">返回主界面</el-button>
      <img class="imgs" :src="imgsrc" alt="" ref="imgg" />
      <div class="blackzz"></div>
      <div class="topper"></div>
      <div class="content">
        <div class="line">
          <card-item :cardContent="file"></card-item>
          <card-item :cardContent="picture"></card-item>
          <card-item :cardContent="video"></card-item>
          <card-item :cardContent="shop"></card-item>
        </div>
        <div class="midd"></div>
        <div class="line2">
          <card-item :cardContent="game"></card-item>
          <card-item :cardContent="caculate"></card-item>
          <card-item :cardContent="PXSpace"></card-item>
          <card-item :cardContent="other"></card-item>
        </div>
      </div>
      <div class="bottommer"></div>
    </div>
  </transition>
</template>

<script>
import cardItem from './cardItem.vue'
export default {
  components: { cardItem },
  name: 'mainMenu',
  data() {
    return {
      isShow: false,
      // 文件夹
      file: {
        oneFont: '文',
        title: '文件夹',
        info: '在文件夹中,你可以下载我制作的程序,做过的网页/App的源码,均可以下载供学习和使用.',
        to: 'fileAndApp',
        bacsrc: 'https://pic.52112.com/180531/JPG-180531_108/3iELyDYICA_small.jpg',
      },
      // 相册集
      picture: {
        oneFont: '照',
        title: '照片集',
        info: '在相册集中,我会不定期上传拍摄的精美照片,你可以查看/收藏/下载/分享/使用这些图片,并且没有版权问题.如果这些照片可以帮到你或使你心情愉悦,便是对我最大的赞赏.',
        to: 'baaupic',
        bacsrc: 'https://img.pconline.com.cn/images/upload/upc/tx/onlinephotolib/2004/13/c0/202817747_1586772319826.jpg',
      },
      // 活着
      game: {
        oneFont: '活',
        title: '游戏:活着',
        info: '在游戏:活着中,你将扮演一名因世界灾难活下来的幸存者,在末世中搜寻食物与资源,努力活下去,但同时也要小心,这个世界不止你一个幸存者...',
        to: 'gameLife',
        bacsrc: 'https://pic1.zhimg.com/ed913f541dc5a7c521ec0911c6c54d77_r.jpg',
      },
      // shangpin
      shop: {
        oneFont: '购',
        title: '南北市场',
        info: '在南北市场中,你可以买东西,我会不定期上架一些商品,你可以将你在游戏:活着中或其他渠道获得的虚拟货币用来兑换真实世界中的商品.',
        to: 'shopping',
        bacsrc: 'https://n.sinaimg.cn/translate/148/w2048h1300/20191106/dd58-ihyxcrp7291094.jpg',
      },
      // 视频
      video: {
        oneFont: '视',
        title: '视频集',
        info: '在视频集中,视频主要来自于Bilibili中我上传的视频或摄影,你可以查看或分享这些视频.希望大家多多关注,点赞+投币.',
        to: 'videos',
        bacsrc: 'https://img3.redocn.com/tupian/20180309/shipinbofangqiUIjiemianmoban_9247103.jpg',
      },
      // 计算器:剩余时间
      caculate: {
        oneFont: '年',
        title: '似水流年',
        info: '在似水流年中,你可以得到你剩下的时间..用来...',
        to: 'cacaulate',
        bacsrc: 'https://img.pconline.com.cn/images/upload/upc/tx/photoblog/1212/14/c7/16607690_16607690_1355480800859.jpg',
      },
      // 其他
      PXSpace: {
        oneFont: 'PX',
        title: 'PX广场',
        info: '在PX广场中,你将遇见在PolyhedronX中在线且同在PX广场的其他人,你们可以互相聊天,查看对方最近动态,亦或许一起听音乐,玩游戏..更多好玩的等待着你们..',
        to: 'PXSpace',
        bacsrc: 'https://hellorfimg.zcool.cn/provider_image/large/2238634988.jpg',
      },
      // 其他
      other: {
        oneFont: '食',
        title: '吃什么',
        info: '今天吃点什么呢?',
        to: 'other',
        bacsrc: 'https://www.rrppt.com/uploads/beijing/42583/img/picture.jpg',
      },
      imgsrc: '',
      clearTime: '',
    }
  },
  methods: {
    hovers() {
      this.$refs.imgg.style.opacity = 1
    },
    enter() {},
    back() {
      this.isShow = false
    },
  },
  mounted() {
    this.$bus.$on('changeBack', (data) => {
      // this.$refs.imgg.style.transition = 0 + 's';
      // this.$refs.imgg.style.opacity = 0;
      clearTimeout(this.clearTime)
      this.$refs.imgg.style.opacity = 0
      this.clearTime = setTimeout(() => {
        this.imgsrc = ''
      }, 300)
      this.clearTime = setTimeout(() => {
        this.imgsrc = data
        this.$refs.imgg.style.opacity = 1
      }, 550)

      // setTimeout(() => {
      // this.$refs.imgg.style.transition = 1 + 's';
      // this.$refs.imgg.style.opacity = 1;
      // }, 100);
    })

    this.$bus.$on('menuShow', (data) => {
      this.isShow = data
    })

    // 手机端
    // if(window.innerWidth<window.innerHeight){
    //     this.picture.to = 'baaupicSelf';
    // }
  },
}
</script>

<style scoped>
.mainMenuBox {
  position: absolute;
  background-color: #2f3542;
  width: 100%;
  height: 100%;
  z-index: 80;
  transition: 0.55s;
  font-size: 1.6vh;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
}
.blackzz {
  position: absolute;
  width: 100%;
  z-index: 1;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.back {
  position: sticky;
  top: 25px;
  width: 30%;
  height: 50px;
  z-index: 81;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}
.imgs {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  transition: 0.55s;
  opacity: 0;
}
/* .imgs::before{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
} */
.topper {
  flex: 1;
}
.midd {
  flex: 1;
}
.content {
  flex: 16;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}
.bottommer {
  flex: 1;
}

.line {
  /* margin-right: 12%; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.line2 {
  /* margin-left: 12%; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.notice {
  display: none;
}

.menuT-enter-active {
  animation: fade-in 0.51s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.menuT-leave-active {
  animation: fade-in 0.51s cubic-bezier(0.39, 0.575, 0.565, 1) both reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media only screen and (orientation: portrait) {
  .mainMenuBox {
    position: absolute;
    background-color: black;
    width: 100%;
    height: 100%;
    z-index: 80;
    transition: 0.55s;
    font-size: 1.6vh;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
  }
  .imgs {
    display: none;
  }
  .line {
    /* margin-right: 12%; */
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
  }
  .line2 {
    /* margin-left: 12%; */
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
  }
  .back {
    position: sticky;
    top: 25px;
    width: 30%;
    height: 50px;
    z-index: 81;
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
  }
}
</style>
