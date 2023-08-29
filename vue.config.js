const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint语法检查
  pages: {
    index: {
      //入口,在这里修改才能重命名入口文件
      entry: 'src/main.js'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      }
    }

  },

})
