require('babel/register');

var webpack = require('webpack');
var webpackConfig = require('../build/webpack/production');
const config = require('../build/config');
const host = config.get('webpack_host');
const port = config.get('webpack_port');
var distDir = config.get('dir_dist');

webpack(webpackConfig, function(err, stats) {
  if(err) {
    console.log('Webpack: Build Error', err);
    return;
  }

  if(stats.hasErrors) {
    console.log('Webpack: Compilation Errors');
  }

  if(stats.hasErrors) {
    console.log('Webpack: Compilation Warnings');
  }
});

app.use(express.static(distDir));

app.listen(port, function() {
  console.log('Listen on http://' + host + ':' + port);
});