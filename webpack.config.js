module.exports = (config, { webpack }) => {
  // eslint-disable-next-line
  config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/));
  return config;
}
