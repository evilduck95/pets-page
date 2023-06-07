const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const baseEnv = dotenv.config({
  path: './.env.production'
});

// Leaving the env var here just in case I ever need it (at time of writing it has 1 var in it).
module.exports = (env) => {
    console.log('Environment', JSON.stringify(baseEnv, null, 2));

    return {
        mode: 'production',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/pet-tracker'
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
            new webpack.DefinePlugin({
              'process.env': JSON.stringify(baseEnv.parsed)
            }),
            new HtmlWebpackPlugin({
              template: 'public/index.html'
            })
        ]
    }
};