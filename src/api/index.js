// 当前这个模块，API统一管理
import requests from './ajax';
import mockRequest from './mockAjax'

// 三级联动接口 /api/product/getBaseCategoryList   get 无参数

export const reqCategoryList = ()=>{
    // 发请求,axios发请求返回结果是promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = ()=>mockRequest.get('/banner')

// 获取floor数据
export const reqGetFloorList = ()=>mockRequest.get('/floor')

// 获取搜索模块数据 地址：/api/list 请求方式:post  需要参数
/* {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */
// 接口给服务器传递一个默认参数，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})

// 获取产品详情信息的接口 /api/item/{ skuId }
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:"get"})

// 将产品添加到购物车中，获取更新某一个产品的个数  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart  = (skuId,skuNum) =>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

// 获取购物车列表数据接口 /api/cart/cartList
export const reqCartList = ()=>requests({url:"/cart/cartList",method:"get"})

// 删除购物车的产品 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteGood = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})

// 修改产品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqChangeChecked = (skuId,isChecked) =>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})

// 获取验证码 /api/user/passport/sendCode/phone get
export const reqGetCheckNum = phone => requests({url:`/user/passport/sendCode/${phone}`,method:"get"})

// 注册 /api/user/passport/register post
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

// 登录 /api/user/passport/login post
export const reqUserLogin = data=>requests({url:'/user/passport/login',data,method:"post"})

// 获取用户信息【带着用户的token向服务器请求信息】 /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:"get"})

// 退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
// export const reqUserAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

export const reqUserAddress = ()=>mockRequest.get('/address')

// 获取商品清单 /api/order/auth/trade  get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//  获取支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId)=>requests({url:`payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取订单列表
export const reqOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})