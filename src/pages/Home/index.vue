<template>
    <div>
        <!-- 全局组件不需要再引入 -->
        <TypeNav/> 
        <ListContainer/> 
        <Recommend/>
        <Rank/>
        <Like/> 
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>   
        <Brand/> 
        
         
        
    </div>
</template>
<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer'
import Like from '@/pages/Home/Like'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Rank from '@/pages/Home/Rank'
import Recommend from '@/pages/Home/Recommend'
import {mapState} from 'vuex'

export default {
    components:{
        ListContainer,Like,Recommend,Rank,Brand,Floor
    },
    mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // 获取用户信息在首页展示
//    this.$store.dispatch("getUserInfo") 
   //  路由守卫功能代替
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }

}
</script>
<style lang="less">
    
</style>