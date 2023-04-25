const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false, //关闭eslint校验
  devServer:{
    proxy:{
      //路径要是带有api则切换路径
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''}
      }
    }
  }
})
