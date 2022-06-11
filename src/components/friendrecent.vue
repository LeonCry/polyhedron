// 最近聊天界面
<template>
      <!-- 包裹div -->
      <div class="mainbody">
          <friendrecentitem v-for="recent of recentChatUsers" :key="recent.chatTime" :recentProps="recent"></friendrecentitem>
      </div>
</template>

<script>
import { mapState } from 'vuex';
import friendrecentitem from './friendrecentitem.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friendrecent',
    components:{friendrecentitem},
    data(){
        return{
            // 最近聊天人员数组
            recentChatUsers:[],
            isShow:true,
        }
    },
    computed:{
        ...mapState('userInfo',['user']),
    },
    methods:{
        // 显示最近聊天
        showRecentChats(datas){
            // 检查是否存在该最近聊天用户
            let isHave = false;
            let mid = this.recentChatUsers;
            // 先检查是否已经在这个数组里面了
            for (let index = 0; index < mid.length; index++) {
                const chatUser =  mid[index];
                 // 如果已经有了,则更新内容
                if(chatUser.sendUserQQ==datas.sendUserQQ){
                    mid[index] = datas;
                    isHave = true;
                }
            }
            // 如果没有该用户,则新添加该用户
            if(!isHave){
               mid.push(datas);
            }
            // 最后进行一个排序按聊天时间降序
                // this.recentChatUsers = mid.sort(); 
                localStorage.removeItem(':allRecent:'+this.user.userQQ);
                localStorage.setItem(':allRecent:'+this.user.userQQ,JSON.stringify(mid));       
        },
        recentCreated(){
        //最近联系人 创照初始化
        if(localStorage.getItem(':allRecent:'+this.user.userQQ)==null){
            this.recentChatUsers = [];
        }
        else{
            this.recentChatUsers = JSON.parse(localStorage.getItem(':allRecent:'+this.user.userQQ));
        }
        },


        // 降序排序
         compare(property) {//property:根据什么属性排序
                return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;//升序排序
                 }
        },
    
    },
    mounted(){
        // 删除最近聊天
        this.$bus.$on('deleteRencent',(data)=>{
            for (let index = 0; index < this.recentChatUsers.length; index++) {
                const recentChat = this.recentChatUsers[index];
                if(recentChat.sendUserQQ==data.friendQQ){
                    this.recentChatUsers.splice(index,1);
                    console.log(this.recentChatUsers);
                }
            }
        })
        // 接收APP的数据,以显示最近聊天
        this.$bus.$on('RecentChats',(datas)=>{
            if(datas.chatContent.substring(0,11)!="A9wadv::NEW"){
                
               this.isShow = false;
               this.showRecentChats(datas); 
            }

        })
    },

    created(){
        // 创照初始化
        setTimeout(() => {
        this.recentCreated();
        }, 1000);
    }


}
</script>

<style scoped>
.mainbody{
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    overflow-x:hidden;
    overflow-y: auto;
    width: 100%;
    height: 430px;
    margin-top: 10px;
}
</style>