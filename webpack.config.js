// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

// Where webpack looks to start building the bundle
// const entry = {
//   main: './src/index.js'
// }

// Where webpack outputs the assets and bundles
const output = mode => ({
  // path: path.resolve(__dirname, '../dist'),
  publicPath:
    mode === 'development'
      ? 'http://localhost:8080/'
      : 'https://gameoflife-motionary.netlify.app/'
})

const resolve = { extensions: ['.jsx', '.js', '.json'] }
const devServer = { port: 8080 }
const devtool = 'source-map'

// JavaScript: Use Babel to transpile JavaScript files
const ruleBabel = {
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['@babel/preset-react']
  }
}
// Styles: Inject CSS into the head with source maps
const ruleCss = { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
// Images: Copy image files to build folder
const ruleImg = {
  test: /\.(?:ico|svg|png|jpg|jpeg|gif)$/i,
  type: 'asset/resource'
}
// Fonts and SVGs: Inline files
const ruleFont = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
  type: 'asset/inline'
}
const rules = [ruleBabel, ruleCss, ruleImg, ruleFont]

const moduleFederationPlugin = new ModuleFederationPlugin({
  name: 'gameoflife',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './GameOfLife': './src/components/gameoflife'
  },
  shared: require('./package.json').dependencies
})

const htmlWebPackPlugin = new HtmlWebPackPlugin({
  title: 'Game Of Life',
  template: './src/template.html'
})

// Removes/cleans build folders and unused assets when rebuilding
// const cleanWebpackPlugin = new CleanWebpackPlugin()

module.exports = (_, argv) => ({
  // entry,
  output: output(argv.mode),
  resolve,
  devServer,
  devtool,
  module: { rules },
  plugins: [htmlWebPackPlugin, moduleFederationPlugin]
})
