const path = require('path');

const rootPath = path.join(__dirname, '../client');

module.exports = {
  context: rootPath,
  entry: {
    js: ['./index.jsx'],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    modules: [rootPath, 'node_modules'],
  },
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
            ],
          },
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: 'eslint-loader',
      },
    ],
  },
};
