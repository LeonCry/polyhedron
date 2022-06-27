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
import videos from "../pages/videos.vue"
import cacaulate from "../pages/cacaulate.vue"
import other from "../pages/other.vue"
import rightPics from "../pages/rightPics.vue"
import baaupicSelf from "../pages/baaupicSelf.vue"
// 安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
    {name:"overView",path:"/overView",components:{backs:rightOverview}},
    {name:"userInfo",path:"/userInfo",components:{backs:rightUserInfo}},
    {name:"userChats",path:"/userChats",components:{backs:rightChat}},
    {name:"userSpaces",path:"/userSpaces",components:{backs:rightSpaces}},
    {name:"rightPics",path:"/rightPics",components:{backs:rightPics}},
    {name:"fileAndApp",path:"/fileAndApp",components:{pres:fileAndApp}},
    {name:"baaupic",path:"/baaupic",components:{pres:baaupic}},
    {name:"gameLife",path:"/gameLife",components:{pres:gameLife}},
    {name:"shopping",path:"/shopping",components:{pres:shopping}},
    {name:"videos",path:"/videos",components:{pres:videos}},
    {name:"cacaulate",path:"/cacaulate",components:{pres:cacaulate}},
    {name:"other",path:"/other",components:{pres:other}},
    {name:"baaupicSelf",path:"/baaupicSelf",components:{pres:baaupicSelf},},
]

// 配置路由和组件之间的关系
const router = new VueRouter({
    routes
})

// 导出
export default router