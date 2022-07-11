import {reqCartList,reqDeleteGood,reqChangeChecked} from '@/api'

const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },
    async DeleteGood({commit},skuId){
        let result =  await reqDeleteGood(skuId)
        // console.log(result)
        if(result.code ==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
      },
    async changeChecked({commit},{skuId,isChecked}){
    let result =  await reqChangeChecked(skuId,isChecked)
    // console.log(result)
    if(result.code ==200){
        return "ok"
    }else{
        return Promise.reject(new Error('faile'))
    }
    },
    // 删除所有选中
    deleteAllChecked({dispatch,getters}){
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('DeleteGood',item.skuId):''
            promiseAll.push(promise)      
        })
        return Promise.all(promiseAll)
    },
    // 全选或全不选
    handlerAllChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch("changeChecked",{skuId:item.skuId,isChecked})
            promiseAll.push(promise)      
        })
        return Promise.all(promiseAll)

    }
        
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}

export default{
    state,
    mutations,
    actions,
    getters

}