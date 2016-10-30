// Our production specific webpack configuration.

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  // The output files are outputted to a physical dist folder, unlike in webpack.dev.js.
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    // Stops the build if there is any error.
    new webpack.NoErrorsPlugin(),
    // Detects identical (and nearly identical) files and removes them from the output.
    new webpack.optimize.DedupePlugin(),
    // Minifies the bundles.
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    // Extracts embedded css as external files, adding cache-busting hash to the filename.
    new ExtractTextPlugin('[name].[hash].css'),
    // Use to define environment variables that we can reference within our application.
    //  We can enable production mode like this.
    //  if (process.env.ENV === 'production') {
    //      enableProdMode();
    //  }
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
