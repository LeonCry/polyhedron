<template>
  <div class="browseHistory">
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
  </div>
</template>

<script>
import historyItem from "@/components/shopper/historyItem.vue"

export default {
components: { historyItem },
name:'browseHistory',
}
</script>

<style scoped>
.browseHistory{
  position: relative;
  width: 100%;
  height: 660px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
}

</style>