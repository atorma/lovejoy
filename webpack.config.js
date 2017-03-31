'use strict';

const webpack = require('webpack');
const path = require('path');
const generateProblem = require('./src/problem-generation/problem');

const cleartext = '                        Lennä Barcelonaan!                        ';

module.exports = {
  entry: './src/app/lovejoy.js',
  output: {
    filename: 'lovejoy.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      ENCRYPTED: JSON.stringify(generateProblem(cleartext))
    })
  ]
};