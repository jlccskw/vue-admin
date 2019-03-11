# vue-admin
本项目为网站后台框架，代码参考《PanJiaChen/vue-admin-template》项目,对其进行了vue-cli的升级，目前使用的vue-cli版本是3.4。

本项目未对编译做优化，仅提供了一个简单的开发框架。


### 修复eslint错误
运行命令安装缺失的插件
```
npm install --save-dev eslint-plugin-html
```
### index.html文件位置变动
index.html文件被放到public文件夹中了

### 将依赖包安装到开发环境与生产环境的方法

1. 开发环境：npm install --save-dev xxxx
2. 生产环境：npm install --save xxxx  或者  npm install --production xxxx

### 默认eslint保存添加双引号和分号问题

1. 在.eslintrc.js文件中去掉 "@vue/prettier" 
2. 在rules中添加：
            semi: ['error', 'never'],
            quotes: ['error', 'single']
  
### 在vue-cli3中配置webpack4的方法

1. 在根目录下创建vue.config.js文件
2. 在文件中添加configureWebpack配置字段

    ```
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
          // 为生产环境修改配置...
        } else {
          // 为开发环境修改配置...
          console.log(config);
          return (module.exports = {
            devServer: {
              port: 9000,
              proxy: {
                "/auth": {
                  target: "http://127.0.0.1:8001", //设置你调用的接口域名和端口号 别忘了加http
                  changeOrigin: true
                },
                "/api": {
                  target: "http://127.0.0.1:8001", //设置你调用的接口域名和端口号 别忘了加http
                  changeOrigin: true
                }
              }
            }
          });
        }
      }

    ```

3.   使用vue-cli3的设置，配置webpack4代理，直接在vue.config.js文件中添加
        ```
         devServer: {
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
        ```


 ### 使用svg
 1.更换svg loader为 svg-sprite-loader，在vue.config.js中添加如下配置
 
```
方法一：

  chainWebpack: config => {
    config.module.rules.delete('svg') //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      // .test(/\.(svg)(\?.*)?$/)
      .exclude.add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  
  方法二：
  
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(resolve('src/icons')) //处理svg目录
    svgRule
      .use('file-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
  },
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
