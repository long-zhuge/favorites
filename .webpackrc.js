const path = require('path');
const proxy = process.env.PROXY === 'true'; // 是否开启反向代理
const config = {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    src: path.resolve(__dirname, 'src/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    actions: path.resolve(__dirname, 'src/actions/'),
    components: path.resolve(__dirname, 'src/components/'),
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    'bizcharts': 'BizCharts',
    // 'lodash': '_',
    '@babel/polyfill': 'window',
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  // 是否开启异步加载，true = 不开启
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};

if (proxy) {
  config.proxy = {
    '/rdassist': {
      // target: 'http://192.168.5.59:8082', // 本地环境
      target: 'http://test.pod1.abssqr.cn:8082', // 开发环境
      // target: 'http://www.foodpanel.cn', // 线上环境
      changeOrigin: true, // 解决文件上传时后端无法解析文件的问题
    },
  };
}

export default config;
