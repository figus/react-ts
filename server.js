const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const https = require('https');
const webpackConfig = require('./webpack.dev.js');
const compiler = webpack(webpackConfig);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  })
  );
  app.use(require('webpack-hot-middleware')(compiler));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
  
  https.createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert'),
}, app)
  .listen(port, () => {
    console.log(`App listening on ${port}`)
  });