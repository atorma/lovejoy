'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const generateProblem = require('./src/problem-generation/problem');
const fs = require('fs');

const cleartext = fs.readFileSync('./cleartext.txt', 'utf-8');

module.exports = {
  entry: './src/app/lovejoy.js',

  output: {
    filename: 'lovejoy.[hash].js',
    path: path.join(__dirname, 'dist')
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      ENCRYPTED: JSON.stringify(generateProblem(cleartext)),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      favicon: 'src/app/lovejoy.jpg'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  externals: {
    'ace': 'ace',
    'jquery': '$'
  }
};

if (process.env.NODE_ENV === 'dev') {
  module.exports.entry = [
    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/app/lovejoy.js'
    // the entry point of our app
  ];

  module.exports.devServer = {
    hot: true,
    // enable HMR on the server

    //contentBase: path.join(__dirname, 'dist'),
    // match the output path

    //publicPath: '/'
    // match the output `publicPath`
  };

  module.exports.devtool = 'eval-source-map';

  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  );
}