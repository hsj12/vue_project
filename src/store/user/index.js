// 登录与注册模块的小仓库
import {reqGetCheckNum,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'

const state = {
    checkNum:"",
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations = {
    GETCHECKNUM(state,checkNum){
        state.checkNum = checkNum
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 退出登录，清除本地数据
    CLEAR(state){
        state.token=""
        localStorage.removeItem('TOKEN')
        state.userInfo={}
    }
}
const actions = {
    async getCheckNum({ commit }, phone) {
        let result = await reqGetCheckNum(phone)
        if (result.code == 200) {
            commit("GETCHECKNUM", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        console.log(result)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit("USERLOGIN",result.data.token);
            // 持久化存储token
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({commit}){
        let result  = await reqUserInfo();
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async logout({commit}){
        let result  = await reqLogout()
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}

const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}
