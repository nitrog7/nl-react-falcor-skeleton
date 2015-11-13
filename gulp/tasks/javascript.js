'use strict';

import gulp from 'gulp';
import config from '../config';
import assign from 'object.assign';
import util from 'gulp-util';
import webpack from 'webpack';

gulp.task('js:release', function(callback) {
  config.webpack.eslint.failOnError = true;
  config.webpack.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: {
        warnings: false
      },
      sourceMap: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );

  // Run Webpack
  webpack(config.webpack, function(err, stats) {
    if(err) {
      throw new util.PluginError('webpack', err);
    }

    util.log('[webpack]', stats.toString({
      color: true
    }));
    callback();
  });
});
