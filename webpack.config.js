// dependencies
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// import env vars
require('dotenv').config()

// environment variables
let DEV = process.env.NODE_ENV !== 'production'

let ENABLE_SOURCEMAPS = false
if (
  typeof process.env.VFB_SOURCEMAPS !== 'undefined' &&
  process.env.VFB_SOURCEMAPS === 'true'
) {
  ENABLE_SOURCEMAPS = true
}

let VERSION_HASH = false
if (
  typeof process.env.VFB_VERSION_HASH !== 'undefined' &&
  process.env.VFB_VERSION_HASH === 'true'
) {
  VERSION_HASH = true
}

let DEBUG = false
if (
  typeof process.env.VFB_DEBUG !== 'undefined' &&
  process.env.VFB_DEBUG === 'true'
) {
  DEBUG = true
}

let PROXY = 'http://localhost:3000'
if (typeof process.env.VFB_PROXY !== 'undefined') {
  PROXY = process.env.VFB_PROXY
}

// webpack config
module.exports = {
  target: 'web',
  mode: DEV ? 'development' : 'production',
  devtool: DEV && ENABLE_SOURCEMAPS ? 'source-map' : false,
  entry: {
    main: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: DEV || !VERSION_HASH ? '[name].js' : '[name].[contenthash].js',
  },
  plugins: [
    // clear dist folder each build
    new CleanWebpackPlugin(),
    // extract css modules to file
    new MiniCssExtractPlugin({
      filename: DEV || !VERSION_HASH ? '[name].css' : '[name].[hash].css',
      chunkFilename: DEV || !VERSION_HASH ? '[id].css' : '[id].[hash].css',
    }),
    // lint scripts
    new ESLintPlugin(),
    // lint styles
    new StyleLintPlugin({
      files: './src/scss/**/*.scss',
      emitWarning: true,
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/img', to: 'img' }],
    }),
    // minify images
    new ImageminPlugin({
      disable: DEV,
    }),
    // generate assets manifest file
    new WebpackAssetsManifest(),
    // html entrypoint
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // browsersync config
    new BrowserSyncPlugin(
      {
        host: '0.0.0.0',
        port: 8080,
        proxy: PROXY,
        files: ['./src/*.html'],
        open: false,
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          DEV
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './',
                },
              },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  // dev server config
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: '0.0.0.0',
    hot: true,
    open: true,
    overlay: true,
    port: 3000,
  },
}
