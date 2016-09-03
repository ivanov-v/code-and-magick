'use strict';

const express = require('express');
const reviews = require('./data/reviews');
const serveStatic = express.static;
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackMiddlewareConfig = require('./middleware.config.js');


const PORT = parseInt(process.argv[2], 10) || 1506;


const isJSONPRequest = (req) => {
  return 'callback' in req.query;
};


const serve = serveStatic(webpackConfig.devServer.contentBase, {
  'index': ['index.html', 'index.htm']
});
const app = express();
const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, webpackMiddlewareConfig);
app.use(middleware);


app.
    get('/api/reviews', (req, res) => {
      reviews.read(req.query.filter, req.query.from, req.query.to).then((data) => {
        if (isJSONPRequest(req)) res.jsonp(data);
        else res.json(data);
      }).catch(() => {
        res.sendStatus(500);
      });
    }).
    get('*', serve);


app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('==> 🌎 Сервер запущен на порту %s. Откройте http://localhost:%s/ у себя в браузере. Чтобы остановить сервер, нажмите Ctrl+C', PORT, PORT);
});
