const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  // 关闭eslint
  lintOnSave:false,
  // 代理跨域
  devServer: {
    proxy: {
        '/api': {
            target: 'http://gmall-h5-api.atguigu.cn',
            // pathRewrite:{'^/jojo':''},
            // ws: true, //用于支持websocket,默认值为true
            // changeOrigin: true //用于控制请求头中的host值,默认值为true
        }
    }
 }
}