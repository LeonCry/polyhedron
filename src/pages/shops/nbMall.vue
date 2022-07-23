<template>
  <div class="realShops">
            <shop-item v-for="shop of receiveShops" :key="shop.shopId" :shopProp="shop"></shop-item>

  </div>
</template>

<script>
import ShopItem from '@/components/shopper/shopItem.vue'
export default {
name:'nbMall',
components:{ShopItem},
data(){
  return{
    receiveShops:[],
  }
},

methods:{
// 初始化接收参数
  getData(){
    this.$axios.post('/api/returnAllShopping').then(response=>{
      this.receiveShops = response.data;
      console.log(response.data);
    },error=>{
      console.log(error.message);
    });
  },
},
created(){
  this.getData();
}

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