// 好友列表界面
<template>
      <!-- 包裹div -->
      <div class="mainbody">
          <system-message></system-message>
          <friendlistitem v-for="friend of this.friendLists" :key="friend.friendId" :friendProp="friend"></friendlistitem>
      </div>
</template>

<script>
import { mapState } from 'vuex'
import friendlistitem from './friendlistitem.vue'
import SystemMessage from './systemMessage.vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'friendlist',
    data(){
        return{
            // 所有好友信息
            friendLists:[],
        }
    },
    computed:{
        ...mapState('userInfo',['user']),
    },
    methods:{
        // 初始化获得一次好友列表
        friendListInitialization(){
            setTimeout(() => {
             this.$axios.post('/api/getAllFriends',{userQQ:this.user.userQQ}).then(response=>{
                console.log("初始化获得了所有的好友信息",response.data);
                this.friendLists = response.data;
            },error=>{
                console.log(error.message);
                
            }); 
            }, 1000);
        }

    },
    components:{friendlistitem,SystemMessage},
    mounted(){
        // 初始化获得好友列表
        this.friendListInitialization();
        // 重新刷新好友列表
        this.$bus.$on('refreshLists',()=>{
            this.friendListInitialization();
        })
        // 获取所有好友信息
        this.$bus.$on('getAllFriends',data=>{
            // this.friendLists=[];
            this.friendLists = data;
        })
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