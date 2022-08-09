// function mock(app, url, data) {
//   app.get(url, (request, response) => {
//     response.json(data)
//   })
// }
// const mockBookHomeData = require('./src/mock/bookHome')
// const mockBookShelfData = require('./src/mock/bookShelf')
// const mockBookList = require('./src/mock/bookCategoryList')
// const mockBookFlatList = require('./src/mock/bookFlatList')
// console.log('mockBookShelfData:', mockBookShelfData);
// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({ transpileDependencies: true, lintOnSave: false })
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  lintOnSave: false,
  devServer: {
    // before(app) {
    //   console.log('提供自定义中间件，当 devServer 服务器内部的 所有中间件执行完成之后执行, 一般用于模拟后端路由,比如模拟登陆')
    //   mock(app, '/book/home', mockBookHomeData)
    //   mock(app, '/book/shelf', mockBookShelfData)
    //   mock(app, '/book/list', mockBookList)
    //   mock(app, '/book/flat-list', mockBookFlatList)
    // }
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      
      // mock(devServer.app, '/book/home', mockBookHomeData)
      // mock(devServer.app, '/book/shelf', mockBookShelfData)
      // mock(devServer.app, '/book/list', mockBookList)
      // mock(devServer.app, '/book/flat-list', mockBookFlatList)
 
      return middlewares
    },
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxAssetSize: 512*1024,
      maxEntrypointSize: 512*1024,
    }
  }
}
