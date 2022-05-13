// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave:false,

  // 开启服务代理
  devServer: {
    proxy: {
      "/api": {
        target: 'http://localhost:8088',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        },
      },
      "/QQicon": {
        target: 'http://q2.qlogo.cn',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/QQicon':''
        },
      },
      "/QQname": {
        target: 'http://users.qzone.qq.com',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/QQname':''
        },
      },
    }
  }

}
