// 展示喜欢\分享\收藏动态的人\
<template>
  <div class="showpeoplebox">
    <div class="exit">
      <img src="../assets/exit2.svg" alt="退出" @click="exitShowPeople" />
    </div>
      <span>{{this.whichState}}</span>
      <addfrienditem :userProp="user" v-for="user of peopleUser" :key="user.userId" ></addfrienditem>
  </div>
</template>

<script>
import addfrienditem from './addfrienditem.vue'
export default {
  components: { addfrienditem },
name:'showPeople',
props:['peopleProps','whichState'],
data(){
    return{
        people:[],
        peopleUser:[],
    }
},
created(){
    this.people = this.peopleProps.split(',');
    this.people.forEach(people => {
    this.$axios.post('/api/getUser',{userQQ:people}).then(response=>{
        response.data.noSpace = true;
            this.peopleUser.push(response.data);
        },error=>{
            console.log(error.message);
        });
    });
},
methods:{
       // 退出按钮
    exitShowPeople() {
      this.$bus.$emit('showPeopleDisAppear','');
    },
}
}
</script>

<style scoped>
.showpeoplebox{
    position: absolute;
    width: 95%;
    z-index: 99;
    left: -5%;
    padding-left: 20px;
    border-radius: 20px;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
    min-height: 250px;
    max-height: 500px;
    border: 1.5px solid white;
    box-shadow: 0 0 3px white;
    background-color: black;
}
.showpeoplebox span{
    text-align: center;
    color: pink;
    font-size: 2vh;
    padding-top: 15px;
    padding-bottom: 15px;

}
/* 退出按钮 */
.exit {
  position: absolute;
  right: 0;
  z-index: 11;
  padding-right: 20px;
  line-height: 65px;
  cursor: pointer;
}
.exit img {
  transition: 0.8s;
}
.exit img:hover {
  transform: rotateZ(720deg) scale(1.33);
}

</style>