import 'babel-polyfill'
import promise from 'es6-promise';
promise.polyfill();
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from './store'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './components';   //引入自定义组件
import './assets/icons';
import '@/assets/styles/index.scss'
// import '@/assets/styles/common.scss'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
