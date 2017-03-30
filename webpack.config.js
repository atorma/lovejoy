'use strict';

const webpack = require('webpack');
const path = require('path');
const crypto = require('./src/problem-generation/encryption');

const cleartext = 'Lennä Barceolonaan';
const encrypted = crypto.encrypt(cleartext);

module.exports = {
  entry: './src/app/lovejoy.js',
  output: {
    filename: 'lovejoy.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      ENCRYPTED: JSON.stringify(encrypted)
    })
  ]
};