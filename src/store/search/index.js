import { reqGetSearchInfo } from "@/api";
// search小仓库

// state:仓库存储数据的地方
const state = {
    searchList:{}
};
// mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
// action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({commit},params={}){
       let result = await reqGetSearchInfo(params)
       if(result.code==200){
           commit("GETSEARCHLIST",result.data)
       }
    }
};
// getter:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    goodsList(state){
        // 网络不好，searchList空对象，返回undefined无法遍历，设定空数组避免
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },

};

// 对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}