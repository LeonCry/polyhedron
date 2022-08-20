import axios from "axios";
export default{
    // 开启命名空间
    namespaced:true,
    actions:{
        // 全局保存订单ID
        uploadOrderId(context,value){
            context.commit('SAVEORDERID',value);
        },
        // 全局保存订单用户
        uploadOrderUser(context,value){
            context.commit('SAVEORDERUSER',value);
        },
        // 全局保存订单内容
        uploadOrderConent(context,value){
            var newValue = JSON.stringify(value);
            // eslint-disable-next-line no-unused-vars
            axios.post('/api/updateFoodOrders',{orderId:context.state.orders.orderId,orderContent:newValue}).then(response=>{

            },error=>{
                console.log(error.message);
            });
            context.commit('SAVECONTENT',value);
        },

    },
    mutations:{
        // 保存该订单ID
        SAVEORDERID(state,value){
            state.orders.orderId = value;
        },
        // 保存该订单用户
        SAVEORDERUSER(state,value){
            state.orders.orderUser = value;
        },
        // 保存该订单用户
        SAVECONTENT(state,value){
            state.orders.orderContent = value;
        },
    },
    state:{
        orders:{
            orderId:'',
            orderUser:'',
            orderContent:[],
        },
    },
}