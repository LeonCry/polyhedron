<template> 
<transition appear name="iconsT">
  <div class="siderbar">
    <div class="back" v-show="backShow">
      <button class="backbut" @click="backs"> ◀BACK </button>
    </div>
    <div class="mieedd">

    </div>
    <!-- 菜单 -->
    <div class="droop">
      <img src="../assets/menu.svg" alt="菜单" @click="isShow = !isShow"/>
      <!-- 下拉菜单 -->
      <transition name="dropT">
        <span v-show="isShow" class="dropdown">
          <a href="">关于</a>
          <a href="">联系</a>
          <a href="">博客</a>
          <a href="javascript:void(0)" @click="adminLogin">后台</a>
        </span>
      </transition>
    </div>
    <!-- 天气 -->
    <!-- <div>
      <img id="rain" src="../assets/rain.svg" alt="天气" />
    </div> -->
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
      backShow:false,
    };
  },
  methods:{
    adminLogin(){
      this.isShow = false;
      // 向adminlogin组件传达数据,展示管理员登录界面
      this.$bus.$emit('tologin',true);
    },
    backs(){
      // router用来操作对象,route用来获取信息
      setTimeout(() => {
              if(this.$route.path=='/'){
        this.$bus.$emit('backShow',false);
      }
      }, 100);
      this.$bus.$emit('menuShow',false);
      this.$bus.$emit('Approuter',-1);
    }
  },
  mounted(){
     this.$bus.$on('backShow',(data)=>{
      this.backShow = data;
     });
  }
};
</script>

<style scoped>
/* 上方sidebar的样式 */
.siderbar {
  width: 100%;
  position: fixed;
  height: 40px;
  display: flex;
  transition: 0.5s;
  z-index: 99;
  flex-flow: row nowrap;
  background-color: rgba(0, 0, 0, 0);
}
.siderbar:hover{
  background-color: white;
}

.siderbar div {
  width: 50px;
  margin-top: 10px;
  height: 25px;
  text-align: center;
  margin-left: 5px;
  margin-right: 10px;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
}
.siderbar:hover div{
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.siderbar div:hover{
  background-color: black;
  border-radius: 10px;
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
   z-index: 1001;
  margin-top: 5px;
}
.dropdown a:hover {
  color: black;
  right: 5px;
  border-right: 5px solid rgba(0, 0, 0, 0);
  cursor: pointer;
}
.mieedd{
  flex: 22;
  opacity: 0;
  cursor: default;
}
.droop{
  flex: 1;
}
.back{
  flex: 1;
}
.backbut{
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2vh;
  font-weight: bolder;
  cursor: pointer;
  color: white;
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