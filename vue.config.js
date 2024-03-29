const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
        less: {
            lessOptions: {
                javascriptEnabled: true 
            } 
        } 
    } 
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: false
      }
    }
  }
})
