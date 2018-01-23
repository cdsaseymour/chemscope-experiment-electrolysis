const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        overlay: true
    },
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }
          ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEVELOPMENT: process.env.NODE_ENV === 'development'
        }),
  ]
};
