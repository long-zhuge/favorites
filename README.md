#### 本地环境运行

```
// node 版本 6+
// cnpm 安装，使用 cnpm 安装依赖更快速
$ sudo npm install cnpm -g

// 安装依赖
$ cnpm install

// 本地运行
$ cnpm start
```
#### 目录结构

```
|—— mock // mock 数据模块
|—— src
|	|—— actions	    // 全局常量，如公司名字，models 模块的 namespace 值
|	|—— common	    // 全局路由设置, 整站设置
|	|—— components  // 公共组件
|	|—— layouts	    // 布局设置
|	|—— models	    // dva-models
|	|—— routes	    // 对应页面
|	|—— services	  // 接口
|	|—— utils		    // 全局工具
| |—— index.ejs   // html 模板文件
|	|—— index.js	  // 入口
|	|—— router.js。 // 路由配置
|
|—— tests			    // 单元测试
|—— .roadhogrc    // webpack 配置
|—— .roadhogrc.mock.js  // mock 配置
|—— package.json	// 包配置
```
