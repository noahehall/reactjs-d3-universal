import webpack from 'webpack';
import path from 'path';

export default {
  target: 'node-webkit',
  context: path.resolve(__dirname, './src'),
  entry: {
    app: [
      './index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    inline: true,
    hot: true,
    historyApiFallback: true,
    stats: 'minimal',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    dns: false,
    setImmediate: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0', 'react'],
          },
        }],
      },
    ],
  },

  plugins: process.argv.indexOf('-p') === -1 ? [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev'),
    }),
  ] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
  ],
};
