import Vue from 'vue'
// elementui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// emoji引入
import emoji from 'node-emoji';

import App from './App.vue';
// elementui使用
Vue.use(ElementUI);
// emoji使用
Vue.prototype.emoji = emoji;


Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus =this;
  },
  render: h => h(App),
}).$mount('#app')
