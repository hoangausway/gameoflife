require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

console.log('process.env.PUBLIC_PATH', process.env.PUBLIC_PATH)

// Set the mode to development or production
const mode = 'development'

// const output = { publicPath: 'http://localhost:3004/' }
// Where webpack outputs the assets and bundles
const output = {
  publicPath: process.env.PUBLIC_PATH
}

// Control how source maps are generated
const devtool = 'inline-source-map'

// Spin up a server for quick development
const devServer = {
  port: process.env.PORT,
  contentBase: paths.build,
  open: true,
  compress: true,
  hot: true,
  historyApiFallback: true
}

// Only update what has changed on hot reload
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()

const plugins = [hotModuleReplacementPlugin]

// module exports
module.exports = merge(common, { mode, output, devtool, devServer, plugins })
