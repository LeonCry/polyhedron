<template>
  <div class="hasBought">
    <has-bought-item v-for="order of receiveData" :key="order.orderId" :orderProp="order"></has-bought-item>
  </div>
</template>

<script>
import hasBoughtItem from '@/components/shopper/hasBoughtItem.vue'
import { mapState } from 'vuex'
export default {
  components: { hasBoughtItem },
name:'hasBought',
computed:{
    ...mapState('userInfo',['user']),
},
data(){
  return{
    receiveData:[],
  }
},

methods:{
    returnAllData(){
      this.$axios.post('/api/returnShopOrderByName',{buyUser:this.user.userQQ}).then(response=>{
        this.receiveData = response.data;
      },error=>{
        console.log(error.message);
      });
    }
},
created(){
  this.returnAllData();
}

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