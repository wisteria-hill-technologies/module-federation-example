const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
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
      name: 'microFrontEnd1',
      filename: 'remoteEntry.js',
      exposes: {
        './MFEApp1': './src/App',
        './Button': './src/Button'
      },
      remotes: {
        microFrontEnd2: 'microFrontEnd2@http://localhost:8082/remoteEntry.js',
        microFrontEnd3: 'microFrontEnd3@http://localhost:8083/remoteEntry.js',
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};