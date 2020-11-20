const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('../package.json').dependencies

const moduleFederationPlugin = new ModuleFederationPlugin({
  name: 'gameoflife',
  library: { type: 'assign', name: 'gameoflife' },
  filename: 'remoteEntry.js',
  exposes: { './Gol': './src/components/GOL' }, // expose each component you want
  remotes: {}, // consume remote components
  shared: {
    ...deps,
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
  }
})

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

// JavaScript: Use Babel to transpile JavaScript files
const ruleJs = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['@babel/preset-react']
  }
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
const ruleFont = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
  type: 'asset/inline'
}

const rules = [ruleJs, ruleCss, ruleImg, ruleFont]

// Where webpack looks to start building the bundle
const entry = [paths.src + '/index.js']

// Customize the webpack build process
const plugins = [
  moduleFederationPlugin,
  cleanWebpackPlugin,
  copyWebpackPlugin,
  htmlWebpackPlugin
]

// module exports
module.exports = { entry, plugins, module: { rules } }
