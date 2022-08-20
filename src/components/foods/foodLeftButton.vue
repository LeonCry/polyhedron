<template>
  <div :class="{foodBox:!isChoosen,foodBoxActive:isChoosen}">
    <button @click="chooseIt" class="but">{{type}}</button>
  </div>
</template>

<script>
export default {
name:'foodLeftBox',
props:['foodTypeProps'],
data(){
    return{
        type:this.foodTypeProps,
        isChoosen:false,
    }
},
methods:{
    chooseIt(){
            this.isChoosen = true;
            this.$bus.$emit('foodButChoosen',this.type);
            this.$bus.$emit('foodsByType',this.type);
    }
},
mounted(){
    this.$bus.$on('foodButChoosen',(data)=>{
        if(this.type!=data){
            this.isChoosen = false;
        }
    })
     this.$bus.$on('leftButtonOneClick',()=>{
        if(this.type=='所有菜肴'){
            this.chooseIt();
        }
     });
}
}
</script>

<style scoped>
.foodBox{
    position: relative;
    width: 102%;
    padding-top: 20px;
    padding-bottom: 20px;
    height: 15px;
    font-size: 1.6vh;
    color: #2b2c34;
    transition: 0.33s;
}
.foodBoxActive{
    position: relative;
    width: 102%;
    padding-top: 20px;
    padding-bottom: 20px;
    height: 15px;
    font-size: 1.6vh;
    color: #2b2c34;
    background-color: var(--friColor);
    transition: 0.33s;
}
.but{
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 1.6vh;
    border: none;
    background-color: rgba(0, 0, 0, 0);
}
</style>