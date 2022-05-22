module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
  performance: {
    hints: false,
  },
  output: {
    path: __dirname + '/dist',
    publicPath: 'dist',
    filename: 'worker.js',
  },
}
