const path = require('path');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-chrome-extension-reloader');
const common = require('./webpack.common');

const src = path.resolve(__dirname, 'testSetup');
const destination = path.resolve(__dirname, 'build');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  output: { filename: '[name].js' },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: `${src}/panel.html`, to: destination }] }),
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        contentScript: 'contentScript',
        background: 'background',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 3. Inject styles into DOM
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
    ],
  },
});
