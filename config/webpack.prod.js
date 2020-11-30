require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const paths = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const output = {
  path: paths.build,
  filename: '[name].bundle.js',
  assetModuleFilename: 'images/[hash][ext][query]',
  publicPath: process.env.PUBLIC_PATH
}
console.log('ouput', output)

// Extracts CSS into separate files
// Note: style-loader is for development, MiniCssExtractPlugin is for production
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'styles/[name].[contenthash].css',
  chunkFilename: '[id].css'
})
const plugins = [miniCssExtractPlugin]

const ruleMiniCss = {
  test: /\.(css)$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: false
      }
    }
  ]
}
const rules = [ruleMiniCss]

// optimization congif conflicts with Module Federation; not sure about reason
// const optCss = new CssMinimizerPlugin()
// const optimization = {
//   minimize: true,
//   minimizer: [optCss, '...'],
//   // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
//   // instead of having their own. This also helps with long-term caching, since the chunks will only
//   // change when actual code changes, not the webpack runtime.
//   runtimeChunk: {
//     name: 'runtime'
//   }
// }

const performance = {
  hints: false,
  maxEntrypointSize: 512000,
  maxAssetSize: 512000
}

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output,
  plugins,
  module: { rules },
  // optimization,
  performance
})
