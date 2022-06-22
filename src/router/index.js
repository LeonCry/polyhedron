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
// 安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
    {name:"overView",path:"/overView",component:rightOverview},
    {name:"userInfo",path:"/userInfo",component:rightUserInfo},
    {name:"userChats",path:"/userChats",component:rightChat},
    {name:"userSpaces",path:"/userSpaces",component:rightSpaces},
    {name:"fileAndApp",path:"/fileAndApp",component:fileAndApp},
    {name:"baaupic",path:"/baaupic",component:baaupic},
    {name:"gameLife",path:"/gameLife",component:gameLife},
    {name:"shopping",path:"/shopping",component:shopping},
    {name:"videos",path:"/videos",component:videos},
    {name:"cacaulate",path:"/cacaulate",component:cacaulate},
    {name:"other",path:"/other",component:other},
]

// 配置路由和组件之间的关系
const router = new VueRouter({
    routes
})

// 导出
export default router