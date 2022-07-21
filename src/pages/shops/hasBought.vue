<template>
  <div class="hasBought">
    <has-bought-item></has-bought-item>
    <has-bought-item></has-bought-item>
    <has-bought-item></has-bought-item>
    <has-bought-item></has-bought-item>
    <has-bought-item></has-bought-item>
  </div>
</template>

<script>
import hasBoughtItem from '@/components/shopper/hasBoughtItem.vue'
export default {
  components: { hasBoughtItem },
name:'hasBought',
}
</script>

<style scoped>
.hasBought{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
}

</style>