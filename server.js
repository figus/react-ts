const path = require('path');
const express = require('express');
const webpack = require('webpack');
const https = require('https');
const webpackConfig = require('./webpack.dev.js');
const compiler = webpack(webpackConfig);
const fs = require('fs');
const request = require("request");
const url = require("url");
const cookieParser = require('cookie-parser');
const appPort = 3000;
const httpsOptions = {
  key: fs.readFileSync('./server/cert/localhost+3-key.pem'),
  cert: fs.readFileSync('./server/cert/localhost+3.pem'),
};
const proxyConfig = {
  port: 3000,
  enable_logging: true,
  fetch_regex: /^\/api\/type2\/(.*)$/, // The URL to look for when parsing the request.
  proxy_request_timeout_ms: 10000, // The lenght of time we'll wait for a proxy server to respond before timing out.
  max_request_length: 100000, // The maximum length of characters allowed for a request or a response.
  enable_rate_limiting: false,
  max_requests_per_second: 10, // The maximum number of requests per second to allow from a given IP.
  blacklist_hostname_regex: /^(10\.|192\.|127\.|localhost$)/i, // Good for limiting access to internal IP addresses and hosts.
  cluster_process_count: 1, //Number(process.env.CLUSTER_PROCESS_COUNT) || require("os").cpus().length;
}

const app = express();
app.use(cookieParser());

// -------------------------------------------------------------------------
var publicAddressFinder = require("public-address");
var publicIP;

// Get our public IP address
publicAddressFinder(function (err, data) {
  if (!err && data) {
    publicIP = data.address;
  }
});

function addCORSHeaders(req, res) {
  if (req.method.toUpperCase() === "OPTIONS") {
    if (req.headers["access-control-request-headers"]) {
      res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
    }

    if (req.headers["access-control-request-method"]) {
      res.setHeader("Access-Control-Allow-Methods", req.headers["access-control-request-method"]);
    }
  }

  if (req.headers["origin"]) {
    res.setHeader("Access-Control-Allow-Origin", req.headers["origin"]);
  }
  else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
}

function writeResponse(res, httpCode, body) {
  res.statusCode = httpCode;
  res.end(body);
}

function sendInvalidURLResponse(res) {
  return writeResponse(res, 404, "url must be in the form of /api/type2/{some_url_here}");
}

function sendTooBigResponse(res) {
  return writeResponse(res, 413, "the content in the request or response cannot exceed " + proxyConfig.max_request_length + " characters.");
}

function getClientAddress(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0]
    || req.connection.remoteAddress;
}

function processRequest(req, res) {
  addCORSHeaders(req, res);

  // Return options pre-flight requests right away
  if (req.method.toUpperCase() === "OPTIONS") {
    return writeResponse(res, 204);
  }

  var result = proxyConfig.fetch_regex.exec(req.url);

  if (result && result.length == 2 && result[1]) {
    var remoteURL;

    try {
      remoteURL = url.parse(decodeURI(result[1]));
    }
    catch (e) {
      return sendInvalidURLResponse(res);
    }

    // We don't support relative links
    if (!remoteURL.host) {
      return writeResponse(res, 404, "relative URLS are not supported");
    }

    // Naughty, naughty— deny requests to blacklisted hosts
    if (proxyConfig.blacklist_hostname_regex.test(remoteURL.hostname)) {
      return writeResponse(res, 400, "naughty, naughty...");
    }

    // We only support http and https
    if (remoteURL.protocol != "http:" && remoteURL.protocol !== "https:") {
      return writeResponse(res, 400, "only http and https are supported");
    }

    if (publicIP) {
      // Add an X-Forwarded-For header
      if (req.headers["x-forwarded-for"]) {
        req.headers["x-forwarded-for"] += ", " + publicIP;
      }
      else {
        req.headers["x-forwarded-for"] = req.clientIP + ", " + publicIP;
      }
    }

    // Make sure the host header is to the URL we're requesting, not thingproxy
    if (req.headers["host"]) {
      req.headers["host"] = remoteURL.host;
    }

    // Remove origin and referer headers. TODO: This is a bit naughty, we should remove at some point.
    delete req.headers["origin"];
    delete req.headers["referer"];

    var proxyRequest = request({
      url: remoteURL,
      headers: req.headers,
      method: req.method,
      timeout: proxyConfig.proxy_request_timeout_ms,
      strictSSL: false
    });

    proxyRequest.on('error', function (err) {

      if (err.code === "ENOTFOUND") {
        return writeResponse(res, 502, "Host for " + url.format(remoteURL) + " cannot be found.")
      }
      else {
        console.log("Proxy Request Error (" + url.format(remoteURL) + "): " + err.toString());
        return writeResponse(res, 500);
      }

    });

    var requestSize = 0;
    var proxyResponseSize = 0;

    req.pipe(proxyRequest).on('data', function (data) {

      requestSize += data.length;

      if (requestSize >= proxyConfig.max_request_length) {
        proxyRequest.end();
        return sendTooBigResponse(res);
      }
    }).on('error', function (err) {
      writeResponse(res, 500, "Stream Error");
    });

    proxyRequest.pipe(res).on('data', function (data) {

      proxyResponseSize += data.length;

      if (proxyResponseSize >= proxyConfig.max_request_length) {
        proxyRequest.end();
        return sendTooBigResponse(res);
      }
    }).on('error', function (err) {
      writeResponse(res, 500, "Stream Error");
    });
  }
  else {
    return sendInvalidURLResponse(res);
  }
}

app.all('/api/type2/*', (req, res) => {
  console.log('/api/type2/', req.url);

  var clientIP = getClientAddress(req);
  req.clientIP = clientIP;

  processRequest(req, res);
});

// -------------------------------------------------------------------------

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
    stats: { colors: true },
  })
);
app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// -------------------------------------------------------------------------

const server = https.createServer(httpsOptions, app);
server.listen(appPort, '0.0.0.0');
server.on('listening', () => {
  console.log(`App listening on ${server.address().port}`);
});
