/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');

const rootPath = path.join(__dirname, '../client');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(rootPath, './index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
});
