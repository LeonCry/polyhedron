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


new Vue({
  beforeCreate(){
    Vue.prototype.$bus =this;
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
