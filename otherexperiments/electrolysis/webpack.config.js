const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    overlay: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
      new webpack.DefinePlugin({
          DEVELOPMENT: process.env.NODE_ENV === 'development'
      })
  ]
};
