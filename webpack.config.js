'use strict';

const path = require('path');

module.exports = {
  entry: './src/lovejoy.js',
  output: {
    filename: 'lovejoy.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'sourcemap'
};