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
                    
                    else {
                        console.log("更新信息",response.data);
                        context.commit('SAVEUSER',value)
                    }
                },
                error=>{
                    console.log(error.message);
                }
            )
        },
        // 全局保存用户设置信息,并更新到数据库
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
        // 上传头像图片到服务器
        updateHead(context,value){
            
            console.log("Q:",value);
            let param = new FormData(); //创建form对象
            param.append('file',value.file);//通过append向form对象添加数据
            console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                 headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
            axios.post("/api/saveHead",param,config).then(
                response=>{
                    // 获得存储头像的地址
                    console.log(response.data);
                    context.dispatch('saveHead',{"file":response.data,"userQQ":value.userQQ});
                })
        },
        // 保存头像地址到服务器user
        saveHead(context,value){
            console.log("rou and userQQ:",value);
            
            axios.post("/api/updateUserInfo",{"userQQ":value.userQQ,"userHead":value.file}).then(
                response=>{
                    console.log("更新头像:",response.data);
                    context.commit('CHANGEHEAD',value.file);
                    context.commit('CHANGELOADING','1');

                }
            )
        },
        // 上传背景图片到服务器
        updateBack(context,value){
            console.log("Q:",value);
            let param = new FormData(); //创建form对象
            param.append('file',value.file);//通过append向form对象添加数据
            console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                 headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
            axios.post("/api/saveBack",param,config).then(
                response=>{
                    // 获得存储头像的地址
                    console.log(response.data);
                    context.dispatch('saveBack',{"file":response.data,"userQQ":value.userQQ});
                })
        },
        // 保存背景地址到服务器user
        saveBack(context,value){
            console.log("rou and userQQ:",value);
            
            axios.post("/api/updateUserInfo",{"userQQ":value.userQQ,"userBack":value.file}).then(
                response=>{
                    console.log("更新背景:",response.data);
                    context.commit('CHANGEBACK',value.file);
                    context.commit('CHANGELOADING','2');

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
            // 若仅更新字面信息
            if(!state.isBackUpdate && !state.isHeadUpdate){
                console.log("update font");
                state.loadingOver = value;
                setTimeout(() => {
                state.loadingOver = false;
                state.isHeadUpdate = false;
                state.isBackUpdate = false;
                }, 2000);
            }
            // 若更新了头像
            else if(state.isHeadUpdate && !state.isBackUpdate){
                console.log("update head");
                if(value=='1'){
                    state.loadingOver = value;
                    setTimeout(() => {
                    state.loadingOver = false;
                    state.isHeadUpdate = false;
                    state.isBackUpdate = false;
                    }, 2000);
                }
            }
            // 若更新头像和背景
            else{
                console.log("update head and back");
                if(value=='2'){
                    state.loadingOver = value;
                    setTimeout(() => {
                    state.loadingOver = false;
                    state.isHeadUpdate = false;
                    state.isBackupdate = false;
                    }, 2000);
                }
            }

        },
        // 改变用户设置--头像
        CHANGEHEAD(state,value){
            state.user.userHead = value;
        },
        // 改变用户设置--背景
        CHANGEBACK(state,value){
            state.user.userBack = value;
        },
        // 改变头像上传状态
        SETHEADSTATE(state,value){
            console.log("改变头像上传状态 changed");
            
            state.isHeadUpdate = value;
        },
        // 改变背景上传状态
        SETBACKSTATE(state,value){
            console.log("改变背景上传状态 changed");
            state.isBackUpdate = value;
        },
        // 存储下来服务器上目前所有用户
        SAVEALLUSERSS(state,value){
            state.allusers = value;
        },
        // 保存socket
        SAVESOCKET(state,value){
            state.socket = value;
        }

    },
    // 状态
    state:{
        user:'',
        userSetting:'',
        // 服务器上目前所有的用户
        allusers:'',
        // 是否loading结束
        loadingOver:false,
        // 是否头像上传中
        isHeadUpdate:false,
         // 是否背景上传中
        isBackUpdate:false,
        // socket
        socket:'',
    }
}