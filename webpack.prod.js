const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    watchContentBase: true
  },
});
