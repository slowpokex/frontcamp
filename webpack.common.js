const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const path = require('path');

// Common bundle
module.exports = {
    entry: path.join(__dirname, 'src/app/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.css', '.scss'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2'],
                        plugins: [ require('babel-plugin-transform-runtime') ]
                      }
                }
            }
        ]
    },
};
