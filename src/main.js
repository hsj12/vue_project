import Vue from 'vue'
import App from './App.vue'
// 注册全局组件--三级联动组件
import TypeNav from '@/components/TypeNav'
// 第一个参数为全局组件的名字，第二个参数为选定哪一个组件
Vue.component(TypeNav.name,TypeNav)
// 轮播图全局组件
import Carousel from '@/components/Carousel'
// element-ui组件c
import {MessageBox } from 'element-ui';
Vue.component(Carousel.name,Carousel)
// 分页组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
// 懒加载
import pic from '@/assets/images/1.png'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: pic,
  attempt: 1
})
Vue.config.productionTip = false
// 注册组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'  
// 引入仓库
import store from '@/store'
// 引入Mockserve.js----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入api文件夹里面全部请求函数
import * as API from '@/api'
// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
    // 创建全局事件总线
    beforeCreate(){
      Vue.prototype.$bus = this
      Vue.prototype.$API = API
    },
  // 注册路由,组件身上都拥有$route,$router属性
  router,
  // 注册仓库，组件实例的身上会多出一个$store属性
  store
}).$mount('#app')
