'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const generateProblem = require('./src/problem-generation/problem');

const cleartext = '                        Lennä Barcelonaan!                        ';

module.exports = {
  entry: './src/app/lovejoy.js',
  output: {
    filename: 'lovejoy.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENCRYPTED: JSON.stringify(generateProblem(cleartext))
    }),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      favicon: 'src/app/lovejoy.jpg'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};