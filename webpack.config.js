// 额外配置补充
// const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line
export default webpackConfig => {
  // console.log(webpackConfig);

  // 添加 copy 工具, 将 dist 和 public 目录复制到 docs 下
  // webpackConfig.plugins.push(
  //   // eslint-disable-next-line
  //   new CopyWebpackPlugin([
  //     {
  //       from: path.resolve(__dirname, 'dist'),
  //       to: path.resolve(__dirname, 'docs'),
  //     },
  //   ])
  // );

  return webpackConfig;
};
