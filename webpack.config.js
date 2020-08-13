const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

const outputPath = path.resolve(__dirname, 'src/srv/public/build');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: outputPath,
    publicPath: './build/',
    filename: 'bundle.js'
  },
  module: {
    // Only assumes JS modules with possible DOM source.
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.ttf$/,
      use: ['file-loader?name=[hash].[ext]']
    }]
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ]
};