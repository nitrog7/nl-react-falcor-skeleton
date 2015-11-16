'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import util from 'gulp-util';

let config = {
  env: process.env.NODE_ENV,
  port: {
    dev: 3000,
    release: 3000
  },
  index: 'index.html',

  path: {
    server: {
      dev: './bin/dev/index.js'
    },
    src: {
      dir: 'src',
      js: 'src/**/*.js',
      html: [
        'src/**/*.html'
      ],
      index: 'src/index.html',
      img: {
        files: [
          'src/img/**/*.{png,jpg,gif,svg}',
          'src/favicon.ico'
        ]
      },
      fonts: 'src/fonts/**/**.*',
      scss: {
        main: 'src/styles/core.scss',
        files: [
          'src/styles/**/*.scss'
        ]
      }
    },

    dist: {
      dir: 'dist',
      css: 'dist/css/',
      img: 'dist/img',
      fonts: 'dist/fonts'
    },

    tmp: 'tmp',
    doc: './doc',
    test: './tests/**/*.spec.js'
  },

  onError: function(err) {
    util.log(err);
  }
};

// Get absolute path
const basePath = path.resolve(__dirname, '../');
config.absolute = (...args) => path.resolve.apply(path.resolve, [basePath, ...args]);

// SCSS
config.scss = {
  dev: {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: []
  },
  dist: {
    errLogToConsole: true,
    outputStyle: 'compressed',
    includePaths: []
  }
};

// Autoprefixer
config.autoprefixer = [
  'last 5 Chrome versions',
  'last 5 Firefox versions',
  'last 2 Safari versions',
  'Explorer >= 10'
];

// Babel
config.babel = {
  presets: [
    'stage-0',
    'es2015',
    'react'
  ]
};

// Karma
config.karma = {
  configFile: config.absolute('karma.conf.js')
};

// Documentation
config.yuidoc = {
  parser: {
    project: {
      name: "YUI Documentation",
      description: "YUIDoc documentation generated from JavaScript",
      version: "0.1.0",
      url: "http://yuilibrary.com/projects/yuidoc",
      logo: "http://yuilibrary.com/img/yui-logo.png",
      options: {
        external: {
          data: "http://yuilibrary.com/yui/docs/api/data.json"
        },
        linkNatives: true,
        attributesEmit: true,
        outdir: "docs/api"
      }
    }
  },
  render: {}
};

// Webpack Vendor chunk
const commonChunk = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].js'
);
commonChunk.__KARMA_IGNORE__ = true;

// Webpack config
config.webpack = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      config.absolute(config.path.src.dir)
    ],
    vendor: [
      'history',
      'react',
      'react-router',
      'flux',
      'falcor',
      'falcor-json-graph',
      'falcor-http-datasource'
    ]
  },
  output: {
    filename: '[name].js',
    path: config.absolute(config.path.dist.dir),
    publicPath: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
      },
      'NODE_ENV': config.env,
      '__DEV__': config.env === 'development',
      '__PROD__': config.env === 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: config.path.src.index,
      hash: false,
      filename: config.index,
      inject: 'body'
    }),
    commonChunk
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [config.path.src.dir, 'web_loaders', 'web_modules', 'node_loaders', 'node_modules'],
    alias: [
      {actions: './' + config.path.src.dir + '/actions'},
      {components: './' + config.path.src.dir + '/components'},
      {constants: './' + config.path.src.dir + '/constants'},
      {services: './' + config.path.src.dir + '/services'},
      {stores: './' + config.path.src.dir + '/stores'},
      {styles: './' + config.path.src.dir + '/styles'},
      {utils: './' + config.path.src.dir + '/utils'},
      {views: './' + config.path.src.dir + '/views'}
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: [
            'stage-0',
            'es2015',
            'react'
          ]
        },
        plugins: [
          ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }
            ]
          }]
        ]
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  }
};

export default config;