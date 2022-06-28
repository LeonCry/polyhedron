<template>
  <div class="rightChatBox radius">
    <br />
    <el-tabs v-model="activeName" >
      <el-tab-pane label="动态可视化" name="first">
        <div class="Maincontent radius">
          <div class="user radius hovers">
            <br />
                <span slot="label" class="tabfull"><i class="el-icon-s-custom"></i>用户列表</span>
                <br><hr><br>
                <el-input
                  placeholder="输入用户名/昵称."
                  v-model="searchUser"
                  @input="userSearching"
                  prefix-icon="el-icon-search"
                  class="searchInput"
                  clearable
                >
                </el-input>
                <div class="allusers">
               <space-user-item v-for="user of totalUsers" :userProp="user" :key="user.userId"></space-user-item>
                </div>
          </div>
          <div class="user radius hovers">
            <br />
        <span class="tabfull" slot="label"><i class="el-icon-coffee-cup"></i>动态列表</span>
        <br><hr><br>
                        <el-input
                  placeholder="输入动态内容."
                  v-model="searchSpace"
                  prefix-icon="el-icon-search"
                  class="searchInput"
                  clearable
                >
                </el-input>
                <div class="allusers">
                  <space-content-item v-for="space of AllSpaces" :key="space.publishId" :spaceProp="space"></space-content-item>
                </div>
            <br />
          </div>
          <div class="chats radius hovers">
            <space-box></space-box>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="动态数据" name="second">
        <space-data-box></space-data-box>
         </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SpaceBox from '@/components/BackEnd/spaceComponents/spaceBox.vue';
import SpaceDataBox from '@/components/BackEnd/spaceComponents/spaceDataBox.vue';
import SpaceUserItem from '@/components/BackEnd/spaceComponents/spaceUserItem.vue';
import SpaceContentItem from '@/components/BackEnd/spaceComponents/spaceContentItem.vue';
export default {
  components: {  SpaceBox, SpaceDataBox, SpaceUserItem, SpaceContentItem },
  name: "rightSpaces",
  data() {
    return {
      activeName: "first",
      totalUsers:[],
      searchUser:'',
      AllSpaces:[],
      searchSpace:'',
      saveTemSpaces:[],
    }
  },
  methods:{
    async createdInit() {
      this.$bus.$emit("backRightLoading", true, "加载中");
      await this.$axios
        .post("/api/findUsers", { userQQ:""})
        .then((response) => {
          this.totalUsers = response.data;
        });
      this.$bus.$emit("backRightLoading", false, "加载中");
    },

    userSearching() {
      this.$axios.post("/api/findUsers", { userQQ: this.searchUser }).then(
        (response) => {
          this.totalUsers = response.data;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
        // 获取动态列表;
   async getSpaces(theSpace){
        this.$bus.$emit('backRightLoading',true,"动态加载中");
    await  this.$axios.post("/api/selectSpaces", {publishQQ: theSpace.userQQ,pageStart:0,pageEnd:9999}).then(
        (response) => {
          this.AllSpaces = response.data;
          // 暂时存储
          this.saveTemSpaces = response.data;
          this.baseSpace = theSpace;
           this.$bus.$emit('backRightLoading',false,"动态加载中");
        },
        (error) => {
          console.log(error.message);
        }
      );
    }

  },
  mounted(){
    this.createdInit();
        // 展开动态列表
    this.$bus.$on("showSpaces", (theUser) => {
        this.getSpaces(theUser);
    });
  },

};
</script>

<style scoped>
.rightChatBox {
  width: 100%;
  height: 750px;
  display: flex;
  flex-flow: column nowrap;
}
.radius {
  border-radius: 15px;
}
.title {
  color: rgb(29, 29, 32);
  margin-bottom: 5px;
  margin-left: 10px;
  font-size: 2vh;
}
.Maincontent {
  width: 100%;
  height: 680px;
  display: flex;
  flex-flow: row nowrap;
}
.user {
  width: 20%;
  margin: 10px;
  display: flex;
  flex-flow: column nowrap;
  background-color: white;
}
.chats {
  width: 55%;
  margin: 10px;
  background-color: white;
}
.searchInput {
  width: 80%;
  left: 10%;
}
.allusers {
  position: relative;
  top: 10px;
  width: 90%;
  left: 5%;
  height: 520px;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
}
.block {
  width: 100%;
}
.eltab {
  margin-left: 20px;
  margin-right: 10px;
}
.tabfull {
  text-align: center;
  color: black;
  font-size: 2vh;
}
.hovers{
    transition: 0.33s;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
.hovers:hover{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}
</style>