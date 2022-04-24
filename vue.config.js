const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    // 代理
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
      },
    },
  },
  lintOnSave: false
})
