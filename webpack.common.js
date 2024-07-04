const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.html',
  title: 'Production',
  filename: './index.html',
  favicon: './public/favicon.png'
});

const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'server.js',
    publicPath: process.env.PUBLIC_URL || '/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      './fonts/bootstrap-icons.woff': path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff'),
      './fonts/bootstrap-icons.woff2': path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2'),
      images: path.resolve(__dirname, 'src/assets/images'), // Adjust the path based on your project structure
      fonts: path.resolve(__dirname, 'src/assets/fonts'), // Adjust the path based on your project structure
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ["@babel/preset-react", {"runtime": "automatic"}]
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // Adjust the number based on the position of resolve-url-loader and sass-loader
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|webp|tiff)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext]",
        },
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'fonts/[name].[ext]',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new Dotenv(),
  ],
};
