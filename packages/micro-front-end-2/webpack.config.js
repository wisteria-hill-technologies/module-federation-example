const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8082,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel
         to compile any file with extension
         .js */
        test: /\.js?$/,

        /* exclude node_modules directory from babel.
        Babel will not compile any files in this directory*/
        exclude: /node_modules/,

        // To Use babel Loader
        loader: 'babel-loader',
        options: {

          presets: ['@babel/preset-env' /* to transfer any advansed ES to ES5 */,
            '@babel/preset-react'], // to compile react to ES5
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microFrontEnd2',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};