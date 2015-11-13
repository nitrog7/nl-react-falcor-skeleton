import config from './gulp/config';
import { argv } from 'yargs';
import karmaWebpack from 'karma-webpack';
import karmaJasmine from 'karma-jasmine';
import karmaCoverage from 'karma-coverage';
import karmaPhantomjsLauncher from 'karma-phantomjs-launcher';
import karmaSpecReporter from 'karma-spec-reporter';
import karmaSourcemapLoader from 'karma-sourcemap-loader';

module.exports = function(cfg) {
  cfg.set({
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      config.path.test
    ],
    singleRun: !argv.watch,
    frameworks: ['jasmine'],
    preprocessors: {
      [config.path.test]: ['webpack', 'sourcemap'],
      [config.path.src.js]: ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    colors: true,
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' }
      ]
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: config.webpack.resolve,
      plugins: config.webpack.plugins
        .filter(p => !p.__KARMA_IGNORE__),
      module: {
        loaders: config.webpack.module.loaders,
        postLoaders: [{
          test: /\.(js|jsx)$/, exclude: /(node_modules|tests)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      karmaWebpack,
      karmaJasmine,
      karmaCoverage,
      karmaPhantomjsLauncher,
      karmaSpecReporter,
      karmaSourcemapLoader
    ]
  });
};
