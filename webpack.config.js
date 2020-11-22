const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === 'development'
        ? 'http://localhost:8080/'
        : 'https://gameoflife-motionary.netlify.app/'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  devServer: {
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'gameoflife',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Gol': './src/components/GOL'
      },
      shared: require('./package.json').dependencies
    }),
    new HtmlWebPackPlugin({
      template: './src/template.html'
    })
  ]
})
