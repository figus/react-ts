const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'app', 'index.html')
  })
];

module.exports = options => ({
  mode: options.mode,
  entry: {
    app: [
      './src/app/index.tsx',
      'webpack-hot-middleware/client'
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, 'dist')
  },

  // Enable sourcemaps for debugging webpack's output
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: options.devServer,
  plugins: plugins.concat(options.plugins)
});