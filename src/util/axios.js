import axios from 'axios';
import {Message, Loading } from 'element-ui';
import BASRURL from './basrUrl';
import Vue from 'vue';
import store from '@/store/index.js';

const vue = new Vue({
  store,
});

let ModalObj = {
  number:2,
}
let ModalTem = '';
//不需要loadding加载的接口
let noLoadingArr=[
  '/user/chat/msg/speak'
];
let requestLoding = new Object;
let loadingNum = 0;


const service = axios.create({
  baseURL: BASRURL, // api 的 base_url
  // timeout: 30000, // request timeout
  // timeout:33000
  timeout:1000
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers.accessToken =localStorage.getItem("jwt")?localStorage.getItem("jwt"):'';
    if(config.noModal){
      loadingNum = loadingNum + 1;
    }else{
      if(window.location.href.indexOf('/lottery/room') == -1){
        // if(noLoadingArr.indexOf(config.url)==-1){
        requestLoding = Loading.service();
      }
      loadingNum = loadingNum + 1;
    }
    
    return config;
  },
  error => {
    console.log('requestErr' + error); // for debug
    hide();
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    hide();
    let res=response.data;
    if(response.status==200){
      if(res.code == 200){
        return res;
      }else if(res.code==20001 || res.code==20002 || res.code==20003 || res.code==20004 || res.code==20005 || 
        res.code==20006 || res.code==20007 || res.code==20008 || res.code==20009 || res.code==20010 || res.code==20011 || res.code==20012 || res.code==10031){   //单点登录
        vue.$message.error(res.message);
        
        let jwt=window.localStorage.removeItem('jwt');
        store.commit('UPDATE_USERINFO','');
        if(jwt){
          setTimeout(() => {
            window.location.reload();
          },1000);
        }
      }else{
      
        vue.$message.error(res.message);
        return res;
      }
    }
  },
  error => {
    let message=(error&&error.response)?error.response.data.message:'网络异常';
    hide();
    Message({
      showClose: true,
      message: message,
      type: 'error'
    });
    
    return Promise.reject(error);
  }
);

const hide = () => {
  loadingNum = loadingNum - 1;
  if (requestLoding.close &&loadingNum == 0 ) {
    requestLoding.close();
  }
}
export default service;
