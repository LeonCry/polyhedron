<template>
  <div class="shopTraining">
    <train-item v-for="order of receiveData" :key="order.orderId" :orderProp="order"></train-item>
  </div>
</template>

<script>
import trainItem from '@/components/shopper/trainItem.vue'
import { mapState } from 'vuex';
export default {
  components: { trainItem },
name:'shopTraining',
computed:{
    ...mapState('userInfo',['user']),
},
data(){
  return {
    receiveData:[],
  }
},
methods:{
      returnAllData(){
      this.receiveData = [];
      this.$axios.post('/api/returnShopOrderByName',{buyUser:this.user.userQQ}).then(response=>{
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if(element.orderTrain!='是'){
            this.receiveData.push(element);
          }
        }
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