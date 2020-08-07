const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = (config, { webpack }) => {
  const plugins = [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
    // new PrerenderSPAPlugin({
    //   staticDir: path.join(__dirname, 'dist'),
    //   outputDir: path.join(__dirname, 'dist/prerender'),
    //   routes: [ '/home', '/base64', '/qrcode' ],
    // })
  ];

  // eslint-disable-next-line
  config.plugins.push(...plugins);
  return config;
};
