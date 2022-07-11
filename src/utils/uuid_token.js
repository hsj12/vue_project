import { v4 as uuidv4 } from 'uuid'

export const getUUID = ()=>{
    // 首先查看本地存储器是否有uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    // 本地如果没有
    if(!uuid_token){
        // 生成游客临时身份
        uuid_token = uuidv4()
        // 存储到本地
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    // 返回一个临时身份
    return uuid_token
}