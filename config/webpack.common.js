// Our configuration common accross all webpack builds.

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  // Bundle our aplication into three bundles.
  entry: {
    // The standard polyfills we require to run Angular applications in most modern browsers.
    'polyfills': './src/polyfills.ts',
    // The vendor files we need: Angular, lodash, bootstrap.css...
    'vendor': './src/vendor.ts',
    // Our application code.
    'app': './src/main.ts'
  },
  // Allow importing without extensions. Webpack will resolve these extensions.
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  // Specify the loaders.
  module: {
    loaders: [
      {
        // Load typescript using awesome-typescript loader and angular2-template-loader
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        // Load html files.
        test: /\.html$/,
        loader: 'html'
      },
      {
        // Load images and fonts.
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        // Load application wide styles, excluding styles within src/app/.
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        // Load component specific styles separately which live in src/app/.
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },
  // Add our plugins.
  plugins: [
    // This plugin properly splits up our bundles. It prevents duplicate code from being bundled accross bundles.
    // e.g. Our app code imports from vendor, but Webpack isn't smart enough to know we don't want the app.js to contain the 
    //      vendor.js because it is already being bundled separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    // This plugin automatically injects our bundles into our html file so we don't have to do so manually.
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
