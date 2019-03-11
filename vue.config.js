const path = require('path')
const merge = require('webpack-merge')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  // 方法一
  // chainWebpack: config => {
  //   config.module.rules.delete('svg') //重点:删除默认配置中处理svg,
  //   config.module
  //     .rule('svg-sprite-loader')
  //     .test(/\.svg$/)
  //     // .test(/\.(svg)(\?.*)?$/)
  //     .exclude.add(resolve('src/icons')) //处理svg目录
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  // },
  // 方法二：
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(resolve('src/icons')) //处理svg目录
    svgRule
      .use('file-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      return (module.exports = {
        devServer: {
          port: 9000,
          proxy: {
            '/auth': {
              target: 'http://127.0.0.1:8001', //设置你调用的接口域名和端口号 别忘了加http
              changeOrigin: true
            },
            '/api': {
              target: 'http://127.0.0.1:8001', //设置你调用的接口域名和端口号 别忘了加http
              changeOrigin: true
            }
          }
        }
      })
    }
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: 'static',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,

  // devServer: {
  //   proxy: {
  //     '/auth': {
  //       target: 'http://127.0.0.1:8001', //设置你调用的接口域名和端口号 别忘了加http
  //       changeOrigin: true
  //     },
  //     '/api': {
  //       target: 'http://127.0.0.1:8001', //设置你调用的接口域名和端口号 别忘了加http
  //       changeOrigin: true
  //     }
  //   }
  // }
  css: undefined,
  lintOnSave: undefined
}
