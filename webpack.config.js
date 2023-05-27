const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {

    const envKeys = Object.keys(env)
        .reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(env[next]);
            return prev;
        }, {});

    return {
        mode: 'development',
        devServer: {
          historyApiFallback: true
          // port: 5000,
          // proxy: {
          //   '/api': {
          //     target: {
          //       host: '192.168.1.102',
          //       protocol: 'http',
          //       port: 8001
          //     }
          //   }
          // }
        },
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve: {
            alias: {
                AppRoot: path.resolve(__dirname, 'src'),
                Libs: path.resolve(__dirname, 'node_modules')
            }
        }, 
        module: {
            rules: [
              {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
              },
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader'],
              }
            ]
          },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
              template: 'public/index.html'
            })
        ]
    }
};