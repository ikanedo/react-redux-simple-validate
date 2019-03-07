const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'examples/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    alias: {
      'react-redux-simple-validate': path.resolve(__dirname, 'src/index.js')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    compress: true,
    port: 9000,
    hot: true
  }
};
