<template> 
<transition appear name="iconsT">
  <div class="siderbar">
    <!-- 菜单 -->
    <div>
      <img src="../assets/menu.svg" alt="菜单" @click="isShow = !isShow"/>
      <!-- 下拉菜单 -->
      <transition name="dropT">
        <span v-show="isShow" class="dropdown">
          <a href="">引导</a>
          <a href="">关于</a>
          <a href="">联系</a>
          <a href="javascript:void(0)" @click="adminLogin">管理</a>
        </span>
      </transition>
    </div>
    <!-- 天气 -->
    <div>
      <img id="rain" src="../assets/rain.svg" alt="天气" />
    </div>
  </div>
</transition>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "tops",
  data() {
    return {
      isShow: false,
    };
  },
  methods:{
    adminLogin(){
      this.$bus.$emit('tologin',true);
    }
  }
};
</script>

<style scoped>
/* 上方sidebar的样式 */
.siderbar {
  margin-top: 20px;
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row-reverse nowrap;
}
.siderbar div {
  width: 50px;
  text-align: center;
  color: whitesmoke;
  margin-left: 5px;
  cursor: pointer;
  transition: 0.5s;
}
.siderbar div:hover {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 100px 100px;
}
/* 菜单下拉框 */
.dropdown {
  display: flex;
  position: absolute;
  flex-direction: column;
  border-right: 2px solid white;
}
.dropdown a {
  color: white;
  position: relative;
  margin-bottom: 10px;
  transition: 0.5s;
  margin-top: 5px;
}
.dropdown a:hover {
  color: black;
  right: 5px;
  border-right: 5px solid rgba(0, 0, 0, 0);
  cursor: pointer;
}
/* 下拉框动画 */
.dropT-enter,
.dropT-leave-to {
  height: 0;
  opacity: 0;
}
.dropT-enter-active,
.dropT-leave-active {
  transition: 0.5s;
}
.dropT-enter-to,
.dropT-leave {
  height: 150px;
  opacity: 1;
}
/* sidebar动画 */
.iconsT-enter,
.iconsT-leave-to {
  opacity: 0;
}
.iconsT-enter-active,
.iconsT-leave-active {
  transition: 3s linear;
}
.iconsT-enter-to,
.iconsT-leave {
  opacity: 1;
}

</style>