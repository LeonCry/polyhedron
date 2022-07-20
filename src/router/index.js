import VueRouter from "vue-router";
import Vue from "vue";
import rightOverview from "../pages/rightOverview.vue"
import rightUserInfo from "../pages/rightUserInfo.vue"
import rightChat from "../pages/rightChat.vue"
import rightSpaces from "../pages/rightSpaces.vue"
import fileAndApp from "../pages/fileAndApp.vue"
import baaupic from "../pages/baaupic.vue"
import gameLife from "../pages/gameLife.vue"
import shopping from "../pages/shopping.vue"
import rightShop from "../pages/rightShop.vue"
import videos from "../pages/videos.vue"
import cacaulate from "../pages/cacaulate.vue"
import other from "../pages/other.vue"
import rightPics from "../pages/rightPics.vue"
import baaupicSelf from "../pages/baaupicSelf.vue"
import PXSpace from "../pages/PXSpace.vue"
import rightFiles from "../pages/rightFiles.vue"
import nbMall from "../pages/shops/nbMall.vue"
import browseHistory from "../pages/shops/browseHistory.vue"
import hasBought from "../pages/shops/hasBought.vue"
import shopDetail from "../pages/shops/shopDetail.vue"
import shopHistory from "../pages/shops/shopHistory.vue"
import shopTraining from "../pages/shops/shopTraining.vue"
// 安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
    {name:"overView",path:"/overView",components:{backs:rightOverview}},
    {name:"userInfo",path:"/userInfo",components:{backs:rightUserInfo}},
    {name:"userChats",path:"/userChats",components:{backs:rightChat}},
    {name:"userSpaces",path:"/userSpaces",components:{backs:rightSpaces}},
    {name:"rightPics",path:"/rightPics",components:{backs:rightPics}},
    {name:"rightFiles",path:"/rightFiles",components:{backs:rightFiles},},
    {name:"fileAndApp",path:"/fileAndApp",components:{pres:fileAndApp}},
    {name:"baaupic",path:"/baaupic",components:{pres:baaupic}},
    {name:"gameLife",path:"/gameLife",components:{pres:gameLife}},
    {name:"videos",path:"/videos",components:{pres:videos}},
    {name:"cacaulate",path:"/cacaulate",components:{pres:cacaulate}},
    {name:"other",path:"/other",components:{pres:other}},
    {name:"baaupicSelf",path:"/baaupicSelf",components:{pres:baaupicSelf},},
    {name:"PXSpace",path:"/PXSpace",components:{pres:PXSpace},},
    {name:"rightShop",path:"/rightShop",components:{backs:rightShop},},
    {
        name:"shopping",
        path:"/shopping",
        components:{pres:shopping},
        children:[
            {
                name:"nbMall",
                path:"nbMall",
                components:{shop:nbMall},
            },
            {
                name:"shopDetail",
                path:"shopDetail",
                components:{shop:shopDetail},
            },
            {
                name:"browseHistory",
                path:"browseHistory",
                components:{shop:browseHistory},
            },
            {
                name:"hasBought",
                path:"hasBought",
                components:{shop:hasBought},
            },
            {
                name:"shopHistory",
                path:"shopHistory",
                components:{shop:shopHistory},
            },
            {
                name:"shopTraining",
                path:"shopTraining",
                components:{shop:shopTraining},
            },
        ]

    },
]

// 配置路由和组件之间的关系
const router = new VueRouter({
    routes
})

// 导出
export default router