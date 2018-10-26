const webpack = require('webpack');
const plugins = [new webpack.HotModuleReplacementPlugin()];
const fs = require('fs');
const path = require('path');

module.exports = require('./webpack.base')({
  mode: 'development',
  devServer: {
    hot: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server', 'cert', 'localhost+3-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server', 'cert', 'localhost+3.pem')),
    },
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
  },
  plugins
});
