const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const src = path.resolve(__dirname, 'testSetup');
const destination = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    index: `${src}/index.js`,
    background: `${src}/chromeExtension/background.js`,
    contentScript: `${src}/chromeExtension/contentScript.js`,
  },
  output: { path: destination },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Allows importing JS / JSX files without specifying extension
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${src}/chromeExtension/manifest.json`, to: destination },
        { from: `${src}/chromeExtension/devtools.html`, to: destination },
      ],
    }),
  ],
};
