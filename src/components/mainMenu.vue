<template>
<transition name="menuT">
  <div class="mainMenuBox" ref="back" v-show="isShow">
    <img class="imgs" :src="imgsrc" alt="" ref="imgg">
    <div class="blackzz"> </div>
    <div class="topper">
    </div>
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
name:'mainMenu',
data(){
    return{
        isShow:false,
        // 文件夹
        file:{
            oneFont:'文',
            title:'文件夹',
            info:'在文件夹中,你可以下载我制作的程序,做过的网页/App的源码,均可以下载供学习和使用.',
            to:'fileAndApp',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h3p7e68b12j21900u0q6w.jpg',
        },
        // 相册集
        picture:{
            oneFont:'照',
            title:'照片集',
            info:'在相册集中,我会不定期上传拍摄的精美照片,你可以查看/收藏/下载/分享/使用这些图片,并且没有版权问题.如果这些照片可以帮到你或使你心情愉悦,便是对我最大的赞赏.',
            to:'baaupic',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h3p7aydm7pj21hc0u0gty.jpg',
        },
         // 活着
        game:{
            oneFont:'活',
            title:'游戏:活着',
            info:'在游戏:活着中,你将扮演一名因世界灾难活下来的幸存者,在末世中搜寻食物与资源,努力活下去,但同时也要小心,这个世界不止你一个幸存者...',
            to:'gameLife',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h3p7kclxoij21mr0u0wi7.jpg',
        },
         // shangpin
        shop:{
            oneFont:'商',
            title:'商品兑换',
            info:'在商品兑换中,我会不定期上架一些商品,你可以将你在游戏:活着中或其他渠道获得的虚拟货币用来兑换真实世界中的商品.',
            to:'shopping',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h3p7zb5eghj21hc0u042y.jpg',
        },
         // 视频
        video:{
            oneFont:'视',
            title:'视频集',
            info:'在视频集中,视频主要来自于Bilibili中我上传的视频或摄影,你可以查看或分享这些视频.希望大家多多关注,点赞+投币.',
            to:'videos',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h3g2bmypnwj21hc0u00yx.jpg',
        },
                 // 计算器:剩余时间
        caculate:{
            oneFont:'年',
            title:'似水流年',
            info:'在似水流年中,你可以得到你剩下的时间..用来...',
            to:'cacaulate',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h3p7v3xt4dj20y20hnq7n.jpg',
        },
        // 其他
        PXSpace:{
            oneFont:'PX',
            title:'PX广场',
            info:'在PX广场中,你将遇见在PolyhedronX中在线且同在PX广场的其他人,你们可以互相聊天,查看对方最近动态,亦或许一起听音乐,玩游戏..更多好玩的等待着你们..',
            to:'PXSpace',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h4bbkqb822j225m0u04gi.jpg',
        },
                // 其他
        other:{
            oneFont:'等',
            title:'开发中',
            info:'开发中...',
            to:'other',
            bacsrc:'https://tva1.sinaimg.cn/large/e6c9d24ely1h4bbomf2c1j21900u0ju9.jpg',
        },
        imgsrc:'',
        clearTime : '',
    }
},
methods:{
    hovers(){
        this.$refs.imgg.style.opacity = 1;
    },
    enter(){
    }
},
mounted(){
    this.$bus.$on('changeBack',(data)=>{
        // this.$refs.imgg.style.transition = 0 + 's';
        // this.$refs.imgg.style.opacity = 0;
        clearTimeout(this.clearTime);
        this.$refs.imgg.style.opacity = 0;
        this.clearTime = setTimeout(() => {
            this.imgsrc = '';
        }, 300);
        this.clearTime = setTimeout(() => {
        this.imgsrc = data;
        this.$refs.imgg.style.opacity = 1; 
        }, 550);

        // setTimeout(() => {
        // this.$refs.imgg.style.transition = 1 + 's';
        // this.$refs.imgg.style.opacity = 1;
        // }, 100);
    });

    this.$bus.$on('menuShow',(data)=>{
        this.isShow = data;
    });

}
}
</script>

<style scoped>
.mainMenuBox{
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
.blackzz{
    position: absolute;
    width: 100%;
    z-index: 1;
    height: 100%;  
    background-color: rgba(0, 0, 0, 0.5);
}

.imgs{
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
.topper{
    flex: 1;

}
.midd{
    flex: 1;

}
.content{
    flex: 16;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
}
.bottommer{
    flex: 1;

}

.line{
    /* margin-right: 12%; */
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
}
.line2{
    /* margin-left: 12%; */
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
}

.menuT-enter-active{
animation: fade-in 0.51s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
.menuT-leave-active{
animation: fade-in 0.51s cubic-bezier(0.390, 0.575, 0.565, 1.000) both reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>