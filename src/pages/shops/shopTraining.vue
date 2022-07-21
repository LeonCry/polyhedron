<template>
  <div class="shopTraining">
    <train-item></train-item>
    <train-item></train-item>
    <train-item></train-item>
    <train-item></train-item>
    <train-item></train-item>
  </div>
</template>

<script>
import trainItem from '@/components/shopper/trainItem.vue'
export default {
  components: { trainItem },
name:'shopTraining',
}
</script>

<style scoped>
.shopTraining{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
}

</style>