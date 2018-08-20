const webpack = require('webpack');
const path = require("path");
module.exports = {
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
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path:  path.resolve(__dirname, "dist"),
    // publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/(fs)/),new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
