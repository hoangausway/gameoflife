require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

// Output
const output = {
  publicPath: process.env.PUBLIC_PATH
}

console.log('ouput', output)

const devServer = {
  historyApiFallback: true,
  contentBase: paths.build,
  open: true,
  compress: true,
  hot: true,
  port: process.env.PORT
}

// Only update what has changed on hot reload
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()
const plugins = [hotModuleReplacementPlugin]

module.exports = merge(common, {
  mode: 'development',
  output,
  // Control how source maps are generated
  devtool: 'inline-source-map',
  // Spin up a server for quick development
  devServer,
  plugins
})
