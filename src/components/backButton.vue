<template>
      <el-button  round class="backs" @click="routerTo(backRoot)"><i class="el-icon-caret-left"></i> 返回</el-button>
</template>

<script>
export default {
name:'backButton',
data(){
    return{
        backRoot:this.roots,
    }
},
props:['roots'],
methods:{
    routerTo(rout){
        if(this.backRoot==-1){
            this.$router.go(-1);
        }
        else{
this.$router.push({
            name:rout,
        })
        }
},
}
}
</script>

<style scoped>
.backs{
    position: absolute;
    z-index: 9999;
    left: 25px;
    top: 25px;
    opacity: 0.5;
    transition: 0.55s;
    color: white;
    background-color: #35373d7a;
}
.backs:hover{
    opacity: 1;
    background-color: #252a34;
}
</style>