<template>
  <div class="realShops">
            <shop-item></shop-item>
            <shop-item></shop-item>
            <shop-item></shop-item>
            <shop-item></shop-item>
            <shop-item></shop-item>
            <shop-item></shop-item>
            <shop-item></shop-item>
            <shop-item></shop-item>
  </div>
</template>

<script>
import ShopItem from '@/components/shopper/shopItem.vue'
export default {
name:'nbMall',
components:{ShopItem},
}
</script>

<style scoped>
.realShops{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
}
</style>