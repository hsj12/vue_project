import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
// 封装游客身份模块uuid  生成一个随机字符串
import {getUUID} from '@/utils/uuid_token'

// state:仓库存储数据的地方
const state = {
   goodInfo:{},
   // 游客临时身份
   uuid_token:getUUID()
};
// mutations：修改state的唯一手段
const mutations = {
    GETGOODSINFO(state,goodInfo){
       state.goodInfo = goodInfo 
    },
};
// action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  async getGoodsInfo({commit},skuId){
    let result =  await reqGoodsInfo(skuId)
    if(result.code ==200){
        commit('GETGOODSINFO',result.data)
    }
  },
//   dispatch只能传递一个参数，多个参数包裹成一个对象
  async getAddOrUpdateShopCart({commit},{skuId,skuNum}){
    let result =  await reqAddOrUpdateShopCart(skuId,skuNum)
    // console.log(result)
    if(result.code ==200){
        return "ok"
    }else{
        return Promise.reject(new Error('faile'))
    }
  },



};
// getter:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    price(state){
        return state.goodInfo.price || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || {}
    },
    valuesSkuJson(state){
        return state.goodInfo.valuesSkuJson || {}
    },
    

};

// 对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}