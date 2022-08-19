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
    },
    state:{
        orders:{
            orderId:'',
            orderUser:'',
        },
    },
}