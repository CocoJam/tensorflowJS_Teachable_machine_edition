const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require("path");
module.exports = {
  // entry:{
  //   index: './src/index.js',
  //   another: "./dist/opencvjs/test/cv.js"
  // },
  entry: './src/index.js',
  module: {
    rules: [
      // {
      //   test: /dlib\.js$/,
      //   loader: "exports-loader"
      // },
      {
        test: /\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          publicPath: "dist/"
        }
      },
      // {test: /\.(c|cpp)$/,
      //   use: {
      //     loader: 'cpp-wasm-loader'
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  resolve: {
    alias: {
      'react-tap-event-plugin': 'preact-tap-event-plugin'
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/',
    filename: 'bundle.js',
    globalObject: 'this'
  },
  plugins: [
    new webpack.IgnorePlugin(/(fs)/), new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 3,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
