const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const src = path.resolve(__dirname, 'chromeExtension');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: (pathData) => {
      if (
        pathData.chunk.name === 'background' ||
        pathData.chunk.name === 'contentScript' ||
        pathData.chunk.name === 'fiberInjection'
      )
        return '[name].js';
      return '[name].[contentHash].bundle.js';
    },
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        filename: 'panel.html',
        template: `${src}/panelProd.html`,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
    ],
  },
});
