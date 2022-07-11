// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay' 
import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
export default [
    {
        path:"/center",
        // 路由懒加载，当路由被访问时才加载对应组件，这样会更加高效
        component:()=>import('@/pages/Center'),
        // 元信息
        meta:{show:true,
        },
        // 二级路由组件
        children:[
           {
               path:'myorder',
               component:MyOrder
           },
           {
               path:'grouporder',
               component:GroupOrder
           },
               // 重定向
           {
                path:'/center',
                redirect:"/center/myorder"
           } 
        ]
    },
    {
        path:"/pay",
        component:Pay,
        // 元信息
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只能从购物车进入
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/paysuccess",
        component:PaySuccess,
        // 元信息
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只能从购物车进入
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/trade",
        component:Trade,
        // 元信息
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只能从购物车进入
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/detail/:skuId",
        component:Detail,
        // 元信息
        meta:{show:true,enter:true},
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:AddCartSuccess,
        // 元信息
        meta:{show:true,enter:true},
    },
    {
        path:"/shopcart",
        name:'shopcart',
        component:ShopCart,
        // 元信息
        meta:{show:true,enter:true},
    },
    {
        path:"/home",
        component:Home,
        // 元信息
        
        meta:{show:true,enter:true},
    },
    {
        name:'search',
        // 问号代表参数可传可不传
        path:"/search/:keyword?", 
        component:Search,
        meta:{show:true,enter:true}
    }, 
    {
        path:"/login",
        component:Login,
        meta:{enter:true}
    }, 
    {
        path:"/register",
        component:Register,
        meta:{enter:true}
    },
    // 重定向
    {
        path:'/',
        redirect:"/home"
    }
]