import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由配置信息
import routes from './routes'
// 引入仓库
import store from '@/store'
// 使用插件
Vue.use(VueRouter);
// 先把VueRouter原型对象的push，replace保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve&&reject){ 
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}
// 配置路由
let router =  new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return{y:0};
      }
})
// 全局路由守卫
router.beforeEach(async(to,from,next)=>{
    // 能够找到token，证明用户已经登录
    if(localStorage.getItem('TOKEN')){
        //  去登录页  
        if(to.path == '/login'){
            //    已经登录了不再登录，停留在首页
               next('/home')
        // 去其他页
        }else{  
                // 有用户信息,放行
               if(store.state.user.userInfo.name){
                 next() 
                // 没有用户信息（刷新时vuex数据消失） 
               }else{
                //    在跳转前获取用户信息
                   try {
                      await store.dispatch('getUserInfo')
                    //   获取成功放行
                      next() 
                   } catch (error) {
                    //    获取失败，token失效，删除本地信息，让其重新登录
                      store.state.user.token = ''
                      localStorage.removeItem('Token')
                      next('/login')
                   }
                  
               }
           }
        // 未登录的情况，不可去交易相关和个人中心 pay|paysuccess|center|trade,若要去强制跳转到登录页 
       }else{
         if(to.meta.enter){
             next()
         }else{//  将用户登录前想去的页面以query参数带给登录页面
             next('/login?redirect='+to.path)
         }  
       }     
})

export default router