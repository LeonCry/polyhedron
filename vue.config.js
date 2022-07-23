// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  publicPath:'./',
  // 开启服务代理
  devServer: {
    proxy: {
      "/api": {
        target: 'http://localhost:8088',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
      '/socket': {
        target: 'ws://120.48.41.143:8088',//后端目标接口地址
        changeOrigin: true,//是否允许跨域
        pathRewrite: {
          '^/socket': '',//重写,
        },
        ws: true //开启ws, 如果是http代理此处可以不用设置
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
      "/location": {
        target: 'https://ip.taobao.com',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/location':''
        },
      },
      "/bilibili": {
        target: 'https://api.bilibili.com',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/bilibili':''
        },
      },
      "/ces": {
        target: ' https://chromedriver.storage.googleapis.com',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/ces':''
        },
        
      },
      "/train": {
        target: 'http://api.kuaidi.com',
        // ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/train':''
        },
      },
    }
  },

}
