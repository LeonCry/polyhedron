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
                        console.log("A");
                    }
                    // 
                    
                    else {
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
                        console.log("A");
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
            
            let param = new FormData(); //创建form对象
            param.append('file',value.file);//通过append向form对象添加数据
            let config = {
                 headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
            axios.post("/api/saveHead",param,config).then(
                response=>{
                    // 获得存储头像的地址
                    context.dispatch('saveHead',{"file":response.data,"userQQ":value.userQQ});
                })
        },
        // 保存头像地址到服务器user
        saveHead(context,value){
            
            axios.post("/api/updateUserInfo",{"userQQ":value.userQQ,"userHead":value.file}).then(
                // eslint-disable-next-line no-unused-vars
                response=>{
                    context.commit('CHANGEHEAD',value.file);
                    context.commit('CHANGELOADING','1');

                }
            )
        },
        // 上传背景图片到服务器
        updateBack(context,value){
            let param = new FormData(); //创建form对象
            param.append('file',value.file);//通过append向form对象添加数据
            let config = {
                 headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
            axios.post("/api/saveBack",param,config).then(
                response=>{
                    // 获得存储头像的地址
                    context.dispatch('saveBack',{"file":response.data,"userQQ":value.userQQ});
                })
        },
        // 保存背景地址到服务器user
        saveBack(context,value){
            
            axios.post("/api/updateUserInfo",{"userQQ":value.userQQ,"userBack":value.file}).then(
                // eslint-disable-next-line no-unused-vars
                response=>{
                    context.commit('CHANGEBACK',value.file);
                    context.commit('CHANGELOADING','2');

                }
            )
        },
        // 查询spaceWith数据库并全局保存
        findSpaceWith(context,value){
            axios.post('/api/selectSpaceWithByUserQQ',{userQQ:value}).then(response=>{
                for(let val in response.data[0]){
                    if(val=='spaceWithId'||val=='userQQ'){
                      continue;
                    }
                  if(response.data[0][val]!=''){
                    response.data[0][val] = response.data[0][val].split(',');
                  }
                  else{
                    response.data[0][val] = [];
                  }
                  }
                context.commit('SAVESPACEWITH',response.data[0]);
            },
            error=>{
                console.log(error.message);
            })
        }

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
                state.loadingOver = value;
                setTimeout(() => {
                state.loadingOver = false;
                state.isHeadUpdate = false;
                state.isBackUpdate = false;
                }, 2000);
            }
            // 若更新了头像
            else if(state.isHeadUpdate && !state.isBackUpdate){
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
            
            state.isHeadUpdate = value;
        },
        // 改变背景上传状态
        SETBACKSTATE(state,value){
            state.isBackUpdate = value;
        },
        // 存储下来服务器上目前所有用户
        SAVEALLUSERSS(state,value){
            state.allusers = value;
        },
        // 保存socket
        SAVESOCKET(state,value){
            state.socket = value;
        },
        // 保存spaceWith
        SAVESPACEWITH(state,value){
            state.spaceWith = value;
        },
        // 从spaceitem组件更新spaceWith
        UPDATESPACEWITH(state,value){
            // value:{operation:'collections',publishId:'1'}
            state.spaceWith[value.operation].push(value.publishId);
        },
        // 从spaceitem组件删除spaceWith部分子元素
        DELETESPACEWITH(state,value){
            // value:{operation:'collections',publishId:'1'}
            state.spaceWith[value.operation].remove(value.publishId);
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
        // spaceWith
        spaceWith:'',
    }
}