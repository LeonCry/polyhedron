<template>
  <div class="allback">
    <tops></tops>
    <mains></mains>
    <loginx></loginx>
    <login></login>
  </div>
</template>

<script>
import mains from './components/mains.vue'
import loginx from './components/loginx.vue'
import tops from './components/tops.vue'
import login from './components/login.vue'
export default {
  name: "App",
  components:{tops,mains,loginx,login},
};

</script>

<style>
/* 所有元素的样式 */
* {
  margin: 0;
  padding: 0;
}

/* App的样式 */
.allback {
  width: 100%;
}
</style>
