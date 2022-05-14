// 和用户信息有关的store
import axios from "axios";
import  VueCookies from "vue-cookies";
export default{
    // 开启命名空间
    namespaced:true,
    // 行为
    actions:{
        // 全局保存该用户的信息,并保存到cookie
        uploadUserInfo(context,value){
            // 设置cookie
            console.log("设置cookie...");
            VueCookies.set("userQQ",value.userQQ,60*60*2);
            VueCookies.set("userPassword",value.userPassword,60*60*2);
            context.commit('SAVEUSER',value);
        },
         // 全局保存该用户的设置信息
        uploadUserSetting(context,value){
            context.commit("SAVESETTING",value);
        },
        // 全局保存用户信息,并更新到数据库
        updateUserInfo(context,value){
            // 更新数据库
            axios.post("/api/updateUserInfo",value).then(
                response=>{
                    if(response==-1){
                        console.log("更新用户信息失败..");
                    }
                    // 
                    else context.commit('SAVEUSER',value);
                },
                error=>{
                    console.log(error.message);
                }
            )
        },
        // 全局保存用户设置信息,并更新到数据库---先进性更新数据库
        updateUserSettingInfo(context,value){
                        // 更新数据库
            axios.post("/api/updateUserSettingInfo",value).then(
                response=>{
                    if(response==-1){
                        console.log("更新用户信息失败..");
                    }
                    // 
                    else {
                    context.commit('SAVESETTING',value);
                    context.commit('CHANGELOADING',true);
                }
                },
                error=>{
                    console.log(error.message);
                }
            )
        },
    },
    // 动作
    mutations:{
        // 保存该user
        SAVEUSER(state,value){
            state.user = value;
        },
        // 保存用户设置信息
        SAVESETTING(state,value){
            state.userSetting = value;
        },
        // 改变loading状态--setting
        CHANGELOADING(state,value){
            state.loadingOver = value;
            setTimeout(() => {
            state.loadingOver = false;
            }, 2000);
        }
    },
    // 状态
    state:{
        user:'',
        userSetting:'',
        loadingOver:false,
    }
}