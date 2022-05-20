import Vue from 'vue'
// Vuex的引入
import Vuex from 'vuex'
// 引入store配置
import store from './store/index.js'

// // elementui引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// emoji引入
import emoji from 'node-emoji';

// qs的引入:axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理。
// import qs from 'qs';

// vue-cookies 的引入
import  VueCookies  from 'vue-cookies';


//axios的引入
import axios from 'axios';

import App from './App.vue';
// // elementui使用
// Vue.use(ElementUI);
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

new Vue({
  beforeCreate(){
    Vue.prototype.$bus =this;
  },
  store,
  render: h => h(App),
}).$mount('#app')
