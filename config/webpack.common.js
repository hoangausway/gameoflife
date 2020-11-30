const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const deps = require('../package.json').dependencies

// Input
const entry = [paths.src + '/index.js']

// JavaScript: Use Babel to transpile JavaScript files
const ruleJs = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader']
}

// Styles: Inject CSS into the head with source maps
const ruleCss = {
  test: /\.(css)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { sourceMap: true, importLoaders: 1 }
    }
  ]
}
// Images: Copy image files to build folder
const ruleImg = { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' }
// Fonts and SVGs: Inline files
const ruleInline = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
  type: 'asset/inline'
}
const rules = [ruleJs, ruleCss, ruleImg, ruleInline]

// Removes/cleans build folders and unused assets when rebuilding
const cleanWebpackPlugin = new CleanWebpackPlugin()
// Copies files from target to destination folder
const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: paths.public,
      to: 'assets',
      globOptions: {
        ignore: ['*.DS_Store']
      }
    }
  ]
})
// Generates an HTML file from a template
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Game Of Life',
  favicon: paths.src + '/images/favicon.png',
  template: paths.src + '/template.html', // template file
  filename: 'index.html' // output file
})
const moduleFederationPlugin = new ModuleFederationPlugin({
  name: 'gameoflife',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './GameOfLife': './src/components/gameoflife'
  },
  shared: {
    ...deps,
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
  }
})

const plugins = [cleanWebpackPlugin, copyWebpackPlugin, htmlWebpackPlugin, moduleFederationPlugin]

module.exports = {
  entry,
  plugins,
  module: { rules }
}
