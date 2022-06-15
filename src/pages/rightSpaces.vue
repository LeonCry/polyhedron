<template>
  <div class="rightChatBox radius">
    <br />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态可视化" name="first">
        <div class="Maincontent radius">
          <div class="user radius">
            <br />
                <span slot="label" class="tabfull"><i class="el-icon-s-custom"></i>用户列表</span>
                <br><hr><br>
                <el-input
                  placeholder="输入用户名/昵称."
                  v-model="input"
                  prefix-icon="el-icon-search"
                  class="searchInput"
                  clearable
                >
                </el-input>
                <div class="allusers">
                  <user-box :userProp="this.user"></user-box>
                </div>
          </div>
          <div class="user radius">
            <br />
        <span class="tabfull" slot="label"><i class="el-icon-coffee-cup"></i>动态列表</span>
        <br><hr><br>
                        <el-input
                  placeholder="输入动态内容."
                  v-model="input"
                  prefix-icon="el-icon-search"
                  class="searchInput"
                  clearable
                >
                </el-input>
                <div class="allusers">
                  <user-box :userProp="this.user"></user-box>
                </div>
            <br />
          </div>
          <div class="chats radius">
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
import userBox from "@/components/BackEnd/chatComponents/userBox.vue";
import { mapState } from "vuex";
import SpaceBox from '@/components/BackEnd/spaceComponents/spaceBox.vue';
import SpaceDataBox from '@/components/BackEnd/spaceComponents/spaceDataBox.vue';
export default {
  components: { userBox, SpaceBox, SpaceDataBox },
  name: "rightSpaces",
  computed: {
    ...mapState("userInfo", ["user"]),
  },
  data() {
    return {
      activeName: "first",
    };
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
</style>