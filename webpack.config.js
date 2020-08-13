const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

const outputPath = path.resolve(__dirname, 'src/srv/public/build');

module.exports = {
  entry: {
    main: './src/client/index.js'
  },
  output: {
    path: outputPath,
    publicPath: './build/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
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
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  plugins: [
    new ManifestPlugin()
  ]
};