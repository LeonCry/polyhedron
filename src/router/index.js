import VueRouter from "vue-router";
import Vue from "vue";
import rightOverview from "../pages/rightOverview.vue"
import rightUserInfo from "../pages/rightUserInfo.vue"
import rightChat from "../pages/rightChat.vue"
import rightSpaces from "../pages/rightSpaces.vue"

// 安装插件
Vue.use(VueRouter)

// 创建VueRouter对象
const routes = [
    {name:"overView",path:"/overView",component:rightOverview},
    {name:"userInfo",path:"/userInfo",component:rightUserInfo},
    {name:"userChats",path:"/userChats",component:rightChat},
    {name:"userSpaces",path:"/userSpaces",component:rightSpaces},
]

// 配置路由和组件之间的关系
const router = new VueRouter({
    routes
})

// 导出
export default router