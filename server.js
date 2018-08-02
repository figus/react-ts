const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const https = require('https');
const webpackConfig = require('./webpack.config.js');

const app = express();
const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`App is listening on port ${port}`);
// });
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});



let compiler = webpack(webpackConfig);

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  })
);
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'dist')));

https.createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert'),
}, app)
  .listen(3000, () => {
    console.log('App listening on 3000')
  });