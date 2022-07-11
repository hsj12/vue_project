import {reqCategoryList, reqGetBannerList,reqGetFloorList} from "@/api";

// home小仓库

// state:仓库存储数据的地方
const state = {
    categoryList:[],
    // 轮播图
    bannerList:[],
    floorList:[]
};
// mutations：修改state的唯一手段
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
        state.categoryList.length = 16
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    },
};
// action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getCategoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("GETCATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit("GETBANNERLIST",result.data)
        }
    },
    // 获取floor轮播图的数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code == 200){
            commit("GETFLOORLIST",result.data)
        }
    },
};
// getter:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

// 对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}