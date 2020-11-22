const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const output = mode => ({
  publicPath:
    mode === 'development'
      ? 'http://localhost:8080/'
      : 'https://gameoflife-motionary.netlify.app/'
})

const resolve = { extensions: ['.jsx', '.js', '.json'] }
const devServer = { port: 8080 }
const devtool = 'source-map'

const ruleCss = { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
const ruleBabel = {
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['@babel/preset-react']
  }
}
const rules = [ruleCss, ruleBabel]

const moduleFederationPlugin = new ModuleFederationPlugin({
  name: 'gameoflife',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './Gol': './src/components/GOL'
  },
  shared: require('./package.json').dependencies
})

const htmlWebPackPlugin = new HtmlWebPackPlugin({
  title: 'Game Of Life',
  template: './src/template.html'
})

module.exports = (_, argv) => ({
  output: output(argv.mode),
  resolve,
  devServer,
  devtool,
  module: { rules },
  plugins: [moduleFederationPlugin, htmlWebPackPlugin]
})
