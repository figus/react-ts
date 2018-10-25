const webpack = require('webpack');
const plugins = [new webpack.HotModuleReplacementPlugin()];

module.exports = require('./webpack.base')({
  mode: 'development',
  devServer: {
    hot: true,
    https: true,
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
  },
  plugins
});
