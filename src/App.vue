<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home Search显示，在Login Register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted(){
    // 通知Vuex发请求，获取数据，存储于仓库当中，只请求一次，避免home，search切换时三级联动组件反复发送请求
    this.$store.dispatch('getCategoryList');
  },
}
</script>

<style>
</style>
