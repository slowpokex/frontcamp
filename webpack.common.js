const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

// Common bundle
module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'docs'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    publicPath: '/frontcamp/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-2'],
            plugins: [require('babel-plugin-transform-runtime')]
          }
        }
      },{
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['url-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['docs']),
    new ExtractTextPlugin('styles/styles.css'),
    new HtmlWebpackPlugin({
      title: 'News API App',
      template: './src/index.html'
    })
  ],
};
