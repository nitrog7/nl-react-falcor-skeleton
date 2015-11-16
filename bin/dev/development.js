'use strict';

import util from 'gulp-util';

// Config
import config from '../../gulp/config';

// Express
import express from 'express';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Falcor
import falcor from 'falcor';
import falcorExpress from 'falcor-express';
import router from '../../model/router';

// Start Express
const app = express();
const port = config.port.dev;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(history());

// Static files
app.use(express.static(config.absolute(config.path.dist.dir)));

// Falcor route
app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  return new router('FAKE_USER_SESSION_KEY');
}));

// Webpack middleware
config.webpack.devtool = 'eval';
config.webpack.debug = true;
config.webpack.eslint.emitWarning = true;
config.webpack.entry.app.push(
  'webpack-hot-middleware/client'
);

config.webpack.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
);

const compiler = webpack(config.webpack);

app.use(webpackDevMiddleware(compiler, {
  contentBase: config.path.src.dir,
  publicPath: 'http://localhost:' + config.port.dev + '/',
  hot: true,
  inline: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  },
  lazy: false,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));

app.use(webpackHotMiddleware(compiler, {
  log: util.log,
  reload: false
}));

// Redirect everything not static to the index.html
app.get('*', (req, res) => {
  res.sendFile(config.absolute('index.html'));
});

app.listen(port, (err) => {
  if(err) {
    util.log(err);
  }

  util.log('Server started on: http://localhost:' + port);
});