<template>
  <div class="rightChatBox radius">
    <br />
    <b class="title">用户聊天信息</b>
    <hr />
    <br />
    <div class="Maincontent radius">
      <div class="user radius hovers">
        <br />
        <el-tabs  >
          <div><span slot="label" class="tabfull"><i class="el-icon-s-custom"></i> 用户列表</span>
          <br><br>
            <el-input
              placeholder="输入用户名/昵称."
              v-model="searchUser"
              prefix-icon="el-icon-search"
              class="searchInput"
              @input="userSearching"
              clearable
            >
            </el-input>
            <div class="allusers">
              <user-box
                v-for="user of totalUsers"
                :userProp="user"
                :key="user.userId"
              ></user-box>
            </div>
          </div>
        </el-tabs>
      </div>
      <div class="chats radius hovers">
        <chats-box v-show="chatShow"></chats-box>
      </div>
      <div class="user radius hovers">
        <br />
        <el-tabs  >
          <el-tab-pane
            ><span class="eltab" slot="label"
              ><i class="el-icon-lollipop"></i>朋友列表</span
            >
            <el-input
              placeholder="输入用户名/昵称/备注."
              v-model="searchFriend"
              class="searchInput"
              prefix-icon="el-icon-search"
              @input="friendSearching"
              clearable
            >
            </el-input>
            <div class="allusers">
              <user-friend-box
                v-for="friend of AllFriends"
                :friendProp="friend"
                :baseUserProp="baseUser"
                :key="friend.friendId"
              ></user-friend-box>
            </div>
          </el-tab-pane>
          <el-tab-pane
            ><span class="eltab" slot="label"
              ><i class="el-icon-postcard"></i>搜索聊天</span
            >
            <div class="block">
              <el-date-picker
              value-format="timestamp"
                v-model="searchTimes"
                class="block"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            
            </div>
            <div class="allusers">
                       <!-- 搜索聊天记录栏 -->
          <div class="chatsSearch">
            <search-chats-back v-if="isShowSearch" :friendProps="friendItem" :userProp="baseUser"></search-chats-back>
          </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <hr />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import userBox from "@/components/BackEnd/chatComponents/userBox.vue";
import { mapState } from "vuex";
import ChatsBox from "@/components/BackEnd/chatComponents/chatsBox.vue";
import UserFriendBox from "@/components/BackEnd/chatComponents/userFriendBox.vue";
import SearchChatsBack from '@/components/BackEnd/chatComponents/searchChatsBack.vue';
export default {
  components: { userBox, ChatsBox, UserFriendBox, SearchChatsBack },
  name: "rightChat",
  computed: {
    ...mapState("userInfo", ["user"]),
  },
  data() {
    return {
      totalUsers: [],
      AllFriends: [],
      saveTemFriend: [],
      // 根据用户
      baseUser: "",
      // 搜索用户
      searchUser: "",
      searchFriend: "",
      searchTimes:'',
      friendItem:'',
      isShowSearch:false,
      chatShow:false,
    };
  },
  methods: {
    async createdInit() {
      this.$bus.$emit("backRightLoading", true, "加载中");
      await this.$axios
        .post("/api/findUsers", { userQQ: "" })
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

    friendSearching() {
      if (this.searchFriend == "") {
        this.AllFriends = this.saveTemFriend;
      } else {
        let searchResult1 = [];
        let searchResult2 = [];
        this.$axios
          .post("/api/selectFriendsByRemakeName", {
            userQQ: this.baseUser.userQQ,
            friendRemarkName: this.searchFriend,
          })
          .then(
            (response) => {
              searchResult1 = response.data;
              this.$axios
                .post("/api/selectFriendsByName", {
                  userQQ: this.baseUser.userQQ,
                  friendName: this.searchFriend,
                })
                .then(
                  (response) => {
                    searchResult2 = response.data;
                    // 将搜索出来的两类,进行合并
                    for (let index = 0; index < searchResult1.length; index++) {
                      const element1 = searchResult1[index];
                      for (
                        let index2 = 0;
                        index2 < searchResult2.length;
                        index++
                      ) {
                        const element2 = searchResult2[index2];
                        if (element1 == element2) {
                          searchResult2.splice(index2, 1);
                        }
                      }
                    }
                    searchResult2.forEach((element) => {
                      searchResult1.push(element);
                    });
                    this.AllFriends = searchResult1;
                  },
                  (error) => {
                    console.log(error.message);
                  }
                );
            },
            (error) => {
              console.log(error.message);
            }
          );
      }
    },
    // 获取haoyouliebiao;
   async getFriends(theUser){
    await  this.$axios.post("/api/getAllFriends", { userQQ: theUser.userQQ }).then(
        (response) => {
          this.AllFriends = response.data;
          // 暂时存储
          this.saveTemFriend = response.data;
          this.baseUser = theUser;
        },
        (error) => {
          console.log(error.message);
        }
      );
    }


  },

  created() {
    this.createdInit();
  },

  mounted() {
    // 展开朋友列表
    this.$bus.$on("showFriends", (theUser) => {
        this.getFriends(theUser);
    });
     this.$bus.$on('showChats',(theUser,friend)=>{
        this.chatShow = true;
        this.isShowSearch = true;
        setTimeout(() => {
            this.friendItem = friend;
        }, 1000);
  });
    this.$bus.$on('searchReset',()=>{
        this.isShowSearch = false;
        this.chatShow = false;

    })
},
}
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
.hovers{
    transition: 0.33s;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
.hovers:hover{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}
.eltab {
  margin-left: 20px;
  margin-right: 10px;
}
.tabfull {
  padding-left: 100px;
  padding-right: 100px;
  color: black;
}
/* 聊天搜索框 */
.chatsSearch{
    position: relative;
    height: 500px;
    width: 100%;
}

</style>