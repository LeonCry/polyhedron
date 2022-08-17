import Vue from 'vue'
// Vuex的引入
import Vuex from 'vuex'
// 引入store配置
import store from './store/index.js'

// elementui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// emoji引入
import emoji from 'node-emoji';

// qs的引入:axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理。
// import qs from 'qs';

// vue-cookies 的引入
import  VueCookies  from 'vue-cookies';
import PubSub from 'pubsub-js'
Vue.prototype.$PubSub = PubSub

//axios的引入
import axios from 'axios';

import App from './App.vue';
// router的使用
import router from './router/index'

// elementui使用
Vue.use(ElementUI);
// Vuex的适用
Vue.use(Vuex);
// vue-cookies的使用
Vue.use(VueCookies);
// emoji使用
Vue.prototype.emoji = emoji;
// qs的适用(废弃)
// Vue.prototype.$qs = qs;
// axios的适用
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

// 数组添加remove方法
Array.prototype.indexOf = function(val) {
  for(var i = 0; i < this.length; i++) {
    if(this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if(index > -1) {
    this.splice(index, 1);
  }
};
// PX明细
Vue.prototype.$addPxDetail = async function(user,or,type,price,item,info){
  // 先获得当前金钱
  var result = '';
  var loginR = '';
  var userMoney = 0;
  await this.$axios.post('/api/getUser',{userQQ:user}).then(response=>{
      userMoney = response.data.userMoney;
    },error=>{
      console.log(error.message);
    });
  // 1-首先,判断收支类型[0支出,1收入]
  // 如果是收入,判断具体项目,现有的项目有:::
  // [登录:24小时--P100],[点赞照片-每个赞-P25],[bilibili-24小时-P25],[download-每个文件-仅1次-P50],[x*66-仅1次-P250],[L*66-仅1次-P250]
  if(or==1){
    
    switch (type) {
      case ('用户登录'):
        // 检查最近一次登录时间
       await this.$axios.post('/api/returnDetailsByNameAndType',{pxUser:user,pxType:'用户登录'}).then(response=>{
          loginR = response.data[0];
        },error=>{
          console.log(error.message);
        });
        // 如果大于了一天或者没有登录记录,则可以领取奖励
        if(loginR==undefined||Date.now()-loginR.pxTime>=86400000){
          this.$axios.post('/api/addADetails',{pxUser:user,pxOr:or,pxType:type,pxPrice:price,pxItem:item,pxInfo:info,pxTime:Date.now()}).then(response=>{
            result = response.data;
            // 通知
            this.$notify({
              title: '每日登录',
              message: '每日登录奖励 PX币+100',
              position: 'top-left',
              type: 'success'
            });
          },error=>{
            result = error.message;
          });
          // 更新金钱
          // eslint-disable-next-line no-unused-vars
          this.$axios.post('/api/updateUserInfo',{userQQ:user,userMoney:userMoney+price}).then(response=>{
          },error=>{
            console.log(error.message);
          })

          return result;
        }
        // 如果小于一天,则不可以领取奖励
        break;
      case ('照片点赞'):
        this.$axios.post('/api/addADetails',{pxUser:user,pxOr:or,pxType:type,pxPrice:price,pxItem:item,pxInfo:info,pxTime:Date.now()}).then(response=>{
          result = response.data;
          // 通知
          this.$notify({
            title: '照片点赞',
            message: '照片点赞奖励 PX币+25',
            position: 'top-left',
            type: 'success'
          });
        },error=>{
          result = error.message;
        });
        // 更新金钱
        // eslint-disable-next-line no-unused-vars
        this.$axios.post('/api/updateUserInfo',{userQQ:user,userMoney:userMoney+price}).then(response=>{
        },error=>{
          console.log(error.message);
        })
        break;  
      case ('视频观看'):
        // 检查最近一次登录时间
        await this.$axios.post('/api/returnDetailsByNameAndTypeAndItem',{pxUser:user,pxType:'视频观看',pxItem:item}).then(response=>{
          loginR = response.data[0];
        },error=>{
          console.log(error.message);
        });
        // 如果item没有被看过
        if(loginR==undefined){
          this.$axios.post('/api/addADetails',{pxUser:user,pxOr:or,pxType:type,pxPrice:price,pxItem:item,pxInfo:info,pxTime:Date.now()}).then(response=>{
            result = response.data;
            // 通知
            this.$notify({
              title: '视频观看',
              message: '观看视频 PX币+25',
              position: 'top-left',
              type: 'success'
            });
          },error=>{
            result = error.message;
          });
          // 更新金钱
          // eslint-disable-next-line no-unused-vars
          this.$axios.post('/api/updateUserInfo',{userQQ:user,userMoney:userMoney+price}).then(response=>{
          },error=>{
            console.log(error.message);
          });
          return result;
        }
        break;  
      case ('下载文件'):
         // 检查最近一次登录时间
         await this.$axios.post('/api/returnDetailsByNameAndTypeAndItem',{pxUser:user,pxType:'下载文件',pxItem:item}).then(response=>{
          loginR = response.data[0];
        },error=>{
          console.log(error.message);
        });
        // 如果item没有被看过
        if(loginR==undefined){
          this.$axios.post('/api/addADetails',{pxUser:user,pxOr:or,pxType:type,pxPrice:price,pxItem:item,pxInfo:info,pxTime:Date.now()}).then(response=>{
            result = response.data;
            // 通知
            this.$notify({
              title: '下载文件',
              message: '下载文件 PX币+50',
              position: 'top-left',
              type: 'success'
            });
          },error=>{
            result = error.message;
          });
          // 更新金钱.
          // eslint-disable-next-line no-unused-vars
          this.$axios.post('/api/updateUserInfo',{userQQ:user,userMoney:userMoney+price}).then(response=>{
          },error=>{
            console.log(error.message);
          });
          return result;
        }
        break;  
      case ('点击 X*66'):
        // 检查最近一次登录时间
        await this.$axios.post('/api/returnDetailsByNameAndTypeAndItem',{pxUser:user,pxType:'点击 X*66',pxItem:item}).then(response=>{
          loginR = response.data[0];
        },error=>{
          console.log(error.message);
        });
        // 如果item没有被看过
        if(loginR==undefined){
          this.$axios.post('/api/addADetails',{pxUser:user,pxOr:or,pxType:type,pxPrice:price,pxItem:item,pxInfo:info,pxTime:Date.now()}).then(response=>{
            result = response.data;
            // 通知
            this.$notify({
              title: '触发彩蛋X',
              message: '触发彩蛋 PX币+250',
              position: 'top-left',
              type: 'success'
            });
          },error=>{
            result = error.message;
          });
          // 更新金钱
          // eslint-disable-next-line no-unused-vars
          this.$axios.post('/api/updateUserInfo',{userQQ:user,userMoney:userMoney+price}).then(response=>{
          },error=>{
            console.log(error.message);
          });
          return result;
        }
        break;   
      case ('点击 L*66'):
        // 检查最近一次登录时间
        await this.$axios.post('/api/returnDetailsByNameAndTypeAndItem',{pxUser:user,pxType:'点击 L*66',pxItem:item}).then(response=>{
          loginR = response.data[0];
        },error=>{
          console.log(error.message);
        });
        // 如果item没有被看过
        if(loginR==undefined){
          this.$axios.post('/api/addADetails',{pxUser:user,pxOr:or,pxType:type,pxPrice:price,pxItem:item,pxInfo:info,pxTime:Date.now()}).then(response=>{
            result = response.data;
            // 通知
            this.$notify({
              title: '触发彩蛋L',
              message: '触发彩蛋 PX币+250',
              position: 'top-left',
              type: 'success'
            });
          },error=>{
            result = error.message;
          });
          // 更新金钱
          // eslint-disable-next-line no-unused-vars
          this.$axios.post('/api/updateUserInfo',{userQQ:user,userMoney:userMoney+price}).then(response=>{
          },error=>{
            console.log(error.message);
          });
          return result;
        }
        break;  
    }
  }
  // 如果是支出
  else{
  await this.$axios.post('/api/addADetails',{pxUser:user,pxOr:or,pxType:type,pxPrice:price,pxItem:item,pxInfo:info,pxTime:Date.now()}).then(response=>{
      result = response.data;
    },error=>{
      result = error.message;
    });
    if(type!='购买商品'){
       // 更新金钱
       // eslint-disable-next-line no-unused-vars
       this.$axios.post('/api/updateUserInfo',{userQQ:user,userMoney:userMoney-price}).then(response=>{
      },error=>{
        console.log(error.message);
      })
    }
    return result;
  }

};


new Vue({
  beforeCreate(){
    Vue.prototype.$bus =this;
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
