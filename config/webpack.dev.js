/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

const rootPath = path.join(__dirname, '../client');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    sourceMapFilename: 'map',
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    host: 'localhost',
    contentBase: rootPath,
    historyApiFallback: true,
    publicPath: '/',
    writeToDisk: true,
    port: 8081,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, './index.html'),
    }),
  ],
});
