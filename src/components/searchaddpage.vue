// 添加按钮点击搜索之后的页面
<template>
      <!-- 包裹div -->
      <div class="mainbody">
          <search-add-loading></search-add-loading>
          <button class="quitbutton" @click="quitSearchAddPage">
              <img src="../assets/rightnrror.svg" alt="">
          </button>
          <br>
          <span>{{textUserQQ}}</span>
          <hr class="hr">
          <img class="ghost" v-show="UserQQGhost" src="../assets/ghost.svg" alt="幽灵">
          <addfrienditem v-for="user of receiverUsersByUserQQ" :key="user.userQQ" :userProp = user></addfrienditem>
          <br>
          <span>{{textUserName}}</span>
          <hr class="hr">
          <img class="ghost" v-show="UserNameGhost" src="../assets/ghost.svg" alt="幽灵">
          <addfrienditem v-for="user of receiverUsersByUserName" :key="user.userQQ" :userProp = user></addfrienditem>
      </div>
</template>

<script>
import addfrienditem from './addfrienditem.vue'
import SearchAddLoading from './searchAddLoading.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'searchaddpage',
    components:{addfrienditem, SearchAddLoading},
    data(){
        return{
            // 接收到的users
            receiverUsersByUserQQ:[],
            receiverUsersByUserName:[],
            // 需展示的文本
            textUserQQ:'',
            textUserName:'',
            // 幽灵显示
            UserQQGhost:false,
            UserNameGhost:false,
        }
    },
    methods:{
        // 退出该搜索页面
        quitSearchAddPage(){
            this.$bus.$emit('quitSearchAddPage',false,false);
        },
        // 数据初始化
        dataInitialization(){
            this.receiverUsersByUserQQ=[];
            this.receiverUsersByUserName = [];
        }
    },
    mounted(){
        // 接收服务器查找出来的数据--来自friends.vue
        this.$bus.$on('findUsers',(users,searchContent)=>{
            this.dataInitialization();
            this.receiverUsers = users;
            users.forEach(user => {
                if(user.userQQ==searchContent){
                    this.receiverUsersByUserQQ.push(user);
                }
                else{
                    this.receiverUsersByUserName.push(user);
                }
            });
            // 计算两种搜索内容下的数目
            var userByUserQQnum = this.receiverUsersByUserQQ.length;
            var userByUserName = this.receiverUsersByUserName.length;
            this.UserQQGhost = false;
            this.UserNameGhost = false;
            // 如果byQQ没有结果
            if(userByUserQQnum==0){
                this.textUserQQ = "没有以用户名搜索到结果,但是捉到一只小幽灵";
                this.UserQQGhost = true;
                this.UserNameGhost = false;
            }
            else{
                this.textUserQQ = "以用户名搜索到了 "+userByUserQQnum+" 位用户:";
            }
            // 如果byNume没有结果
            if(userByUserName==0){
                this.textUserName = "没有以用户昵称搜索到结果,但是捉到一只小幽灵";
                this.UserQQGhost = false;
                this.UserNameGhost = true;
            }
            else{
                this.textUserName = "以用户昵称搜索到了 "+userByUserName+" 位用户:";
            }
            if(userByUserQQnum==0 && userByUserName==0){
                
                this.textUserQQ = "以用户名搜索:0,但是捉到一只迷路小幽灵";
                this.textUserName = "以用户昵称搜索:0,但是但是也捉到一只小幽灵";
                this.UserQQGhost = true;
                this.UserNameGhost = true;
            }
            
        })
    },
    beforeDestroy(){
         this.$bus.$off('findUsers');
    }
}
</script>

<style scoped>
.mainbody{
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    overflow-x:hidden;
    overflow-y: auto;
    width: 100%;
    background-color: rgba(61, 61, 61,0.9);
    top: 30px;
    border-radius: 15px;
    height: 565px;
    color: pink;
    margin-top: 10px;
    z-index: 6;
}
.hr{
    margin-top: 10px;
    margin-bottom: 10px;
    border: rgba(255, 192, 203,0.5) 0.1px solid;
}
.quitbutton{
  position: relative;
  width: 100%;
  height: 30px;
  cursor: pointer;
  text-align: center;
  background-color: darkgray;
  color: pink;
  transition: 0.55s;
  margin-top: 1px;
  border: 0;
}
.quitbutton:hover{
    background-color: rgba(61, 61, 61,0.9);
    color: white;
}
.quitbutton img{
    transform: rotate(-90deg);
}
.ghost{
    position: relative;
    transform: scale(0.5);
}
span{
    font-size: 1.44vh;
}
</style>