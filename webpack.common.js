const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const src = path.resolve(__dirname, 'chromeExtension');
const destination = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    vendors: `./src/vendors.js`,
    index: `./src/index.js`,
    background: `${src}/background.js`,
    contentScript: `${src}/contentScript.js`,
    fiberInjection: `./src/fiberInjection/index.js`,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // chunks: 'all',
        },
      },
    },
  },
  output: { path: destination },
  module: {
    rules: [
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
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    // Allows importing JS / JSX files without specifying extension
    extensions: ['.js', '.jsx', '.mjs'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${src}/manifest.json`, to: destination },
        { from: `${src}/devtools.html`, to: destination },
        { from: `${src}/devtools.js`, to: destination },
        { from: `${src}/popup.html`, to: destination },
      ],
    }),
  ],
};
