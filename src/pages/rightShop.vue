<template>
  <div class="shopBox">
    <br><br>
      <el-tabs v-model="activeName">
    <el-tab-pane label="所有商品" name="first">
      <all-back-shop></all-back-shop>
    </el-tab-pane>
    <el-tab-pane label="已购买商品" name="second">
      <bought-back-shop></bought-back-shop>
    </el-tab-pane>
    <el-tab-pane label="PX币收支明细" name="third">
      <back-px-money></back-px-money>
    </el-tab-pane>
    <el-tab-pane label="浏览历史" name="fourth">
      <history-back-shop></history-back-shop>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import historyBackShop from "@/components/BackEnd/backShop/historyBackShop.vue"
import AllBackShop from '@/components/BackEnd/backShop/allBackShop.vue'
import BoughtBackShop from "@/components/BackEnd/backShop/boughtBackShop.vue"
import backPxMoney from "@/components/BackEnd/backShop/backPxMoney.vue"

export default {
  components: { historyBackShop, AllBackShop,backPxMoney,BoughtBackShop},
  name:'rightShop',
  data(){
    return{
      activeName:'first',
    }
  },

}
</script>
<style scoped>

.shopBox{
  width: 100%;
  height: 98%;
}

</style>