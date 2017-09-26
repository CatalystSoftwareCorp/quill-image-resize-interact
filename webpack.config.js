const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'quill-image-resize-interact.js',
    path: path.resolve('.')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['ENV']
          }
        }
      }
    ]
  }
}